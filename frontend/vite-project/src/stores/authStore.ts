import { create } from "zustand";
import { supabase } from "../helper/supabaseClient";
import { AuthError, Session, User } from "@supabase/supabase-js";

type AuthResponse = {
  success: boolean;
  data?: {
    user: User | null;
    session: Session | null;
  };
  error?: AuthError | null;
};

type Auth = {
  signUpNewUser: (email: string, password: string) => Promise<AuthResponse>;
};

export const useAuthStore = create<Auth>(() => ({
  signUpNewUser: async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signUp({
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
}));
