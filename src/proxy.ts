import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { auth } from "./lib/auth";

const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
  return intlMiddleware(req);
});

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/", "/(uk|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
