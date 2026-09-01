import { GalleryItem, MenuItem, Testimonial } from '../types';

// Import generated local high-res cake and dessert assets
import cakePng from '../assets/images/cake.png';
import bespokeBdayCakeImg from '../assets/images/bespoke_bday_cake_1787074640878.jpg';
import kidsBdayPartyImg from '../assets/images/kids_birthday_party_1787074656742.jpg';
import luxuryDessertHamperImg from '../assets/images/luxury_dessert_hamper_1787076109889.jpg';
import dessertTableSpreadImg from '../assets/images/dessert_table_spread_1787076126259.jpg';
import cremeCaramelPlateImg from '../assets/images/creme_caramel_plate_1787241419205.jpg';

import abbyLogoImg from '../assets/images/abby_gold_logo_video_1787322416084.jpg';
import abbysCakesVid from '../assets/videos/abbys_cakes_vid_1.mp4';

export function getWhatsAppOrderUrl(itemName?: string, itemPrice?: string): string {
  if (itemName && itemPrice) {
    const message = `Hello Chef Abby! I would like to place an order for: ${itemName} - Price: ${itemPrice}. Please let me know how to proceed.`;
    return `https://wa.me/2348173252323?text=${encodeURIComponent(message)}`;
  }
  if (itemName) {
    const message = `Hello Chef Abby! I would like to place an order for: ${itemName}. Please let me know how to proceed.`;
    return `https://wa.me/2348173252323?text=${encodeURIComponent(message)}`;
  }
  const defaultMessage = 'Hello Chef Abby! I would like to place an order. Please let me know how to proceed.';
  return `https://wa.me/2348173252323?text=${encodeURIComponent(defaultMessage)}`;
}

export const CONTACT_INFO = {
  brandName: 'Abby Cakes & Hampers',
  brandHandle: '@abbycakesandhampers',
  whatsapp: '08173252323',
  whatsappUrl: 'https://wa.me/2348173252323',
  whatsappFormatted: '0817 325 2323',
  phone: '07049658444',
  phoneUrl: 'tel:07049658444',
  phoneFormatted: '0704 965 8444',
  email: 'infoabbycakes001@gmail.com',
  location: 'Delivery available across Lagos',
  deliveryCoverage: 'Delivery available across Lagos',
  instagramHandle: '@abbycakesandhampers',
  instagramUrl: 'https://instagram.com/abbycakesandhampers',
  tiktokHandle: '@abbycakesandhampers',
  tiktokUrl: 'https://tiktok.com/@abbycakesandhampers',
  businessHours: 'Mon – Sat: 8:00 AM – 7:00 PM | Sun: 10:00 AM – 5:00 PM',
};

export const ASSETS = {
  heroSpread: dessertTableSpreadImg,
  luxuryHamper: luxuryDessertHamperImg,
  weddingTier: cakePng,
  bespokeBday: bespokeBdayCakeImg,
  kidsCelebration: kidsBdayPartyImg,
  brandVideo: abbysCakesVid,
  brandLogo: abbyLogoImg,
};

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'item-1',
    title: 'The Royal Monogram Ivory Wedding Tier',
    category: 'wedding',
    categoryLabel: 'Wedding Cake',
    image: cakePng,
    subtitle: '3-Tier Ivory Fondant with Handcrafted Ruffles & Mirror Gold Monogram',
    description: 'A bridal centerpiece featuring delicate sugar lace ruffles cascading down three tiers, adorned with fresh sugar garden roses, textured pearl beading, and a custom mirror gold O&O monogram topper.',
    tags: ['Wedding', '3-Tier', 'Sugar Roses', 'Gold Monogram', 'Handmade'],
    servings: '120 - 150 Guests',
    flavorProfile: 'Madagascar Vanilla Bean Sponge with Champagne Berry Confit & White Chocolate Mousse',
    price: '',
    priceValue: 250000,
    highlight: 'Bridal Masterpiece',
    featured: true,
  },
  {
    id: 'item-2',
    title: 'Velvet Rose & 24K Gold Celebration Cake',
    category: 'birthday',
    categoryLabel: 'Birthday Cake',
    image: bespokeBdayCakeImg,
    subtitle: 'Ribbed Blush Buttercream with Fresh Crimson Roses & Gold Leaf',
    description: 'Textured horizontal ribbed blush buttercream cylinder topped with edible 24K gold foil trim, deep ruby red roses, candy pearls, and an acrylic gold Happy Birthday Akankemi statement topper.',
    tags: ['Birthday', 'Fresh Roses', 'Gold Leaf', 'Ribbed Buttercream'],
    servings: '25 - 35 Guests',
    flavorProfile: 'Red Velvet Sponge layered with Tahitian Cream Cheese Frosting & Salted Caramel',
    price: '',
    priceValue: 65000,
    highlight: 'Bestseller',
    featured: true,
  },
  {
    id: 'item-3',
    title: 'Abby Grand Royal Sweet Hamper',
    category: 'hampers',
    categoryLabel: 'Luxury Dessert Hampers',
    image: luxuryDessertHamperImg,
    subtitle: 'Curated French Macarons, Gold Chocolate Truffles, Mini Bento Cake & Treats',
    description: 'The ultimate luxury celebration gift box packed in a signature ribboned hamper box. Includes artisanal pastel French macarons, handmade Belgian chocolate truffles, gourmet cookies, chocolate-dipped strawberries, and a custom mini bento celebration cake.',
    tags: ['Gift Hamper', 'French Macarons', 'Belgian Truffles', 'Bento Cake', 'Luxury Ribbon'],
    servings: 'Gift for 1-6 people or VIP Celebration',
    flavorProfile: 'Belgian Dark Ganache, Salted Caramel, Pistachio & Wild Raspberry',
    price: '',
    priceValue: 55000,
    highlight: 'Signature Hamper',
    featured: true,
  },
  {
    id: 'item-4',
    title: 'The Joyful Milestone Birthday Confection',
    category: 'birthday',
    categoryLabel: 'Birthday Cake',
    image: kidsBdayPartyImg,
    subtitle: 'Whimsical Floral Pastel Cake with Golden Balloons & Sparkle',
    description: 'Created for milestone celebrations, featuring whimsical pastel pressed florals, soft vanilla buttercream, golden party balloons, and candle tiers made to light up unforgettable smiles.',
    tags: ['Milestone Birthday', 'Pastel Florals', 'Golden Theme', 'Party Star'],
    servings: '20 - 30 Guests',
    flavorProfile: 'Rainbow Confetti Vanilla Cake with Strawberry Swiss Meringue & White Chocolate Ganache',
    price: '',
    priceValue: 50000,
    highlight: 'Popular Choice',
    featured: true,
  },
  {
    id: 'item-5',
    title: 'Grand Banquet Dessert & Sweet Table',
    category: 'dessert_tables',
    categoryLabel: 'Dessert Tables & Sweets',
    image: dessertTableSpreadImg,
    subtitle: 'Extravagant Multi-Tier Dessert Station with Parfaits, Eclairs & Tartlets',
    description: 'A lavish sweet table setup featuring custom floral cupcakes, glass dessert shooters, gold-dusted French berry tartlets, craquelin cream choux, and tiered centerpiece confections tailored to your event palette.',
    tags: ['Dessert Table', 'Sweet Station', 'Cupcakes', 'Glass Shooters', 'Event Styling'],
    servings: '50 - 300+ Guests',
    flavorProfile: 'Diverse sweet profile from tart passionfruit to deep Belgian chocolate',
    price: '',
    priceValue: 180000,
    highlight: 'Event Sweet Table',
    featured: true,
  },
  {
    id: 'item-6',
    title: 'Four-Tier Architectural Golden Orchid Wedding Cake',
    category: 'wedding',
    categoryLabel: 'Wedding Cake',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'Crisp Swiss Buttercream with Gilded Sugar Orchids & Gold Leaf',
    description: 'Sleek cylindrical geometry meeting romantic botanicals. Four stately tiers iced in sharp-edged Swiss meringue buttercream with 24K gold leaf edging and handcrafted white sugar orchids.',
    tags: ['Wedding', '4-Tier', 'Sugar Orchids', 'Modern Geometry', 'Architectural'],
    servings: '180 - 250 Guests',
    flavorProfile: 'Lemon Elderflower & Passionfruit Curd with Vanilla Bean Buttercream',
    price: '',
    priceValue: 350000,
    highlight: 'Grand Luxury',
  },
  {
    id: 'item-7',
    title: 'Abby Celebration Treat Box & Bento Cake Combo',
    category: 'hampers',
    categoryLabel: 'Luxury Dessert Hampers',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'Personalized Bento Cake + 5 Gourmet Cupcakes + Macarons & Chocolate Pearls',
    description: 'Our most popular gifting combination featuring a custom decorated 4-inch mini cake paired with matching luxury piped cupcakes, handcrafted chocolate spheres, and sweet confections.',
    tags: ['Bento Cake Box', 'Cupcake Combo', 'Birthday Gift', 'Express Delivery'],
    servings: 'Gift for 2-4 People',
    flavorProfile: 'Customizable sponge and frosting flavors of your choice',
    price: '',
    priceValue: 28000,
    highlight: 'Trending Gift',
  },
  {
    id: 'item-8',
    title: 'Luxe Pastel French Macaron Tower & Gift Box',
    category: 'cupcakes_pastries',
    categoryLabel: 'Cupcakes & Pâtisserie',
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'Hand-Crafted Macarons in Pistachio, Rose, Salted Caramel & Vanilla',
    description: 'Crisp and delicate French almond shells filled with silky white chocolate ganache, raspberry coulis, and salted caramel, assembled in freestanding towers or curated gift boxes.',
    tags: ['Macaron Tower', 'French Patisserie', 'Pastel Elegance', 'Gift Box'],
    servings: 'Towers of 30 to 100 Pieces',
    flavorProfile: 'Pistachio Rose, Salted Caramel Dulce, Vanilla Bean, Passion Fruit',
    price: '',
    priceValue: 35000,
    highlight: 'Bridal & Gift Favorite',
  },
  {
    id: 'item-9',
    title: 'Emerald Forest Dark Chocolate Drip Cake',
    category: 'birthday',
    categoryLabel: 'Birthday Cake',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'Rich Valrhona Chocolate, Salted Hazelnut Praline & Dark Ganache Drip',
    description: 'A decadent celebration cake wrapped in deep forest green watercolor buttercream, glossy dark chocolate drip, gold luster cherries, and candied rosemary.',
    tags: ['Decadent Chocolate', 'Birthday Milestone', 'Dark Ganache', 'Gourmet Flavor'],
    servings: '30 - 40 Guests',
    flavorProfile: '70% Valrhona Dark Chocolate with Espresso Soak & Roasted Hazelnut Crunch',
    price: '',
    priceValue: 60000,
    highlight: 'Rich Chocolate Lover',
  },
  {
    id: 'item-10',
    title: 'Artisan Botanical Cupcake Floral Bouquet (Box of 12)',
    category: 'cupcakes_pastries',
    categoryLabel: 'Cupcakes & Pâtisserie',
    image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'Piped Russian Tip Buttercream Roses, Peonies & Hydrangeas',
    description: 'Boxed luxury cupcake sets piped like a blooming botanical garden. Each cupcake is an individual work of art made with organic vanilla sponge and silky Swiss buttercream.',
    tags: ['Cupcakes', 'Floral Buttercream', 'Gift Box', 'Artisan Piped'],
    servings: '12 Gourmet Cupcakes',
    flavorProfile: 'Vanilla Bean, Salted Caramel, Red Velvet & Rich Chocolate',
    price: '',
    priceValue: 30000,
    highlight: 'Gift Box Favorite',
  },
  {
    id: 'item-11',
    title: 'Glazed Fresh Berry & Vanilla Cream Tartlet Platter',
    category: 'cheesecakes_tarts',
    categoryLabel: 'Tarts & Cheesecakes',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80',
    subtitle: 'Sweet Shortcrust Pastry with Madagascar Vanilla Creme Patissiere',
    description: 'Crisp golden sweet butter pastry filled with rich vanilla diplomat cream and piled high with fresh glazed strawberries, raspberries, blackberries, and gold leaf flake.',
    tags: ['Berry Tartlets', 'Crème Pâtissière', 'Shortcrust', 'French Dessert'],
    servings: 'Platter of 20 Tartlets',
    flavorProfile: 'Buttery crisp crust, velvety custard, tangy fresh berries',
    price: '',
    priceValue: 40000,
    highlight: 'Fresh & Light Favorite',
  },
  {
    id: 'item-12',
    title: 'Gourmet French Crème Caramel Dessert Plate',
    category: 'cheesecakes_tarts',
    categoryLabel: 'Tarts & Confections',
    image: cremeCaramelPlateImg,
    subtitle: 'Silky Bourbon Vanilla Custard with Rich Golden Amber Caramel Reduction',
    description: 'A classic French dessert confection crafted with farm-fresh egg yolks, pure whole cream, and fragrant Madagascar bourbon vanilla beans, gently unmolded onto fine porcelain with a rich golden amber caramel reduction.',
    tags: ['Crème Caramel', 'French Custard', 'Caramel Glaze', 'Classic Dessert'],
    servings: 'Plated Confection (Individual / Party Set)',
    flavorProfile: 'Silky smooth vanilla bean custard, velvety caramelized sugar syrup, light citrus undertone',
    price: '',
    priceValue: 20000,
    highlight: 'French Classic',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    clientName: 'Akankemi & Folake O.',
    eventType: 'Milestone Birthday & Luxury Celebration',
    eventDate: 'June 2026',
    rating: 5,
    quote: 'The bespoke ribbed pink rose cake with the gold topper from Abby Cakes & Hampers was the undeniable star of our party! The red velvet salted caramel flavor was moist and rich. The luxury dessert hamper for our VIP guests was packaged so elegantly. Fast response on WhatsApp!',
    cakeOrMenu: 'Bespoke Akankemi Rose Gold Cake & Royal Hamper',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 't-2',
    clientName: 'Olumide & Danielle S.',
    eventType: '300-Guest Luxury Wedding Reception',
    eventDate: 'May 2026',
    rating: 5,
    quote: 'Our 3-tier custom monogram wedding cake (the O&O design) was absolute perfection down to every sugar pearl and ruffle. Abby Cakes & Hampers also set up a majestic sweet table with French macarons, dessert shooters, and cupcakes. Delivered right on time!',
    cakeOrMenu: '3-Tier Monogram Wedding Cake & Sweet Table',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 't-3',
    clientName: 'Jessica & Briana’s Family',
    eventType: '5th Birthday Celebration Extravaganza',
    eventDate: 'July 2026',
    rating: 5,
    quote: 'Briana couldn’t stop smiling seeing her whimsical birthday cake! The colors, the balloons, the floral details, and the kids’ treat boxes were magical. Fast communication on WhatsApp (08173252323) and super smooth delivery. Truly 10/10 service!',
    cakeOrMenu: 'Floral Pastel Party Cake & Treat Boxes',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  },
];

export const CHEF_HIGHLIGHTS = {
  story: 'With over a decade of artisanal confectionery experience, Chef Abby merges classic French pâtisserie techniques with contemporary celebratory design. Each cake is baked from scratch using pure creamery butter, Belgian chocolates, and fresh farm ingredients.',
  awards: [
    '100% Scratch-Baked Confections',
    'White-Glove Refrigerated Delivery in Lagos',
    'Custom Sugar Art & Mirror Gold Toppers',
    'Premium Belgian & French Ingredients',
  ],
};

export const FAQS = [
  {
    q: 'How do I place an order?',
    a: 'Simply browse our cake and hamper collection above and click "Order Now" on any item! It will instantly open a pre-filled WhatsApp chat with Chef Abby (+2348173252323) specifying the item and price to proceed with payment and scheduling.',
  },
  {
    q: 'How far in advance should I place my order?',
    a: 'For birthday cakes, bento boxes, and luxury dessert hampers, 2 to 5 days advance notice is ideal. For multi-tier wedding cakes and full dessert stations, we recommend booking 2 to 4 weeks ahead. Express/rush orders are also welcomed when our schedule permits.',
  },
  {
    q: 'Do you deliver across Lagos and other states?',
    a: 'Yes! We provide safe, air-conditioned vehicle delivery across Lagos (Island, Lekki, Ikoyi, Ikeja, Mainland) and nationwide courier dispatch for our luxury gift hampers.',
  },
  {
    q: 'Can I customize the cake design, flavor, or topper text?',
    a: 'Absolutely! Every cake can be personalized with your custom message/name on acrylic toppers, customized color schemes, and preferred flavors (Red Velvet, Vanilla Bean, Chocolate Ganache, Lemon Elderflower, etc.).',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept direct bank transfers, online payment receipts, and corporate invoicing. We confirm all orders once the deposit or payment receipt is verified on WhatsApp.',
  },
];
