import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { Facebook, Instagram, Linkedin, Whatsapp } from "@/component/icons";
import { PrismicNextImage } from "@prismicio/next";
import ContactForm from "@/library/contact/ContactForm";
// import GoogleMaps from "@/library/GoogleMaps";

/**
 * Props for `Contact`.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>;



// export async function getStaticProps({ params, locale, previewData }) {

//   const client = createClient();
//   const setting = await client.getSingle("settings", {lang:params.lang});

//   return setting;
// }


async function getDataForm(): Promise<any> {
  const client = createClient();
  const page = await client.getSingle("settings");

  const contacts = page.data.contact.map((el, i)=>{
    return {
        value: i,
        label: el.label
      }
  })

  const rgpd = page.data.rgpd;


  const dataForm = [
    { name: "service", value:"", type:"select", placeholder:"Services", required:true, label:"Services", classWrap:"wide", option: contacts},
    { name: "prenom", value:"", type:"text", placeholder:"Prenom*", autofocus:true, required:true},
    { name: "nom", value:"", type:"text", placeholder:"Nom*", required:true},
    { name: "email", value:"", type:"email", placeholder:"Email*", required:true},
    { name: "tel", value:"", type:"tel", placeholder:"Tel*", required:true},
    // { name: "profession", value:"", type:"text", placeholder:"Profession*", required:true},
    // { name: "nationalite", value:"", type:"text", placeholder:"Nationnalité"},
    // { name: "adresse", value:"", type:"text", placeholder:"Adresse", classWrap:"wide",},
    { name: "message", value:"", type:"textarea", placeholder:"Dites nous en plus...", classWrap:"wide", required:true},
  ]


  return {dataForm, rgpd};
}


/**
 * Component for "Contact" Slices. 
 */
const Contact = async ({ slice, context}: any) => {

  // const markers = slice.primary.coordonnees.map((el:any)=>({
  //   lat:Number(el.lat),
  //   lng:Number(el.lng)
  // }))

  const data = await getDataForm();

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-ClearPrimary pt-40 pb-40"
    >
      <div className="gridCtn wrapper gap-y-40">
        <ContactForm className="col-1-9 row-1-3 t-m:col-1-13" dataForm={data.dataForm} rgpd={data.rgpd} />

        <div className="txtCtn col-9-13 mb-40 t-m:col-1-13 h-fit">
          <PrismicRichText field={slice.primary.texte}/>
          <div className="flex text-Primary mt-20 gap-20">
            {( context.data?.facebook &&
              <a href={context.data.facebook} className="" target="_blank">
                <Facebook/>
              </a>
            )}
            {( context.data?.linkedin &&
              <a href={context.data.linkedin} className="" target="_blank">
                <Linkedin/>
              </a>
            )}
            {( context.data?.instagram &&
              <a href={context.data.instagram} className="" target="_blank">
                <Instagram/>
              </a>
            )}
            {( context.data?.whatsapp &&
              <a href={context.data.whatsapp} className="" target="_blank">
                <Whatsapp/>
              </a>
            )}
          </div>
          <a href={slice.primary.lien_gmap} className='block w-full aspect-1 mt-40 mediaCtn' target="_blank">
            <PrismicNextImage field={slice.primary.map} width={300} className="w-full"/>
          </a>
          {/* <GoogleMaps className='w-full aspect-1 mt-40' points={markers} /> */}
        </div>

          {/* {slice.primary.cle_recaptcha}
          {slice.primary.cle_recaptcha} */}

      </div>
    </section>
  );
};

export default Contact;
