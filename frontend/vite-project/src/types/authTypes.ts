import { User, UserAppMetadata } from "@supabase/supabase-js";

export interface CustomAppMetaData extends UserAppMetadata {
  role?: "admin";
}

export interface CustomAuthUser extends Omit<User, "app_metadata"> {
  app_metadata: CustomAppMetaData;
}

export interface AuthenticatedRequest extends Request {
  user?: CustomAuthUser | null;
}
