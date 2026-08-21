import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Eye, Users, Heart, ShoppingBag, ArrowRight, X } from 'lucide-react';
import { GALLERY_ITEMS, getWhatsAppOrderUrl } from '../data/cateringData';
import { GalleryItem, GalleryCategory } from '../types';

interface GalleryProps {
  onSelectItem: (item: GalleryItem) => void;
  onOrderNow?: (cakeTitle: string, cakePrice?: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onSelectItem, onOrderNow }) => {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: GalleryCategory; label: string; count: number }[] = useMemo(() => {
    return [
      { id: 'all', label: 'All Creations', count: GALLERY_ITEMS.length },
      { id: 'birthday', label: 'Birthday Cakes', count: GALLERY_ITEMS.filter((i) => i.category === 'birthday').length },
      { id: 'wedding', label: 'Wedding Cakes', count: GALLERY_ITEMS.filter((i) => i.category === 'wedding').length },
      { id: 'hampers', label: 'Luxury Hampers', count: GALLERY_ITEMS.filter((i) => i.category === 'hampers').length },
      { id: 'cupcakes_pastries', label: 'Cupcakes & Pâtisserie', count: GALLERY_ITEMS.filter((i) => i.category === 'cupcakes_pastries').length },
      { id: 'cheesecakes_tarts', label: 'Tarts & Cheesecakes', count: GALLERY_ITEMS.filter((i) => i.category === 'cheesecakes_tarts').length },
      { id: 'dessert_tables', label: 'Dessert Tables', count: GALLERY_ITEMS.filter((i) => i.category === 'dessert_tables').length },
    ];
  }, []);

  const filteredItems = useMemo(() => {
    return GALLERY_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.flavorProfile.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.price.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#faf7f2] dark:bg-[#050505] relative transition-colors duration-300">
      <div id="products" className="sr-only" />
      <div id="cakes-hampers" className="sr-only" />
      <div id="menu-hampers" className="sr-only" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center text-[11px] font-bold uppercase tracking-[0.3em] text-[#8a6520] dark:text-[#c9a86a] mb-3">
              <span>Available Cakes & Hampers</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1f1b16] dark:text-[#f5f2ed] tracking-tight">
              Our Products & Pricing
            </h2>
            <p className="text-sm sm:text-base text-[#6b6155] dark:text-white/65 max-w-xl mt-2 font-light">
              Transparent Nigerian Naira pricing on all our handcrafted cakes, celebration showstoppers, and artisanal hampers. Click <strong className="text-[#8a6520] dark:text-[#c9a86a]">Order Now</strong> on any item to reserve your date.
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8a6520] dark:text-[#c9a86a] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cake name, flavor, or price..."
              className="w-full pl-10 pr-9 py-2.5 bg-white dark:bg-[#141414] rounded-full border border-[#c9a86a]/30 focus:outline-hidden focus:border-[#c9a86a] text-xs sm:text-sm text-[#1f1b16] dark:text-[#f5f2ed] placeholder:text-[#8a8075] dark:placeholder:text-white/40 shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#c9a86a] text-[#050505] shadow-[0_0_15px_rgba(201,168,106,0.3)] font-bold'
                    : 'bg-white dark:bg-[#121110] hover:bg-[#f3ede2] dark:hover:bg-[#1c1b18] text-[#4a433d] dark:text-white/70 border border-[#c9a86a]/25 dark:border-[#c9a86a]/20 hover:border-[#c9a86a]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    isSelected ? 'bg-[#050505] text-[#c9a86a]' : 'bg-[#f0ebe1] dark:bg-[#1c1b18] text-[#3d3731] dark:text-white/70'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white dark:bg-[#121110] rounded-3xl p-12 text-center border border-[#c9a86a]/30 max-w-lg mx-auto shadow-md">
            <p className="font-serif text-xl font-bold text-[#1f1b16] dark:text-[#f5f2ed] mb-2">No matching cakes found</p>
            <p className="text-sm text-[#6b6155] dark:text-white/60 mb-4 font-light">Try searching for a different keyword or resetting your filter.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-6 py-2.5 rounded-full bg-[#c9a86a] text-[#050505] text-xs uppercase tracking-wider font-bold cursor-pointer"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  className="bg-white dark:bg-[#121110] rounded-3xl overflow-hidden shadow-lg dark:shadow-2xl border border-[#c9a86a]/30 hover:border-[#c9a86a] transition-all duration-300 flex flex-col group"
                >
                  {/* Product Photo with zoom option */}
                  <div
                    className="relative aspect-[4/3] w-full overflow-hidden bg-[#ebe6dd] dark:bg-[#1a1a1a] cursor-pointer"
                    onClick={() => onSelectItem(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                    />

                    {/* Category Label */}
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-[#c9a86a] px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border border-[#c9a86a]/30">
                      {item.categoryLabel}
                    </div>

                    {/* Servings badge */}
                    <div className="absolute top-3 right-3 bg-[#c9a86a] text-[#050505] px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#050505]" />
                      <span>{item.servings.split(' ')[0]} guests</span>
                    </div>

                    {/* Hover Inspect Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <span className="bg-black/80 text-[#f5f2ed] border border-[#c9a86a]/50 px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-xs flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-[#c9a86a]" />
                        <span>View Photo Details</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Price in Nigerian Naira (Explicitly Displayed) */}
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xl sm:text-2xl font-bold text-[#8a6520] dark:text-[#c9a86a] font-serif tracking-tight">
                          {item.price}
                        </span>
                        {item.highlight && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#c9a86a]/15 text-[#8a6520] dark:text-[#c9a86a] px-2.5 py-0.5 rounded-full border border-[#c9a86a]/30">
                            {item.highlight}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3
                        onClick={() => onSelectItem(item)}
                        className="font-serif text-lg sm:text-xl font-bold text-[#1f1b16] dark:text-[#f5f2ed] group-hover:text-[#8a6520] dark:group-hover:text-[#c9a86a] transition-colors cursor-pointer leading-snug mb-1"
                      >
                        {item.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-xs text-[#6b6155] dark:text-white/60 font-normal mb-3 line-clamp-1">
                        {item.subtitle}
                      </p>

                      {/* Flavor Peek */}
                      <div className="bg-[#faf7f2] dark:bg-[#181818] rounded-xl p-2.5 border border-[#c9a86a]/20 mb-4">
                        <div className="text-[10px] uppercase tracking-wider font-bold text-[#8a6520] dark:text-[#c9a86a] flex items-center gap-1 mb-0.5">
                          <Heart className="w-3 h-3" /> Flavor Profile:
                        </div>
                        <p className="text-[11px] text-[#1f1b16] dark:text-white/85 font-medium line-clamp-1">
                          {item.flavorProfile}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action: Clear, Prominent "Order Now" Button linking directly to WhatsApp */}
                    <div className="pt-3 border-t border-[#c9a86a]/20 flex items-center gap-2">
                      <a
                        href={getWhatsAppOrderUrl(item.title, item.price)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-[#c9a86a] hover:bg-[#dfbe7f] text-[#050505] py-2.5 px-4 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(201,168,106,0.25)] transition-all cursor-pointer"
                        title={`Order ${item.title} on WhatsApp`}
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#050505]" />
                        <span>Order Now</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#050505]" />
                      </a>

                      <button
                        type="button"
                        onClick={() => onSelectItem(item)}
                        className="p-2.5 rounded-full border border-[#c9a86a]/30 hover:bg-[#c9a86a]/15 text-[#1f1b16] dark:text-[#f5f2ed] transition-colors cursor-pointer"
                        title="View details"
                        aria-label="View details"
                      >
                        <Eye className="w-4 h-4 text-[#8a6520] dark:text-[#c9a86a]" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};
