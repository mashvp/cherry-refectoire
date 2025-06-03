"use client";


import { useEffect, useMemo, useRef } from "react";

import { asLink, Content, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import { useScroll } from "@/library/scroll/ScrollContainer";
import Button from "@/component/navigation/Button";
import ParrallaxInner from "@/library/image/ParallaxInner";
import ScrollRichText from "@/library/text/ScrollRichText";
import TextScroll from "@/library/text/TextScroll";
import TranslateBanner from "@/library/TranslateBanner";

/**
 * Props for `Test`.
 */
export type TestProps = SliceComponentProps<Content.TestSlice>;

/**
 * Component for "Test" Slices.
 */
const Test = ({ slice, index, slices }: TestProps): JSX.Element => {

//  const defaul = (slice.variation == "default");
//  const sideImg = (defaul)? "col-2-6" : "col-8-12";
//  const sideTxt = (defaul)? "col-7-12" : "col-2-7";
const prevSlide = (index > 0 && slices[index-1].slice_type == "presentation");

const pt = (!prevSlide)? "pt-40" : "pt-200 t-m:pt-40";

 const side = {
  img: "",
  txt: ""
 }

 if (slice.variation == "default") {
  side.img = (slice.primary.taille_image)? "col-2-7 w-full t-m:row-1" : "col-2-6 aspect-[440/780] mediaCtn";
  side.txt = (slice.primary.taille_image)? "col-7-12" : "col-7-12";
  side.img += " row-1 t-m:row-1 t-m:col-1-13";
  side.txt += " row-1 t-m:row-2 t-m:col-1-13";
 } else {
  side.img = (slice.primary.taille_image)? "col-7-12 w-full" : "col-8-12 aspect-[440/780] mediaCtn";
  side.txt = (slice.primary.taille_image)? "col-2-7" : "col-2-7";
  side.img += " row-1 t-m:row-2 t-m:col-1-13";
  side.txt += " row-1 t-m:row-1 t-m:col-1-13";
 }



 const color = (slice.primary.background)? "bg-ClearPrimary text-Tertiary" : "bg-Primary text-ClearPrimary";
 const colorBtn = (slice.primary.background)? "dark" : "clear";


//  {(asLink(slice.primary.image_bottom) && slice.primary.lien_image && (
//   <a href={slice.primary.lien_image} className="block mediaCtn w-full max-w-250 aspect-1 mt-40" target="_blank">
//     <PrismicNextImage field={slice.primary.image_bottom} />
//   </a>
// ))}
// {(asLink(slice.primary.image_bottom)&& !slice.primary.lien_image && (
//   <div className="mediaCtn w-full max-w-250 aspect-1 mt-40">
//     <PrismicNextImage field={slice.primary.image_bottom} />
//   </div>
// ))}
    
    // asLink(slice.primary.image_bottom)
    
    const bottomImg = (isFilled.image(slice.primary.image_bottom))? (
      (isFilled.keyText(slice.primary.lien_image) )? (
        <a href={slice.primary.lien_image as string} className="block mediaCtn w-full max-w-250 aspect-1 mt-40" target="_blank">
          <PrismicNextImage field={slice.primary.image_bottom} width={600} height={600} />
        </a>
      ) : (
        <div className="mediaCtn w-full max-w-250 aspect-1 mt-40">
          <PrismicNextImage field={slice.primary.image_bottom} width={600} height={600} />
        </div>
      )
    ) : null;
  


  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`${color} pb-40 ${pt}`}
    >
      <div className="wrapper gridCtn gap-y-20">
        <div className={`${side.img} ay-center`}>
          <PrismicNextImage field={slice.primary.image} width={1000} />
        </div>

        <div className={`${side.txt} ay-center`}>
          { slice.primary.titre && (
            <TextScroll node={slice.primary.tag_titre} className="hs2">{slice.primary.titre}</TextScroll>
          )}
          <div className="richtext mt-20">
            <ScrollRichText field={slice.primary.texte} />
          </div>
          {(asLink(slice.primary.url) && (
            <Button field={slice.primary.url} type={colorBtn} className="mt-20">{slice.primary.label}</Button>
          ))}
          {bottomImg}
        </div>

      </div>
    </section>
  );
};

export default Test;