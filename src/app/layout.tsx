import type { Metadata } from 'next';
// import { Head } from 'next/document';
import { Inter } from 'next/font/google'
// import Head from 'next/head';

import { PrismicPreview } from "@prismicio/next";
import { createClient, repositoryName } from "@/prismicio";
import TransitionElement from '@/library/navigation/TransitionElement';

import '@/globals.scss';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'next-prismic ',
  description: '',
}


export default async function RootLayout({ children, params:{ lang }}:any) {

  const client = createClient();
  const footer = await client.getSingle("footer", {lang:lang});
  const setting = await client.getSingle("settings", {lang:lang});
  const header = await client.getSingle("header", {lang:lang});


  return (
    <html lang={lang}>
      <head>
        {/* <link rel="icon" href={setting.data.favicon.url as string} sizes="any" /> */}
        <link
          rel="icon"
          href={setting.data.favicon.url as string}
          type="image/<generated>"
          sizes="<generated>"
        />


      </head>
      <body className="">

        <TransitionElement footerData={footer.data} settingsData={setting.data} headerData={header.data}>
          {children}
        </TransitionElement>

        <PrismicPreview repositoryName={repositoryName} />
        <script async defer src="https://static.cdn.prismic.io/prismic.js?new=true&repo=test-rdm"></script>
        </body>
    </html>
  )
}



// export async function generateStaticParams() {
//   return [{lang:"fr-FR"}]
// }