import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Award, ShieldCheck, Heart, Phone, Gift } from 'lucide-react';
import { ASSETS, CONTACT_INFO } from '../data/cateringData';
import { TikTokIcon, InstagramIcon, WhatsAppIcon } from './SocialButtons';
import abbysCakesVid from '../assets/videos/abbys_cakes_vid_1.mp4';

interface HeroProps {
  onExploreGallery?: () => void;
  onOpenContact?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.loop = true;

    const playVideo = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay fallback: video remains ready and muted
        });
      }
    };

    playVideo();

    // Guard against browsers that pause on completion or tab switch: continuous replay
    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && video.paused) {
        video.play().catch(() => {});
      }
    };

    video.addEventListener('ended', handleEnded);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      video.removeEventListener('ended', handleEnded);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-80px)] lg:min-h-screen flex items-center pt-8 pb-16 md:py-20 overflow-hidden bg-[#0c0a08] select-text"
    >
      {/* 
        ========================================================================
        LAYER 1: FULL-SCREEN BACKGROUND VIDEO (BOUND ONLY TO THE HERO SECTION)
        ========================================================================
      */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={ASSETS.heroSpread}
          className="w-full h-full object-cover object-center scale-100 opacity-95 transition-opacity duration-700"
        >
          <source src={abbysCakesVid} type="video/mp4" />
          <source src="/abbys_cakes_vid_1.mp4" type="video/mp4" />
          <source src="/hero_video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 
        ========================================================================
        LAYER 2: LUXURY SEMI-TRANSPARENT OVERLAY (BELOW TEXT & UI)
        ========================================================================
      */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-[1]">
        {/* Soft atmospheric overlay for legibility while letting the video shine */}
        <div className="absolute inset-0 bg-black/45" />
        {/* Soft horizontal gradient from left for typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a08] via-transparent to-black/30" />
        {/* Subtle gold ambient glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-[#c9a86a]/20 via-[#dfbe7f]/10 to-transparent blur-[100px] rounded-full" />
      </div>

      {/* 
        ========================================================================
        LAYER 3: HERO CONTENT (TYPOGRAPHY, BUTTONS, SOCIALS, STATS & SHOWCASE)
        ========================================================================
      */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline, Description, and CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Gold Tagline Pill */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#181512]/90 backdrop-blur-md border border-[#c9a86a]/50 text-[11px] font-bold uppercase tracking-[0.25em] text-[#dfbe7f] mb-6 shadow-[0_0_20px_rgba(201,168,106,0.2)]">
              <span>...enrich every moment • Handcrafted Confectionery</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-[#f5f2ed] leading-[1.08] mb-6 drop-shadow-md">
              Abby Cakes &{' '}
              <span className="italic font-normal text-[#dfbe7f] relative block sm:inline">
                Hampers
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#c9a86a]/60 -z-10"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path d="M0,15 Q50,0 100,15" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Descriptive Body */}
            <p className="text-xl sm:text-2xl text-[#dfbe7f] italic font-serif leading-relaxed max-w-2xl mb-8 drop-shadow-md">
              ...enrich every moment
            </p>

            {/* Direct Social & Contact Action Buttons Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#14120f]/85 backdrop-blur-md border border-[#c9a86a]/35 w-full max-w-2xl mb-8 shadow-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#dfbe7f]">
                  Direct Channels & Social Media:
                </span>
                <span className="text-[11px] text-white/60 hidden sm:inline">Click to connect immediately</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* WhatsApp Button */}
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white py-2.5 px-3 rounded-xl font-bold text-xs shadow-md transition-all transform hover:-translate-y-0.5 border border-emerald-400/40"
                  title="WhatsApp 08173252323"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white flex-shrink-0" />
                  <span className="truncate">WhatsApp</span>
                </a>

                {/* Instagram Button */}
                <a
                  href={CONTACT_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#1f1b17] hover:bg-[#2c2620] text-[#dfbe7f] hover:text-white py-2.5 px-3 rounded-xl font-bold text-xs border border-[#c9a86a]/40 hover:border-[#c9a86a] transition-all transform hover:-translate-y-0.5 shadow-sm"
                  title="Instagram @abbycakesandhampers"
                >
                  <InstagramIcon className="w-4 h-4 text-[#c9a86a] flex-shrink-0" />
                  <span className="truncate">Instagram</span>
                </a>

                {/* TikTok Button */}
                <a
                  href={CONTACT_INFO.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#1f1b17] hover:bg-[#2c2620] text-[#f5f2ed] hover:text-[#dfbe7f] py-2.5 px-3 rounded-xl font-bold text-xs border border-white/20 hover:border-[#c9a86a] transition-all transform hover:-translate-y-0.5 shadow-sm"
                  title="TikTok @abbycakesandhampers"
                >
                  <TikTokIcon className="w-4 h-4 text-[#c9a86a] flex-shrink-0" />
                  <span className="truncate">TikTok</span>
                </a>

                {/* Phone Call Button */}
                <a
                  href={CONTACT_INFO.phoneUrl}
                  className="flex items-center justify-center gap-2 bg-[#1f1b17] hover:bg-[#2c2620] text-white/90 hover:text-[#dfbe7f] py-2.5 px-3 rounded-xl font-semibold text-xs border border-white/15 hover:border-[#c9a86a] transition-all"
                  title="Call 07049658444"
                >
                  <Phone className="w-3.5 h-3.5 text-[#c9a86a] flex-shrink-0" />
                  <span className="truncate">Call Studio</span>
                </a>
              </div>
            </div>

            {/* Trust Badges & Highlights */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-[#c9a86a]/25 w-full max-w-xl">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-[#dfbe7f] font-bold text-xl sm:text-2xl font-serif">
                  <Award className="w-4 h-4 text-[#c9a86a]" />
                  <span>1,500+</span>
                </div>
                <span className="text-xs text-white/70 mt-0.5 tracking-wide">Cakes & Hampers Delivered</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-[#dfbe7f] font-bold text-xl sm:text-2xl font-serif">
                  <Heart className="w-4 h-4 text-[#c9a86a]" />
                  <span>100%</span>
                </div>
                <span className="text-xs text-white/70 mt-0.5 tracking-wide">Fresh Scratch-Baked</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-[#dfbe7f] font-bold text-xl sm:text-2xl font-serif">
                  <ShieldCheck className="w-4 h-4 text-[#c9a86a]" />
                  <span>5-Star</span>
                </div>
                <span className="text-xs text-white/70 mt-0.5 tracking-wide">Customer Satisfaction</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Showcase & Floating Feature Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Showcase Card: 3-Tier Wedding Cake */}
              <div className="relative rounded-3xl overflow-hidden bg-[#14120f]/90 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.9)] border border-[#c9a86a]/40 group">
                <div className="aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden bg-[#1a1815]">
                  <img
                    src={ASSETS.weddingTier}
                    alt="Abby Luxury 3-Tier Monogram Wedding Cake"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Card Overlay Bar */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#050505] via-[#050505]/85 to-transparent p-5 sm:p-6 text-white">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#c9a86a] text-[#050505] text-[10px] font-bold uppercase tracking-widest mb-2 shadow-md">
                    Starting at ₦250,000
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#f5f2ed]">
                    The Royal Monogram Ivory Tier
                  </h3>
                  <p className="text-xs sm:text-sm text-white/75 line-clamp-2 mt-1 font-light">
                    Handcrafted ivory sugar ruffles, delicate pearl trim, and mirror gold monogram centerpiece.
                  </p>
                </div>
              </div>

              {/* Floating Mini Showcase 1: Bespoke Birthday Rose Cake */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -bottom-6 -left-4 sm:-left-8 bg-[#181512]/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-2xl border border-[#c9a86a]/45 flex items-center gap-3.5 max-w-[260px] sm:max-w-[280px]"
              >
                <img
                  src={ASSETS.bespokeBday}
                  alt="Bespoke Birthday Cake by Abby"
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover flex-shrink-0 border border-[#c9a86a]/30"
                />
                <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#dfbe7f]">Celebration Cake</span>
                    <span className="text-[10px] font-bold text-[#dfbe7f]">₦65,000</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#f5f2ed] leading-snug">Ribbed Rose & Gold</h4>
                  <span className="text-[11px] text-white/60 mt-0.5">Red Velvet & Caramel</span>
                </div>
              </motion.div>

              {/* Floating Mini Showcase 2: Luxury Dessert Hampers */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -top-6 -right-4 sm:-right-6 bg-[#181512]/95 text-white backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-2xl border border-[#c9a86a]/45 flex items-center gap-3 max-w-[260px] sm:max-w-[290px]"
              >
                <img
                  src={ASSETS.luxuryHamper}
                  alt="Luxury Dessert Hamper by Abby"
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover flex-shrink-0 border border-[#c9a86a]/30"
                />
                <div className="flex flex-col">
                  <div className="inline-flex items-center justify-between gap-1 text-[9px] font-bold uppercase tracking-widest text-[#dfbe7f]">
                    <div className="flex items-center gap-1">
                      <Gift className="w-3 h-3 text-[#dfbe7f]" />
                      <span>Luxe Hamper</span>
                    </div>
                    <span>₦55,000</span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-[#f5f2ed]">Macarons & Truffle Boxes</span>
                  <span className="text-[10px] text-[#dfbe7f]">Ribbon Packaging</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
