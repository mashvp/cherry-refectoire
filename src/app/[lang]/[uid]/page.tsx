import { notFound } from "next/navigation";
// import { title } from "process";

import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import HeroPage from "@/component/hero/HeroPage";
// import { asText } from "@prismicio/client";

import { SettingsDocument } from "../../../../prismicio-types";

/**
 * @typedef {{ uid: string }} Params
 */

/**
 * @param {{ params: Params }}
 * @returns {Promise<import("next").Metadata>}
 */
export async function generateMetadata({ params }:any) {
  const client = createClient();
  const page = await client
    .getByUID("page", params.uid, { lang: params.lang })
    .catch(() => notFound());
  const settings = await client.getSingle("settings");

  return {
    // title: `${asText(page.data.title)} | ${asText(settings.data.siteTitle)}`,
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title,
      images: [
        {
          url: page.data.meta_image.url,
        },
      ],
    },
  };
}

export const dynamicParams = false;



export default async function Page({ params }:any)  {
  const client = createClient();
  const page = await client.getByUID("page", params.uid, { lang: params.lang }).catch(() => notFound());
  const setting = await client.getSingle("settings", {lang:params.lang});


  return  (
    <main>
      <HeroPage data={page.data} />
      
      <SliceZone slices={page.data.slices} components={components} context={setting} />
    </main>
  );
}



export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType("page", { lang: '*' });

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
