export type GalleryCategory =
  | 'all'
  | 'wedding'
  | 'birthday'
  | 'hampers'
  | 'cupcakes_pastries'
  | 'dessert_tables'
  | 'cheesecakes_tarts';

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  categoryLabel: string;
  image: string;
  subtitle: string;
  description: string;
  tags: string[];
  servings: string;
  flavorProfile: string;
  price: string;
  priceValue?: number;
  highlight?: string;
  featured?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'cake_flavors' | 'hampers' | 'desserts' | 'cupcakes' | 'beverages';
  description: string;
  ingredients: string[];
  dietary: ('GF' | 'V' | 'VG' | 'DF' | 'NF' | 'Chef Special')[];
  image: string;
  pairingNote?: string;
  priceNote?: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  eventType: string;
  eventDate: string;
  rating: number;
  quote: string;
  cakeOrMenu: string;
  avatar: string;
}

export interface OrderFormData {
  fullName: string;
  phone: string;
  selectedCake: string;
  dateNeeded: string;
  deliveryType: 'delivery';
  location: string;
  message: string;
}

export type CollectionCategory =
  | 'all'
  | 'cakes'
  | 'pastries'
  | 'chops'
  | 'sweet'
  | 'hampers'
  | 'drinks';

export interface ProductCollection {
  id: string;
  name: string;
  category: CollectionCategory;
  categoryLabel: string;
  subtitle: string;
  description: string;
  items: string[];
  priceRange: string;
  firebasePaths?: string[];
  coverImage: string;
  images: string[];
  highlight?: string;
  featured?: boolean;
}

