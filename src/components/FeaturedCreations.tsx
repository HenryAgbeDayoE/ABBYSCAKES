import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Heart, ArrowRight, Check, Eye, ShoppingBag } from 'lucide-react';
import { GALLERY_ITEMS, getWhatsAppOrderUrl } from '../data/cateringData';
import { GalleryItem } from '../types';

interface FeaturedCreationsProps {
  onSelectItem: (item: GalleryItem) => void;
  onOrderNow?: (cakeTitle: string, cakePrice?: string) => void;
}

export const FeaturedCreations: React.FC<FeaturedCreationsProps> = ({ onSelectItem, onOrderNow }) => {
  const featuredList = GALLERY_ITEMS.filter((item) => item.featured);
  const [activeTab, setActiveTab] = useState<string>(featuredList[0]?.id || 'item-1');

  const selectedItem = featuredList.find((item) => item.id === activeTab) || featuredList[0];

  return (
    <section id="featured" className="py-16 md:py-24 bg-white dark:bg-[#050505] border-y border-[#c9a86a]/20 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center text-[11px] font-bold uppercase tracking-[0.3em] text-[#8a6520] dark:text-[#c9a86a] mb-3">
            <span>Signature Showcase</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1f1b16] dark:text-[#f5f2ed] tracking-tight mb-4">
            Chef Abby's Featured Creations
          </h2>
          <p className="text-sm sm:text-base text-[#6b6155] dark:text-white/65 leading-relaxed font-light">
            Handcrafted with culinary mastery and luxury finishes. Select a signature piece below to view details and order directly.
          </p>
        </div>

        {/* Featured Tab Selector */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10">
          {featuredList.map((item) => {
            const isSelected = item.id === activeTab;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`px-4 sm:px-6 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#c9a86a] text-[#050505] shadow-lg shadow-[#c9a86a]/20 scale-102 font-bold'
                    : 'bg-[#f5f0e6] dark:bg-[#121110] hover:bg-[#eae3d5] dark:hover:bg-[#1c1b18] text-[#3d3731] dark:text-white/75 border border-[#c9a86a]/25 dark:border-[#c9a86a]/20 hover:border-[#c9a86a]'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#050505]' : 'bg-[#c9a86a]'}`} />
                <span>{item.categoryLabel} ({item.price})</span>
              </button>
            );
          })}
        </div>

        {/* Active Feature Display Card */}
        <AnimatePresence mode="wait">
          {selectedItem && (
            <motion.div
              key={selectedItem.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-[#121110] rounded-2xl sm:rounded-3xl shadow-xl dark:shadow-2xl border border-[#c9a86a]/30 overflow-hidden grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Left Column: Image with Quick Zoom */}
              <div className="lg:col-span-6 relative bg-[#ebe6dd] dark:bg-[#0a0a0a] min-h-[360px] sm:min-h-[460px] overflow-hidden group">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Floating Price Tag */}
                <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md text-[#c9a86a] px-4 py-2 rounded-full text-sm font-bold tracking-wider flex items-center gap-1.5 border border-[#c9a86a]/40 shadow-lg font-serif">
                  <span>{selectedItem.price}</span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectItem(selectedItem)}
                  className="absolute bottom-4 right-4 bg-black/85 hover:bg-black text-[#f5f2ed] px-4 py-2 rounded-xl text-xs font-semibold shadow-xl backdrop-blur-md flex items-center gap-2 transition-colors border border-[#c9a86a]/40 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-[#c9a86a]" />
                  <span>Enlarge Photo</span>
                </button>
              </div>

              {/* Right Column: Narrative, Flavors & Action */}
              <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-b from-[#faf7f2] to-white dark:from-[#121110] dark:to-[#0a0a0a]">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8a6520] dark:text-[#c9a86a]">
                      {selectedItem.categoryLabel}
                    </span>
                    <span className="text-black/20 dark:text-white/20">•</span>
                    <span className="text-xs text-[#6b6155] dark:text-white/60 font-medium flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#8a6520] dark:text-[#c9a86a]" />
                      {selectedItem.servings}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1f1b16] dark:text-[#f5f2ed] mb-2 leading-snug">
                    {selectedItem.title}
                  </h3>

                  <div className="text-2xl font-bold text-[#8a6520] dark:text-[#c9a86a] font-serif mb-3">
                    {selectedItem.price}
                  </div>

                  <p className="text-sm text-[#6b6155] dark:text-white/70 leading-relaxed mb-6 font-light">
                    {selectedItem.description}
                  </p>

                  {/* Flavor Profile Callout */}
                  <div className="bg-[#faf7f2] dark:bg-[#181818] rounded-xl p-4 sm:p-5 border border-[#c9a86a]/20 mb-6">
                    <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8a6520] dark:text-[#c9a86a] mb-1.5 flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-[#8a6520] dark:text-[#c9a86a]" />
                      <span>Signature Flavor Profile:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#1f1b16] dark:text-[#f5f2ed] font-medium leading-relaxed">
                      {selectedItem.flavorProfile}
                    </p>
                  </div>

                  {/* Design Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedItem.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium bg-[#f5f0e6] dark:bg-[#181818] text-[#3d3731] dark:text-white/85 border border-[#c9a86a]/20"
                      >
                        <Check className="w-3 h-3 text-[#8a6520] dark:text-[#c9a86a]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Row */}
                <div className="pt-6 border-t border-[#c9a86a]/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => onSelectItem(selectedItem)}
                    className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#6b6155] dark:text-white/80 hover:text-[#8a6520] dark:hover:text-[#c9a86a] transition-colors cursor-pointer"
                  >
                    <span>View Specifications</span>
                    <ArrowRight className="w-4 h-4 text-[#8a6520] dark:text-[#c9a86a]" />
                  </button>

                  <a
                    href={getWhatsAppOrderUrl(selectedItem.title, selectedItem.price)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#c9a86a] hover:bg-[#dfbe7f] text-[#050505] px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(201,168,106,0.3)] transition-all duration-300 cursor-pointer"
                    title={`Order ${selectedItem.title} on WhatsApp`}
                  >
                    <ShoppingBag className="w-4 h-4 text-[#050505]" />
                    <span>Order Now ({selectedItem.price})</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
