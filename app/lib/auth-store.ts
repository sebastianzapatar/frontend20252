import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  token: string | null;
  email: string | null;
  // hidratación
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;

  setAuth: (token: string, email?: string | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      email: null,
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),

      setAuth: (token, email = null) => set({ token, email }),
      clearAuth: () => set({ token: null, email: null }),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
      // cuando termina de hidratar desde localStorage marcamos el flag
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
