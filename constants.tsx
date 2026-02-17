
import { MenuItem, ReservationStatus, RestaurantSettings, Reservation } from './types';

export const INITIAL_MENU: MenuItem[] = [
  {
    id: '1',
    name: 'Grilled Atlantic Salmon',
    category: 'Mains',
    price: 28.50,
    description: 'Fresh Atlantic salmon grilled with lemon butter sauce, served with seasonal asparagus and jasmine rice.',
    dietaryTags: ['GF'],
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80',
    isChefSpecial: true
  },
  {
    id: '2',
    name: 'Truffle Mushroom Risotto',
    category: 'Mains',
    price: 24.00,
    description: 'Creamy Arborio rice with wild mushrooms, white truffle oil, and shaved Parmesan.',
    dietaryTags: ['V', 'GF'],
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80',
    isChefSpecial: false
  },
  {
    id: '3',
    name: 'Wagyu Beef Burger',
    category: 'Mains',
    price: 22.00,
    description: 'Premium Wagyu beef, aged cheddar, caramelized onions, and house-made aioli on a brioche bun.',
    dietaryTags: [],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    isChefSpecial: true
  },
  {
    id: '4',
    name: 'Classic Caesar Salad',
    category: 'Appetizers',
    price: 14.00,
    description: 'Crisp romaine, sourdough croutons, anchovies, and traditional Caesar dressing.',
    dietaryTags: ['V'],
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_SETTINGS: RestaurantSettings = {
  brandName: 'Good Platters',
  tagline: 'Modern casual dining with a soulful touch.',
  primaryColor: '#f97316', // Orange 500
  secondaryColor: '#1e293b', // Slate 800
  phone: '(555) 123-4567',
  email: 'hello@goodplatters.com',
  address: '123 Culinary Ave, Foodie City, FC 54321',
  storyImage: 'https://images.unsplash.com/photo-1577214411470-125ad8060ca2?auto=format&fit=crop&w=1200&q=80',
  storyText: 'Good Platters began with a simple dream: to bring the freshness of the farm to the warmth of a local neighborhood table. Our journey started in 2008 in a small kitchen with big ambitions.\n\nToday, we are proud to be a staple in the community, known for our innovative approach to traditional dishes and our unwavering commitment to local sourcing. Every ingredient we use is selected for its quality, sustainability, and story.',
  openingHours: {
    weekday: '11:00 AM - 10:00 PM',
    weekend: '10:00 AM - 11:30 PM'
  }
};

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'r1',
    date: '2024-05-20',
    time: '19:00',
    guests: 4,
    name: 'John Smith',
    email: 'john@example.com',
    phone: '555-0101',
    status: ReservationStatus.CONFIRMED,
    createdAt: new Date().toISOString()
  }
];
