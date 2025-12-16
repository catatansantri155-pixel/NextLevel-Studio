
import React, { useState } from 'react';
import { 
  BookOpen, Copy, X, Sparkles, Check, ArrowRight, LayoutGrid, 
  User, Package, Coffee, Shirt, HeartHandshake, Car, Mountain, 
  Armchair, Smile, Leaf, Dumbbell, Plane, Smartphone, Briefcase, 
  Palette, Gem, Scissors, Footprints, Watch, ImageOff
} from 'lucide-react';

interface PromptExample {
  id: string;
  category: string;
  title: string;
  prompt: string;
  imageUrl: string;
}

interface PromptLibraryProps {
  onSelectPrompt: (prompt: string) => void;
}

// Database Prompt "Banana 3 Pro" - Expanded to ~200 items
const PROMPTS: PromptExample[] = [
  // --- SPECIAL REQUEST (TOP) ---
  {
    id: 'special-bw-crossed',
    category: 'Portrait',
    title: 'B&W Crossed Arms',
    prompt: 'Create a high-contrast black and white portrait of a man with arms crossed. If multiple images are provided, merge the subject features seamlessly into this pose. Studio lighting, serious expression, dramatic shadows, sharp focus, 8k resolution.',
    imageUrl: 'https://images.unsplash.com/photo-1515536765-9b2a740fa685?q=80&w=600&auto=format&fit=crop'
  },
  
  // --- PORTRAIT (15 Items) ---
  {
    id: 'port-1',
    category: 'Portrait',
    title: 'Cyberpunk Neon Face',
    prompt: 'Extreme close-up portrait of a man with cybernetic implants, illuminated by blue and pink neon rain, futuristic city bokeh background, wet skin texture, hyper-realistic 8k, cinematic lighting, moody atmosphere.',
    imageUrl: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'port-2',
    category: 'Portrait',
    title: 'Golden Hour Professional',
    prompt: 'Professional corporate headshot of a confident woman, warm golden hour sunlight hitting half her face, blurred modern office background, sharp focus on eyes, pore-level skin detail, 85mm lens, high-end magazine style.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'port-3',
    category: 'Portrait',
    title: 'Rembrandt Classic',
    prompt: 'Studio portrait of an elderly man with a beard, dramatic Rembrandt lighting (chiaroscuro), dark canvas background, textured skin details, monochrome black and white photography, emotive and powerful.',
    imageUrl: 'https://images.unsplash.com/photo-1534030347209-7147fd9e7f1a?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'port-4',
    category: 'Portrait',
    title: 'Ethereal Fantasy',
    prompt: 'Fantasy portrait of an elf queen with a crown of glowing crystals, soft dreamy focus, magical forest background with floating light particles, pastel color palette, bioluminescent lighting, digital artstation style.',
    imageUrl: 'https://images.unsplash.com/photo-1519699047748-40baea614fee?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'port-5',
    category: 'Portrait',
    title: 'Double Exposure Art',
    prompt: 'Artistic double exposure silhouette of a woman profile merged with a snowy mountain pine forest, misty atmosphere, clean white background, minimalist composition, fine art photography.',
    imageUrl: 'https://images.unsplash.com/photo-1554291353-2cb264b971a0?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'port-6',
    category: 'Portrait',
    title: 'Urban Street Style',
    prompt: 'Candid street portrait of a skateboarder, golden sunset backlight, gritty urban alley texture, lens flare, wide aperture f/1.8, vibrant colors, authentic lifestyle vibe.',
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'port-7',
    category: 'Portrait',
    title: 'High Fashion Editorial',
    prompt: 'Avant-garde fashion portrait, model wearing geometric plastic accessories, harsh studio strobe lighting, colored gel lights (red and cyan), glossy makeup, stark contrast, vogue cover quality.',
    imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'port-8',
    category: 'Portrait',
    title: 'Cinematic Rain',
    prompt: 'Emotional portrait through a rainy window, water droplets on glass in focus, subject blurry in background, melancholic mood, cold blue color grading, cinematic movie scene.',
    imageUrl: 'https://images.unsplash.com/photo-1515463892140-58a22e37ff72?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'port-9',
    category: 'Portrait',
    title: 'Tribal Cultural',
    prompt: 'Portrait of a tribal warrior with traditional face paint, natural jungle lighting, intense gaze, highly detailed feather headdress, depth of field, documentary photography style.',
    imageUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'port-10',
    category: 'Portrait',
    title: 'Vintage Film',
    prompt: 'Retro 90s style portrait, film grain, light leaks, flash photography, model holding a vintage soda bottle, washed out colors, polaroid aesthetic.',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'port-11',
    category: 'Portrait',
    title: 'Underwater Ethereal',
    prompt: 'Portrait of a woman underwater, weightless floating hair, light rays penetrating from surface (caustics), deep blue ocean background, peaceful expression, high detail.',
    imageUrl: 'https://images.unsplash.com/photo-1536691880482-16a2456e3556?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'port-12',
    category: 'Portrait',
    title: 'Senior Wisdom',
    prompt: 'Close up of an old fisherman face, deep wrinkles telling a story, natural sunlight, wearing a yellow raincoat, sea background, sharp texture, authentic.',
    imageUrl: 'https://images.unsplash.com/photo-1506259091721-347f79819525?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'port-13',
    category: 'Portrait',
    title: 'Freckles Macro',
    prompt: 'Extreme macro shot of a blue eye and freckled cheek, natural daylight, reflecting the sky in the iris, hyper-realistic skin texture, soft peach fuzz visible.',
    imageUrl: 'https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'port-14',
    category: 'Portrait',
    title: 'Silhouette Sunset',
    prompt: 'Silhouette profile of a person against a giant setting sun, orange and purple gradient sky, birds flying in distance, minimalist composition.',
    imageUrl: 'https://images.unsplash.com/photo-1494548162494-384bba4ab999?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'port-15',
    category: 'Portrait',
    title: 'Snow Queen',
    prompt: 'Portrait of a woman with pale skin and white hair in a blizzard, snowflakes on eyelashes, cold blue color palette, fur coat, piercing gaze.',
    imageUrl: 'https://images.unsplash.com/photo-1548142813-c348350df52b?q=80&w=600&auto=format&fit=crop'
  },

  // --- FASHION (15 Items) ---
  {
    id: 'fash-1',
    category: 'Fashion',
    title: 'Streetwear Hype',
    prompt: 'Full body shot of model in oversized hoodie and chunky sneakers, dynamic jumping pose, graffiti wall background, fisheye lens effect, high contrast, vibrant urban colors.',
    imageUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'fash-2',
    category: 'Fashion',
    title: 'Desert Editorial',
    prompt: 'High fashion model in a flowing red silk dress standing on a white sand dune, deep blue sky, harsh noon sunlight creating strong shadows, minimalist composition, wide angle shot.',
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'fash-3',
    category: 'Fashion',
    title: 'Minimalist Beige',
    prompt: 'Studio shot, monochromatic beige outfit on beige seamless background, soft giant softbox lighting, clean lines, elegant standing pose, zara catalog style, sharp detail on fabric texture.',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'fash-4',
    category: 'Fashion',
    title: 'Neon Noir',
    prompt: 'Fashion model in black leather jacket, nighttime city street, illuminated only by shop window neon signs, wet asphalt reflections, mysterious and edgy vibe, cinematic color grading.',
    imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'fash-5',
    category: 'Fashion',
    title: 'Bohemian Summer',
    prompt: 'Girl in floral sundress running through a field of sunflowers, back view, sun flare, hair blowing in wind, warm Kodak Gold film preset, nostalgic and free spirited.',
    imageUrl: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'fash-6',
    category: 'Fashion',
    title: 'Luxury Suit',
    prompt: 'Gentleman in a bespoke navy suit adjusting cufflinks, luxury hotel lobby background with marble and gold accents, shallow depth of field, confident posture, rich color tones.',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'fash-7',
    category: 'Fashion',
    title: 'Cyber Fashion',
    prompt: 'Futuristic fashion, silver metallic clothing, holographic visor, stark white laboratory background, cool blue lighting, clean and clinical aesthetic, sci-fi magazine spread.',
    imageUrl: 'https://images.unsplash.com/photo-1485230405346-71acb9518d9c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'fash-8',
    category: 'Fashion',
    title: 'Grunge Rock',
    prompt: 'Band member in ripped denim and boots, sitting on an amplifier, backstage mess background, grainy black and white texture, raw and authentic attitude.',
    imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'fash-9',
    category: 'Fashion',
    title: 'Runway Walk',
    prompt: 'Low angle shot of model walking on runway, blurred audience in background, spotlights hitting the fabric, motion freeze, high energy, haute couture show.',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'fash-10',
    category: 'Fashion',
    title: 'Pastel Pop',
    prompt: 'Playful fashion shoot, model holding giant lollipop, pastel pink background, bright flat lighting, colorful makeup, pop art aesthetic, high saturation.',
    imageUrl: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'fash-11',
    category: 'Fashion',
    title: 'Techwear Rain',
    prompt: 'Model wearing black techwear with many straps and pockets, holding clear umbrella, rainy Tokyo street at night, neon reflections on wet fabric, futuristic ninja vibe.',
    imageUrl: 'https://images.unsplash.com/photo-1523396870777-191237004343?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'fash-12',
    category: 'Fashion',
    title: 'Vintage Thrift',
    prompt: 'Hipster fashion in a retro thrift store, wearing oversized colorful sweater and corduroy pants, warm tungsten lighting, cluttered background of clothes racks.',
    imageUrl: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'fash-13',
    category: 'Fashion',
    title: 'Fitness Active',
    prompt: 'Athletic model tying shoelaces on a running track, golden hour, sweat glistening, wearing branded sportswear, shallow depth of field, motivating mood.',
    imageUrl: 'https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'fash-14',
    category: 'Fashion',
    title: 'Ballgown Staircase',
    prompt: 'Grand wide shot of a woman in a massive ballgown descending a marble staircase, chandelier lighting, opulent palace interior, cinderella atmosphere.',
    imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'fash-15',
    category: 'Fashion',
    title: 'Denim on Denim',
    prompt: 'Casual fashion, denim jacket and jeans, leaning against a brick wall, natural daylight, cool blue tones, texture of denim fabric detailed.',
    imageUrl: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=600&auto=format&fit=crop'
  },

  // --- PRODUK UMUM (15 Items) ---
  {
    id: 'prod-1',
    category: 'Produk Umum',
    title: '3D Memphis Podium',
    prompt: 'Product display on a pastel pink cylinder podium, floating geometric shapes (cones, spheres), soft studio lighting, 3D render style, clean minimal background, high resolution.',
    imageUrl: 'https://images.unsplash.com/photo-1533167649158-6d508895b680?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'prod-2',
    category: 'Produk Umum',
    title: 'Dark Mode Tech',
    prompt: 'Sleek black gadget on a matte black surface, rim lighting (blue and orange) highlighting the edges, reflection on table, tech-noir atmosphere, premium unboxing vibe.',
    imageUrl: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'prod-3',
    category: 'Produk Umum',
    title: 'Floating Zero Gravity',
    prompt: 'Product parts exploded view hovering in mid-air, zero gravity effect, clean gradient background, even lighting from all sides, technical and precise.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'prod-4',
    category: 'Produk Umum',
    title: 'Nature Organic',
    prompt: 'Product placed on a mossy rock in a forest stream, sunlight filtering through leaves (dappled light), water flowing around, fresh and eco-friendly vibe.',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'prod-5',
    category: 'Produk Umum',
    title: 'Luxury Silk',
    prompt: 'Product nestled in draped gold satin fabric, soft folds, warm spotlight, expensive and royal atmosphere, rich texture detail.',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'prod-6',
    category: 'Produk Umum',
    title: 'Neon Grid',
    prompt: 'Retro 80s synthwave background, neon grid floor, sunset sun in background, product in center with glowing outline, cyber aesthetic.',
    imageUrl: 'https://images.unsplash.com/photo-1585338447937-7082f8fc763d?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'prod-7',
    category: 'Produk Umum',
    title: 'Water Splash',
    prompt: 'High speed photography of product falling into water, massive splash crown, frozen motion droplets, blue background, crisp and refreshing.',
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'prod-8',
    category: 'Produk Umum',
    title: 'Concrete Industrial',
    prompt: 'Product on raw concrete block, hard shadows from window blinds, brutalist architecture style, monochrome grey tones, sharp texture.',
    imageUrl: 'https://images.unsplash.com/photo-1564466021183-4296131c20f1?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'prod-9',
    category: 'Produk Umum',
    title: 'Sunlight Window',
    prompt: 'Product on wooden table, morning sunlight casting long shadows of window frame, vase of flowers in background blur, cozy home aesthetic.',
    imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'prod-10',
    category: 'Produk Umum',
    title: 'Flat Lay Knolling',
    prompt: 'Overhead shot, product organized neatly with related accessories at 90 degree angles (knolling), solid color background, even lighting, organized and satisfying.',
    imageUrl: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'prod-11',
    category: 'Produk Umum',
    title: 'Kitchen Lifestyle',
    prompt: 'Product on marble kitchen counter, blurred background of modern kitchen, ingredients like lemon and mint nearby, bright airy lighting.',
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'prod-12',
    category: 'Produk Umum',
    title: 'Beach Sand',
    prompt: 'Product half buried in white beach sand, starfish nearby, bright tropical sunlight, shadow of palm leaf, summer vacation vibe.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'prod-13',
    category: 'Produk Umum',
    title: 'Holographic Foil',
    prompt: 'Product placed on holographic foil material, iridescent reflections of pink, blue and silver, futuristic and trendy packaging style.',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'prod-14',
    category: 'Produk Umum',
    title: 'Velvet Drapes',
    prompt: 'Product on deep emerald green velvet cloth, draped elegantly, single spotlight creating dramatic shadows, luxury and premium feel.',
    imageUrl: 'https://images.unsplash.com/photo-1503455637927-730bce8583c0?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'prod-15',
    category: 'Produk Umum',
    title: 'White on White',
    prompt: 'White product on white background, playing with textures and shadows to create depth, minimalist high-key photography, pure and clean.',
    imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=600&auto=format&fit=crop'
  },

  // --- MAKANAN (15 Items) ---
  {
    id: 'food-1',
    category: 'Makanan',
    title: 'Dark Moody Burger',
    prompt: 'Gourmet burger on dark rustic wood, melting cheese, steam rising, dark background, single directional light emphasizing texture, dramatic shadows, culinary magazine style.',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'food-2',
    category: 'Makanan',
    title: 'Bright Pastel Macarons',
    prompt: 'Colorful macarons stacked on a pink pastel plate, bright high-key lighting, soft shadows, overhead flat lay, tea cup on side, sweet and airy vibe.',
    imageUrl: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'food-3',
    category: 'Makanan',
    title: 'Flying Salad',
    prompt: 'Fresh salad ingredients tossing in mid-air, water droplets, crisp lettuce and red tomatoes, kitchen background blur, high shutter speed, fresh and healthy.',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'food-4',
    category: 'Makanan',
    title: 'Pizza Stretch',
    prompt: 'Close up of pizza slice being lifted, long stringy mozzarella cheese stretch, pepperoni, golden crust, warm lighting, mouth watering detail.',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'food-5',
    category: 'Makanan',
    title: 'Sushi Platter',
    prompt: 'Elegant sushi platter on black slate, chopsticks holding a roll, wasabi and ginger side, low dramatic lighting, reflection on table, japanese restaurant vibe.',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'food-6',
    category: 'Makanan',
    title: 'Bakery Morning',
    prompt: 'Pile of croissants and sourdough bread, flour dusted on wooden table, morning sun rays hitting the crust, warm bakery atmosphere, macro texture.',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'food-7',
    category: 'Makanan',
    title: 'Ice Cream Summer',
    prompt: 'Melting ice cream cone held by hand against a blue summer sky, sprinkles falling, vibrant colors, shallow depth of field, fun and nostalgic.',
    imageUrl: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'food-8',
    category: 'Makanan',
    title: 'Steak Fire',
    prompt: 'T-bone steak grilling on barbecue, open flames licking the meat, smoke, charcoal embers glowing, intense heat, grilling action shot.',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'food-9',
    category: 'Makanan',
    title: 'Pancakes Syrup',
    prompt: 'Stack of fluffy pancakes, maple syrup pouring over the top, butter melting, berries on top, bright breakfast table setting, slow motion vibe.',
    imageUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'food-10',
    category: 'Makanan',
    title: 'Fine Dining',
    prompt: 'Tiny exquisite appetizer on large white plate, tweezer precision plating, edible flowers, foam, spotlight from top, michelin star restaurant aesthetic.',
    imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'food-11',
    category: 'Makanan',
    title: 'Donut Wall',
    prompt: 'Wall of donuts with colorful glaze and sprinkles, pop art style, bright pink and blue colors, flat lighting, fun and appetizing.',
    imageUrl: 'https://images.unsplash.com/photo-1551024601-564d6e67e215?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'food-12',
    category: 'Makanan',
    title: 'Ramen Bowl',
    prompt: 'Steaming hot ramen bowl, chopsticks lifting noodles, soft boiled egg, nori, steam rising, cozy izakaya wooden background, warm lighting.',
    imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'food-13',
    category: 'Makanan',
    title: 'Fruit Splash',
    prompt: 'Strawberries dropping into milk, high speed photography, white milk splash, red berries, clean white background, fresh and commercial.',
    imageUrl: 'https://images.unsplash.com/photo-1565257176508-3079b7b91560?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'food-14',
    category: 'Makanan',
    title: 'Spices Market',
    prompt: 'Overhead shot of colorful spices in wooden bowls (turmeric, chili, curry), textured wooden table, rustic vibe, vibrant orange and red colors.',
    imageUrl: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'food-15',
    category: 'Makanan',
    title: 'Chocolate Drip',
    prompt: 'Melted chocolate dripping down a cake, glossy texture, dark background, macro shot, indulgent and rich.',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop'
  },

  // --- KOSMETIK (12 Items) ---
  {
    id: 'cos-1',
    category: 'Kosmetik',
    title: 'Cream Texture',
    prompt: 'Macro shot of moisturizer cream texture smeared on glass, soft beige lighting, focus on the peaks of the cream, skincare purity.',
    imageUrl: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cos-2',
    category: 'Kosmetik',
    title: 'Lipstick Smear',
    prompt: 'Red lipstick bullet with a smear of color on white background, sharp focus, glossy texture, high-end makeup advertisement style.',
    imageUrl: 'https://images.unsplash.com/photo-1586495777744-4413f21062dc?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cos-3',
    category: 'Kosmetik',
    title: 'Tropical Serum',
    prompt: 'Vitamin C serum bottle surrounded by fresh orange slices and tropical monstera leaves, water droplets, bright sunlight, summer skincare routine.',
    imageUrl: 'https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cos-4',
    category: 'Kosmetik',
    title: 'Minimalist Bathroom',
    prompt: 'Skincare bottles lined up on a marble bathroom counter, mirror reflection, soft morning light, clean white towels, spa atmosphere.',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-1957be83d30a?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cos-5',
    category: 'Kosmetik',
    title: 'Powder Explosion',
    prompt: 'Face powder compact smashing, dust explosion of beige particles, freeze frame, black background, dramatic lighting.',
    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cos-6',
    category: 'Kosmetik',
    title: 'Gold Luxury',
    prompt: 'Anti-aging cream jar on a gold reflective surface, warm golden lighting, bokeh lights in background, premium expensive look.',
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cos-7',
    category: 'Kosmetik',
    title: 'Lavender Field',
    prompt: 'Organic soap bar placed on a rustic wood board in the middle of a lavender field, purple flowers blurred in foreground and background, natural sunset light.',
    imageUrl: 'https://images.unsplash.com/photo-1600857062241-98e5dba66e94?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cos-8',
    category: 'Kosmetik',
    title: 'Water Ripple',
    prompt: 'Cosmetic bottle standing in shallow water, ripples expanding from base, blue tint, fresh and hydrating concept, zen garden vibe.',
    imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cos-9',
    category: 'Kosmetik',
    title: 'Clay Mask',
    prompt: 'Overhead shot of clay mask in a wooden bowl, application brush, cucumber slices, spa setting, earth tones, natural texture.',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cos-10',
    category: 'Kosmetik',
    title: 'Pastel Blocks',
    prompt: 'Makeup products balanced on pastel colored geometric blocks, hard shadows, modern art direction, playful and trendy.',
    imageUrl: 'https://images.unsplash.com/photo-1522335200457-5edb1097e47f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cos-11',
    category: 'Kosmetik',
    title: 'Floating Bubbles',
    prompt: 'Clear shampoo bottle floating among soap bubbles in the air, blue sky background, iridescent reflections on bubbles, clean and airy.',
    imageUrl: 'https://images.unsplash.com/photo-1585232351009-31a42c2960a6?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cos-12',
    category: 'Kosmetik',
    title: 'Floral Oil',
    prompt: 'Glass dropper bottle with yellow facial oil, dried flowers inside, backlit by sun, glowing liquid, macro detail.',
    imageUrl: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=600&auto=format&fit=crop'
  },

  // --- PARFUM (10 Items) ---
  {
    id: 'par-1',
    category: 'Parfum',
    title: 'Dark Mystery',
    prompt: 'Crystal perfume bottle on black velvet, smoke swirling around, single spotlight from above, moody and mysterious, noir style.',
    imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'par-2',
    category: 'Parfum',
    title: 'Flower Explosion',
    prompt: 'Perfume bottle suspended in air, exploding rose petals in red and pink surrounding it, white background, high speed photography, vibrant.',
    imageUrl: 'https://images.unsplash.com/photo-1595535373192-fc04a9e592e9?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'par-3',
    category: 'Parfum',
    title: 'Sky Reflection',
    prompt: 'Perfume bottle placed on a mirror in an open field, reflecting the blue sky and fluffy white clouds, bright and airy, feeling of freedom.',
    imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea477942698?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'par-4',
    category: 'Parfum',
    title: 'Golden Sunset',
    prompt: 'Amber colored perfume bottle backlit by a setting sun, glowing liquid, placed on a wooden deck, warm orange tones, romantic vibe.',
    imageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'par-5',
    category: 'Parfum',
    title: 'Ice Cold',
    prompt: 'Men\'s cologne bottle encased in cracked ice, blue lighting, frost texture on glass, intense cold freshness feeling.',
    imageUrl: 'https://images.unsplash.com/photo-1523293188086-b46e0a8041a8?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'par-6',
    category: 'Parfum',
    title: 'Silk & Satin',
    prompt: 'Elegant perfume bottle lying on draped pink silk sheets, soft focus, romantic bedroom lighting, intimate and feminine.',
    imageUrl: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'par-7',
    category: 'Parfum',
    title: 'Citrus Fresh',
    prompt: 'Citrus perfume surrounded by sliced lemons and limes, water splash, bright yellow background, energetic and zesty.',
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'par-8',
    category: 'Parfum',
    title: 'Vintage Vanity',
    prompt: 'Antique perfume atomizer on an old wooden vanity table, lace doily, pearl necklace, sepia tone, nostalgia.',
    imageUrl: 'https://images.unsplash.com/photo-1616091093729-c04639413f1c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'par-9',
    category: 'Parfum',
    title: 'Forest Moss',
    prompt: 'Green perfume bottle sitting on mossy log in deep forest, fern leaves, dappled sunlight, nature and earthy scent visualization.',
    imageUrl: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'par-10',
    category: 'Parfum',
    title: 'Minimalist Stone',
    prompt: 'Perfume bottle balanced on a stack of smooth zen stones, grey background, soft shadows, balance and harmony.',
    imageUrl: 'https://images.unsplash.com/photo-1605618739426-382a52140b01?q=80&w=600&auto=format&fit=crop'
  },

  // --- AUTOMOTIVE (12 Items) ---
  {
    id: 'auto-1',
    category: 'Otomotif',
    title: 'Rolling Shot Red',
    prompt: 'Red sports car driving fast on a coastal highway, motion blur on road and wheels (panning shot), sunset sky reflecting on hood, dynamic angle.',
    imageUrl: 'https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'auto-2',
    category: 'Otomotif',
    title: 'Dark Garage',
    prompt: 'Motorcycle parked in a dark brick garage, single overhead spotlight highlighting the chrome details, moody atmosphere, grease and oil vibe.',
    imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'auto-3',
    category: 'Otomotif',
    title: 'Neon City Drive',
    prompt: 'Cyberpunk car parked in rain-slicked Tokyo street, neon signs reflecting in puddles and car paint, night time, futuristic glow.',
    imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'auto-4',
    category: 'Otomotif',
    title: 'Offroad Mud',
    prompt: '4x4 truck splashing through a mud pit, dirt flying, action freeze, forest background, rugged and tough aesthetic.',
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'auto-5',
    category: 'Otomotif',
    title: 'Luxury Interior',
    prompt: 'Wide angle shot of luxury car interior, leather seats, dashboard glowing, view of city lights through windshield, elegant and expensive.',
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'auto-6',
    category: 'Otomotif',
    title: 'Desert Drifting',
    prompt: 'Rally car drifting around a corner in the desert, massive dust cloud trailing behind, bright sunlight, high contrast action.',
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'auto-7',
    category: 'Otomotif',
    title: 'Classic Vintage',
    prompt: 'Old vintage car parked in front of a retro diner, pastel colors, sunny day, chrome bumper shining, 1950s nostalgia.',
    imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'auto-8',
    category: 'Otomotif',
    title: 'Showroom Clean',
    prompt: 'Supercar in a white minimalist showroom, perfect studio lighting stripes on body, reflective floor, clean and pristine.',
    imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'auto-9',
    category: 'Otomotif',
    title: 'Rainy Window',
    prompt: 'View from inside a car on a rainy night, bokeh city lights through raindrops on windshield, cozy and atmospheric.',
    imageUrl: 'https://images.unsplash.com/photo-1495539406979-bf61750d38ad?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'auto-10',
    category: 'Otomotif',
    title: 'Engine Detail',
    prompt: 'Close up of a powerful car engine block, metallic texture, oil and grime, mechanical engineering beauty, macro focus.',
    imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ed5f6?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'auto-11',
    category: 'Otomotif',
    title: 'Biker Sunset',
    prompt: 'Silhouette of a motorcyclist riding into the sunset, lens flare, open highway, sense of freedom and adventure.',
    imageUrl: 'https://images.unsplash.com/photo-1558980664-3a031cf67ea8?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'auto-12',
    category: 'Otomotif',
    title: 'Snow Drift',
    prompt: 'Car drifting in snow, white powder flying, cold winter atmosphere, overcast sky, high contrast action.',
    imageUrl: 'https://images.unsplash.com/photo-1548611716-ad96a96924b2?q=80&w=600&auto=format&fit=crop'
  },

  // --- INTERIOR (12 Items) ---
  {
    id: 'int-1',
    category: 'Interior',
    title: 'Japandi Living',
    prompt: 'Japandi style living room, low profile light wood furniture, beige walls, bonsai tree, soft diffused natural light from large window, zen atmosphere.',
    imageUrl: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'int-2',
    category: 'Interior',
    title: 'Industrial Loft',
    prompt: 'New York industrial loft, exposed brick walls, metal pipes, large iron windows, leather chesterfield sofa, edison bulb lighting, moody afternoon.',
    imageUrl: 'https://images.unsplash.com/photo-1502005229762-cf1afd38088d?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'int-3',
    category: 'Interior',
    title: 'Modern Kitchen',
    prompt: 'Sleek modern kitchen, matte black cabinets, marble island countertop, pendant lights, bowl of fresh lemons, architectural photography.',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'int-4',
    category: 'Interior',
    title: 'Boho Bedroom',
    prompt: 'Bohemian bedroom, macrame wall hanging, many plants, fairy lights, patterned rugs, cozy messy bed, warm evening vibe.',
    imageUrl: 'https://images.unsplash.com/photo-1522771753035-4848230d6f57?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'int-5',
    category: 'Interior',
    title: 'Luxury Hotel',
    prompt: 'Luxury hotel lobby, high ceilings, crystal chandelier, polished marble floors, velvet armchairs, gold accents, grand and opulent.',
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'int-6',
    category: 'Interior',
    title: 'Minimalist Office',
    prompt: 'Home office setup, white desk, ergonomic chair, macbook, floating shelves, succulent plant, clean bright workspace, productive vibe.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'int-7',
    category: 'Interior',
    title: 'Tropical Villa',
    prompt: 'Open air bali villa living room, view of swimming pool and jungle, thatched roof, rattan furniture, sunny holiday atmosphere.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'int-8',
    category: 'Interior',
    title: 'Dark Academia',
    prompt: 'Library room, floor to ceiling bookshelves filled with old books, leather armchair, fireplace, dark wood, moody scholarly atmosphere.',
    imageUrl: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'int-9',
    category: 'Interior',
    title: 'Sunroom Plants',
    prompt: 'Indoor garden room filled with monstera, fiddle leaf fig, and hanging plants, sunlight streaming through glass roof, humid and green.',
    imageUrl: 'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'int-10',
    category: 'Interior',
    title: 'Scandinavian Kids',
    prompt: 'Scandinavian kids room, light wood crib, pastel colors, cute animal posters, sheepskin rug, soft and safe environment.',
    imageUrl: 'https://images.unsplash.com/photo-1526657782461-9fe13402a841?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'int-11',
    category: 'Interior',
    title: 'Bathroom Spa',
    prompt: 'Luxury bathroom with freestanding tub, view of nature through window, candles, folded white towels, zen spa feeling.',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'int-12',
    category: 'Interior',
    title: 'Walk-in Closet',
    prompt: 'High end walk-in closet, organized clothes on hangers, shoe display shelves, central island, bright lighting, fashion lover dream.',
    imageUrl: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=600&auto=format&fit=crop'
  },

  // --- MINUMAN (10 Items) ---
  {
    id: 'drk-1',
    category: 'Minuman',
    title: 'Icy Cola Splash',
    prompt: 'Glass of cola with ice cubes, massive liquid splash, condensation on glass, dark background, cinematic backlighting, refreshing commercial.',
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'drk-2',
    category: 'Minuman',
    title: 'Latte Art',
    prompt: 'Close up of a latte art heart in a white cup, wooden table, coffee beans scattered, warm cozy cafe lighting, steam rising.',
    imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'drk-3',
    category: 'Minuman',
    title: 'Mojito Fresh',
    prompt: 'Mint mojito cocktail, lime wedges, fresh mint leaves, crushing ice, bright green colors, summer beach bar background.',
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'drk-4',
    category: 'Minuman',
    title: 'Whiskey Class',
    prompt: 'Crystal whiskey glass with ice ball, amber liquid, cigar smoke, dark leather background, gentleman club atmosphere.',
    imageUrl: 'https://images.unsplash.com/photo-1514218953589-2d7d37efd2dc?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'drk-5',
    category: 'Minuman',
    title: 'Smoothie Bowl',
    prompt: 'Berry smoothie bowl with granola and banana slices, overhead shot, colorful and healthy, bright morning sunlight.',
    imageUrl: 'https://images.unsplash.com/photo-1546039907-7fa05f864c02?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'drk-6',
    category: 'Minuman',
    title: 'Pouring Wine',
    prompt: 'Red wine being poured into a elegant glass, freeze motion splash, vineyard background, golden hour lighting.',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'drk-7',
    category: 'Minuman',
    title: 'Matcha Tea',
    prompt: 'Traditional japanese matcha tea preparation, bamboo whisk, green powder, ceramic bowl, tatami mat background, zen.',
    imageUrl: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3114?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'drk-8',
    category: 'Minuman',
    title: 'Beer Cheers',
    prompt: 'Two beer glasses clinking (cheers), foam spilling, pub background with bokeh lights, friends having fun, warm colors.',
    imageUrl: 'https://images.unsplash.com/photo-1535958636474-b021ee8876a3?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'drk-9',
    category: 'Minuman',
    title: 'Bubble Tea',
    prompt: 'Milk bubble tea with tapioca pearls, plastic cup with straw, pastel pink background, pop and cute aesthetic.',
    imageUrl: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'drk-10',
    category: 'Minuman',
    title: 'Water Bottle',
    prompt: 'Clear water bottle on a rock in a mountain stream, fresh cold water flowing, nature background, purity concept.',
    imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=600&auto=format&fit=crop'
  },

  // --- KERAJINAN (8 Items) ---
  {
    id: 'crft-1',
    category: 'Kerajinan',
    title: 'Pottery Hands',
    prompt: 'Close up of hands shaping wet clay on a pottery wheel, mud texture, motion blur of the wheel, artisan workshop background.',
    imageUrl: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'crft-2',
    category: 'Kerajinan',
    title: 'Knitting Wool',
    prompt: 'Cozy knitting setup, balls of chunky wool yarn, wooden needles, warm blanket, tea cup, autumn vibes.',
    imageUrl: 'https://images.unsplash.com/photo-1516934024742-b461fba47600?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'crft-3',
    category: 'Kerajinan',
    title: 'Leather Work',
    prompt: 'Leather craftsman table, tools (hammer, cutter), pieces of brown leather, focus on craftsmanship, rustic atmosphere.',
    imageUrl: 'https://images.unsplash.com/photo-1531129916676-e74f1b5c2a49?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'crft-4',
    category: 'Kerajinan',
    title: 'Origami Art',
    prompt: 'Complex origami paper crane, clean white background, sharp creases, minimalist japanese art style.',
    imageUrl: 'https://images.unsplash.com/photo-1530906622963-8a60586a45c5?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'crft-5',
    category: 'Kerajinan',
    title: 'Painting Canvas',
    prompt: 'Artist palette with mixed oil paints, messy brushes, canvas in background, colorful and creative chaos.',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'crft-6',
    category: 'Kerajinan',
    title: 'Macrame Wall',
    prompt: 'Boho macrame wall hanging, cotton rope texture, hanging plant, white wall, soft daylight.',
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'crft-7',
    category: 'Kerajinan',
    title: 'Wood Carving',
    prompt: 'Detail of wood shavings curling from a chisel, carpentry workshop, sawdust, warm golden lighting.',
    imageUrl: 'https://images.unsplash.com/photo-1588619461336-68f519f18742?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'crft-8',
    category: 'Kerajinan',
    title: 'Sewing Machine',
    prompt: 'Vintage sewing machine needle piercing fabric, thread detail, blurred background of fabrics, retro tailor shop.',
    imageUrl: 'https://images.unsplash.com/photo-1515511856280-7b23e8568729?q=80&w=600&auto=format&fit=crop'
  },

  // --- AKSESORIS (8 Items) ---
  {
    id: 'acc-1',
    category: 'Aksesoris',
    title: 'Diamond Ring',
    prompt: 'Macro shot of diamond engagement ring on a rose petal, sparkles, light dispersion (fire), romantic soft lighting.',
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'acc-2',
    category: 'Aksesoris',
    title: 'Gold Necklace',
    prompt: 'Gold chain necklace draped over a white bust statue, clean studio lighting, luxury jewelry photography.',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'acc-3',
    category: 'Aksesoris',
    title: 'Men Watch',
    prompt: 'Luxury chronograph watch on a wrist, driving a sports car, blurred steering wheel, confident lifestyle.',
    imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'acc-4',
    category: 'Aksesoris',
    title: 'Pearl Earrings',
    prompt: 'Pearl earrings lying on silk fabric, soft lustre, elegant and timeless, feminine aesthetic.',
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'acc-5',
    category: 'Aksesoris',
    title: 'Sunglasses Cool',
    prompt: 'Reflective sunglasses on a beach towel, reflecting palm trees and ocean, summer vacation vibe.',
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'acc-6',
    category: 'Aksesoris',
    title: 'Leather Wallet',
    prompt: 'Handcrafted leather wallet and keychain on a wooden desk, patina texture, rugged everyday carry (EDC).',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'acc-7',
    category: 'Aksesoris',
    title: 'Handbag Luxury',
    prompt: 'Designer handbag sitting on a cafe chair, parisian street background, chic lifestyle.',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'acc-8',
    category: 'Aksesoris',
    title: 'Boho Beads',
    prompt: 'Colorful beaded bracelets stacked on wrist, festival vibe, outdoors, sunlight, bohemian style.',
    imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop'
  },

  // --- SEPATU (8 Items) ---
  {
    id: 'shoe-1',
    category: 'Sepatu',
    title: 'Levitating Sneaker',
    prompt: 'Sneaker floating in air, laces flying, urban concrete background, dynamic lighting, sports advertising style.',
    imageUrl: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'shoe-2',
    category: 'Sepatu',
    title: 'Hiking Boots',
    prompt: 'Muddy hiking boots on a mountain trail, view of valley in background, adventure and travel concept.',
    imageUrl: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'shoe-3',
    category: 'Sepatu',
    title: 'High Heels',
    prompt: 'Red stiletto heels on a marble floor, reflection, evening gala atmosphere, elegant and sexy.',
    imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'shoe-4',
    category: 'Sepatu',
    title: 'Canvas Shoes',
    prompt: 'Classic white canvas shoes on a skateboard, pavement texture, teenage lifestyle, sunny afternoon.',
    imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'shoe-5',
    category: 'Sepatu',
    title: 'Running Action',
    prompt: 'Close up of running shoes hitting the asphalt, motion blur, marathon race, energetic and fast.',
    imageUrl: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'shoe-6',
    category: 'Sepatu',
    title: 'Leather Oxfords',
    prompt: 'Polished brown leather oxford shoes, beside a suit pant leg, gentleman style, formal wedding setting.',
    imageUrl: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'shoe-7',
    category: 'Sepatu',
    title: 'Sandal Beach',
    prompt: 'Flip flops left on the sand near water edge, footprint, ocean waves, relaxation vacation.',
    imageUrl: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'shoe-8',
    category: 'Sepatu',
    title: 'Sneaker Wall',
    prompt: 'Collection of colorful sneakers on display shelves, sneakerhead room, led lighting, collection vibe.',
    imageUrl: 'https://images.unsplash.com/photo-1556906781-9a412961d28c?q=80&w=600&auto=format&fit=crop'
  },

  // --- KESEHATAN (8 Items) ---
  {
    id: 'hlth-1',
    category: 'Kesehatan',
    title: 'Zen Yoga',
    prompt: 'Woman doing yoga pose on a dock by a lake at sunrise, mist, calm water, silhouette, peaceful and healthy.',
    imageUrl: 'https://images.unsplash.com/photo-1544367563-121910aa662f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'hlth-2',
    category: 'Kesehatan',
    title: 'Vitamins Flatlay',
    prompt: 'Assorted vitamin pills and fresh fruit (orange, kiwi) on yellow background, flat lay, immune boost concept.',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'hlth-3',
    category: 'Kesehatan',
    title: 'Medical Lab',
    prompt: 'Scientist holding a test tube with blue liquid, laboratory background with microscopes, clean white lighting, research.',
    imageUrl: 'https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'hlth-4',
    category: 'Kesehatan',
    title: 'Healthy Salad',
    prompt: 'Person eating a large green salad bowl, outdoors, sunlight, smile, healthy lifestyle promotion.',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'hlth-5',
    category: 'Kesehatan',
    title: 'Running Trail',
    prompt: 'Runner jogging on a forest trail, morning light filtering through trees, active wear, motion.',
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'hlth-6',
    category: 'Kesehatan',
    title: 'Spa Massage',
    prompt: 'Relaxing back massage in a spa, candles, orchid flower, soft dim lighting, wellness and therapy.',
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'hlth-7',
    category: 'Kesehatan',
    title: 'Dental Smile',
    prompt: 'Close up of a perfect white smile, dentist tools blurred in foreground, hygiene and care.',
    imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'hlth-8',
    category: 'Kesehatan',
    title: 'Meditation',
    prompt: 'Person meditating in lotus position on top of a mountain, overlooking clouds, spiritual and calm.',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop'
  },

  // --- PRE-WEDDING (8 Items) ---
  {
    id: 'wed-1',
    category: 'Pre-wedding',
    title: 'Sunset Beach',
    prompt: 'Couple holding hands walking on a beach at sunset, reflections on wet sand, romantic silhouette, golden lighting.',
    imageUrl: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'wed-2',
    category: 'Pre-wedding',
    title: 'Forest Hug',
    prompt: 'Couple hugging in a dense pine forest, ray of light piercing through trees, moody and intimate, cinematic.',
    imageUrl: 'https://images.unsplash.com/photo-1529636798458-92182e662485?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'wed-3',
    category: 'Pre-wedding',
    title: 'City Date',
    prompt: 'Couple laughing at a cafe table, city lights bokeh at night, wine glasses, urban romance.',
    imageUrl: 'https://images.unsplash.com/photo-1522673607200-1645062cd958?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'wed-4',
    category: 'Pre-wedding',
    title: 'Boat Row',
    prompt: 'Couple in a rowboat on a lake, water lilies, notebook movie vibe, romantic and peaceful.',
    imageUrl: 'https://images.unsplash.com/photo-1518171694666-e823528b6d4b?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'wed-5',
    category: 'Pre-wedding',
    title: 'Rooftop View',
    prompt: 'Couple dancing on a rooftop with city skyline in background, dusk, string lights, magical atmosphere.',
    imageUrl: 'https://images.unsplash.com/photo-1516054575922-f0b8eead17fa?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'wed-6',
    category: 'Pre-wedding',
    title: 'Rain Umbrella',
    prompt: 'Couple sharing a transparent umbrella in the rain, street lights reflecting, cozy and protective.',
    imageUrl: 'https://images.unsplash.com/photo-1516238840914-94dfc0c873ae?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'wed-7',
    category: 'Pre-wedding',
    title: 'Vintage Car',
    prompt: 'Couple sitting on the hood of a vintage car, open road, wearing retro clothes, travel and love.',
    imageUrl: 'https://images.unsplash.com/photo-1520024144160-3929e39d5422?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'wed-8',
    category: 'Pre-wedding',
    title: 'Field of Flowers',
    prompt: 'Couple lying in a field of wildflowers, drone shot from above, dress spread out, dreamy and soft.',
    imageUrl: 'https://images.unsplash.com/photo-1507915977619-6ccfe8003ae6?q=80&w=600&auto=format&fit=crop'
  },

  // --- TRAVEL (8 Items) ---
  {
    id: 'trav-1',
    category: 'Travel',
    title: 'Tropical Paradise',
    prompt: 'View from inside a wooden villa looking out to turquoise ocean, hammock, palm trees, sunny vacation.',
    imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'trav-2',
    category: 'Travel',
    title: 'Mountain Peak',
    prompt: 'Hiker standing on mountain summit, sea of clouds below, sunrise, red jacket, sense of achievement.',
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'trav-3',
    category: 'Travel',
    title: 'Santorini Blue',
    prompt: 'White architecture with blue domes in Santorini Greece, ocean view, bright sunlight, travel destination.',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'trav-4',
    category: 'Travel',
    title: 'Kyoto Street',
    prompt: 'Traditional street in Kyoto Japan, geisha walking, red lanterns, twilight, cultural heritage.',
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'trav-5',
    category: 'Travel',
    title: 'Desert Camel',
    prompt: 'Caravan of camels walking in Sahara desert dunes, sunset, long shadows, exotic adventure.',
    imageUrl: 'https://images.unsplash.com/photo-1547234935-80c7142ee969?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'trav-6',
    category: 'Travel',
    title: 'Venice Canal',
    prompt: 'Gondola ride in Venice canal, old buildings, reflections in water, romantic italian holiday.',
    imageUrl: 'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'trav-7',
    category: 'Travel',
    title: 'Van Life',
    prompt: 'Back doors of camper van open to a view of a lake and mountains, cozy bed inside, freedom lifestyle.',
    imageUrl: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'trav-8',
    category: 'Travel',
    title: 'Airplane Window',
    prompt: 'View of airplane wing and clouds from window seat, sunrise colors, travel anticipation.',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop'
  },

  // --- OLAHRAGA (8 Items) ---
  {
    id: 'sprt-1',
    category: 'Olahraga',
    title: 'Gym Intense',
    prompt: 'Bodybuilder lifting heavy weights, chalk dust in air, gym lighting, sweat, determination.',
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'sprt-2',
    category: 'Olahraga',
    title: 'Stadium Lights',
    prompt: 'Soccer player kicking ball in stadium, floodlights, green grass, audience blur, action shot.',
    imageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'sprt-3',
    category: 'Olahraga',
    title: 'Surfing Wave',
    prompt: 'Surfer inside a barrel wave, water spray, turquoise ocean, action freeze, adrenaline.',
    imageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'sprt-4',
    category: 'Olahraga',
    title: 'Basketball Dunk',
    prompt: 'Basketball player dunking, mid-air, outdoor court at sunset, silhouette, urban vibe.',
    imageUrl: 'https://images.unsplash.com/photo-1519861531473-92002639313a?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'sprt-5',
    category: 'Olahraga',
    title: 'Cycling Road',
    prompt: 'Cyclist on a winding mountain road, motion blur of background, lycra gear, endurance sport.',
    imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'sprt-6',
    category: 'Olahraga',
    title: 'Boxing Ring',
    prompt: 'Boxer in corner of ring, sweating, gloves up, moody lighting, smoke, intensity.',
    imageUrl: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'sprt-7',
    category: 'Olahraga',
    title: 'Tennis Serve',
    prompt: 'Tennis player serving, ball tossed high, blue clay court, sunny day, focus and precision.',
    imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'sprt-8',
    category: 'Olahraga',
    title: 'Swimming Pool',
    prompt: 'Swimmer taking a breath doing freestyle, water splash, lane ropes, underwater split shot.',
    imageUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=600&auto=format&fit=crop'
  },

  // --- GADGET (8 Items) ---
  {
    id: 'gad-1',
    category: 'Gadget',
    title: 'Desk Setup Clean',
    prompt: 'Minimalist desk setup, aluminum laptop, mechanical keyboard, succulent, screen bar light, dark grey wall, productive.',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'gad-2',
    category: 'Gadget',
    title: 'Teardown View',
    prompt: 'Smartphone components knolling photography, arranged neatly on cutting mat, tech engineering.',
    imageUrl: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'gad-3',
    category: 'Gadget',
    title: 'Gaming RGB',
    prompt: 'Gaming PC setup with RGB lights, keyboard, mouse, headphones, dark room, cyber atmosphere.',
    imageUrl: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'gad-4',
    category: 'Gadget',
    title: 'Camera Lens',
    prompt: 'Close up of camera lens glass, reflection of lights, aperture blades visible, professional photography gear.',
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'gad-5',
    category: 'Gadget',
    title: 'Smart Home',
    prompt: 'Smart speaker on living room table, modern home background, voice assistant concept.',
    imageUrl: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'gad-6',
    category: 'Gadget',
    title: 'VR Headset',
    prompt: 'Person wearing VR headset, reaching out to virtual world, neon lighting, futuristic technology.',
    imageUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269fb1bd?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'gad-7',
    category: 'Gadget',
    title: 'Drone Flying',
    prompt: 'Drone hovering in air, camera facing forward, blurred landscape background, aerial photography.',
    imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'gad-8',
    category: 'Gadget',
    title: 'Headphones Vibe',
    prompt: 'High end headphones resting on a vinyl record player, warm vintage feel, music lover.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop'
  },

  // --- BISNIS (8 Items) ---
  {
    id: 'biz-1',
    category: 'Bisnis',
    title: 'Modern Meeting',
    prompt: 'Business meeting in glass conference room, skyscrapers view, professional people, corporate blue tones.',
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'biz-2',
    category: 'Bisnis',
    title: 'Handshake Deal',
    prompt: 'Close up of business handshake, suits, blurred office lobby background, trust and success.',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'biz-3',
    category: 'Bisnis',
    title: 'CEO Portrait',
    prompt: 'Portrait of CEO standing in front of office window, arms crossed, confident, city skyline, leadership.',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'biz-4',
    category: 'Bisnis',
    title: 'Coworking Space',
    prompt: 'Busy coworking space, young professionals working on laptops, coffee, open plan office, startup vibe.',
    imageUrl: 'https://images.unsplash.com/photo-1497366811353-33a378d65793?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'biz-5',
    category: 'Bisnis',
    title: 'Signing Contract',
    prompt: 'Pen signing a document, focus on the nib, blurred hand, wooden desk, legal agreement.',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'biz-6',
    category: 'Bisnis',
    title: 'Presentation',
    prompt: 'Person presenting at whiteboard, blurred audience, charts and graphs, workshop seminar.',
    imageUrl: 'https://images.unsplash.com/photo-1544531696-93484532e701?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'biz-7',
    category: 'Bisnis',
    title: 'Laptop Coffee',
    prompt: 'Laptop open on cafe table, coffee cup, notebook, working remote, freelancer lifestyle.',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'biz-8',
    category: 'Bisnis',
    title: 'Architecture Blueprints',
    prompt: 'Architect reviewing blueprints, hard hat, construction site background, planning and development.',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop'
  },

  // --- ANAK & BAYI (8 Items) ---
  {
    id: 'kid-1',
    category: 'Anak & Bayi',
    title: 'Newborn Dream',
    prompt: 'Newborn baby sleeping in wicker basket, soft knit blanket, cotton flowers, pastel colors, dreamy soft lighting.',
    imageUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'kid-2',
    category: 'Anak & Bayi',
    title: 'Playful Bubble',
    prompt: 'Toddler laughing catching bubbles in park, golden hour backlight, happy expression, innocent.',
    imageUrl: 'https://images.unsplash.com/photo-1519331379826-fda8feb021d5?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'kid-3',
    category: 'Anak & Bayi',
    title: 'Reading Book',
    prompt: 'Child reading a magical glowing book under blanket fort, face illuminated by book light, wonder and fantasy.',
    imageUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'kid-4',
    category: 'Anak & Bayi',
    title: 'Messy Eating',
    prompt: 'Baby eating cake with hands, messy face, birthday party, colorful balloons background, cute and funny.',
    imageUrl: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'kid-5',
    category: 'Anak & Bayi',
    title: 'Raincoat Splash',
    prompt: 'Child in yellow raincoat jumping in puddle, water splash, grey rainy day but bright subject.',
    imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'kid-6',
    category: 'Anak & Bayi',
    title: 'Toy Car',
    prompt: 'Kid playing with toy car on floor, low angle shot, blurred living room background, focus on play.',
    imageUrl: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'kid-7',
    category: 'Anak & Bayi',
    title: 'Mother Love',
    prompt: 'Mother holding baby close, natural window light, black and white photography, emotional connection.',
    imageUrl: 'https://images.unsplash.com/photo-1531983412531-1f49a365ffed?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'kid-8',
    category: 'Anak & Bayi',
    title: 'Flower Field',
    prompt: 'Little girl running in flower field, sun hat, white dress, summer vibe, nostalgic.',
    imageUrl: 'https://images.unsplash.com/photo-1520013573738-4e5a953b0362?q=80&w=600&auto=format&fit=crop'
  },

  // --- ALAM (8 Items) ---
  {
    id: 'nat-1',
    category: 'Alam',
    title: 'Misty Forest',
    prompt: 'Pine forest covered in thick fog, mysterious mood, tall trees, desaturated green tones.',
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'nat-2',
    category: 'Alam',
    title: 'Waterfall Long Exposure',
    prompt: 'Silky water flowing over rocks in waterfall, lush green moss, long exposure photography, serene.',
    imageUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'nat-3',
    category: 'Alam',
    title: 'Starry Milky Way',
    prompt: 'Milky way galaxy visible over silhouette of mountains, night sky photography, stars, cosmic.',
    imageUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'nat-4',
    category: 'Alam',
    title: 'Autumn Leaves',
    prompt: 'Close up of red and orange maple leaves, autumn forest background, bokeh, vibrant fall colors.',
    imageUrl: 'https://images.unsplash.com/photo-1507783548227-544c3b8bc216?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'nat-5',
    category: 'Alam',
    title: 'Desert Dunes',
    prompt: 'Sand dunes patterns in desert, golden hour light creating textures, minimalist landscape.',
    imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'nat-6',
    category: 'Alam',
    title: 'Ocean Wave',
    prompt: 'Crashing ocean wave, turquoise water, white foam, power of nature, seascape.',
    imageUrl: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'nat-7',
    category: 'Alam',
    title: 'Macro Flower',
    prompt: 'Macro shot of flower petals, dew drops, soft pastel colors, delicate nature detail.',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-58cb75069ed6?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'nat-8',
    category: 'Alam',
    title: 'Snowy Peak',
    prompt: 'Snow capped mountain peak against blue sky, cold winter day, majestic alpine landscape.',
    imageUrl: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=600&auto=format&fit=crop'
  }
];

const CATEGORIES = [
  { id: 'All', label: 'All', icon: LayoutGrid },
  { id: 'Portrait', label: 'Portrait', icon: User },
  { id: 'Fashion', label: 'Fashion', icon: Shirt },
  { id: 'Kosmetik', label: 'Kosmetik', icon: Palette },
  { id: 'Parfum', label: 'Parfum', icon: Gem },
  { id: 'Produk Umum', label: 'Produk', icon: Package },
  { id: 'Makanan', label: 'Makanan', icon: Coffee }, 
  { id: 'Minuman', label: 'Minuman', icon: Coffee },
  { id: 'Kerajinan', label: 'Kerajinan', icon: Scissors },
  { id: 'Aksesoris', label: 'Aksesoris', icon: Watch },
  { id: 'Sepatu', label: 'Sepatu', icon: Footprints },
  { id: 'Kesehatan', label: 'Kesehatan', icon: Leaf },
  { id: 'Pre-wedding', label: 'Pre-wedding', icon: HeartHandshake },
  { id: 'Travel', label: 'Travel', icon: Plane },
  { id: 'Olahraga', label: 'Olahraga', icon: Dumbbell },
  { id: 'Gadget', label: 'Gadget', icon: Smartphone },
  { id: 'Bisnis', label: 'Bisnis', icon: Briefcase },
  { id: 'Otomotif', label: 'Otomotif', icon: Car },
  { id: 'Interior', label: 'Interior', icon: Armchair },
  { id: 'Anak & Bayi', label: 'Kids', icon: Smile },
  { id: 'Alam', label: 'Alam', icon: Mountain },
];

export const PromptLibrary: React.FC<PromptLibraryProps> = ({ onSelectPrompt }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [imgErrorIds, setImgErrorIds] = useState<Set<string>>(new Set());

  const filteredPrompts = selectedCategory === 'All' 
    ? PROMPTS 
    : PROMPTS.filter(p => p.category === selectedCategory);

  const handleUsePrompt = (prompt: string, id: string) => {
    onSelectPrompt(prompt);
    setCopiedId(id);
    setTimeout(() => {
        setCopiedId(null);
        setIsOpen(false);
    }, 800);
  };

  const handleCopyOnly = (e: React.MouseEvent, prompt: string, id: string) => {
      e.stopPropagation();
      navigator.clipboard.writeText(prompt);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
  };

  const handleImageError = (id: string) => {
    setImgErrorIds(prev => new Set(prev).add(id));
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[60] p-3 sm:p-4 rounded-full transition-all duration-300 transform hover:scale-110 group backdrop-blur-md border shadow-[0_0_30px_rgba(0,0,0,0.5)] active:scale-95
            ${isOpen 
                ? 'bg-red-500/20 text-red-400 border-red-500/30 rotate-90' 
                : 'bg-[#0f0f16]/80 border-white/10 text-cyan-400 hover:text-white hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]'
            }
        `}
      >
        {isOpen ? <X className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
        {!isOpen && (
             <span className="hidden sm:block absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/10 backdrop-blur-md font-medium tracking-wide">
                Gudang Prompt
            </span>
        )}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 animate-fade-in">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsOpen(false)} />
          <div className="relative w-full sm:max-w-6xl h-[100dvh] sm:h-[90vh] bg-[#05050a] sm:bg-[#05050a]/90 sm:border border-white/10 rounded-none sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slide-up sm:backdrop-blur-xl">
            
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#0f0f16]/50 shrink-0">
              <div className="flex-1 min-w-0 pr-4">
                <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3 text-white tracking-tight truncate">
                  <span className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 shrink-0">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                  </span>
                  <span className="truncate">
                    Gudang <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Premium</span>
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2 font-light truncate">
                  {PROMPTS.length} prompt profesional ("Banana 3 Pro" Style)
                </p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors border border-transparent hover:border-white/10">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-full sm:w-64 bg-[#0a0a0f]/80 sm:bg-[#0a0a0f]/50 border-b sm:border-b-0 sm:border-r border-white/5 flex flex-row sm:flex-col overflow-x-auto sm:overflow-y-auto shrink-0 z-20 backdrop-blur-md sticky top-0 sm:static custom-scrollbar">
                    <div className="flex sm:flex-col p-3 sm:p-2 space-x-2 sm:space-x-0 sm:space-y-1 min-w-max">
                        {CATEGORIES.map(cat => {
                            const Icon = cat.icon;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`flex items-center gap-2 sm:gap-3 px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-all rounded-full sm:rounded-lg whitespace-nowrap group relative overflow-hidden
                                        ${selectedCategory === cat.id 
                                            ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                                            : 'bg-white/5 sm:bg-transparent text-gray-400 hover:text-gray-200 border border-transparent hover:bg-white/5'
                                        }
                                    `}
                                >
                                    <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${selectedCategory === cat.id ? 'text-cyan-400' : 'text-gray-500 group-hover:text-gray-400'}`} />
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#050505] sm:bg-[#050505]/50 custom-scrollbar scroll-smooth">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-20 sm:pb-0">
                        {filteredPrompts.map((item) => (
                            <div key={item.id} className="group bg-[#0f0f16] sm:bg-[#0f0f16]/60 border border-white/10 sm:border-white/5 rounded-xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] sm:hover:-translate-y-1 flex flex-col relative active:scale-[0.99] sm:active:scale-100">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                                {/* Image with Fallback */}
                                <div className="h-40 sm:h-48 overflow-hidden relative bg-gray-900">
                                    {imgErrorIds.has(item.id) ? (
                                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-gray-500">
                                            <ImageOff className="w-8 h-8 mb-2 opacity-50" />
                                            <span className="text-xs">Preview unavailable</span>
                                        </div>
                                    ) : (
                                        <img 
                                            src={item.imageUrl} 
                                            alt={item.title} 
                                            onError={() => handleImageError(item.id)}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                            loading="lazy"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f16] to-transparent opacity-60"></div>
                                    <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-white font-medium border border-white/10 shadow-lg tracking-wide uppercase">
                                        {item.category}
                                    </div>
                                </div>

                                <div className="p-4 sm:p-5 flex flex-col flex-1 relative z-10">
                                    <h3 className="font-bold text-base sm:text-lg text-white mb-2 sm:mb-3 group-hover:text-cyan-300 transition-colors">{item.title}</h3>
                                    <div className="bg-[#05050a] sm:bg-[#05050a]/80 p-3 rounded-lg border border-white/5 mb-4 sm:mb-5 flex-1 group/text relative overflow-hidden">
                                        <p className="text-xs text-gray-400 leading-relaxed font-light italic line-clamp-4">
                                            "{item.prompt}"
                                        </p>
                                    </div>
                                    <div className="flex gap-2 sm:gap-3 mt-auto">
                                        <button
                                            onClick={(e) => handleCopyOnly(e, item.prompt, item.id)}
                                            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/5 transition-all active:scale-95 touch-manipulation"
                                            title="Salin Teks Saja"
                                        >
                                            {copiedId === item.id ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                                        </button>
                                        <button
                                            onClick={() => handleUsePrompt(item.prompt, item.id)}
                                            className="flex-1 py-2.5 px-3 sm:px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-lg border backdrop-blur-sm
                                            bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border-cyan-500/30 text-cyan-300 
                                            hover:text-white hover:border-cyan-500/60 hover:from-cyan-500/20 hover:via-blue-500/20 hover:to-purple-500/20"
                                        >
                                            Pakai Prompt <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
