import React from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, Heart, Truck, ChefHat, Flower, Check } from 'lucide-react';
import { CHEF_HIGHLIGHTS } from '../data/cateringData';

export const WhyUs: React.FC = () => {
  const pillars = [
    {
      icon: ChefHat,
      title: 'Artisanal Confectionery Masters',
      desc: 'Led by Chef Abby with over 12+ years specializing in haute couture wedding cakes, milestone birthday confections, and gourmet dessert hampers.',
    },
    {
      icon: Flower,
      title: 'Hand-Sculpted Sugar Art & Florals',
      desc: 'Every rose petal, ruffled tier, delicate pearl, and gold-leaf accent is meticulously handcrafted for photo-ready perfection.',
    },
    {
      icon: Award,
      title: 'Pure European Butter & Valrhona Chocolate',
      desc: 'Zero artificial shortenings or pre-mixes. We use pure grass-fed butter, Madagascar bourbon vanilla, and imported Belgian chocolates.',
    },
    {
      icon: Truck,
      title: 'Refrigerated White-Glove Delivery',
      desc: 'Carefully packaged in climate-controlled transit vehicles with full on-site table assembly and styling for complete peace of mind.',
    },
    {
      icon: ShieldCheck,
      title: '5-Star Food Hygiene & Custom Dietary Options',
      desc: 'Clean, sanitized studio with options for eggless, gluten-free, and nut-free bespoke cake requests.',
    },
    {
      icon: Heart,
      title: 'Bespoke Luxury Gifting Hampers',
      desc: 'From custom bento cake boxes to lavish multi-item celebration hampers, each gift is packaged in embossed ribbons and keepsake boxes.',
    },
  ];

  return (
    <section id="why-us" className="py-20 md:py-28 bg-[#faf7f2] dark:bg-[#050505] border-y border-[#c9a86a]/20 relative transition-colors duration-300">
      <div id="tasting-box" className="sr-only" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center text-[11px] font-bold uppercase tracking-[0.3em] text-[#8a6520] dark:text-[#c9a86a] mb-3">
            <span>The Abby Cakes & Hampers Standard</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1f1b16] dark:text-[#f5f2ed] tracking-tight mb-4">
            Confectionery Artistry & Flawless Presentation
          </h2>
          <p className="text-sm sm:text-base text-[#4a433d] dark:text-white/65 leading-relaxed font-light">
            {CHEF_HIGHLIGHTS.story}
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white dark:bg-[#121110] rounded-2xl p-6 sm:p-7 shadow-lg dark:shadow-2xl border border-[#c9a86a]/25 hover:border-[#c9a86a]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#f0ebe1] dark:bg-[#1a1918] flex items-center justify-center text-[#8a6520] dark:text-[#c9a86a] mb-5 border border-[#c9a86a]/30 shadow-inner">
                    <Icon className="w-6 h-6 text-[#8a6520] dark:text-[#c9a86a]" />
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1f1b16] dark:text-[#f5f2ed] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4a433d] dark:text-white/65 leading-relaxed font-light">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Awards Bar */}
        <div className="bg-white dark:bg-[#121110] text-[#1f1b16] dark:text-[#f5f2ed] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-around gap-6 border border-[#c9a86a]/35 shadow-xl dark:shadow-2xl">
          {CHEF_HIGHLIGHTS.awards.map((award, idx) => (
            <div key={idx} className="flex items-center gap-3 text-center md:text-left">
              <div className="w-10 h-10 rounded-full bg-[#f0ebe1] dark:bg-[#1c1b18] flex items-center justify-center text-[#8a6520] dark:text-[#c9a86a] flex-shrink-0 border border-[#c9a86a]/40 shadow-sm">
                <Check className="w-5 h-5 text-[#8a6520] dark:text-[#c9a86a]" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-[#1f1b16] dark:text-white/85 tracking-wide">
                {award}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
