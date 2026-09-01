import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, ArrowRight, X, Sparkles, Layers, Images } from 'lucide-react';
import { PRODUCT_COLLECTIONS } from '../data/collectionsData';
import { getWhatsAppOrderUrl } from '../data/cateringData';
import { ProductCollection, CollectionCategory } from '../types';

interface GalleryProps {
  onSelectCollection: (collection: ProductCollection) => void;
  onOrderNow?: (title: string, price?: string) => void;
}

export const Gallery: React.FC<GalleryProps> = ({ onSelectCollection, onOrderNow }) => {
  const [selectedCategory, setSelectedCategory] = useState<CollectionCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: CollectionCategory; label: string; count: number }[] = useMemo(() => {
    return [
      { id: 'all', label: 'All Products', count: PRODUCT_COLLECTIONS.length },
      { id: 'cakes', label: 'Cakes', count: PRODUCT_COLLECTIONS.filter((c) => c.category === 'cakes').length },
      { id: 'chops', label: 'Chops', count: PRODUCT_COLLECTIONS.filter((c) => c.category === 'chops').length },
      { id: 'pastries', label: 'Pastries', count: PRODUCT_COLLECTIONS.filter((c) => c.category === 'pastries').length },
    ];
  }, []);

  const filteredCollections = useMemo(() => {
    return PRODUCT_COLLECTIONS.filter((collection) => {
      const matchesCategory = selectedCategory === 'all' || collection.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === '' ||
        collection.name.toLowerCase().includes(query) ||
        collection.subtitle.toLowerCase().includes(query) ||
        collection.description.toLowerCase().includes(query) ||
        collection.priceRange.toLowerCase().includes(query) ||
        collection.items.some((item) => item.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOrderClick = (e: React.MouseEvent, collection: ProductCollection) => {
    e.stopPropagation();
    if (onOrderNow) {
      onOrderNow(collection.name, collection.priceRange);
    } else {
      const url = getWhatsAppOrderUrl(collection.name, collection.priceRange);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#faf7f2] dark:bg-[#050505] relative transition-colors duration-300">
      <div id="products" className="sr-only" />
      <div id="cakes-hampers" className="sr-only" />
      <div id="menu-hampers" className="sr-only" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-[#8a6520] dark:text-[#c9a86a] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Artisanal Catalogue</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1f1b16] dark:text-[#f5f2ed] tracking-tight">
              Our Products
            </h2>
            <p className="text-sm sm:text-base text-[#6b6155] dark:text-white/65 max-w-xl mt-2 font-light">
              Explore our three core product offerings: <strong>Cakes</strong>, <strong>Chops</strong>, and <strong>Pastries</strong>. Click any card to view detailed specifications and browse the full photo slideshow gallery.
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#8a6520] dark:text-[#c9a86a] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cakes, chops, pastries..."
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

        {/* Category Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-10">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#c9a86a] text-[#050505] shadow-[0_0_15px_rgba(201,168,106,0.3)] font-bold'
                    : 'bg-white dark:bg-[#121110] hover:bg-[#f3ede2] dark:hover:bg-[#1c1b18] text-[#4a433d] dark:text-white/70 border border-[#c9a86a]/25 dark:border-[#c9a86a]/20 hover:border-[#c9a86a]'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isSelected ? 'bg-[#050505] text-[#c9a86a]' : 'bg-[#f0ebe1] dark:bg-[#1c1b18] text-[#3d3731] dark:text-white/70'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Collection Cards Grid */}
        {filteredCollections.length === 0 ? (
          <div className="bg-white dark:bg-[#121110] rounded-3xl p-12 text-center border border-[#c9a86a]/30 max-w-lg mx-auto shadow-md">
            <p className="font-serif text-xl font-bold text-[#1f1b16] dark:text-[#f5f2ed] mb-2">No products found</p>
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
          <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence>
              {filteredCollections.map((collection) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={collection.id}
                  onClick={() => onSelectCollection(collection)}
                  className="bg-white dark:bg-[#121110] rounded-3xl overflow-hidden shadow-lg dark:shadow-2xl border border-[#c9a86a]/30 hover:border-[#c9a86a] transition-all duration-300 flex flex-col group cursor-pointer"
                >
                  {/* Cover Image Area */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ebe6dd] dark:bg-[#1a1a1a]">
                    <img
                      src={collection.coverImage}
                      alt={collection.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
                    />

                    {/* Category Label */}
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-[#c9a86a] px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border border-[#c9a86a]/30">
                      {collection.categoryLabel}
                    </div>

                    {/* Image Counter Badge */}
                    <div className="absolute top-3 right-3 bg-[#c9a86a] text-[#050505] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                      <Images className="w-3 h-3 text-[#050505]" />
                      <span>{collection.images.length} Photos</span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <span className="bg-black/85 text-[#f5f2ed] border border-[#c9a86a]/60 px-5 py-2.5 rounded-full text-xs font-bold backdrop-blur-md flex items-center gap-2 shadow-lg">
                        <Layers className="w-4 h-4 text-[#c9a86a]" />
                        <span>Open Slideshow Gallery →</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Price Range */}
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xl sm:text-2xl font-bold text-[#8a6520] dark:text-[#c9a86a] font-serif tracking-tight">
                          {collection.priceRange}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1f1b16] dark:text-[#f5f2ed] group-hover:text-[#8a6520] dark:group-hover:text-[#c9a86a] transition-colors leading-snug mb-1.5">
                        {collection.name}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-xs sm:text-sm text-[#6b6155] dark:text-white/60 font-medium mb-4 line-clamp-2">
                        {collection.subtitle}
                      </p>

                      {/* Items / Varieties included */}
                      <div className="bg-[#faf7f2] dark:bg-[#181818] rounded-xl p-3 border border-[#c9a86a]/20 mb-4">
                        <div className="text-[10px] uppercase tracking-wider font-bold text-[#8a6520] dark:text-[#c9a86a] flex items-center gap-1 mb-1.5">
                          <Layers className="w-3 h-3" /> Included Varieties:
                        </div>
                        <p className="text-[11px] text-[#1f1b16] dark:text-white/85 font-medium leading-relaxed">
                          {collection.items.join(' • ')}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-3 border-t border-[#c9a86a]/20 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectCollection(collection)}
                        className="flex-1 bg-[#c9a86a] hover:bg-[#dfbe7f] text-[#050505] py-2.5 px-4 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(201,168,106,0.25)] transition-all cursor-pointer"
                      >
                        <span>View Slideshow</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#050505]" />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleOrderClick(e, collection)}
                        className="p-2.5 rounded-full border border-[#c9a86a]/30 hover:bg-[#c9a86a]/15 text-[#1f1b16] dark:text-[#f5f2ed] transition-colors cursor-pointer"
                        title="Order Now on WhatsApp"
                        aria-label="Order Now on WhatsApp"
                      >
                        <ShoppingBag className="w-4 h-4 text-[#8a6520] dark:text-[#c9a86a]" />
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
