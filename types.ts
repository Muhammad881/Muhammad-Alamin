
export enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED'
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  dietaryTags: string[];
  image: string;
  isChefSpecial?: boolean;
}

export interface Reservation {
  id: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  status: ReservationStatus;
  specialRequests?: string;
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

export interface RestaurantSettings {
  brandName: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  phone: string;
  email: string;
  address: string;
  storyImage: string;
  storyText: string;
  openingHours: {
    weekday: string;
    weekend: string;
  };
}

export interface AppState {
  menu: MenuItem[];
  reservations: Reservation[];
  inquiries: Inquiry[];
  settings: RestaurantSettings;
}
