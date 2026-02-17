
import { Reservation, Inquiry } from '../types';

const DB_NAME = 'GoodPlattersDB';
const DB_VERSION = 1;
const STORES = {
  RESERVATIONS: 'reservations',
  INQUIRIES: 'inquiries'
};

export const dbService = {
  initDB: (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORES.RESERVATIONS)) {
          db.createObjectStore(STORES.RESERVATIONS, { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains(STORES.INQUIRIES)) {
          db.createObjectStore(STORES.INQUIRIES, { keyPath: 'id' });
        }
      };

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  addReservation: async (reservation: Reservation): Promise<void> => {
    const db = await dbService.initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORES.RESERVATIONS, 'readwrite');
      const store = transaction.objectStore(STORES.RESERVATIONS);
      const request = store.add(reservation);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  },

  getAllReservations: async (): Promise<Reservation[]> => {
    const db = await dbService.initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORES.RESERVATIONS, 'readonly');
      const store = transaction.objectStore(STORES.RESERVATIONS);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  updateReservation: async (reservation: Reservation): Promise<void> => {
    const db = await dbService.initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORES.RESERVATIONS, 'readwrite');
      const store = transaction.objectStore(STORES.RESERVATIONS);
      const request = store.put(reservation);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  },

  addInquiry: async (inquiry: Inquiry): Promise<void> => {
    const db = await dbService.initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORES.INQUIRIES, 'readwrite');
      const store = transaction.objectStore(STORES.INQUIRIES);
      const request = store.add(inquiry);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  },

  getAllInquiries: async (): Promise<Inquiry[]> => {
    const db = await dbService.initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORES.INQUIRIES, 'readonly');
      const store = transaction.objectStore(STORES.INQUIRIES);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  deleteInquiry: async (id: string): Promise<void> => {
    const db = await dbService.initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORES.INQUIRIES, 'readwrite');
      const store = transaction.objectStore(STORES.INQUIRIES);
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }
};
