/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedCreations } from './components/FeaturedCreations';
import { Gallery } from './components/Gallery';
import { GalleryLightbox } from './components/GalleryLightbox';
import { WhyUs } from './components/WhyUs';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { GalleryItem } from './types';
import { getWhatsAppOrderUrl } from './data/cateringData';

export default function App() {
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [selectedCakeForOrder, setSelectedCakeForOrder] = useState<string>('');

  const handleOrderNow = (cakeTitle?: string, cakePrice?: string) => {
    if (cakeTitle) {
      setSelectedCakeForOrder(cakeTitle);
    }
    const url = getWhatsAppOrderUrl(cakeTitle, cakePrice);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleExploreGallery = () => {
    const productsEl = document.getElementById('products');
    if (productsEl) {
      productsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-[#1f1b16] dark:text-[#f5f2ed] flex flex-col font-sans selection:bg-[#c9a86a]/30 selection:text-[#1f1b16] dark:selection:text-[#f5f2ed] transition-colors duration-300">
      {/* Navigation Header */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onExploreGallery={handleExploreGallery}
          onOpenContact={handleOpenContact}
        />

        <FeaturedCreations
          onSelectItem={setSelectedGalleryItem}
          onOrderNow={handleOrderNow}
        />

        <Gallery
          onSelectItem={setSelectedGalleryItem}
          onOrderNow={handleOrderNow}
        />

        <WhyUs />

        <Testimonials />

        {/* Streamlined Contact / How to Order Section */}
        <ContactSection
          selectedCakeTitle={selectedCakeForOrder}
          onClearSelectedCake={() => setSelectedCakeForOrder('')}
        />
      </main>

      {/* Footer with FAQs and Direct Channels */}
      <Footer onOpenContact={handleOpenContact} />

      {/* High-Resolution Photo Lightbox */}
      <GalleryLightbox
        item={selectedGalleryItem}
        onClose={() => setSelectedGalleryItem(null)}
        onOrderNow={handleOrderNow}
      />
    </div>
  );
}
