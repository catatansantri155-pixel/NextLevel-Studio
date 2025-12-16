
import { GoogleGenAI, Part } from "@google/genai";
import { AspectRatio } from '../types';

/**
 * Retrieves all available API keys from the environment variable.
 * Supports multiple keys separated by commas for load balancing and failover.
 */
const getApiKeys = (): string[] => {
  const apiKeyString = process.env.API_KEY;

  if (!apiKeyString) {
    throw new Error("API_KEY environment variable is missing or empty.");
  }

  // Split by comma to support multiple keys and clean whitespace
  const keys = apiKeyString.split(',').map(k => k.trim()).filter(k => k.length > 0);
  
  if (keys.length === 0) {
    throw new Error("No valid API keys found in configuration.");
  }

  return keys;
};

/**
 * Converts a File object to a base64 encoded string.
 */
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/png;base64,")
      const base64Data = result.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

/**
 * Generates a unique, creative, and random photography concept based on the category and input images.
 * Implements retry logic across multiple API keys.
 */
export const generateCreativeConcept = async (categoryLabel: string, images: File[]): Promise<string> => {
  const keys = getApiKeys();
  // Shuffle keys to distribute load
  const shuffledKeys = [...keys].sort(() => Math.random() - 0.5);
  
  let lastError: any = null;

  // Prepare image parts once (if available)
  let parts: Part[] = [];
  try {
     const imageParts: Part[] = await Promise.all(
      images.map(async (file) => {
        const base64Data = await fileToBase64(file);
        return {
          inlineData: {
            data: base64Data,
            mimeType: file.type,
          },
        };
      })
    );
    
    const systemInstruction = `
      You are a world-class Creative Director and Photographer.
      Your task is to brainstorm ONE unique, artistic, and professional photography concept for a photo shoot.
      
      Category: ${categoryLabel}
      
      Instructions:
      1. Analyze the input images (if provided) to understand the subject.
      2. If no images are provided, generate a concept suitable for the category.
      3. Think out of the box. Do not just describe a standard studio shot. Suggest something creative with specific lighting, set design, props, or atmosphere.
      4. The concept must focus on the ENVIRONMENT, LIGHTING, and MOOD to enhance the subject.
      5. IMPORTANT: Do not suggest changing the subject's face or physical structure.
      
      Output:
      Provide a single, descriptive prompt paragraph in **Indonesian** (Bahasa Indonesia).
      It should be ready to be used as an image generation prompt.
    `;

    const prompt = `Berikan saya satu ide konsep fotografi yang unik, detail, dan kreatif untuk kategori ${categoryLabel}. Buat ini berbeda dari biasanya.`;

    const textPart: Part = { text: prompt };
    parts = imageParts.length > 0 ? [...imageParts, textPart] : [textPart];

    // Try keys sequentially
    for (const apiKey of shuffledKeys) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.9, 
          },
          contents: { parts: parts },
        });

        return response.text || "";
      } catch (error) {
        console.warn(`API Key ending in ...${apiKey.slice(-4)} failed for Concept. Switching key...`, error);
        lastError = error;
        // Continue to next key in loop
      }
    }
  } catch (prepError) {
      console.error("Error preparing files for concept:", prepError);
      throw prepError;
  }

  console.error("All API keys failed for generateCreativeConcept");
  throw lastError || new Error("Failed to generate concept after trying all available API keys.");
};

/**
 * Analyzes uploaded images and current text to generate a professional prompt.
 * Implements retry logic across multiple API keys.
 */
export const enhancePrompt = async (currentPrompt: string, images: File[], categoryContext: string = ""): Promise<string> => {
  const keys = getApiKeys();
  const shuffledKeys = [...keys].sort(() => Math.random() - 0.5);
  
  let lastError: any = null;

  try {
    // Prepare image parts once
    const imageParts: Part[] = await Promise.all(
      images.map(async (file) => {
        const base64Data = await fileToBase64(file);
        return {
          inlineData: {
            data: base64Data,
            mimeType: file.type,
          },
        };
      })
    );

    const systemInstruction = `
      You are an expert AI art curator and prompt engineer.
      
      YOUR PRIMARY GOAL:
      Write a highly detailed image generation prompt based on the user's inputs.
      
      CRITICAL RULE (MUST FOLLOW):
      The user wants to keep the MAIN SUBJECT (Person, Product, or Object) from the input image EXACTLY AS IS in terms of identity, facial features, structure, and key details.
      The transformation should ONLY apply to:
      1. Background / Environment
      2. Lighting / Atmosphere
      3. Image Quality / Texture
      4. Art Style (only applied to the environment, not the subject's identity)

      Analyze the provided images to identify the main subject.
      Analyze the user's draft text to understand the desired setting/vibe.
      
      ${categoryContext ? `CONTEXT: The user has specifically selected the following category/style context: "${categoryContext}". Ensure the background and lighting match this, but DO NOT distort the subject.` : ''}

      Output a single, cohesive prompt in **Indonesian** (Bahasa Indonesia) that starts with strict instructions to preserve the subject.
      
      Example structure of your output:
      "Pertahankan subjek utama (orang/produk) agar tetap terlihat asli dan identik. Ubah latar belakang menjadi [Deskripsi Latar], berikan pencahayaan [Deskripsi Cahaya], dengan gaya [Gaya Artistik]."
      
      Output ONLY the prompt text.
    `;

    const userContent = currentPrompt 
      ? `Draft idea: "${currentPrompt}". Enhance this into a professional prompt in Indonesian. REMEMBER: The goal is to put the EXISTING subject into a NEW context, NOT to create a new character/product.` 
      : "Create a professional prompt in Indonesian to place this subject in a better professional setting without changing its identity.";

    const textPart: Part = { text: userContent };
    const parts = [...imageParts, textPart];

    // Loop through keys
    for (const apiKey of shuffledKeys) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          config: { systemInstruction: systemInstruction },
          contents: { parts: parts },
        });

        return response.text || currentPrompt;
      } catch (error) {
        console.warn(`API Key ending in ...${apiKey.slice(-4)} failed for Enhance. Switching key...`, error);
        lastError = error;
      }
    }

  } catch (prepError) {
    console.error("Error preparing files for enhance:", prepError);
    throw prepError;
  }

  console.error("All API keys failed for enhancePrompt");
  throw lastError || new Error("Failed to enhance prompt after trying all available API keys.");
};

/**
 * Sends images and a text prompt to Gemini 2.5 Flash Image to generate an edited image.
 * Supports Aspect Ratio and Multiple Image Generation loops with Style Variation.
 * Implements robust failover for each individual image generation request.
 */
export const generateEditedImage = async (
  prompt: string, 
  images: File[], 
  aspectRatio: AspectRatio = '1:1', 
  count: number = 1
): Promise<string[]> => {
  try {
    // 1. Prepare image parts ONCE
    const imageParts: Part[] = await Promise.all(
      images.map(async (file) => {
        const base64Data = await fileToBase64(file);
        return {
          inlineData: {
            data: base64Data,
            mimeType: file.type,
          },
        };
      })
    );

    // Style variations to ensure diversity when count > 1
    // These are appended to the prompt to force the model to render differently
    const styleVariations = [
        "", // Variation 0: Pure User Prompt
        ", cinematic lighting, dramatic shadows, high contrast, moody atmosphere", // Variation 1: Dramatic
        ", soft natural lighting, bright and airy, elegant composition, dreamy bokeh", // Variation 2: Soft/Clean
        ", ultra sharp focus, highly detailed, 8k resolution, professional photography studio lighting", // Variation 3: Sharp/Pro
        ", vivid colors, warm golden hour tones, artistic flair" // Variation 4: Warm/Vivid
    ];

    // 2. Define the Request Function with Retry Logic
    // We pass the index to select a style variation
    const makeRequest = async (index: number): Promise<string | null> => {
        const keys = getApiKeys();
        // Shuffle keys per request for better distribution
        const shuffledKeys = [...keys].sort(() => Math.random() - 0.5);
        
        // Select style variation if count > 1
        const styleSuffix = (count > 1) ? styleVariations[index % styleVariations.length] : "";
        
        let lastError = null;

        // Try each key until one works
        for (const apiKey of shuffledKeys) {
            try {
                const ai = new GoogleGenAI({ apiKey });

                const preservationInstruction = "IMPORTANT: Maintain the exact facial features, product details, text, and identity of the main subject in the reference image. Do not redraw or alter the subject's structure. Only change the background, lighting, and style surrounding the subject.";
                
                // Add style suffix to prompt
                const finalPrompt = `${preservationInstruction} ${prompt}${styleSuffix}. Aspect Ratio: ${aspectRatio}.`;
                
                const textPart: Part = { text: finalPrompt };
                const parts = [...imageParts, textPart];

                // Generate a random seed for this specific request to ensure randomness
                const randomSeed = Math.floor(Math.random() * 2147483647);

                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash-image',
                    contents: { parts: parts },
                    config: {
                        imageConfig: {
                            aspectRatio: aspectRatio
                        },
                        // Add seed to config (Note: specific support depends on model version, 
                        // but combined with prompt variation it ensures diversity)
                        seed: randomSeed
                    }
                });

                if (response.candidates && response.candidates.length > 0) {
                    const content = response.candidates[0].content;
                    if (content && content.parts) {
                        for (const part of content.parts) {
                            if (part.inlineData && part.inlineData.data) {
                                const base64Data = part.inlineData.data;
                                const mimeType = part.inlineData.mimeType || 'image/png';
                                return `data:${mimeType};base64,${base64Data}`;
                            }
                        }
                    }
                }
                // If we get here with no image but no error, it might be a text response or block
                throw new Error("No image data in response.");

            } catch (error) {
                console.warn(`API Key ending in ...${apiKey.slice(-4)} failed for Generation (Idx ${index}). Switching key...`, error);
                lastError = error;
                // Continue to next key
            }
        }
        
        // If loop finishes without returning, all keys failed
        throw lastError || new Error("All API keys failed to generate image.");
    };

    console.log(`Generating ${count} images with ratio ${aspectRatio} using Smart Failover & Variation...`);
    
    // Execute requests in parallel based on count, passing the index for variation
    const promises = Array.from({ length: count }, (_, i) => makeRequest(i));
    
    const results = await Promise.all(promises);
    const validUrls = results.filter((url): url is string => url !== null);

    if (validUrls.length === 0) {
         throw new Error("Model failed to generate a valid image after retrying all keys.");
    }

    return validUrls;

  } catch (error) {
    console.error("Error in generateEditedImage:", error);
    throw error;
  }
};
