import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Phone,
  Mail,
  MapPin,
  Calendar,
  Send,
  CheckCircle2,
  Clock,
  MessageCircle,
  Instagram,
  ArrowRight,
  ShieldCheck,
  Truck,
  UploadCloud,
  Image as ImageIcon,
  Trash2,
  FileCheck,
  Wallet
} from 'lucide-react';
import { CONTACT_INFO, GALLERY_ITEMS } from '../data/cateringData';

interface ContactSectionProps {
  selectedCakeTitle?: string;
  onClearSelectedCake?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  selectedCakeTitle,
  onClearSelectedCake,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [cakeSelection, setCakeSelection] = useState(selectedCakeTitle || '');
  const [budget, setBudget] = useState('');
  const [dateNeeded, setDateNeeded] = useState('');
  const [message, setMessage] = useState('');
  const [deliveryType] = useState<'delivery'>('delivery');
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  // Custom reference image upload states
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadedFileSize, setUploadedFileSize] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update cake selection if prop changes
  React.useEffect(() => {
    if (selectedCakeTitle) {
      setCakeSelection(selectedCakeTitle);
    }
  }, [selectedCakeTitle]);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, JPEG, WEBP).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('Image size exceeds 10MB limit. Please select a smaller image.');
      return;
    }

    const sizeFormatted =
      file.size < 1024 * 1024
        ? `${(file.size / 1024).toFixed(1)} KB`
        : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setUploadedFileName(file.name);
      setUploadedFileSize(sizeFormatted);
      if (!cakeSelection) {
        setCakeSelection('Custom Design (Reference Photo Attached)');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedImage(null);
    setUploadedFileName('');
    setUploadedFileSize('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `ABBY-${Math.floor(1000 + Math.random() * 9000)}`;
    setReferenceId(ref);
    setSubmitted(true);
  };

  const handleWhatsAppSend = () => {
    const photoNote = uploadedImage
      ? `%0A*Custom Reference Photo:* Attached (${uploadedFileName || 'Custom Design Image'} - sending image right now in this chat)`
      : '';
    const budgetNote = budget ? `%0A*Estimated Budget:* ${budget}` : '';

    const text = `Hello Chef Abby, I would like to place an order from Abby Cakes & Hampers:%0A%0A` +
      `*Name:* ${fullName || 'Valued Client'}%0A` +
      `*Phone:* ${phone || 'Not provided'}%0A` +
      `*Cake / Item:* ${cakeSelection || (uploadedImage ? 'Custom Design (Reference Photo)' : 'Bespoke Order')}%0A` +
      `*Date Needed:* ${dateNeeded || 'To be discussed'}%0A` +
      `*Delivery Type:* ${deliveryType === 'delivery' ? 'Delivery in Lagos' : 'Studio Pickup'}` +
      `${budgetNote}` +
      `${photoNote}%0A` +
      `*Details & Message:* ${message || 'Please send details and account information.'}`;

    window.open(`https://wa.me/2348173252323?text=${text}`, '_blank');
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName('');
    setPhone('');
    setBudget('');
    setDateNeeded('');
    setMessage('');
    setUploadedImage(null);
    setUploadedFileName('');
    setUploadedFileSize('');
    if (onClearSelectedCake) onClearSelectedCake();
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#faf7f2] dark:bg-[#0d0c0b] relative overflow-hidden transition-colors duration-300">
      <div id="quote-calculator" className="sr-only" />
      <div id="estimate" className="sr-only" />
      <div id="how-to-order" className="sr-only" />
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a86a]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#c9a86a]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#c9a86a]/15 border border-[#c9a86a]/30 text-[#8a6520] dark:text-[#c9a86a] text-xs font-semibold uppercase tracking-widest mb-3">
            <span>How to Order & Contact Us</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1f1b16] dark:text-[#f5f2ed] mb-4">
            Let’s Create Your <span className="italic font-normal text-[#8a6520] dark:text-[#c9a86a]">Sweet Masterpiece</span>
          </h2>
          <p className="text-sm sm:text-base text-[#6b6155] dark:text-white/65 leading-relaxed">
            Ready to order your dream cake, custom milestone confection, or luxury gift hamper? Fill out the quick form below or reach Chef Abby directly on WhatsApp and phone.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Baker Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-[#151413] rounded-3xl p-6 sm:p-8 border border-[#c9a86a]/30 shadow-xl dark:shadow-2xl transition-colors duration-300">
              <h3 className="font-serif text-2xl font-bold text-[#1f1b16] dark:text-[#f5f2ed] mb-2">
                Baker’s Direct Contact
              </h3>
              <p className="text-xs sm:text-sm text-[#6b6155] dark:text-white/60 mb-6 leading-relaxed">
                Connect with Chef Abby for immediate confirmations, custom requests, and express deliveries.
              </p>

              <div className="space-y-4">
                {/* WhatsApp */}
                <a
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-[#faf7f2] dark:bg-[#1a1917] border border-[#25D366]/30 hover:border-[#25D366] transition-all group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-6 h-6 fill-[#25D366]/20" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#25D366]">WhatsApp Order Line</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#25D366]/20 text-[#25D366] font-semibold">Instant Reply</span>
                    </div>
                    <div className="text-base font-bold text-[#1f1b16] dark:text-[#f5f2ed] mt-0.5">{CONTACT_INFO.whatsappFormatted}</div>
                    <div className="text-xs text-[#6b6155] dark:text-white/50">Click to chat directly with Chef Abby</div>
                  </div>
                </a>

                {/* Direct Phone */}
                <a
                  href={CONTACT_INFO.phoneUrl}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-[#faf7f2] dark:bg-[#1a1917] border border-[#c9a86a]/25 hover:border-[#c9a86a] transition-all group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#c9a86a]/15 text-[#8a6520] dark:text-[#c9a86a] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#8a6520] dark:text-[#c9a86a]">Direct Phone Call</div>
                    <div className="text-base font-bold text-[#1f1b16] dark:text-[#f5f2ed] mt-0.5">{CONTACT_INFO.phoneFormatted}</div>
                    <div className="text-xs text-[#6b6155] dark:text-white/50">Mon – Sat: 8:00 AM – 7:00 PM</div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-[#faf7f2] dark:bg-[#1a1917] border border-[#c9a86a]/25 hover:border-[#c9a86a] transition-all group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#c9a86a]/15 text-[#8a6520] dark:text-[#c9a86a] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#8a6520] dark:text-[#c9a86a]">Official Email</div>
                    <div className="text-sm font-semibold text-[#1f1b16] dark:text-[#f5f2ed] mt-0.5 break-all">{CONTACT_INFO.email}</div>
                    <div className="text-xs text-[#6b6155] dark:text-white/50">For formal quotes & corporate orders</div>
                  </div>
                </a>

                {/* Delivery Information */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#faf7f2] dark:bg-[#1a1917] border border-[#c9a86a]/25">
                  <div className="w-12 h-12 rounded-xl bg-[#c9a86a]/15 text-[#8a6520] dark:text-[#c9a86a] flex items-center justify-center shrink-0">
                    <Truck className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#8a6520] dark:text-[#c9a86a]">Delivery Information</div>
                    <div className="text-sm font-semibold text-[#1f1b16] dark:text-[#f5f2ed] mt-0.5">{CONTACT_INFO.deliveryCoverage}</div>
                    <div className="text-xs text-[#6b6155] dark:text-white/50 mt-1">We offer door-to-door delivery only across Lagos.</div>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-6 mt-6 border-t border-[#c9a86a]/20 flex items-center justify-between">
                <span className="text-xs font-semibold text-[#6b6155] dark:text-white/60">Follow Our Creations:</span>
                <div className="flex items-center gap-3">
                  <a
                    href={CONTACT_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#faf7f2] dark:bg-[#1a1917] border border-[#c9a86a]/30 hover:border-[#c9a86a] text-xs font-semibold text-[#1f1b16] dark:text-[#f5f2ed] transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-[#E1306C]" />
                    <span>Instagram</span>
                  </a>
                  <a
                    href={CONTACT_INFO.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#faf7f2] dark:bg-[#1a1917] border border-[#c9a86a]/30 hover:border-[#c9a86a] text-xs font-semibold text-[#1f1b16] dark:text-[#f5f2ed] transition-colors"
                  >
                    <span className="font-bold text-xs">TT</span>
                    <span>TikTok</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Guarantee Box */}
            <div className="bg-white dark:bg-[#151413] rounded-2xl p-5 border border-[#c9a86a]/25 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#c9a86a]/15 text-[#8a6520] dark:text-[#c9a86a] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs text-[#6b6155] dark:text-white/70">
                <strong className="text-[#1f1b16] dark:text-[#f5f2ed] block font-semibold">100% Freshly Baked Guarantee</strong>
                Baked to perfection with premium butter, pure vanilla, and luxury Belgian chocolates.
              </div>
            </div>
          </div>

          {/* Right Column: Simple Direct Contact / Order Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#151413] rounded-3xl p-6 sm:p-10 border border-[#c9a86a]/40 shadow-xl dark:shadow-2xl transition-colors duration-300">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 rounded-full bg-[#c9a86a]/20 text-[#8a6520] dark:text-[#c9a86a] flex items-center justify-center mx-auto mb-5 border border-[#c9a86a]/40 shadow-lg">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <h3 className="font-serif text-3xl font-bold text-[#1f1b16] dark:text-[#f5f2ed] mb-2">
                      Order Request Received!
                    </h3>

                    <p className="text-sm text-[#6b6155] dark:text-white/70 max-w-md mx-auto mb-6 leading-relaxed">
                      Thank you, <strong className="text-[#1f1b16] dark:text-[#f5f2ed]">{fullName || 'Valued Client'}</strong>! Your order request for <strong className="text-[#8a6520] dark:text-[#c9a86a]">{cakeSelection || 'custom cake/hamper'}</strong> has been submitted. Chef Abby will contact you on <strong className="text-[#1f1b16] dark:text-[#f5f2ed]">{phone}</strong> shortly to confirm details.
                    </p>

                    <div className="bg-[#faf7f2] dark:bg-[#1b1a18] rounded-2xl p-5 border border-[#c9a86a]/25 max-w-md mx-auto mb-8 text-left text-xs sm:text-sm space-y-3">
                      <div className="flex justify-between">
                        <span className="text-[#6b6155] dark:text-white/50">Reference ID:</span>
                        <span className="font-bold text-[#8a6520] dark:text-[#c9a86a]">{referenceId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6b6155] dark:text-white/50">Selected Creation:</span>
                        <span className="font-semibold text-[#1f1b16] dark:text-[#f5f2ed] truncate max-w-[200px]">{cakeSelection || 'Bespoke Order'}</span>
                      </div>
                      {uploadedImage && (
                        <div className="flex items-center justify-between pt-2 border-t border-[#c9a86a]/20">
                          <span className="text-[#6b6155] dark:text-white/50">Reference Photo:</span>
                          <div className="flex items-center gap-2">
                            <img
                              src={uploadedImage}
                              alt="Uploaded Reference"
                              className="w-10 h-10 object-cover rounded-lg border border-[#c9a86a]/40 shadow-xs"
                            />
                            <span className="text-xs font-semibold text-[#8a6520] dark:text-[#c9a86a] truncate max-w-[120px]">
                              {uploadedFileName || 'Photo Attached'}
                            </span>
                          </div>
                        </div>
                      )}
                      {dateNeeded && (
                        <div className="flex justify-between">
                          <span className="text-[#6b6155] dark:text-white/50">Date Needed:</span>
                          <span className="font-semibold text-[#1f1b16] dark:text-[#f5f2ed]">{dateNeeded}</span>
                        </div>
                      )}
                      {budget && (
                        <div className="flex justify-between">
                          <span className="text-[#6b6155] dark:text-white/50">Budget / Target:</span>
                          <span className="font-semibold text-[#8a6520] dark:text-[#c9a86a]">{budget}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-[#6b6155] dark:text-white/50">Preference:</span>
                        <span className="font-semibold text-[#1f1b16] dark:text-[#f5f2ed] capitalize">{deliveryType}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={handleWhatsAppSend}
                        className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20b858] text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat on WhatsApp Now</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="w-full sm:w-auto px-6 py-3 rounded-full border border-[#c9a86a]/40 hover:bg-[#c9a86a]/15 text-xs font-semibold text-[#1f1b16] dark:text-[#f5f2ed] transition-colors cursor-pointer"
                      >
                        Submit Another Order
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1f1b16] dark:text-[#f5f2ed]">
                        Direct Order & Inquiry Form
                      </h3>
                      <p className="text-xs sm:text-sm text-[#6b6155] dark:text-white/60 mt-1">
                        Fill in your details below and we will contact you immediately.
                      </p>
                    </div>

                    {/* Preselected Item Banner if available */}
                    {cakeSelection && (
                      <div className="p-3.5 rounded-2xl bg-[#c9a86a]/15 border border-[#c9a86a]/40 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#8a6520] dark:text-[#c9a86a]" />
                          <span className="text-xs text-[#1f1b16] dark:text-[#f5f2ed]">
                            Selected Product: <strong className="font-bold text-[#8a6520] dark:text-[#c9a86a]">{cakeSelection}</strong>
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setCakeSelection('')}
                          className="text-[11px] font-semibold text-[#8a6520] dark:text-[#c9a86a] hover:underline cursor-pointer"
                        >
                          Change
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8a6520] dark:text-[#c9a86a] mb-1.5">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Sandra Adeleke"
                          className="w-full px-4 py-3 rounded-xl bg-[#faf7f2] dark:bg-[#1a1917] border border-[#c9a86a]/30 focus:border-[#c9a86a] focus:outline-hidden text-sm text-[#1f1b16] dark:text-[#f5f2ed] placeholder:text-[#8a8075] dark:placeholder:text-white/30"
                        />
                      </div>

                      {/* Phone / WhatsApp */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8a6520] dark:text-[#c9a86a] mb-1.5">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 08173252323"
                          className="w-full px-4 py-3 rounded-xl bg-[#faf7f2] dark:bg-[#1a1917] border border-[#c9a86a]/30 focus:border-[#c9a86a] focus:outline-hidden text-sm text-[#1f1b16] dark:text-[#f5f2ed] placeholder:text-[#8a8075] dark:placeholder:text-white/30"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Cake Selection */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8a6520] dark:text-[#c9a86a] mb-1.5">
                          Cake / Hamper Selection *
                        </label>
                        <select
                          value={cakeSelection}
                          onChange={(e) => setCakeSelection(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#faf7f2] dark:bg-[#1a1917] border border-[#c9a86a]/30 focus:border-[#c9a86a] focus:outline-hidden text-sm text-[#1f1b16] dark:text-[#f5f2ed]"
                        >
                          <option value="">Select a cake or hamper...</option>
                          <option value="Custom Design (Reference Photo Attached)">
                            Custom Design / Inspo (Upload Photo Below)
                          </option>
                          {GALLERY_ITEMS.map((item) => (
                            <option key={item.id} value={item.title}>
                              {item.title} ({item.price})
                            </option>
                          ))}
                          <option value="Custom Bespoke Birthday Cake">Custom Bespoke Birthday Cake</option>
                          <option value="Custom Bespoke Wedding Cake">Custom Bespoke Wedding Cake</option>
                          <option value="Custom Luxury Dessert Hamper">Custom Luxury Dessert Hamper</option>
                          <option value="Other Custom Sweet Order">Other Custom Sweet Order</option>
                        </select>
                      </div>

                      {/* Date Needed */}
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8a6520] dark:text-[#c9a86a] mb-1.5">
                          Date Needed / Event Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={dateNeeded}
                          onChange={(e) => setDateNeeded(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#faf7f2] dark:bg-[#1a1917] border border-[#c9a86a]/30 focus:border-[#c9a86a] focus:outline-hidden text-sm text-[#1f1b16] dark:text-[#f5f2ed]"
                        />
                      </div>
                    </div>

                    {/* Reference Photo Upload Zone for Custom Cakes/Designs */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8a6520] dark:text-[#c9a86a]">
                          Upload Reference Photo / Design Inspo (Optional)
                        </label>
                        <span className="text-[10px] text-[#6b6155] dark:text-white/50">PNG, JPG, WEBP up to 10MB</span>
                      </div>

                      {/* Hidden File Input */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        className="hidden"
                      />

                      {uploadedImage ? (
                        /* Uploaded Photo Preview Card */
                        <div className="p-4 rounded-2xl bg-[#faf7f2] dark:bg-[#1a1917] border border-[#c9a86a]/50 flex items-center justify-between gap-4 shadow-sm">
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-[#c9a86a]/40 flex-shrink-0 bg-black/10">
                              <img
                                src={uploadedImage}
                                alt="Cake reference preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#c9a86a]/20 text-[#8a6520] dark:text-[#c9a86a] text-[10px] font-bold">
                                  <FileCheck className="w-3 h-3 text-[#8a6520] dark:text-[#c9a86a]" />
                                  Photo Attached
                                </span>
                              </div>
                              <div className="text-xs sm:text-sm font-bold text-[#1f1b16] dark:text-[#f5f2ed] truncate mt-1">
                                {uploadedFileName || 'Custom Cake Reference'}
                              </div>
                              <div className="text-[11px] text-[#6b6155] dark:text-white/50">
                                {uploadedFileSize} • Ready for Chef Abby
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="px-3 py-1.5 rounded-lg bg-[#c9a86a]/15 hover:bg-[#c9a86a]/25 text-[11px] font-semibold text-[#8a6520] dark:text-[#c9a86a] transition-colors cursor-pointer"
                            >
                              Change
                            </button>
                            <button
                              type="button"
                              onClick={handleRemoveImage}
                              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 dark:text-red-400 transition-colors cursor-pointer"
                              title="Remove photo"
                              aria-label="Remove uploaded image"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* Drag & Drop Upload Zone */
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`border-2 border-dashed rounded-2xl p-5 sm:p-6 text-center cursor-pointer transition-all duration-200 ${
                            isDragging
                              ? 'border-[#c9a86a] bg-[#c9a86a]/15 scale-[1.01]'
                              : 'border-[#c9a86a]/35 hover:border-[#c9a86a] bg-[#faf7f2]/70 dark:bg-[#1a1917]/70 hover:bg-[#c9a86a]/5'
                          }`}
                        >
                          <div className="w-11 h-11 rounded-full bg-[#c9a86a]/15 text-[#8a6520] dark:text-[#c9a86a] flex items-center justify-center mx-auto mb-2.5">
                            <UploadCloud className="w-5 h-5" />
                          </div>
                          <div className="text-xs sm:text-sm font-bold text-[#1f1b16] dark:text-[#f5f2ed]">
                            If your desired cake isn’t in the selection bar, upload a photo here
                          </div>
                          <p className="text-[11px] text-[#6b6155] dark:text-white/60 mt-1 max-w-sm mx-auto">
                            Drag & drop your Pinterest photo, Instagram screenshot, or sketch, or <span className="text-[#8a6520] dark:text-[#c9a86a] font-semibold underline">browse from your device</span>
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Target Budget Selection & Custom Amount */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8a6520] dark:text-[#c9a86a] flex items-center gap-1.5">
                          <Wallet className="w-3.5 h-3.5 text-[#8a6520] dark:text-[#c9a86a]" />
                          <span>Your Target Budget (Optional)</span>
                        </label>
                        <span className="text-[10px] text-[#6b6155] dark:text-white/50">Helps us recommend the best size & design</span>
                      </div>

                      {/* Quick Budget Tiers */}
                      <div className="flex flex-wrap gap-2 mb-2.5">
                        {[
                          'Under ₦35,000',
                          '₦35,000 – ₦75,000',
                          '₦75,000 – ₦150,000',
                          '₦150,000 – ₦300,000',
                          '₦300,000+ (Luxury / Multi-Tier)'
                        ].map((tier) => (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => setBudget(budget === tier ? '' : tier)}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
                              budget === tier
                                ? 'bg-[#c9a86a] text-[#050505] border-[#c9a86a] font-bold shadow-xs'
                                : 'bg-[#faf7f2] dark:bg-[#1a1917] text-[#6b6155] dark:text-white/70 border-[#c9a86a]/25 hover:border-[#c9a86a]/60'
                            }`}
                          >
                            {tier}
                          </button>
                        ))}
                      </div>

                      {/* Custom Budget Input */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-sm font-bold text-[#8a6520] dark:text-[#c9a86a]">
                          ₦
                        </div>
                        <input
                          type="text"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          placeholder="Or enter custom budget (e.g. 50,000 or Flexible)"
                          className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-[#faf7f2] dark:bg-[#1a1917] border border-[#c9a86a]/30 focus:border-[#c9a86a] focus:outline-hidden text-sm text-[#1f1b16] dark:text-[#f5f2ed] placeholder:text-[#8a8075] dark:placeholder:text-white/30"
                        />
                      </div>
                    </div>

                    {/* Delivery Only Notice */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8a6520] dark:text-[#c9a86a] mb-1.5">
                        Fulfillment Method
                      </label>
                      <div className="py-2.5 px-4 rounded-xl bg-[#faf7f2] dark:bg-[#1a1917] border border-[#c9a86a]/30 text-xs font-semibold text-[#1f1b16] dark:text-[#f5f2ed] flex items-center gap-2">
                        <Truck className="w-4 h-4 text-[#8a6520] dark:text-[#c9a86a]" />
                        <span>🚚 Delivery available across Lagos</span>
                      </div>
                    </div>

                    {/* Message / Custom Details */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8a6520] dark:text-[#c9a86a] mb-1.5">
                        Message / Custom Inscriptions / Flavor Preference
                      </label>
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about the topper inscription, preferred flavor (e.g. Red Velvet, Vanilla Bean, Belgian Chocolate), delivery address, or special requests..."
                        className="w-full px-4 py-3 rounded-xl bg-[#faf7f2] dark:bg-[#1a1917] border border-[#c9a86a]/30 focus:border-[#c9a86a] focus:outline-hidden text-sm text-[#1f1b16] dark:text-[#f5f2ed] placeholder:text-[#8a8075] dark:placeholder:text-white/30"
                      />
                    </div>

                    {/* Submit Buttons */}
                    <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <button
                        type="submit"
                        className="flex-1 bg-[#c9a86a] hover:bg-[#dfbe7f] text-[#050505] py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(201,168,106,0.3)] transition-all cursor-pointer"
                      >
                        <Send className="w-4 h-4 text-[#050505]" />
                        <span>Submit Order Request</span>
                        <ArrowRight className="w-4 h-4 text-[#050505]" />
                      </button>

                      <button
                        type="button"
                        onClick={handleWhatsAppSend}
                        className="bg-[#25D366] hover:bg-[#20b858] text-white py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 fill-white" />
                        <span>Instant WhatsApp Order</span>
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
