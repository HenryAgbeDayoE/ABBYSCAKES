import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu as MenuIcon, X, ShoppingBag, ChevronRight, Sun, Moon, Calculator, Phone } from 'lucide-react';
import { ASSETS, CONTACT_INFO } from '../data/cateringData';
import { TikTokIcon, InstagramIcon, WhatsAppIcon } from './SocialButtons';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenContact: () => void;
}

interface NavItem {
  name: string;
  href: string;
  id: string;
  type?: 'link' | 'pill' | 'outline-btn' | 'gold-btn';
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = [
        'home',
        'featured',
        'gallery',
        'products',
        'cakes-hampers',
        'quote-calculator',
        'tasting-box',
        'why-us',
        'reviews',
        'testimonials',
        'estimate',
        'contact'
      ];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  // Exact 9 navigation items specified in order
  const navItems: NavItem[] = [
    { name: 'HOME', href: '#home', id: 'home', type: 'link' },
    { name: 'FEATURED', href: '#featured', id: 'featured', type: 'link' },
    { name: 'CAKE GALLERY', href: '#gallery', id: 'gallery', type: 'link' },
    { name: 'MENU & HAMPERS', href: '#cakes-hampers', id: 'cakes-hampers', type: 'pill' },
    { name: 'QUOTE CALCULATOR', href: '#quote-calculator', id: 'quote-calculator', type: 'link' },
    { name: 'TASTING BOX', href: '#tasting-box', id: 'tasting-box', type: 'link' },
    { name: 'REVIEWS', href: '#reviews', id: 'reviews', type: 'link' },
    { name: 'ESTIMATE CAKE', href: '#estimate', id: 'estimate', type: 'outline-btn' },
    { name: 'ORDER / INQUIRE', href: '#contact', id: 'contact', type: 'gold-btn' },
  ];

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href === '#contact' || href === '#estimate' || href === '#quote-calculator') {
      onOpenContact();
    }
  };

  return (
    <>
      {/* Top Announcement Bar with Direct Contacts & Socials */}
      <div className="bg-[#0e0c0a] dark:bg-[#050505] text-[#f5f2ed] text-xs py-2 px-4 tracking-wider border-b border-[#c9a86a]/25 relative z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
          {/* Left Brand Badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center text-[#c9a86a] font-bold text-[11px] uppercase tracking-[0.25em]">
              <span>Abby Cakes & Hampers</span>
            </span>
            <span className="hidden md:inline text-[#c9a86a]/40">•</span>
            <span className="hidden md:inline text-white/70 text-[11px]">
              Bespoke Cakes & Luxury Dessert Hampers • Lagos, Nigeria
            </span>
          </div>

          {/* Right Direct Social & Chat Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-semibold flex-wrap">
            {/* WhatsApp Direct Button */}
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-950/70 hover:bg-emerald-900 text-emerald-400 hover:text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/40 text-[11px] sm:text-xs transition-all shadow-xs"
              title="Chat on WhatsApp"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-400" />
              <span className="hidden sm:inline">WhatsApp: {CONTACT_INFO.whatsappFormatted}</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>

            {/* Instagram Direct Button */}
            <a
              href={CONTACT_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#1b1713] dark:bg-[#141414] hover:bg-[#28221b] text-[#c9a86a] hover:text-[#dfbe7f] px-2.5 py-1 rounded-full border border-[#c9a86a]/30 text-[11px] transition-all"
              title="View Instagram @abbycakesandhampers"
            >
              <InstagramIcon className="w-3.5 h-3.5 text-[#c9a86a]" />
              <span className="hidden xs:inline">Instagram</span>
            </a>

            {/* TikTok Direct Button */}
            <a
              href={CONTACT_INFO.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#1b1713] dark:bg-[#141414] hover:bg-[#28221b] text-[#f5f2ed] hover:text-[#c9a86a] px-2.5 py-1 rounded-full border border-white/15 hover:border-[#c9a86a]/40 text-[11px] transition-all"
              title="View TikTok @abbycakesandhampers"
            >
              <TikTokIcon className="w-3.5 h-3.5 text-[#c9a86a]" />
              <span className="hidden xs:inline">TikTok</span>
            </a>

            {/* Direct Phone Call */}
            <a
              href={CONTACT_INFO.phoneUrl}
              className="hidden lg:inline-flex items-center gap-1.5 text-white/80 hover:text-[#c9a86a] px-2 py-1 text-[11px] transition-colors"
              title="Call 07049658444"
            >
              <Phone className="w-3 h-3 text-[#c9a86a]" />
              <span>{CONTACT_INFO.phoneFormatted}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header with Collapsible Hamburger Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#050505]/95 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.85)] py-2.5 sm:py-3.5 border-b border-[#c9a86a]/30'
            : 'bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-xs py-3.5 sm:py-4.5 border-b border-[#c9a86a]/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Brand Logo */}
            <a href="#home" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-[#1b1713] dark:bg-[#141414] flex items-center justify-center text-[#c9a86a] shadow-[0_0_15px_rgba(201,168,106,0.25)] group-hover:shadow-[0_0_20px_rgba(201,168,106,0.5)] group-hover:scale-105 transition-all duration-300 border border-[#c9a86a]/60">
                <img
                  src={ASSETS.brandLogo}
                  alt="Abby Cakes Logo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-2xl font-bold tracking-[0.05em] text-[#1f1b16] dark:text-[#f5f2ed] group-hover:text-[#b38838] dark:group-hover:text-[#c9a86a] transition-colors leading-none">
                  Abby Cakes & Hampers
                </span>
                <span className="text-[9px] sm:text-[10px] italic tracking-[0.18em] text-[#b38838] dark:text-[#dfbe7f] font-serif mt-1">
                  ...enrich every moment
                </span>
              </div>
            </a>

            {/* ONLY HAMBURGER MENU BUTTON ON THE RIGHT (Zero horizontal nav buttons visible when closed) */}
            <div className="flex items-center gap-3 relative">
              <button
                ref={buttonRef}
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className={`inline-flex items-center gap-2.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border transition-all duration-300 cursor-pointer shadow-md select-none ${
                  menuOpen
                    ? 'bg-[#c9a86a] text-[#0a0a0a] border-[#c9a86a] shadow-[0_0_20px_rgba(201,168,106,0.45)]'
                    : 'bg-[#1b1713] dark:bg-[#141414] border-[#c9a86a]/50 hover:border-[#c9a86a] text-[#c9a86a] hover:text-[#dfbe7f] hover:bg-[#25201a] dark:hover:bg-[#1f1f1f]'
                }`}
                aria-label="Toggle navigation menu"
                aria-expanded={menuOpen}
              >
                {menuOpen ? (
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-current stroke-[2.5]" />
                ) : (
                  <MenuIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#c9a86a] stroke-[2.5]" />
                )}
                <span className="text-xs sm:text-[13px] uppercase font-bold tracking-[0.2em]">
                  MENU
                </span>
              </button>

              {/* DROPDOWN MENU DIRECTLY UNDERNEATH HAMBURGER */}
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    ref={menuRef}
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute right-0 top-full mt-3 w-[310px] sm:w-[360px] bg-[#14120f] text-[#f5f2ed] rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-[#c9a86a]/40 p-4 sm:p-5 z-50 overflow-hidden backdrop-blur-xl"
                  >
                    {/* Header bar inside dropdown */}
                    <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#c9a86a]/20">
                      <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#c9a86a]">
                        Navigation
                      </span>
                      <span className="text-[10px] uppercase tracking-wider text-white/50">
                        Abby Cakes & Hampers
                      </span>
                    </div>

                    {/* The 9 Navigation Items in Exact Order */}
                    <div className="flex flex-col space-y-1">
                      {navItems.map((item) => {
                        const isActive = activeSection === item.id;

                        // 4. Highlighted Pill for "MENU & HAMPERS"
                        if (item.type === 'pill') {
                          return (
                            <a
                              key={item.name}
                              href={item.href}
                              onClick={() => handleNavClick(item.href)}
                              className="flex items-center justify-between my-1 px-4 py-2.5 rounded-2xl bg-[#c9a86a]/20 border border-[#c9a86a]/70 text-[#dfbe7f] text-xs font-bold uppercase tracking-[0.16em] hover:bg-[#c9a86a]/30 transition-all shadow-xs"
                            >
                              <span>{item.name}</span>
                              <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#c9a86a]/30 text-[#dfbe7f] font-bold">
                                POPULAR
                              </span>
                            </a>
                          );
                        }

                        // 8. Action Button Style for "ESTIMATE CAKE"
                        if (item.type === 'outline-btn') {
                          return (
                            <a
                              key={item.name}
                              href={item.href}
                              onClick={() => handleNavClick(item.href)}
                              className="flex items-center justify-center gap-2 mt-2 px-4 py-2.5 rounded-2xl border border-[#c9a86a]/60 text-[#c9a86a] hover:text-[#dfbe7f] text-xs font-bold uppercase tracking-[0.16em] hover:bg-[#c9a86a]/15 transition-all text-center"
                            >
                              <Calculator className="w-3.5 h-3.5 text-[#c9a86a]" />
                              <span>{item.name}</span>
                            </a>
                          );
                        }

                        // 9. Action Button Style for "ORDER / INQUIRE"
                        if (item.type === 'gold-btn') {
                          return (
                            <a
                              key={item.name}
                              href={item.href}
                              onClick={() => handleNavClick(item.href)}
                              className="flex items-center justify-center gap-2 mt-1.5 px-4 py-3 rounded-2xl bg-[#c9a86a] hover:bg-[#dfbe7f] text-[#0a0a0a] text-xs font-bold uppercase tracking-[0.18em] shadow-[0_0_20px_rgba(201,168,106,0.35)] hover:shadow-[0_0_25px_rgba(201,168,106,0.5)] transition-all text-center"
                            >
                              <ShoppingBag className="w-4 h-4 text-[#0a0a0a]" />
                              <span>{item.name}</span>
                            </a>
                          );
                        }

                        // 1, 2, 3, 5, 6, 7. Standard Nav Link
                        return (
                          <a
                            key={item.name}
                            href={item.href}
                            onClick={() => handleNavClick(item.href)}
                            className={`flex items-center justify-between px-3.5 py-2 rounded-xl text-xs uppercase tracking-[0.16em] font-bold transition-all duration-150 ${
                              isActive
                                ? 'text-[#c9a86a] bg-[#c9a86a]/15 pl-4'
                                : 'text-white/80 hover:text-[#c9a86a] hover:bg-white/5'
                            }`}
                          >
                            <span>{item.name}</span>
                            <ChevronRight
                              className={`w-3.5 h-3.5 ${
                                isActive ? 'text-[#c9a86a]' : 'text-white/30'
                              }`}
                            />
                          </a>
                        );
                      })}
                    </div>

                    {/* Footer Inside Dropdown: Theme Toggle & Contacts */}
                    <div className="pt-3 mt-3 border-t border-[#c9a86a]/20 space-y-2.5">
                      <div className="flex items-center justify-between py-1.5 px-3 rounded-xl border border-[#c9a86a]/30 bg-[#0e0c0a]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">
                          Theme Mode
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleTheme()}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[#c9a86a]/40 text-[#c9a86a] bg-[#1a1714] hover:bg-[#25201a] transition-all cursor-pointer text-[10px] uppercase font-bold tracking-wider"
                        >
                          {theme === 'dark' ? (
                            <>
                              <Sun className="w-3 h-3 text-[#c9a86a]" />
                              <span>Light Mode</span>
                            </>
                          ) : (
                            <>
                              <Moon className="w-3 h-3 text-[#c9a86a]" />
                              <span>Dark Mode</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Direct WhatsApp Action in Dropdown */}
                      <a
                        href={CONTACT_INFO.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-400 text-xs font-bold uppercase tracking-wider transition-all"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 fill-emerald-400" />
                        <span>Chat Directly on WhatsApp</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
