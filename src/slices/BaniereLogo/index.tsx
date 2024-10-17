'use client';
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import Button from "@/component/navigation/Button";
import TextScroll from "@/library/text/TextScroll";
import TranslateBanner from "@/library/TranslateBanner";

/**
 * Props for `BaniereLogo`.
 */
export type BaniereLogoProps = SliceComponentProps<Content.BaniereLogoSlice>;

/**
 * Component for "BaniereLogo" Slices.
 */
const BaniereLogo = ({ slice, index, slices }: BaniereLogoProps): JSX.Element => {

  const prevSlide = (index > 0 && slices[index-1].slice_type == "presentation");
  const pt = (!prevSlide)? "pt-40" : "pt-200 t-m:pt-40";


  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`pb-40 ${pt} bg-ClearPrimary`}
    >
      <div className="w-full text-center mb-40 text-Tertiary">
        <TextScroll node="h2" className="hs2">{slice.primary.titre}</TextScroll>
      </div>
      <TranslateBanner speed={0.8} >
        <div className="flex flex-nowrap">
        {slice.primary.images.map((item, index) => (
          <div key={index} className="aspect-1 mediaCtn ml-40 w-[280px] t-m:w-200">
            <PrismicNextImage field={item.image} />
          </div>
        ))}
        </div>
      </TranslateBanner>
      {(slice.primary.url_lien?.url && (
        <div className="w-full text-center mt-40">
          <Button field={slice.primary.url_lien} type="dark" className="m-auto">{slice.primary.label_lien}</Button>
        </div>
      ))}
    </section>
  );
};

export default BaniereLogo;
