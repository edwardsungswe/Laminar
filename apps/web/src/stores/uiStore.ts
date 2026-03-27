import { create } from "zustand";

interface UIState {
  sidebarCollapsed: boolean;
  activeFolder: string;
  selectedEmailId: string | null;
  activeFilter: string;
  toggleSidebar: () => void;
  setActiveFolder: (folder: string) => void;
  setSelectedEmail: (id: string | null) => void;
  setActiveFilter: (filter: string) => void;
}

export const useUIStore = create<UIState>()((set) => ({
  sidebarCollapsed: false,
  activeFolder: "inbox",
  selectedEmailId: null,
  activeFilter: "inbox",
  toggleSidebar: () =>
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setActiveFolder: (folder) => set({ activeFolder: folder }),
  setSelectedEmail: (id) => set({ selectedEmailId: id }),
  setActiveFilter: (filter) => set({ activeFilter: filter }),
}));
