import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { Facebook, Instagram, Linkedin, Whatsapp } from "@/component/icons";
import ContactForm from "@/library/contact/ContactForm";
import GoogleMap from "@/library/GoogleMap";

/**
 * Props for `Contact`.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>;



// export async function getStaticProps({ params, locale, previewData }) {

//   const client = createClient();
//   const setting = await client.getSingle("settings", {lang:params.lang});

//   return setting;
// }


/**
 * Component for "Contact" Slices.
 */
const Contact = ({ slice, context}: any): JSX.Element => {


  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-ClearPrimary pt-40 pb-40"
    >
      <div className="gridCtn wrapper gap-y-40">
        <ContactForm className="col-1-9 row-1-3 t-m:col-1-13" />

        <div className="txtCtn col-9-13 mb-40 t-m:col-1-13 h-fit">
          <PrismicRichText field={slice.primary.texte}/>
          <div className="flex text-Primary mt-20">
            <a href={context.data.facebook} className="" target="_blank">
              <Facebook/>
            </a>
            <a href={context.data.linkedin} className="ml-20" target="_blank">
              <Linkedin/>
            </a>
            <a href={context.data.instagram} className="ml-20" target="_blank">
              <Instagram/>
            </a>
            <a href={context.data.whatsapp} className="ml-20" target="_blank">
              <Whatsapp/>
            </a>
          </div>
          <GoogleMap className='w-full aspect-1 mt-40' />
        </div>

          {/* {slice.primary.cle_recaptcha}
          {slice.primary.cle_recaptcha} */}

      </div>
    </section>
  );
};

export default Contact;
