import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { CONTACT_INFO } from '../data/cateringData';

// Custom SVG Icons for authentic TikTok and Instagram styling
export const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.32a6.34 6.34 0 0 0-.85-.06A6.34 6.34 0 0 0 3.14 15.6a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.58a8.31 8.31 0 0 0 4.88 1.56V6.69h-1.11z" />
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

interface SocialButtonGroupProps {
  variant?: 'hero' | 'bar' | 'compact' | 'footer';
  className?: string;
}

export const SocialButtonGroup: React.FC<SocialButtonGroupProps> = ({ variant = 'bar', className = '' }) => {
  if (variant === 'hero') {
    return (
      <div className={`flex items-center gap-3 flex-wrap ${className}`}>
        {/* WhatsApp Button */}
        <a
          href={CONTACT_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-5 sm:px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-xl hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 border border-emerald-400/30"
          title="Direct WhatsApp Chat with Abby Cakes & Hampers"
        >
          <WhatsAppIcon className="w-4 h-4 fill-white" />
          <span>WhatsApp Chat</span>
        </a>

        {/* Instagram Button */}
        <a
          href={CONTACT_INFO.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-[#141414] hover:bg-[#1a1a1a] text-[#c9a86a] hover:text-[#dfbe7f] px-5 sm:px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-xl transition-all transform hover:-translate-y-0.5 border border-[#c9a86a]/40 hover:border-[#c9a86a]"
          title="Follow @abbycakesandhampers on Instagram"
        >
          <InstagramIcon className="w-4 h-4 text-[#c9a86a]" />
          <span>Instagram @abby</span>
        </a>

        {/* TikTok Button */}
        <a
          href={CONTACT_INFO.tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-[#0a0a0a] hover:bg-[#141414] text-[#f5f2ed] hover:text-[#c9a86a] px-5 sm:px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-xl transition-all transform hover:-translate-y-0.5 border border-white/20 hover:border-[#c9a86a]"
          title="Follow @abbycakesandhampers on TikTok"
        >
          <TikTokIcon className="w-4 h-4 text-[#c9a86a]" />
          <span>TikTok Videos</span>
        </a>

        {/* Phone Button */}
        <a
          href={CONTACT_INFO.phoneUrl}
          className="inline-flex items-center gap-2 bg-white/[0.04] hover:bg-white/10 text-white/90 px-4 py-3 rounded-full font-semibold text-xs uppercase tracking-wider border border-white/15 hover:border-[#c9a86a] transition-all"
          title="Call 07049658444 directly"
        >
          <Phone className="w-3.5 h-3.5 text-[#c9a86a]" />
          <span>Call: {CONTACT_INFO.phoneFormatted}</span>
        </a>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 ${className}`}>
        {/* WhatsApp Button */}
        <a
          href={CONTACT_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-2xl bg-[#141414] border border-[#c9a86a]/30 hover:border-emerald-400 flex items-center gap-3 transition-all group hover:bg-[#1a1a1a]"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
            <WhatsAppIcon className="w-5 h-5 fill-emerald-400" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#c9a86a] block">WhatsApp Direct</span>
            <span className="text-xs font-semibold text-[#f5f2ed] group-hover:text-emerald-300 transition-colors">
              {CONTACT_INFO.whatsappFormatted}
            </span>
          </div>
        </a>

        {/* Instagram Button */}
        <a
          href={CONTACT_INFO.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-2xl bg-[#141414] border border-[#c9a86a]/30 hover:border-[#c9a86a] flex items-center gap-3 transition-all group hover:bg-[#1a1a1a]"
        >
          <div className="w-10 h-10 rounded-xl bg-[#c9a86a]/15 border border-[#c9a86a]/30 flex items-center justify-center text-[#c9a86a] group-hover:scale-105 transition-transform">
            <InstagramIcon className="w-5 h-5 text-[#c9a86a]" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#c9a86a] block">Instagram</span>
            <span className="text-xs font-semibold text-[#f5f2ed] group-hover:text-[#c9a86a] transition-colors">
              {CONTACT_INFO.instagramHandle}
            </span>
          </div>
        </a>

        {/* TikTok Button */}
        <a
          href={CONTACT_INFO.tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-2xl bg-[#141414] border border-[#c9a86a]/30 hover:border-[#c9a86a] flex items-center gap-3 transition-all group hover:bg-[#1a1a1a]"
        >
          <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center text-[#c9a86a] group-hover:scale-105 transition-transform">
            <TikTokIcon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#c9a86a] block">TikTok</span>
            <span className="text-xs font-semibold text-[#f5f2ed] group-hover:text-[#c9a86a] transition-colors">
              {CONTACT_INFO.tiktokHandle}
            </span>
          </div>
        </a>

        {/* Phone Button */}
        <a
          href={CONTACT_INFO.phoneUrl}
          className="p-3.5 rounded-2xl bg-[#141414] border border-[#c9a86a]/30 hover:border-[#c9a86a] flex items-center gap-3 transition-all group hover:bg-[#1a1a1a]"
        >
          <div className="w-10 h-10 rounded-xl bg-[#c9a86a]/15 border border-[#c9a86a]/30 flex items-center justify-center text-[#c9a86a] group-hover:scale-105 transition-transform">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#c9a86a] block">Call Studio</span>
            <span className="text-xs font-semibold text-[#f5f2ed] group-hover:text-[#c9a86a] transition-colors">
              {CONTACT_INFO.phoneFormatted}
            </span>
          </div>
        </a>
      </div>
    );
  }

  // Default compact bar
  return (
    <div className={`inline-flex items-center gap-2 flex-wrap ${className}`}>
      <a
        href={CONTACT_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/40 hover:border-emerald-400 text-emerald-300 text-xs font-semibold transition-all hover:bg-emerald-900/40"
      >
        <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-400" />
        <span>WhatsApp</span>
      </a>

      <a
        href={CONTACT_INFO.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#141414] border border-[#c9a86a]/40 hover:border-[#c9a86a] text-[#c9a86a] text-xs font-semibold transition-all hover:bg-[#c9a86a]/10"
      >
        <InstagramIcon className="w-3.5 h-3.5 text-[#c9a86a]" />
        <span>Instagram</span>
      </a>

      <a
        href={CONTACT_INFO.tiktokUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/20 hover:border-[#c9a86a] text-[#f5f2ed] text-xs font-semibold transition-all hover:bg-white/10"
      >
        <TikTokIcon className="w-3.5 h-3.5 text-[#c9a86a]" />
        <span>TikTok</span>
      </a>

      <a
        href={CONTACT_INFO.phoneUrl}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/15 hover:border-[#c9a86a] text-white/80 text-xs font-medium transition-all"
      >
        <Phone className="w-3 h-3 text-[#c9a86a]" />
        <span>{CONTACT_INFO.phoneFormatted}</span>
      </a>
    </div>
  );
};

// Floating Quick Action Dock on Bottom Right for instant one-tap contact
export const FloatingSocialDock: React.FC = () => {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {/* Floating WhatsApp Button */}
      <a
        href={CONTACT_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white pl-4 pr-4 py-3 rounded-full shadow-[0_4px_25px_rgba(16,185,129,0.35)] border border-emerald-300/40 transition-all duration-300 transform hover:scale-105"
        aria-label="Direct WhatsApp chat"
      >
        <WhatsAppIcon className="w-5 h-5 fill-white" />
        <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">Chat WhatsApp</span>
      </a>

      {/* Mini Social Strip */}
      <div className="flex items-center gap-2 bg-[#141414]/95 backdrop-blur-md p-1.5 rounded-full border border-[#c9a86a]/40 shadow-2xl">
        <a
          href={CONTACT_INFO.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full bg-[#c9a86a]/15 hover:bg-[#c9a86a] text-[#c9a86a] hover:text-[#0a0a0a] flex items-center justify-center transition-all border border-[#c9a86a]/30"
          title="Instagram @abbycakesandhampers"
          aria-label="Instagram"
        >
          <InstagramIcon className="w-4 h-4" />
        </a>

        <a
          href={CONTACT_INFO.tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white text-[#f5f2ed] hover:text-[#0a0a0a] flex items-center justify-center transition-all border border-white/20"
          title="TikTok @abbycakesandhampers"
          aria-label="TikTok"
        >
          <TikTokIcon className="w-4 h-4" />
        </a>

        <a
          href={CONTACT_INFO.phoneUrl}
          className="w-8 h-8 rounded-full bg-[#c9a86a]/15 hover:bg-[#c9a86a] text-[#c9a86a] hover:text-[#0a0a0a] flex items-center justify-center transition-all border border-[#c9a86a]/30"
          title="Call 07049658444"
          aria-label="Call Phone"
        >
          <Phone className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
