import { supabaseAdmin } from "../config/supabaseClient";

export const makeUserAdmin = async (userId: string) => {
  console.log(`Attempting to make user ${userId} admin`);

  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
    userId,
    { app_metadata: { role: "admin" } }
  );
  if (error) {
    console.error(`Error making user ${userId} admin`, error.message);
  } else {
    console.log(`Successfully made user ${userId} an admin`);
    console.log("Response -", data.user.app_metadata);
  }
};
