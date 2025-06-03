import { supabase } from "../helper/supabaseClient";

export const handleFacebookLogin = async () => {
  const redirectBase = import.meta.env.VITE_OAUTH_REDIRECT_URL.replace(
    /\/$/,
    ""
  );
  console.log("Redirect base URL for Facebook OAuth:", redirectBase);
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: `${redirectBase}/dashboard`,
    },
  });
  if (error) {
    console.error("Facebook login error:", error.message);
  } else {
    console.log("Redirecting to Facebook OAuth...");
  }
};
