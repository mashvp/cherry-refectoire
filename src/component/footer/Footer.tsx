import { PrismicRichText } from "@prismicio/react"
import { PrismicNextImage } from "@prismicio/next"
import { AnimLink } from "@/library/navigation/AnimLink"

import Button from "../navigation/Button"
import { Facebook, Instagram, Linkedin, Whatsapp } from "../icons";

export default function Footer({data, settings}:any) {


  return (
    <footer className=" bg-Primary text-ClearPrimary pt-80 pb-80">
      <div className="wrapper gridCtn gap-y-40">
        <div className="richtext col-1-5 d-xs:col-1-6 mb-20 t-m:col-1-13 t-m:row-auto">
          <PrismicRichText field={data.texte} />
          <Button field={data.url_lien} className="mt-20">{data.label_lien}</Button>
        </div>
        <div className="col-6-12 t-m:col-1-13 t-m:row-auto">
          <div className="hs3 mb-20"><PrismicRichText field={data.texte_reseaux}
          components={{
            hyperlink: ({ node, children, key }) => {
              const url = node.data.url;
              return <a target="_blank" className="text-ClearPrimary hover:text-Secondary underline underline-offset-4 transition" href={url}>{children}</a>
            }
          }} />
          </div>
          {/*           
          <div className="flex">
            <a href={settings.facebook} className="" target="_blank">
              <Facebook/>
            </a>
            <a href={settings.linkedin} className="ml-20" target="_blank">
              <Linkedin/>
            </a>
            <a href={settings.instagram} className="ml-20" target="_blank">
              <Instagram/>
            </a>
            <a href={settings.whatsapp} className="ml-20" target="_blank">
              <Whatsapp/>
            </a>
          </div> */}
        </div>
        <div className="col-1-6 row-2-4 t-m:col-1-13 t-m:row-auto">
          <PrismicNextImage field={data.logo} />
        </div>
        <div className="col-6-8 row-2 t-m:col-1-7 t-m:row-auto">
          <ul>
          {data.colonne_1.map((item:any, i:number) => (
            <li className="mb-16" key={i+item.label}>
              <AnimLink field={item.url}>{item.label}</AnimLink>
            </li>
          ))}
          </ul>
        </div>
        <div className="col-8-10 row-2 t-m:col-7-13 t-m:row-auto">
          <ul>
          {data.colonne_2.map((item:any, i:number) => (
            <li className="mb-16" key={i+item.label}>
              <AnimLink field={item.url}>{item.label}</AnimLink>
            </li>
          ))}
          </ul>
        </div>
        <div className="col-10-12 row-2 t-m:col-1-7 t-m:row-auto">
          <ul>
          {data.colonne_3.map((item:any, i:number) => (
            <li className="mb-16" key={i+item.label}>
              <AnimLink field={item.url}>{item.label}</AnimLink>
            </li>
          ))}
          </ul>
        </div>
        <div className="col-6-12 row-3 t-m:col-7-13 t-m:row-auto">
          <ul className="flex  t-m:block">
          {data.bottom.map((item:any, i:number) => (
            <li className="mb-16" key={i+item.label}>
              <AnimLink field={item.url}>{item.label}</AnimLink>
            </li>
          ))}
          </ul>
        </div>

      </div>

    </footer>
  )
}