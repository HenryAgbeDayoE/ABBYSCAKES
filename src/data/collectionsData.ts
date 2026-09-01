import { ProductCollection } from '../types';

// Import fallback local project image assets
import cakePng from '../assets/images/cake.png';
import weddingTierCakeImg from '../assets/images/wedding_tier_cake_1787074624506.jpg';
import bespokeBdayCakeImg from '../assets/images/bespoke_bday_cake_1787074640878.jpg';
import luxuryDessertHamperImg from '../assets/images/luxury_dessert_hamper_1787076109889.jpg';
import dessertTableSpreadImg from '../assets/images/dessert_table_spread_1787076126259.jpg';
import cremeCaramelPlateImg from '../assets/images/creme_caramel_plate_1787241419205.jpg';
import cateringHeroSpreadImg from '../assets/images/catering_hero_spread_1787074611221.jpg';

// Dynamically import all images from project directory: images/cakes, images/chops, images/pastries
const cakeModules = import.meta.glob('../../images/cakes/*.{JPG,jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const cakesImagesList = Object.values(cakeModules) as string[];

const chopsModules = import.meta.glob('../../images/chops/*.{JPG,jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const chopsImagesList = Object.values(chopsModules) as string[];

const pastriesModules = import.meta.glob('../../images/pastries/*.{JPG,jpg,jpeg,png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const pastriesImagesList = Object.values(pastriesModules) as string[];

export const PRODUCT_COLLECTIONS: ProductCollection[] = [
  {
    id: 'cakes',
    name: 'CAKES COLLECTION',
    category: 'cakes',
    categoryLabel: 'Custom & Celebration Cakes',
    subtitle: 'Wedding Cakes, Birthday Cakes, Custom Sculpted & Bespoke Designs',
    description:
      'Explore our complete catalogue of handcrafted artisanal cakes—from grand multi-tiered wedding showpieces and traditional engagement cakes to vibrant birthday confections and bespoke luxury designs.',
    items: [
      'Wedding & Engagement Cakes',
      'Birthday & Milestone Cakes',
      'Bespoke Luxury Cakes',
      "Children's Party Cakes",
      'Traditional Marriage Cakes',
      'Gourmet Slices',
    ],
    priceRange: 'From ₦45,000',
    coverImage: cakesImagesList[0] || weddingTierCakeImg,
    images: cakesImagesList.length > 0 ? cakesImagesList : [weddingTierCakeImg, cakePng, bespokeBdayCakeImg],
    highlight: `${cakesImagesList.length || 195}+ Photos`,
    featured: true,
  },
  {
    id: 'chops',
    name: 'SAVOURY & SMALL CHOPS COLLECTION',
    category: 'chops',
    categoryLabel: 'Finger Foods & Catering',
    subtitle: 'Crispy Samosas, Spring Rolls, Peppered Chicken & Savoury Platters',
    description:
      'Delectable hot small chops platters, golden spring rolls, spicy peppered chicken, puff-puff, gizdodo, and gourmet appetizers freshly prepared for all your events.',
    items: [
      'Small Chops Platters',
      'Samosa & Spring Rolls',
      'Spicy Peppered Chicken',
      'Golden Puff-Puff',
      'Gizdodo Bowls',
      'Event Catering Platters',
    ],
    priceRange: 'From ₦20,000',
    coverImage: chopsImagesList[0] || cateringHeroSpreadImg,
    images: chopsImagesList.length > 0 ? chopsImagesList : [cateringHeroSpreadImg, dessertTableSpreadImg, cremeCaramelPlateImg],
    highlight: `${chopsImagesList.length || 22} Photos`,
    featured: true,
  },
  {
    id: 'pastries',
    name: 'PASTRIES & BAKERY COLLECTION',
    category: 'pastries',
    categoryLabel: 'Artisanal Bakery & Confectionery',
    subtitle: 'Flaky Meat Pies, Chicken Pies, Croissants, Doughnuts & Baked Delights',
    description:
      'Freshly baked buttery pastries, savory meat pies, chicken pies, flaky croissants, glazed doughnuts, cinnamon rolls, and gourmet sweet baked goods.',
    items: [
      'Flaky Meat Pies',
      'Savory Chicken Pies',
      'Sausage Rolls',
      'Glazed & Filled Doughnuts',
      'Butter Croissants',
      'Cinnamon Rolls & Cookies',
    ],
    priceRange: 'From ₦12,000',
    coverImage: pastriesImagesList[0] || dessertTableSpreadImg,
    images: pastriesImagesList.length > 0 ? pastriesImagesList : [dessertTableSpreadImg, cremeCaramelPlateImg, luxuryDessertHamperImg],
    highlight: `${pastriesImagesList.length || 28} Photos`,
    featured: true,
  },
];
