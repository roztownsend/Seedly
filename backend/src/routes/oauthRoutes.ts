import { Router, Response, Request } from "express";
import { createServerClient,parseCookieHeader} from "@supabase/ssr";

const router = Router();

const supabaseUrl = process.env.SUPABASE_URL||""
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY||""

router.get("/auth/callback", async (req, res) => {
  const code = req.query.code;
  const next = req.query.next ?? "/";

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey
    {
      cookies: {
        getAll() {
          return parseCookieHeader(req.headers.cookie ?? "");
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            res.appendHeader(
              "Set-Cookie",
              serializeCookieHeader(name, value, options)
            )
          );
        },
      },
    }
  );
});

export default router;
