
import { GoogleGenAI, Part } from "@google/genai";
import { AspectRatio } from '../types';

// Initialize Gemini API
// It is important to ensure process.env.API_KEY is available in the environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
 * Analyzes uploaded images and current text to generate a professional prompt.
 * Accepts an optional categoryContext string to tailor the output.
 */
export const enhancePrompt = async (currentPrompt: string, images: File[], categoryContext: string = ""): Promise<string> => {
  try {
    // Prepare image parts
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
      Your goal is to write a highly detailed, professional image generation prompt based on the user's inputs.
      
      Analyze the provided images (if any) to understand their style, composition, lighting, and subject.
      Analyze the user's draft text (if any) to understand their intent.
      
      ${categoryContext ? `CONTEXT: The user has specifically selected the following category/style context: "${categoryContext}". Ensure the generated prompt adheres strictly to this aesthetic and professional standard.` : ''}

      Create a single, cohesive, and descriptive prompt that would generate a high-quality image. 
      Include specific details about:
      - Subject description (clothing, pose, expression)
      - Environment/Background
      - Lighting (e.g., volumetric, cinematic, neon, natural)
      - Art Style (e.g., photorealistic, 8k, cyberpunk, vintage, oil painting)
      - Camera parameters (optional, e.g., wide angle, macro)
      
      IMPORTANT: The final prompt output must be written in **Indonesian** (Bahasa Indonesia).
      Output ONLY the prompt text in Indonesian. Do not add conversational filler.
    `;

    const userContent = currentPrompt 
      ? `Draft idea: "${currentPrompt}". Enhance this into a professional prompt in Indonesian, using the attached images as visual context if relevant.` 
      : "Create a professional, detailed image generation prompt in Indonesian that describes these images.";

    const textPart: Part = { text: userContent };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Using flash for text/multimodal analysis
      config: {
        systemInstruction: systemInstruction,
      },
      contents: {
        parts: [...imageParts, textPart],
      },
    });

    return response.text || currentPrompt;

  } catch (error) {
    console.error("Error enhancing prompt:", error);
    throw error;
  }
};

/**
 * Sends images and a text prompt to Gemini 2.5 Flash Image to generate an edited image.
 * Supports Aspect Ratio and Multiple Image Generation loops.
 */
export const generateEditedImage = async (
  prompt: string, 
  images: File[], 
  aspectRatio: AspectRatio = '1:1', 
  count: number = 1
): Promise<string[]> => {
  try {
    // Prepare image parts
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

    // Helper to make a single request
    const makeRequest = async (): Promise<string | null> => {
        // We append the aspect ratio preference to the prompt as a hint for the editor,
        // although we also send it in config.
        const enhancedPrompt = `${prompt}. Aspect Ratio: ${aspectRatio}.`;
        const textPart: Part = { text: enhancedPrompt };
        const parts = [...imageParts, textPart];

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: parts },
            config: {
                imageConfig: {
                    aspectRatio: aspectRatio
                }
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
        return null;
    };

    // Execute requests in parallel or loop based on count
    console.log(`Generating ${count} images with ratio ${aspectRatio}...`);
    
    // Create an array of promises based on the count
    const promises = Array.from({ length: count }, () => makeRequest());
    
    // Wait for all to finish
    const results = await Promise.all(promises);
    
    // Filter out nulls
    const validUrls = results.filter((url): url is string => url !== null);

    if (validUrls.length === 0) {
         throw new Error("Model failed to generate a valid image.");
    }

    return validUrls;

  } catch (error) {
    console.error("Error in generateEditedImage:", error);
    throw error;
  }
};
