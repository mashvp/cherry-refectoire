
import { Metadata } from "next";
// import { notFound } from "next/navigation";

import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { AnimLink } from "@/library/navigation/AnimLink";
import HeroHome from '@/component/hero/HeroHome';

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}


export default async function Page( {params}:any) {
  
  const client = createClient();
  const page = await client.getSingle("homepage", {lang:params.lang});
  const setting = await client.getSingle("settings", {lang:params.lang});


  const lottieResp = await fetch(page.data.logo.url);
  const lottieJson = await lottieResp.json();


  return (
  <main>
    <HeroHome
      data={page.data}
      lottie={lottieJson}
    />
    <SliceZone slices={page.data.slices} components={components} context={setting} />
  </main>
    );
}




