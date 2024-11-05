// src/store/toplistStore.ts
import { create } from 'zustand';

type ToplistData = {
  id: number;
  name: string;
  experience: number;
};

type ToplistStore = {
  toplistData: ToplistData[];
  fetchToplistData: () => Promise<void>;
  updateToplistData: (newUsers: ToplistData[]) => void;
};

export const useToplistStore = create<ToplistStore>((set) => ({
  toplistData: [],

  fetchToplistData: async () => {
    try {
      const response = await fetch('/api/toplist');
      const data = await response.json();
      set({ toplistData: data });
    } catch (error) {
      console.error('Failed to fetch toplist data:', error);
    }
  },

  updateToplistData: (newUsers) => set({ toplistData: newUsers })
}));
