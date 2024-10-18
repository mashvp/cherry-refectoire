import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Button from "@/component/navigation/Button";

export default async function NotFound({params}:any) {

  const client = createClient();
  const setting = await client.getSingle("settings");
  // const setting = await client.getSingle("settings", {lang:params.lang});

  console.log(setting);

  return (
    <div className="w-full h-screen relative">
      <div className="mediaCtn !absolute w-screen h-screen">
        <PrismicNextImage field={setting.data.image} />
      </div>
      <div className="wrapper gridCtn h-screen relative z-20">
        <div className="col-2-7 ay-end mb-150 text-ClearPrimary">
          <h1 className="hs1 mb-20">{setting.data.title}</h1>
          <PrismicRichText field={setting.data.texte}/>
          <Button className="mt-20 text-Primary" field={setting.data.lien}>{setting.data.label}</Button>
        </div>
      </div>
    </div>
  )
}