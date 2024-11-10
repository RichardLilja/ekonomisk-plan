import { create } from "zustand";

export interface UserInterfaceState {
  overlay: boolean;
  setOverlay: (overlay: boolean) => void;

  sidebar: boolean;
  setSidebar: (sidebar: boolean) => void;

  slideMode: boolean;
  setSlideMode: (slideMode: boolean) => void;

  bottomPanel: boolean;
  setBottomPanel: (bottomPanel: boolean) => void;

  bottomPanelSmallWidgets: boolean;
  setBottomPanelSmallWidgets: (bottomPanelSmallWidgets: boolean) => void;

  counselling: boolean;
  setCounselling: (couselling: boolean) => void;
}

const useUserInterfaceState = create<UserInterfaceState>((set) => ({
  overlay: false,
  setOverlay: (overlay) => set({ overlay }),

  sidebar: false,
  setSidebar: (sidebar) => set({ sidebar }),

  slideMode: false,
  setSlideMode: (slideMode) => set({ slideMode }),

  bottomPanel: false,
  setBottomPanel: (bottomPanel) => set({ bottomPanel }),

  bottomPanelSmallWidgets: true,
  setBottomPanelSmallWidgets: (bottomPanelSmallWidgets) =>
    set({ bottomPanelSmallWidgets }),

  counselling: true,
  setCounselling: (counselling) => set({ counselling }),
}));

export default useUserInterfaceState;
