import React from 'react';
import { motion } from 'motion/react';
import { Star, Heart } from 'lucide-react';
import { TESTIMONIALS } from '../data/cateringData';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-white dark:bg-[#080808] relative border-t border-[#c9a86a]/20 transition-colors duration-300">
      <div id="reviews" className="sr-only" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center text-[11px] font-bold uppercase tracking-[0.3em] text-[#8a6520] dark:text-[#c9a86a] mb-3">
            <span>Celebration Memories & Rave Reviews</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1f1b16] dark:text-[#f5f2ed] tracking-tight mb-4">
            Love Letters from Our Clients
          </h2>
          <p className="text-sm sm:text-base text-[#4a433d] dark:text-white/65 leading-relaxed font-light">
            Real stories from weddings, milestone birthdays, and gift recipients where our bespoke cakes and dessert hampers created unforgettable joy.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#faf7f2] dark:bg-[#121110] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg dark:shadow-2xl border border-[#c9a86a]/25 hover:border-[#c9a86a]/60 flex flex-col justify-between transition-all duration-300 relative group"
            >
              <div>
                {/* Top Row: Stars and Event Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#c9a86a]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#c9a86a] text-[#c9a86a]" />
                    ))}
                  </div>
                  <span className="text-xs text-[#736a5f] dark:text-white/40 font-light">{review.eventDate}</span>
                </div>

                {/* Quote Text */}
                <p className="text-xs sm:text-sm text-[#332d26] dark:text-white/85 leading-relaxed italic mb-6 font-serif font-light">
                  "{review.quote}"
                </p>

                {/* Cake/Menu Tag */}
                <div className="bg-white dark:bg-[#181818] rounded-xl p-3 border border-[#c9a86a]/20 mb-6 shadow-xs">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a6520] dark:text-[#c9a86a] block mb-0.5">
                    Curated Order:
                  </span>
                  <span className="text-xs font-semibold text-[#1f1b16] dark:text-[#f5f2ed]">
                    {review.cakeOrMenu}
                  </span>
                </div>
              </div>

              {/* Client Info */}
              <div className="pt-4 border-t border-[#c9a86a]/15 flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.clientName}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover border border-[#c9a86a]/40 shadow-sm"
                />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#1f1b16] dark:text-[#f5f2ed]">{review.clientName}</h4>
                  <p className="text-[11px] text-[#736a5f] dark:text-white/50 font-light">{review.eventType}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
