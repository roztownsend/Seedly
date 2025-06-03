import { supabase } from "../helper/supabaseClient";

export const handleGoogleLogin = async () => {
  const redirectBase = import.meta.env.VITE_OAUTH_REDIRECT_URL.replace(
    /\/$/,
    ""
  );
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${redirectBase}/dashboard`,
    },
  });
  if (error) {
    console.error("Google login error:", error.message);
  } else {
    console.log("Redirecting to Google OAuth...");
  }
};
