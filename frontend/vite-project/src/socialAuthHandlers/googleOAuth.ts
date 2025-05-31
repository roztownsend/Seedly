import { supabase } from "../helper/supabaseClient";

export const handleGoogleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:5173/dashboard",
    },
  });
  if (error) {
    console.error("Google login error:", error.message);
  } else {
    console.log("Redirecting to Google OAuth...");
  }
};
