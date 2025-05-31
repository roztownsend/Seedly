import { supabase } from "../helper/supabaseClient";

export const handleFacebookLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "facebook",
    options: {
      redirectTo: "http://localhost:5173/dashboard",
    },
  });
  if (error) {
    console.error("Facebook login error:", error.message);
  } else {
    console.log("Redirecting to Facebook OAuth...");
  }
};
