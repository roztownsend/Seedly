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
      // Sign up a new user to the Supabase authentication database.
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      // Errors may include cases like 'email already being in use'.
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
      // Attempt to sign in the user using Supabase email/password authentication.
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      // Handle potential sign-in errors (e.g., invalid credentials).
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
  initializeAuth: async () => {
    // Make sure loading state is true while initializing.
    if (!get().isLoading) {
      set({ isLoading: true });
    }

    // If there's an existring subscription, unsubscribe to avoid duplicates.
    const existingSubscription = get().authSubscription;

    if (existingSubscription) {
      existingSubscription.unsubscribe();
    }

    console.log("initializeAuth: Attempting to get session...");

    try {
      // Attempt to retrive the current session.
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
      let activeSession = session;
      if (!activeSession) {
        console.log("No session found, signin in anonymously");
        const {
          data: { session: anonSession },
          error: anonError,
        } = await supabase.auth.signInAnonymously();
        if (anonError) {
          set({ error: anonError, isLoading: false });
          return;
        }
        activeSession = anonSession;
      }
      // Update state with session and user data.
      set({
        user: activeSession?.user ?? null,
        session: activeSession
          ? {
              access_token: activeSession.access_token,
              expires_at: activeSession.expires_at,
            }
          : null,
      });

      // Listen for authentication state changes and update store accordingly.
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, eventSession) => {
        console.log(
          `onAthStateChange - Event ${event} Session ${eventSession?.user.is_anonymous}`
        );
        set({
          user: eventSession?.user ?? null,
          session: eventSession
            ? {
                access_token: eventSession.access_token,
                expires_at: eventSession.expires_at,
              }
            : null,
          error: null,
        });
      });
      // Save subscription and mark loading as complete.
      set({
        authSubscription: subscription,
        isLoading: false,
      });
    } catch (error) {
      // Handle unexpected errors during initialization.
      set({
        error: error as AuthError,
        isLoading: false,
      });
    }
  },
  signOutUser: async () => {
    try {
      // Sign the user out using Supabase.
      const { error } = await supabase.auth.signOut();
      // If there is an error during sign-out, throw it to be caught below.
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      // Log any unexpected sign-out errors.
      console.error("Something unexpected occured when logging out", error);
    }
  },
}));
