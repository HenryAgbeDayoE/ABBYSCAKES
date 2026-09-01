import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X, ShoppingBag, ArrowRight, Image as ImageIcon, LayoutGrid, Play } from 'lucide-react';
import { ProductCollection } from '../types';
import { getWhatsAppOrderUrl } from '../data/cateringData';

interface CollectionModalProps {
  collection: ProductCollection | null;
  onClose: () => void;
  onOrderNow?: (title: string, price?: string) => void;
}

export const CollectionModal: React.FC<CollectionModalProps> = ({
  collection,
  onClose,
  onOrderNow,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const [isGridView, setIsGridView] = useState(false);

  // Touch swipe state
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Thumbnail refs for auto-scroll
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Load local collection images when collection opens
  useEffect(() => {
    if (!collection) return;

    setActiveIndex(0);
    setImageError({});
    setIsImageLoaded(false);
    setIsGridView(false);

    const localImgs = collection.images && collection.images.length > 0
      ? collection.images
      : [collection.coverImage];
    
    setImages(localImgs);
  }, [collection]);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailRefs.current[activeIndex]) {
      thumbnailRefs.current[activeIndex]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeIndex]);

  // Keyboard navigation & lock body scroll
  useEffect(() => {
    if (!collection) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [collection, images.length, activeIndex]);

  if (!collection) return null;

  const totalImages = images.length;
  const currentImage = images[activeIndex] || collection.coverImage;

  const handlePrev = () => {
    setIsImageLoaded(false);
    setActiveIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsImageLoaded(false);
    setActiveIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleOrder = () => {
    if (onOrderNow) {
      onOrderNow(collection.name, collection.priceRange);
    } else {
      const url = getWhatsAppOrderUrl(collection.name, collection.priceRange);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md transition-opacity duration-300">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-white dark:bg-[#121110] rounded-3xl overflow-hidden shadow-2xl border border-[#c9a86a]/40 my-auto flex flex-col max-h-[92vh]"
        >
          {/* Header Bar */}
          <div className="px-5 py-4 sm:px-6 bg-[#faf7f2] dark:bg-[#181715] border-b border-[#c9a86a]/20 flex items-center justify-between shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8a6520] dark:text-[#c9a86a] bg-[#c9a86a]/15 px-2.5 py-0.5 rounded-full border border-[#c9a86a]/30">
                  {collection.categoryLabel}
                </span>
                <span className="text-[10px] uppercase font-bold text-[#6b6155] dark:text-white/60">
                  {totalImages} Photos
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1f1b16] dark:text-[#f5f2ed] tracking-tight mt-1">
                {collection.name}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {totalImages > 1 && (
                <button
                  type="button"
                  onClick={() => setIsGridView(!isGridView)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                    isGridView
                      ? 'bg-[#c9a86a] text-[#050505] border-[#c9a86a]'
                      : 'bg-black/5 dark:bg-white/10 text-[#1f1b16] dark:text-white hover:bg-black/10 dark:hover:bg-white/20 border-[#c9a86a]/20'
                  }`}
                >
                  {isGridView ? (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Slideshow View</span>
                    </>
                  ) : (
                    <>
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span>Grid View</span>
                    </>
                  )}
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-[#1f1b16] dark:text-white transition-colors cursor-pointer"
                aria-label="Close collection modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="overflow-y-auto p-4 sm:p-6 flex-1 space-y-5">
            {isGridView ? (
              /* Grid View Gallery */
              <div className="max-h-[55vh] overflow-y-auto pr-1">
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {images.map((img, idx) => (
                    <button
                      key={img + idx}
                      type="button"
                      onClick={() => {
                        setActiveIndex(idx);
                        setIsGridView(false);
                        setIsImageLoaded(false);
                      }}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer group ${
                        activeIndex === idx
                          ? 'border-[#c9a86a] shadow-[0_0_12px_rgba(201,168,106,0.6)] scale-102'
                          : 'border-transparent opacity-85 hover:opacity-100 hover:scale-102'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${collection.name} Photo ${idx + 1}`}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute bottom-1.5 right-1.5 bg-black/70 backdrop-blur-xs text-[10px] text-white font-bold px-1.5 py-0.5 rounded-md">
                        #{idx + 1}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Slideshow View Area */
              <>
                <div
                  className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-inner flex items-center justify-center group select-none"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Main Image */}
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImage + activeIndex}
                      src={currentImage}
                      alt={`${collection.name} - Photo ${activeIndex + 1}`}
                      initial={{ opacity: 0.2 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0.2 }}
                      transition={{ duration: 0.2 }}
                      onLoad={() => setIsImageLoaded(true)}
                      onError={() => setImageError((prev) => ({ ...prev, [activeIndex]: true }))}
                      className={`w-full h-full object-contain ${
                        isImageLoaded ? 'opacity-100' : 'opacity-80 blur-xs'
                      }`}
                    />
                  </AnimatePresence>

                  {/* Image Loading Skeleton */}
                  {!isImageLoaded && !imageError[activeIndex] && (
                    <div className="absolute inset-0 bg-[#141414] animate-pulse flex items-center justify-center">
                      <ImageIcon className="w-10 h-10 text-[#c9a86a]/40" />
                    </div>
                  )}

                  {/* Image Error Fallback */}
                  {imageError[activeIndex] && (
                    <div className="absolute inset-0 bg-[#181715] flex flex-col items-center justify-center p-4 text-center">
                      <ImageIcon className="w-10 h-10 text-[#c9a86a] mb-2" />
                      <p className="text-sm font-medium text-white/80">Image preview unavailable</p>
                    </div>
                  )}

                  {/* Previous Arrow */}
                  {totalImages > 1 && (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/65 hover:bg-black/85 text-[#c9a86a] border border-[#c9a86a]/40 shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  )}

                  {/* Next Arrow */}
                  {totalImages > 1 && (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/65 hover:bg-black/85 text-[#c9a86a] border border-[#c9a86a]/40 shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  )}

                  {/* Image Counter Badge */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold text-[#f5f2ed] border border-[#c9a86a]/40 shadow-sm flex items-center gap-1.5">
                    <span className="text-[#c9a86a] font-bold">{activeIndex + 1}</span>
                    <span className="text-white/40">/</span>
                    <span>{totalImages}</span>
                  </div>
                </div>

                {/* Thumbnails Strip */}
                {totalImages > 1 && (
                  <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none px-1">
                    {images.map((img, idx) => (
                      <button
                        key={img + idx}
                        ref={(el) => (thumbnailRefs.current[idx] = el)}
                        type="button"
                        onClick={() => {
                          setIsImageLoaded(false);
                          setActiveIndex(idx);
                        }}
                        className={`relative flex-shrink-0 w-16 h-14 sm:w-20 sm:h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                          activeIndex === idx
                            ? 'border-[#c9a86a] shadow-[0_0_10px_rgba(201,168,106,0.5)] scale-105'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Description & Varieties Information */}
            <div className="bg-[#faf7f2] dark:bg-[#181715] p-4 sm:p-5 rounded-2xl border border-[#c9a86a]/20 space-y-3">
              <p className="text-xs sm:text-sm text-[#4a433d] dark:text-white/80 font-light leading-relaxed">
                {collection.description}
              </p>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8a6520] dark:text-[#c9a86a] block mb-1.5">
                  Varieties & Specialties Included:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {collection.items.map((item) => (
                    <span
                      key={item}
                      className="text-[11px] bg-white dark:bg-[#22201c] text-[#1f1b16] dark:text-white/90 px-2.5 py-1 rounded-lg border border-[#c9a86a]/20 font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="px-5 py-4 sm:px-6 bg-[#faf7f2] dark:bg-[#181715] border-t border-[#c9a86a]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#6b6155] dark:text-white/50 block">
                Starting Pricing
              </span>
              <span className="text-lg sm:text-xl font-bold font-serif text-[#8a6520] dark:text-[#c9a86a]">
                {collection.priceRange}
              </span>
            </div>

            <button
              type="button"
              onClick={handleOrder}
              className="w-full sm:w-auto bg-[#c9a86a] hover:bg-[#dfbe7f] text-[#050505] py-3 px-6 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(201,168,106,0.3)] transition-all duration-200 cursor-pointer active:scale-98"
            >
              <ShoppingBag className="w-4 h-4 text-[#050505]" />
              <span>Order {collection.name} on WhatsApp</span>
              <ArrowRight className="w-4 h-4 text-[#050505]" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
