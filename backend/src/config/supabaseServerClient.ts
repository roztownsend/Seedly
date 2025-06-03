import {
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
  GetAllCookies,
} from "@supabase/ssr";
import type { Request, Response } from "express";

export function createSupabaseClient(req: Request, res: Response) {
  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(req.headers.cookie ?? "");
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.appendHeader(
              "Set-Cookie",
              serializeCookieHeader(name, value, options)
            );
          });
        },
      },
    }
  );
}
