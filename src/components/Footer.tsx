import React, { useState } from 'react';
import { Cake, Phone, Mail, MapPin, ChevronDown, Check, Award, Truck } from 'lucide-react';
import { FAQS, CONTACT_INFO, ASSETS } from '../data/cateringData';
import { SocialButtonGroup } from './SocialButtons';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#faf7f2] dark:bg-[#050505] text-[#1f1b16] dark:text-[#f5f2ed] pt-16 pb-12 border-t border-[#c9a86a]/25 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Direct Connect Action Buttons Section */}
        <div className="mb-16 p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0f0e0d] border border-[#c9a86a]/35 shadow-xl dark:shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <div className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.25em] text-[#8a6520] dark:text-[#c9a86a] mb-2">
                <span>Instant Communication Channels</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f1b16] dark:text-[#f5f2ed]">
                Connect Directly with Abby Cakes & Hampers
              </h3>
              <p className="text-xs sm:text-sm text-[#6b6155] dark:text-white/65 mt-1 font-light">
                Direct phone orders, WhatsApp chat, Instagram DMs, and prompt event scheduling across Lagos.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenContact}
              className="bg-[#c9a86a] hover:bg-[#dfbe7f] text-[#050505] font-bold text-xs uppercase tracking-widest px-6 py-3.5 rounded-full shadow-[0_0_20px_rgba(201,168,106,0.3)] transition-all flex-shrink-0 cursor-pointer"
            >
              How to Order Form
            </button>
          </div>

          {/* 4 Direct Interactive Buttons */}
          <SocialButtonGroup variant="footer" />
        </div>

        {/* FAQs Accordion Section */}
        <div className="mb-20 pb-16 border-b border-[#c9a86a]/20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8a6520] dark:text-[#c9a86a] block mb-2">
              Frequently Asked Questions
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f1b16] dark:text-[#f5f2ed]">
              Cake & Hamper Ordering Guide
            </h3>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white dark:bg-[#121110] border border-[#c9a86a]/20 hover:border-[#c9a86a]/40 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-[#1f1b16] dark:text-[#f5f2ed]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8a6520] dark:text-[#c9a86a] transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-[#6b6155] dark:text-white/70 leading-relaxed border-t border-[#c9a86a]/15 pt-3 font-light bg-[#faf7f2]/50 dark:bg-[#0a0a0a]/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Footer 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-[#c9a86a]/20">
          {/* Brand Info */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full overflow-hidden bg-[#f0ebe1] dark:bg-[#141414] flex items-center justify-center text-[#8a6520] dark:text-[#c9a86a] border border-[#c9a86a]/50 shadow-xs">
                <img
                  src={ASSETS.brandLogo}
                  alt="Abby Cakes Emblem"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold text-[#1f1b16] dark:text-[#f5f2ed] block leading-none">Abby Cakes & Hampers</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8a6520] dark:text-[#c9a86a] font-bold">@abbycakesandhampers</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#6b6155] dark:text-white/65 leading-relaxed mb-6 font-light">
              Premier confectionery and celebration studio in Lagos. Handcrafting bespoke tiered wedding cakes, milestone birthday confections, curated luxury gift hampers, and artisanal pastries.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#8a6520] dark:text-[#c9a86a]">
              <Award className="w-4 h-4 text-[#8a6520] dark:text-[#c9a86a] shrink-0" />
              <span className="font-medium text-[#3d3731] dark:text-white/80">100% Scratch-Baked • White-Glove Hand Delivery in Lagos</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-2.5 text-xs sm:text-sm">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a6520] dark:text-[#c9a86a] block mb-3">
              Explore
            </span>
            <div><a href="#home" className="text-[#6b6155] dark:text-white/70 hover:text-[#8a6520] dark:hover:text-[#c9a86a] transition-colors font-light">Home</a></div>
            <div><a href="#products" className="text-[#6b6155] dark:text-white/70 hover:text-[#8a6520] dark:hover:text-[#c9a86a] transition-colors font-light">Cakes & Hampers</a></div>
            <div><a href="#featured" className="text-[#6b6155] dark:text-white/70 hover:text-[#8a6520] dark:hover:text-[#c9a86a] transition-colors font-light">Featured Showcase</a></div>
            <div><a href="#why-us" className="text-[#6b6155] dark:text-white/70 hover:text-[#8a6520] dark:hover:text-[#c9a86a] transition-colors font-light">Why Choose Us</a></div>
            <div><a href="#testimonials" className="text-[#6b6155] dark:text-white/70 hover:text-[#8a6520] dark:hover:text-[#c9a86a] transition-colors font-light">Client Reviews</a></div>
            <div><a href="#contact" className="text-[#6b6155] dark:text-white/70 hover:text-[#8a6520] dark:hover:text-[#c9a86a] transition-colors font-light">How to Order</a></div>
          </div>

          {/* Contact & Studio Details */}
          <div className="lg:col-span-3 space-y-3 text-xs sm:text-sm">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a6520] dark:text-[#c9a86a] block mb-3">
              Studio & Contact
            </span>
            <div className="flex items-start gap-2.5 text-[#6b6155] dark:text-white/70 font-light">
              <MapPin className="w-4 h-4 text-[#8a6520] dark:text-[#c9a86a] shrink-0 mt-0.5" />
              <span>{CONTACT_INFO.location}</span>
            </div>
            <div className="flex items-center gap-2.5 text-[#6b6155] dark:text-white/70 font-light">
              <Phone className="w-4 h-4 text-[#8a6520] dark:text-[#c9a86a] shrink-0" />
              <a href={CONTACT_INFO.phoneUrl} className="hover:text-[#8a6520] dark:hover:text-[#c9a86a] transition-colors">
                Phone: <strong className="text-[#1f1b16] dark:text-white font-medium">{CONTACT_INFO.phoneFormatted}</strong>
              </a>
            </div>
            <div className="flex items-center gap-2.5 text-[#6b6155] dark:text-white/70 font-light">
              <Truck className="w-4 h-4 text-[#8a6520] dark:text-[#c9a86a] shrink-0" />
              <span>{CONTACT_INFO.deliveryCoverage}</span>
            </div>
            <div className="flex items-center gap-2.5 text-[#6b6155] dark:text-white/70 font-light">
              <Mail className="w-4 h-4 text-[#8a6520] dark:text-[#c9a86a] shrink-0" />
              <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-[#8a6520] dark:hover:text-[#c9a86a] transition-colors">{CONTACT_INFO.email}</a>
            </div>
          </div>

          {/* Newsletter / Seasonal Menu Drops */}
          <div className="lg:col-span-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a6520] dark:text-[#c9a86a] block mb-2">
              Stay Connected
            </span>
            <p className="text-xs text-[#6b6155] dark:text-white/65 leading-relaxed mb-4 font-light">
              Get notified of seasonal hamper releases, holiday cake slots, and special offers.
            </p>

            {newsletterSubscribed ? (
              <div className="bg-white dark:bg-[#121110] p-3.5 rounded-xl border border-[#c9a86a]/40 text-xs text-[#8a6520] dark:text-[#c9a86a] flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>You're subscribed to Abby Cakes VIP list!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-3.5 py-2.5 bg-white dark:bg-[#141414] rounded-xl border border-[#c9a86a]/30 focus:outline-hidden focus:border-[#c9a86a] text-xs text-[#1f1b16] dark:text-[#f5f2ed] placeholder:text-[#8a8075] dark:placeholder:text-white/30"
                />
                <button
                  type="submit"
                  className="w-full bg-[#c9a86a] hover:bg-[#dfbe7f] text-[#050505] py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(201,168,106,0.25)] cursor-pointer"
                >
                  Join VIP Cake List
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#736a5f] dark:text-white/40 font-light">
          <p>© 2026 Abby Cakes & Hampers (@abbycakesandhampers). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href={CONTACT_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-500 transition-colors">
              WhatsApp
            </a>
            <span>•</span>
            <a href={CONTACT_INFO.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#8a6520] dark:hover:text-[#c9a86a] transition-colors">
              Instagram
            </a>
            <span>•</span>
            <a href={CONTACT_INFO.tiktokUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#8a6520] dark:hover:text-[#c9a86a] transition-colors">
              TikTok
            </a>
            <span>•</span>
            <button type="button" onClick={onOpenContact} className="hover:text-[#8a6520] dark:hover:text-[#c9a86a] transition-colors cursor-pointer">
              Order Online
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
