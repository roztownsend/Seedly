import { create } from "zustand";
import { supabase } from "../helper/supabaseClient";
import { AuthError, Session, Subscription, User } from "@supabase/supabase-js";

type ClientSession = {
  access_token: string;
  expires_at?: number;
} | null;

type AuthResponse = {
  success: boolean;
  data?: {
    user: User | null;
    session: Session | null;
  };
  error?: AuthError | null;
};

type AuthState = {
  user: User | null;
  session: ClientSession;
  isLoading: boolean;
  error: AuthError | null;
  authSubscription: Subscription | null;
};

type AuthActions = {
  initializeAuth: () => void;
  signUpNewUser: (email: string, password: string) => Promise<AuthResponse>;
  signInWithPassword: (
    email: string,
    password: string
  ) => Promise<AuthResponse>;
  signOutUser: () => void;
};

export const useAuthStore = create<AuthActions & AuthState>((set, get) => ({
  user: null,
  session: null,
  isLoading: true,
  error: null,
  authSubscription: null,
  signUpNewUser: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        console.error("There was a problem signing up ", error);
        return { success: false, error };
      }
      return { success: true, data };
    } catch (error) {
      console.error("Unexpected error: ", error);
      return { success: false, error: error as AuthError };
    }
  },
  signInWithPassword: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) {
        console.error("There was a proble signing up ", error);
        return { success: false, error };
      }
      return { success: true, data };
    } catch (error) {
      console.error("Unexpected error: ", error);
      return { success: false, error: error as AuthError };
    }
  },
  initializeAuth: async () => {
    if (!get().isLoading) {
      set({ isLoading: true });
    }

    const existringSubscription = get().authSubscription;

    if (existringSubscription) {
      existringSubscription.unsubscribe();
    }

    console.log("initializeAuth: Attempting to get session...");
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        set({
          error: error,
          isLoading: false,
        });
        return;
      }

      set((state) => ({
        ...state,
        user: session?.user ?? null,
        session: session
          ? {
              access_token: session.access_token,
              expires_at: session.expires_at,
            }
          : null,
      }));
      const {
        data: { subscription: newSubscription },
      } = supabase.auth.onAuthStateChange((event, eventSession) => {
        console.log(
          `onAthStateChange - Event ${event} Session ${eventSession}`
        );
        set({
          user: eventSession?.user ?? null,
          session: eventSession
            ? {
                access_token: eventSession.access_token,
                expires_at: eventSession.expires_at,
              }
            : null,
          isLoading: false,
          error: null,
          authSubscription: get().authSubscription,
        });
      });
      set({
        authSubscription: newSubscription,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error as AuthError,
        isLoading: false,
      });
    }
  },
  signOutUser: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Something unexpected occured when logging out", error);
    }
  },
}));
