
import React from 'react';
import { 
  HeartHandshake, 
  Utensils, 
  Coffee, 
  Shirt, 
  Car, 
  Mountain, 
  Package, 
  User, 
  Armchair,
  Sparkles,
  Leaf,
  Dumbbell,
  Plane,
  Smartphone,
  Briefcase,
  Smile,
  Palette,
  Gem,
  Scissors,
  Footprints,
  Watch,
  Lightbulb,
  Loader2
} from 'lucide-react';

export type CategoryId = 'prewedding' | 'food' | 'drink' | 'fashion' | 'vehicle' | 'landscape' | 'product' | 'portrait' | 'interior' | 'health' | 'sport' | 'travel' | 'gadget' | 'business' | 'kids' | 'cosmetic' | 'perfume' | 'craft' | 'accessory' | 'footwear' | 'general';

interface Category {
  id: CategoryId;
  label: string;
  icon: React.ElementType;
  description: string;
  aiHint: string;
  presets: string[];
}

export const CATEGORIES: Category[] = [
  { 
    id: 'portrait', 
    label: 'Portrait', 
    icon: User, 
    description: 'Wajah & Karakter',
    aiHint: 'Fokus pada ekspresi wajah, skin tone natural, bokeh background (depth of field), dan pencahayaan Rembrandt atau Butterfly lighting.',
    presets: [
        'Cinematic Portrait', 'Studio Headshot', 'Neon Cyberpunk', 'Vintage Analog', 
        'Double Exposure', 'Golden Hour Glow', 'Rembrandt Lighting', 'High Key BW', 
        'Low Key Dramatic', 'Editorial Fashion', 'Candid Street', 'Fantasy Character'
    ]
  },
  { 
    id: 'fashion', 
    label: 'Fashion', 
    icon: Shirt, 
    description: 'OOTD & Style',
    aiHint: 'Fokus pada detail tekstur kain, pose model yang dinamis, pencahayaan studio high-end, dan estetika editorial majalah.',
    presets: [
        'Streetwear Urban', 'High Fashion Editorial', 'Bohemian Chic', 'Minimalist Catalog', 
        'Y2K Aesthetic', 'Luxury Look', 'Vogue Cover Style', 'Runway Walk', 
        'Grunge 90s', 'Pastel Dream', 'Techwear Futuristic', 'Classic Elegant'
    ]
  },
  {
    id: 'cosmetic',
    label: 'Kosmetik',
    icon: Palette,
    description: 'Skincare & Makeup',
    aiHint: 'Tekankan tekstur produk (cream/liquid), pencahayaan softbox merata, nuansa bersih/higienis, dan elemen bahan alami (ingredients).',
    presets: [
        'Texture Smear', 'Water Splash Fresh', 'Pastel Minimalist', 'Luxury Gold', 
        'Ingredients Focus', 'Bathroom Shelfie', 'Sunlight Shadow', 'Floating Bottle', 
        'Mirror Reflection', 'Pink Girly Vibe', 'Clean Clinical', 'Tropical Summer'
    ]
  },
  {
    id: 'perfume',
    label: 'Parfum',
    icon: Gem,
    description: 'Wewangian',
    aiHint: 'Fokus pada refleksi kaca botol, efek backlight dramatis untuk menonjolkan cairan, elemen asap/uap untuk kesan aroma, dan bunga.',
    presets: [
        'Moody Dark Elegance', 'Floral Explosion', 'Fresh Water Ripple', 'Golden Hour Backlight', 
        'Glass Reflection', 'Smoke & Mystery', 'Citrus Freshness', 'Velvet Background', 
        'Minimalist Stone', 'Romantic Evening', 'Nature Wood', 'Ice Cold'
    ]
  },
  { 
    id: 'product', 
    label: 'Produk Umum', 
    icon: Package, 
    description: 'Iklan Komersial',
    aiHint: 'Background bersih tanpa gangguan, pencahayaan produk merata, bayangan natural, fokus tajam pada branding/logo.',
    presets: [
        'Podium 3D Render', 'Pastel Pop', 'Luxury Silk', 'Nature Elements', 
        'Hard Light Shadow', 'Floating Object', 'E-commerce White', 'Water Splash', 
        'Texture Background', 'Lifestyle Context', 'Neon Glow', 'Geometric Shapes'
    ]
  },
  { 
    id: 'food', 
    label: 'Makanan', 
    icon: Utensils, 
    description: 'Kuliner Lezat',
    aiHint: 'Tekankan tekstur makanan, uap panas, pencahayaan makro, warna yang menggugah selera, dan penataan plating artistik.',
    presets: [
        'Dark Moody', 'Bright Airy', 'Flat Lay Minimalist', 'Macro Detail', 
        'Warm Home Cooked', 'Restaurant Menu', 'Splash Art', 'Street Food Vibe', 
        'Picnic Outdoor', 'Fine Dining Luxury', 'Pastel Pop', 'Rustic Wooden Table'
    ]
  },
  { 
    id: 'drink', 
    label: 'Minuman', 
    icon: Coffee, 
    description: 'Coffee & Bar',
    aiHint: 'Tonjolkan kesegaran, tetesan air (condensation), refleksi gelas, dan pencahayaan dramatis atau backlighting.',
    presets: [
        'Icy Splash Motion', 'Cozy Coffee Shop', 'Elegant Cocktail', 'Neon Nightlife', 
        'Fresh Fruit Juice', 'Tea Ceremony', 'Pouring Action', 'Summer Beach Drink', 
        'Product Commercial', 'Steam Hot Drink', 'Barista Art', 'Minimalist Bottle'
    ]
  },
  {
    id: 'craft',
    label: 'Kerajinan',
    icon: Scissors,
    description: 'Handmade & Kriya',
    aiHint: 'Tampilkan detail tekstur material (kayu, rotan, kain), nuansa earthy tone hangat, dan kesan "buatan tangan" yang otentik.',
    presets: [
        'Rustic Wood Background', 'Boho Chic Style', 'Workshop Vibes', 'Hands Working', 
        'Natural Sunlight', 'Earthy Tones', 'Cultural Batik/Tenun', 'Detail Macro', 
        'Vintage Aesthetic', 'Picnic Setup', 'Cozy Home Decor', 'White Gallery'
    ]
  },
  {
    id: 'accessory',
    label: 'Aksesoris',
    icon: Watch,
    description: 'Perhiasan & Jam',
    aiHint: 'Gunakan lensa makro untuk detail, kilauan cahaya (sparkle), background gelap (velvet/kulit) untuk kemewahan, atau marmer.',
    presets: [
        'Macro Sparkle', 'Velvet Luxury Box', 'Model Wearing', 'Marble Surface', 
        'Dark Moody Jewel', 'Sunlight Shadow', 'Silk Fabric', 'Mirror Reflection', 
        'Minimalist Studio', 'Golden Hour', 'Geometric Props', 'Bridal White'
    ]
  },
  {
    id: 'footwear',
    label: 'Sepatu',
    icon: Footprints,
    description: 'Sneakers & Sandal',
    aiHint: 'Sudut pandang sejajar tanah (eye-level) atau melayang, efek gerak (walking/running), dan background urban atau abstrak.',
    presets: [
        'Floating Sneaker', 'Urban Street Style', 'Dynamic Running', 'Clean White Studio', 
        'Rough Concrete', 'Leg Model Shot', 'Neon Cyberpunk', 'Box Unboxing', 
        'Sports Gym', 'Beach Sandal Vibe', 'Stairs Perspective', 'Graffiti Background'
    ]
  },
  { 
    id: 'health', 
    label: 'Kesehatan', 
    icon: Leaf, 
    description: 'Herbal & Medis',
    aiHint: 'Gunakan nuansa alam (hijau/bumi) untuk herbal atau putih bersih untuk medis. Tampilkan kemurnian bahan dan pencahayaan natural.',
    presets: [
        'Natural Organic', 'Clinical Clean', 'Zen Wellness', 'Traditional Herbal', 
        'Spa & Relaxation', 'Modern Supplement', 'Fresh Ingredients', 'Yoga Studio', 
        'Morning Vitality', 'Eco Friendly', 'Apothecary Vintage', 'Lab Science'
    ]
  },
  { 
    id: 'prewedding', 
    label: 'Pre-wedding', 
    icon: HeartHandshake, 
    description: 'Romantis & Couple',
    aiHint: 'Tangkap chemistry pasangan, pencahayaan lembut (soft light), nuansa dreamy, dan komposisi emosional yang intim.',
    presets: [
        'Rustic Outdoor', 'Korean Studio Soft', 'Elegant Black & White', 'Fairytale Fantasy', 
        'Casual Date Vibe', 'Sunset Silhouette', 'Vintage Romance', 'Boho Beach', 
        'Garden Party', 'Cinematic Movie Scene', 'Intimate Indoor', 'Royal Luxury'
    ]
  },
  { 
    id: 'travel', 
    label: 'Travel', 
    icon: Plane, 
    description: 'Liburan & Wisata',
    aiHint: 'Gunakan sudut pandang lebar (wide angle), warna vibrant yang hidup, ceritakan suasana lokasi, dan gaya "Wanderlust".',
    presets: [
        'Influencer Aesthetic', 'Tropical Paradise', 'Urban Explorer', 'Cinematic Vlog', 
        'Vintage Film Travel', 'Drone View', 'Mountain Adventure', 'City Lights Night', 
        'Cultural Heritage', 'Roadtrip Vibes', 'Snowy Winter', 'Desert Safari'
    ]
  },
  { 
    id: 'sport', 
    label: 'Olahraga', 
    icon: Dumbbell, 
    description: 'Aksi & Fitnes',
    aiHint: 'Tampilkan energi, detail otot/keringat, efek motion blur untuk kecepatan, dan pencahayaan kontras tinggi (dramatis).',
    presets: [
        'Gym Dark Mode', 'High Energy Action', 'Stadium Lights', 'Outdoor Fitness', 
        'Nike Style Ad', 'Yoga Silhouette', 'Marathon Runner', 'Crossfit Gritty', 
        'Water Sports Splash', 'Extreme Sports', 'Team Spirit', 'Locker Room'
    ]
  },
  { 
    id: 'gadget', 
    label: 'Gadget', 
    icon: Smartphone, 
    description: 'Tech & Device',
    aiHint: 'Tampilan futuristik, permukaan reflektif, lampu neon atau RGB, dan setup meja yang bersih (clean desk setup).',
    presets: [
        'Apple Minimalist', 'Cyberpunk Tech', 'RGB Gaming Setup', 'Sleek Futuristic', 
        'Unboxing Review', 'Floating Device', 'Blueprint Wireframe', 'Matte Black', 
        'Exploded View', 'Desk Setup Cozy', 'Neon City Background', 'Macro Lens'
    ]
  },
  { 
    id: 'business', 
    label: 'Bisnis', 
    icon: Briefcase, 
    description: 'Korporat & Pro',
    aiHint: 'Gaya formal, background kantor modern yang blur, pakaian rapi, percaya diri, dan pencahayaan terpercaya (trustworthy).',
    presets: [
        'LinkedIn Professional', 'Modern Office', 'Keynote Speaker', 'Corporate Team', 
        'Minimalist Branding', 'Studio Grey', 'Handshake Deal', 'Startup Workspace', 
        'Executive Portrait', 'Conference Room', 'Working from Home', 'Financial District'
    ]
  },
  { 
    id: 'vehicle', 
    label: 'Otomotif', 
    icon: Car, 
    description: 'Mobil & Motor',
    aiHint: 'Sudut pandang rendah (low angle), refleksi pada body kendaraan, efek kecepatan (panning), atau suasana showroom mewah.',
    presets: [
        'Rolling Shot', 'Luxury Showroom', 'Off-road Muddy', 'Cyberpunk City Night', 
        'Sunset Drift', 'Classic Vintage', 'Detail Macro', 'Garage Underground', 
        'Racing Track', 'Desert Roadtrip', 'Rainy Reflection', 'Studio Lighting'
    ]
  },
  { 
      id: 'interior',
      label: 'Interior',
      icon: Armchair,
      description: 'Arsitektur',
      aiHint: 'Garis vertikal tegak lurus, pencahayaan ruangan (ambient), harmoni warna, dan suasana yang "homey" atau mewah.',
      presets: [
        'Scandi Minimalist', 'Industrial Loft', 'Luxury Hotel', 'Warm Cozy Living', 
        'Tropical Villa', 'Modern Kitchen', 'Mid-Century Modern', 'Bohemian Decor', 
        'Dark Academia', 'Bright Sunroom', 'Japandi Style', 'Art Deco'
      ]
  },
  {
      id: 'kids',
      label: 'Anak & Bayi',
      icon: Smile,
      description: 'Ceria & Lucu',
      aiHint: 'Warna-warna pastel lembut, pencahayaan terang (high key), properti lucu, dan ekspresi bahagia yang natural.',
      presets: [
        'Newborn Soft', 'Playful Pastel', 'Birthday Bash', 'Dreamy Fairy', 
        'Bright Studio', 'Outdoor Fun', 'Toy Story Vibe', 'School Days', 
        'Family Bond', 'Bubble Bath', 'Watercolor Art', 'Cartoon Style'
      ]
  },
  { 
    id: 'landscape', 
    label: 'Alam', 
    icon: Mountain, 
    description: 'Pemandangan',
    aiHint: 'Golden hour, rule of thirds, detail tekstur alam, dan kedalaman visual (depth) yang megah.',
    presets: [
        'Dramatic Sunset', 'Misty Morning', 'Fantasy World', 'National Geographic', 
        'Moody Forest', 'Aerial View', 'Starry Night', 'Autumn Colors', 
        'Waterfall Motion', 'Beach Paradise', 'Desert Dunes', 'Snow Peak'
    ]
  }
];

interface CategorySelectorProps {
  selectedCategory: CategoryId;
  onSelect: (id: CategoryId) => void;
  onPresetSelect: (preset: string, category: Category) => void;
  onGenerateConcept?: (categoryId: CategoryId) => void;
  isGeneratingConcept?: boolean;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({ 
    selectedCategory, 
    onSelect, 
    onPresetSelect, 
    onGenerateConcept, 
    isGeneratingConcept 
}) => {
  const activeCategory = CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <div className="space-y-5">
      {/* Main Category Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
        {CATEGORIES.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => onSelect(category.id)}
              className={`relative group p-3 rounded-xl border text-left transition-all duration-300 overflow-hidden min-h-[80px]
                ${isSelected 
                  ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                  : 'bg-[#05050a] border-white/10 hover:border-white/20 hover:bg-white/5'
                }
              `}
            >
              {/* Active Indicator */}
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 animate-pulse" />
              )}

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-start justify-between w-full mb-2">
                    <div className={`p-1.5 rounded-lg transition-colors duration-300
                    ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/5 text-gray-400 group-hover:text-gray-200'}
                    `}>
                    <Icon className="w-4 h-4" />
                    </div>
                </div>
                
                <div>
                  <p className={`text-sm font-semibold transition-colors truncate
                    ${isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'}
                  `}>
                    {category.label}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5 leading-tight truncate">
                    {category.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Preset/Sub-category Chips */}
      {activeCategory && (
        <div className="animate-fade-in bg-[#05050a]/50 p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-200/90 font-medium">Rekomendasi Gaya <span className="text-white">{activeCategory.label}</span>:</span>
            </div>
            <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto custom-scrollbar items-center">
                
                {/* AI Concept Generator Button */}
                {onGenerateConcept && (
                    <button
                        onClick={() => onGenerateConcept(activeCategory.id)}
                        disabled={isGeneratingConcept}
                        className={`
                            flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg border transition-all duration-300 shadow-lg
                            ${isGeneratingConcept 
                                ? 'bg-white/5 border-white/10 text-gray-500 cursor-not-allowed'
                                : 'bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-500/60 hover:from-cyan-500/20 hover:via-blue-500/20 hover:to-purple-500/20 shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transform hover:-translate-y-0.5'
                            }
                        `}
                    >
                        {isGeneratingConcept ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                            <Lightbulb className="w-3 h-3" />
                        )}
                        {isGeneratingConcept ? 'Berpikir...' : '✨ Ide Konsep AI (Acak)'}
                    </button>
                )}

                {/* Separator */}
                <div className="w-px h-6 bg-white/10 mx-1"></div>

                {/* Static Presets */}
                {activeCategory.presets.map((preset) => (
                    <button
                        key={preset}
                        onClick={() => onPresetSelect(preset, activeCategory)}
                        className="px-3 py-2 text-xs font-medium rounded-lg bg-white/5 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 border border-white/10 hover:border-cyan-500/50 text-gray-300 hover:text-white transition-all duration-200 hover:shadow-[0_0_10px_rgba(6,182,212,0.2)] active:scale-95 whitespace-nowrap"
                    >
                        {preset}
                    </button>
                ))}
            </div>
            <div className="mt-3 pt-3 border-t border-white/5 flex gap-2 items-start">
                 <div className="bg-blue-500/10 p-1 rounded mt-0.5">
                    <Sparkles className="w-3 h-3 text-blue-400" />
                 </div>
                 <p className="text-xs text-gray-400 leading-relaxed">
                    <span className="text-blue-300 font-semibold">Saran AI:</span> {activeCategory.aiHint}
                 </p>
            </div>
        </div>
      )}
    </div>
  );
};
