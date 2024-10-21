// import { createLocaleRedirect } from "@prismicio/next";
// import { createClient } from "@/prismicio";

// export async function middleware(request:any) {
//   const client = createClient();
//   const redirect = await createLocaleRedirect({ client, request });

//   if (redirect) {
//     return redirect;
//   }
// }

// export const config = {
//   // Do not localize these paths
//   matcher: ["/((?!_next|api|slice-simulator|icon.svg).*)"],
// };







import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server";

import { createLocaleRedirect } from "@prismicio/next";
import { createClient } from "@/prismicio";

export async function middleware(request:NextRequest) {
  const client = createClient();
  const repository = await client.getRepository();
  const locales = repository.languages.map((lang) => lang.id);  

  // await setTimeout(()=>{
    let is_locale = false;
    locales.forEach(locale=>{
      // console.log(`/${locale}`, '   ', request.nextUrl.pathname);
      if (request.nextUrl.pathname.startsWith(`/${locale}`)) {
        is_locale = true;
      }
    });
        
    if (!is_locale) {
  
      // return NextResponse.rewrite(new URL(`/fr-fr${request.nextUrl.pathname}`, request.url))
      return NextResponse.rewrite(new URL(`/${locales[0]}${request.nextUrl.pathname}`, request.url));
    }

  // }, 100);

  // console.log('go');


}



export const config = {
  matcher: ["/((?!_next|api|slice-simulator|icon.svg).*)"],
};



















// import createMiddleware from "next-intl/middleware";

// export default createMiddleware({
//   // A list of all locales that are supported
//   locales: ["en"],

//   // Used when no locale matches
//   defaultLocale: "en",
//   localePrefix: "as-needed",
// });

// export const config = {
//   // Match only internationalized pathnames
//   matcher: [
//     // Match all pathnames except for
//     // - … if they start with `/api`, `/_next` or `/_vercel`
//     // - … the ones containing a dot (e.g. `favicon.ico`)
//     "/((?!api|_next|_vercel|.*\\..*).*)",
//   ],
// };