
import { AppState, MenuItem, Reservation, Inquiry, RestaurantSettings } from '../types';
import { INITIAL_MENU, INITIAL_SETTINGS, INITIAL_RESERVATIONS } from '../constants';

const STORAGE_KEY = 'good_platters_cms_data';

export const storageService = {
  getData: (): AppState => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      const initial: AppState = {
        menu: INITIAL_MENU,
        reservations: INITIAL_RESERVATIONS,
        inquiries: [],
        settings: INITIAL_SETTINGS
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  },

  saveData: (data: AppState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  updateSettings: (settings: RestaurantSettings) => {
    const data = storageService.getData();
    data.settings = settings;
    storageService.saveData(data);
  },

  addReservation: (reservation: Omit<Reservation, 'id' | 'status' | 'createdAt'>) => {
    const data = storageService.getData();
    const newRes: Reservation = {
      ...reservation,
      id: Math.random().toString(36).substr(2, 9),
      status: 'PENDING' as any,
      createdAt: new Date().toISOString()
    };
    data.reservations.push(newRes);
    storageService.saveData(data);
    return newRes;
  },

  updateReservationStatus: (id: string, status: any) => {
    const data = storageService.getData();
    const idx = data.reservations.findIndex(r => r.id === id);
    if (idx !== -1) {
      data.reservations[idx].status = status;
      storageService.saveData(data);
    }
  },

  upsertMenuItem: (item: MenuItem) => {
    const data = storageService.getData();
    const idx = data.menu.findIndex(m => m.id === item.id);
    if (idx !== -1) {
      data.menu[idx] = item;
    } else {
      data.menu.push(item);
    }
    storageService.saveData(data);
  },

  deleteMenuItem: (id: string) => {
    const data = storageService.getData();
    data.menu = data.menu.filter(m => m.id !== id);
    storageService.saveData(data);
  }
};
