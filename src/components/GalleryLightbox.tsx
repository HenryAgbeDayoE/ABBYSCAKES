import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Users, Heart, Check, ArrowRight, ShoppingBag } from 'lucide-react';
import { GalleryItem } from '../types';
import { getWhatsAppOrderUrl } from '../data/cateringData';

interface GalleryLightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
  onOrderNow?: (cakeTitle: string, cakePrice?: string) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({ item, onClose, onOrderNow }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-5xl bg-white dark:bg-[#121110] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-[#c9a86a]/40 z-10 max-h-[90vh] flex flex-col lg:flex-row transition-colors duration-300"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 dark:bg-[#181818] hover:bg-gray-100 dark:hover:bg-[#252525] text-[#1f1b16] dark:text-white flex items-center justify-center shadow-lg transition-colors border border-[#c9a86a]/30 cursor-pointer"
              aria-label="Close high-res lightbox"
            >
              <X className="w-5 h-5 text-[#1f1b16] dark:text-[#f5f2ed]" />
            </button>

            {/* Left High-Res Image Column */}
            <div className="lg:w-7/12 bg-[#050505] relative min-h-[300px] sm:min-h-[400px] lg:min-h-full flex items-center justify-center p-4">
              <img
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain max-h-[60vh] lg:max-h-[80vh] rounded-lg"
              />

              <div className="absolute bottom-4 left-4 bg-black/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center border border-[#c9a86a]/30">
                <span className="text-[11px] uppercase tracking-wider text-[#f5f2ed]">High-Resolution Studio Photo</span>
              </div>
            </div>

            {/* Right Details Column */}
            <div className="lg:w-5/12 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between bg-gradient-to-b from-[#faf7f2] to-white dark:from-[#141414] dark:to-[#0d0c0b]">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8a6520] dark:text-[#c9a86a] px-3 py-1 rounded-full bg-[#f0ebe1] dark:bg-[#1c1b18] border border-[#c9a86a]/40 shadow-xs">
                    {item.categoryLabel}
                  </span>
                  <span className="text-black/20 dark:text-white/20">•</span>
                  <span className="text-xs text-[#4a433d] dark:text-white/70 font-semibold flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#8a6520] dark:text-[#c9a86a]" />
                    {item.servings}
                  </span>
                </div>

                {/* Explicit Price in Nigerian Naira */}
                <div className="text-2xl font-bold font-serif text-[#8a6520] dark:text-[#c9a86a] my-2">
                  {item.price}
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f1b16] dark:text-[#f5f2ed] mb-1 leading-tight">
                  {item.title}
                </h3>

                <p className="text-sm font-serif italic text-[#8a6520] dark:text-[#c9a86a] mb-4">
                  "{item.subtitle}"
                </p>

                <p className="text-sm text-[#4a433d] dark:text-white/70 leading-relaxed mb-6 font-light">
                  {item.description}
                </p>

                {/* Flavor & Taste Profile Box */}
                <div className="bg-[#f8f4ec] dark:bg-[#181818] rounded-xl p-4 border border-[#c9a86a]/20 mb-6 shadow-xs">
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8a6520] dark:text-[#c9a86a] mb-1.5 flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-[#8a6520] dark:text-[#c9a86a]" />
                    <span>Confectionery & Flavor Profile:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1f1b16] dark:text-[#f5f2ed] font-medium leading-relaxed">
                    {item.flavorProfile}
                  </p>
                </div>

                {/* Design Tags */}
                <div className="mb-6">
                  <span className="text-[10px] font-bold text-[#8a6520] dark:text-[#c9a86a] uppercase tracking-[0.25em] block mb-2">
                    Key Highlights:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-xs bg-[#f0ebe1] dark:bg-[#1a1918] text-[#3d3731] dark:text-white/80 border border-[#c9a86a]/20 px-2.5 py-1 rounded-md"
                      >
                        <Check className="w-3 h-3 text-[#8a6520] dark:text-[#c9a86a]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#c9a86a]/20 flex flex-col gap-3">
                <a
                  href={getWhatsAppOrderUrl(item.title, item.price)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#c9a86a] hover:bg-[#dfbe7f] text-[#050505] py-3.5 px-5 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(201,168,106,0.3)] transition-all cursor-pointer"
                  title={`Order ${item.title} on WhatsApp`}
                >
                  <ShoppingBag className="w-4 h-4 text-[#050505]" />
                  <span>Order This Creation ({item.price})</span>
                  <ArrowRight className="w-4 h-4 ml-auto text-[#050505]" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
