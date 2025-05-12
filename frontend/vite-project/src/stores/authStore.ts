import { create } from "zustand";
import { supabase } from "../helper/supabaseClient";
import { AuthError, Session, User } from "@supabase/supabase-js";

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
};

type AuthActions = {
  initializeAuth: () => void;
  signUpNewUser: (email: string, password: string) => Promise<AuthResponse>;
  signInWithPassword: (
    email: string,
    password: string
  ) => Promise<AuthResponse>;
};

export const useAuthStore = create<AuthActions & AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  error: null,
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
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      set({
        user: session?.user ?? null,
        session: session
          ? {
              access_token: session.access_token,
              expires_at: session.expires_at,
            }
          : null,
        isLoading: false,
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        console.log(event);
        set({
          user: session?.user ?? null,
          session: session
            ? {
                access_token: session.access_token,
                expires_at: session.expires_at,
              }
            : null,
          isLoading: false,
        });
      });
      return () => subscription.unsubscribe();
    } catch (error) {
      set({
        error: error as AuthError,
        isLoading: false,
      });
    }
  },
}));
