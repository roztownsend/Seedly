import { create } from "zustand";
import { supabase } from "../helper/supabaseClient";
import { AuthError, Session, Subscription } from "@supabase/supabase-js";
import { CustomAuthUser } from "../types/authTypes";

type ClientSession = {
  access_token: string;
  expires_at?: number;
} | null;

type AuthResponse = {
  success: boolean;
  data?: {
    user: CustomAuthUser | null;
    session: Session | null;
  };
  error?: AuthError | null;
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

type AuthState = {
  user: CustomAuthUser | null;
  session: ClientSession;
  isLoading: boolean;
  error: AuthError | null;
  authSubscription: Subscription | null;
  actions: AuthActions;
};

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  isLoading: true,
  error: null,
  authSubscription: null,
  actions: {
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

        return {
          success: true,
          data: {
            user: data.user as CustomAuthUser | null,
            session: data.session,
          },
        };
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
        return {
          success: true,
          data: {
            user: data.user as CustomAuthUser | null,
            session: data.session,
          },
        };
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
            user: null,
            session: null,
          });
          return;
        }
        let activeSession = session;

        // Update state with session and user data.
        set({
          user: (activeSession?.user as CustomAuthUser) ?? null,
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
        } = supabase.auth.onAuthStateChange(async (event, eventSession) => {
          console.log(
            `onAthStateChange - Event ${event} Session Email - ${eventSession?.user.email}`
          );
          if (event === "INITIAL_SESSION" && session) {
            const identities = session.user.app_metadata.provider;
            if (
              (identities &&
                identities.length > 0 &&
                identities === "google") ||
              identities === "facebook"
            ) {
              const { data, error } = await supabase
                .from("users")
                .select("*")
                .eq("id", session.user.id)
                .maybeSingle();
              if (!data) {
                const { error: insertError } = await supabase
                  .from("users")
                  .insert({
                    id: session.user.id,
                    email: session.user.email,
                    role: "customer",
                  });
                if (insertError) {
                  console.error(
                    "Failed to create user in public.users",
                    insertError
                  );
                } else {
                  console.log("User created in public.users");
                }
              }
            } else {
              console.log("Logged in with email/password");
            }
          }
          set({
            user: (eventSession?.user as CustomAuthUser) ?? null,
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
          user: null,
          session: null,
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
  },
}));

export const useAuthUser = () => useAuthStore((state) => state.user);
export const useAuthSession = () => useAuthStore((state) => state.session);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthError = () => useAuthStore((state) => state.error);
export const useAuthSubscription = () =>
  useAuthStore((state) => state.authSubscription);
export const useAuthActions = () => useAuthStore((state) => state.actions);
export const useIsAdmin = (): boolean => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return false;
  }

  return user.app_metadata?.role === "admin";
};
