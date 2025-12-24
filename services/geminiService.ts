
import { GoogleGenAI, Part } from "@google/genai";
import { AspectRatio, ThemeMode } from "../types";

/* =====================================================
   API KEY ROTATION (SEQUENTIAL / ROUND-ROBIN)
   ===================================================== */

const API_KEYS = [
  "AIzaSyAvKK2887Z-4yEJYC98UwsPv7vEB4lvrhs",
  "AIzaSyA39y2jAx8AJime-geyhyUs6-7W0C_uBlg",
  "AIzaSyD1U7qkWZ1QUpVNUnL5LhSVhZ5SzoSLII4",
  "AIzaSyBZueVBJlpOG-ppJ7-Js2yMJDf1X8aBmk4",
  "AIzaSyDvwM7MciJ9RiLmxdQsVT6T032SiQov1yU"
];

let apiKeyIndex = 0;

const getNextAI = () => {
  const key = API_KEYS[apiKeyIndex];
  apiKeyIndex = (apiKeyIndex + 1) % API_KEYS.length;
  return new GoogleGenAI({ apiKey: key });
};

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

/* =====================================================
   HELPER: FILE → BASE64
   ===================================================== */

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

/* =====================================================
   GENERATE CREATIVE CONCEPT (TEXT)
   ===================================================== */

export const generateCreativeConcept = async (
  categoryLabel: string,
  images: File[]
): Promise<string> => {

  const ai = getNextAI();

  const imageParts: Part[] = await Promise.all(
    images.map(async f => ({
      inlineData: {
        data: await fileToBase64(f),
        mimeType: f.type
      }
    }))
  );

  const systemInstruction = `
Anda adalah Creative Director profesional.
Buat SATU konsep fotografi unik.
Fokus: lingkungan, pencahayaan, mood.
Kategori: ${categoryLabel}
Bahasa Indonesia.
`;

  const parts: Part[] = imageParts.length
    ? [...imageParts, { text: `Buat konsep fotografi kreatif untuk ${categoryLabel}.` }]
    : [{ text: `Buat konsep fotografi kreatif untuk ${categoryLabel}.` }];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    config: { systemInstruction, temperature: 0.9 },
    contents: { parts }
  });

  return response.text || "";
};

/* =====================================================
   ENHANCE PROMPT (TEXT)
   ===================================================== */

export const enhancePrompt = async (
  currentPrompt: string,
  images: File[],
  categoryContext = ""
): Promise<string> => {

  const ai = getNextAI();

  const imageParts: Part[] = await Promise.all(
    images.map(async f => ({
      inlineData: {
        data: await fileToBase64(f),
        mimeType: f.type
      }
    }))
  );

  const systemInstruction = `
Pertahankan identitas subjek.
Ubah hanya latar, cahaya, suasana.
${categoryContext ? `Konteks: ${categoryContext}` : ""}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    config: { systemInstruction },
    contents: {
      parts: [...imageParts, { text: currentPrompt || "Perbaiki prompt ini." }]
    }
  });

  return response.text || currentPrompt;
};

/* =====================================================
   HELPER: DYNAMIC VARIATION INJECTOR
   ===================================================== */
const getVariationInstruction = (index: number, theme: ThemeMode): string => {
    // Jika hanya 1 gambar, gunakan mode balanced
    
    const variations = {
        'Cerah': [
            "STYLE MODIFIER: Ultra-Clean Studio Lighting. Soft shadows, pristine white tones, commercial look.",
            "STYLE MODIFIER: Warm Golden Hour. Sun flares, orange/yellow tints, dreamy romantic atmosphere.",
            "STYLE MODIFIER: Cool Morning Light. Blueish tint, fresh airy vibe, sharp details, high key.",
            "STYLE MODIFIER: Hard Sunlight (Pop Art). Strong distinct shadows, vibrant saturated colors, summer vibe."
        ],
        'Gelap': [
            "STYLE MODIFIER: Classic Noir. High contrast, deep blacks, rim lighting only, mysterious silhouette.",
            "STYLE MODIFIER: Cyberpunk Neon. Blue and pink gel lights, wet reflections, futuristic night moody.",
            "STYLE MODIFIER: Warm Candlelight/Fire. Orange glow in darkness, cozy, intimate, heavy shadows.",
            "STYLE MODIFIER: Cold Moonlight. Desaturated blue tones, ghostly pale lighting, cinematic thriller vibe."
        ],
        'Campur': [
            "STYLE MODIFIER: Photorealistic Standard. Balanced lighting, true-to-life colors, 85mm portrait lens.",
            "STYLE MODIFIER: Cinematic Color Grading. Teal and Orange look, movie scene aesthetic, dramatic angle.",
            "STYLE MODIFIER: Artistic/Painterly. Softer focus, slightly ethereal, fine art photography style.",
            "STYLE MODIFIER: Bold/Editorial. Unusual lighting angle, high fashion contrast, sharp magazine look."
        ]
    };

    // Ambil variasi berdasarkan index (modulo 4 agar aman jika count > 4)
    const selectedVariations = variations[theme] || variations['Campur'];
    return selectedVariations[index % selectedVariations.length];
};

/* =====================================================
   GENERATE EDITED IMAGE (SEQUENTIAL + DELAY)
   ===================================================== */

export const generateEditedImage = async (
  prompt: string,
  images: File[],
  aspectRatio: AspectRatio = "1:1",
  count = 1,
  theme: ThemeMode = "Campur",
  onProgress?: (done: number, total: number) => void
): Promise<string[]> => {

  const imageParts: Part[] = await Promise.all(
    images.map(async f => ({
      inlineData: {
        data: await fileToBase64(f),
        mimeType: f.type
      }
    }))
  );

  const results: string[] = [];

  for (let i = 0; i < count; i++) {
    try {
      if (onProgress) onProgress(i, count);

      const ai = getNextAI();

      // 1. Ambil Modifier Variasi Unik untuk iterasi ini
      const variationModifier = count > 1 ? getVariationInstruction(i, theme) : "";

      // 2. Base Theme Instruction (General)
      let baseThemeInstruction = "";
      if (theme === 'Cerah') baseThemeInstruction = "Base Atmosphere: Bright, High-Key, Clean.";
      else if (theme === 'Gelap') baseThemeInstruction = "Base Atmosphere: Dark, Low-Key, Moody.";
      else baseThemeInstruction = "Base Atmosphere: Balanced Professional.";

      const parts: Part[] = [
        ...imageParts,
        { text: `
          ROLE: Advanced AI Art Director.
          TASK: Edit/Generate image based on input.
          
          STRICT CONSTRAINTS:
          1. KEEP IDENTITY: Face/Subject must match input image exactly.
          2. PROMPT: "${prompt}"
          3. ${baseThemeInstruction}
          
          ${count > 1 ? `4. IMPORTANT VARIATION FOR IMAGE ${i+1}/${count}:
          ${variationModifier}
          (Make this image visually distinct from others using this style modifier).` : ''}
          
          5. Aspect Ratio: ${aspectRatio}.
          ` 
        }
      ];

      // 3. Random Seed Generator yang Kuat
      // Kita tambahkan faktor 'i' agar seed pasti berbeda tiap loop
      const randomSeed = Math.floor(Math.random() * 1000000) + (i * 12345);

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: { parts },
        config: {
          imageConfig: { aspectRatio },
          seed: randomSeed,
          // Tingkatkan temperature agar model lebih "berani" bereksperimen pada variasi
          temperature: count > 1 ? 0.95 : 0.8
        }
      });

      const candidate = response.candidates?.[0];
      const imagePart = candidate?.content?.parts?.find(p => p.inlineData?.data);

      if (imagePart?.inlineData?.data) {
        results.push(
          `data:${imagePart.inlineData.mimeType || "image/png"};base64,${imagePart.inlineData.data}`
        );
      }

    } catch (err) {
      console.error(`Image ${i + 1} failed`, err);
    }

    // 🔥 JEDA ANTAR REQUEST (AMAN LIMIT)
    if (i < count - 1) {
      await sleep(2000);
    }
  }

  if (onProgress) onProgress(count, count);

  if (results.length === 0) {
    throw new Error("Tidak ada gambar yang berhasil dibuat.");
  }

  return results;
};
