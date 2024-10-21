
import { Metadata } from "next";
// import { notFound } from "next/navigation";

import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { AnimLink } from "@/library/navigation/AnimLink";
import { asLink } from "@prismicio/client";
import * as prismic from "@prismicio/client";
import HeroHome from '@/component/hero/HeroHome';

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

// export const dynamicParams = false;

export default async function Page( {params}:any) {
  
  const client = createClient();
  const page = await client.getSingle("homepage", {lang:params.lang});
  const setting = await client.getSingle("settings", {lang:params.lang});

  const link = asLink(page.data.logo);
  var res = {};
  if (link) {
    const lottieResp = await fetch(  link );
    const lottieJson = await lottieResp.json();
    res = lottieJson;
  } 


  return (
  <main>
    <HeroHome
      data={page.data}
      lottie={res}
    />
    <SliceZone slices={page.data.slices} components={components} context={setting} />
  </main>
    );
}


export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType("page", {
    lang: "*",
    filters: [prismic.filter.at("home", "home")],
  });

  return pages.map((page) => {
    return {
      lang: page.lang,
    };
  });
}

// export async function generateStaticParams() {
//   const client = createClient();

//   const pages = await client.getAllByType("page", { lang: '*' });
  
//   console.log(pages);

//   // return [];

//   return pages.map((page) => {
//     return {
//       lang: page.lang,
//     };
//   });
// }



// export async function generateStaticParams() {
//   const client = createClient();

//   // const pages = await client.getAllByType("page", { lang: '*' });
//   // return pages.map((page) => {
//   //   return { uid: page.uid };
//   // });

//   // const page = await client.getSingle("homepage", {lang:'*'});
//   // return { uid: page.uid };

//   // return [{ lang: 'fr-FR' }]
//   return [{}]
//   // return []


//   // const repository = await client.getRepository();
//   // const locales = repository.languages.map((lang) => {lang:lang.id});  
//   // return locales

// }


// export async function generateStaticParams() {
//   const client = createClient();

//   const pages = await client.getAllByType("page", { lang: '*' });

//   return pages.map((page) => {
//     return { uid: page.uid };
//   });
// }
