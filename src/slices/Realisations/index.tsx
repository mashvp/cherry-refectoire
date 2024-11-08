'use client';
import { asLink, Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Button from "@/component/navigation/Button";
import ParrallaxInner from "@/library/image/ParallaxInner";
import ScrollElement from "@/library/ScrollElement";
import ScrollRichText from "@/library/text/ScrollRichText";
import TextScroll from "@/library/text/TextScroll";

/**
 * Props for `Realisations`.
 */
export type RealisationsProps = SliceComponentProps<Content.RealisationsSlice>;

/**
 * Component for "Realisations" Slices.
 */
const Realisations = ({ slice, index, slices }: RealisationsProps): JSX.Element => {

  // const prevSlide = usePrevSlide( index, slices )
  const prevSlide = (index > 0 && slices[index-1].slice_type == "presentation");

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`${(prevSlide)? 'pt-200 t-m:pt-60' : 'pt-60'} pb-80 bg-ClearPrimary text-Tertiary`}
    >
      <div className={`wrapper gridCtn gap-y-60 t-m:gap-y-20`}>
        <div className="col-1-6">
          <TextScroll node="h2" className="hs2">{slice.primary.titre}</TextScroll>
        </div>

        <Block
          classOut="col-1-5 t-m:col-1-13"
          classImg="w-full"
          slice={slice}
          index={1}
          />
        <Block
          classOut="col-5-9 mt-20w t-m:col-1-13 t-m:mt-0"
          classImg="w-[80%] mr-auto ml-auto t-m:w-full"
          slice={slice}
          index={2}
          />
        <Block
          classOut="col-9-13 ay-center t-m:col-1-13"
          classImg="w-[90%] ml-[10%] t-m:w-full t-m:ml-0"
          slice={slice}
          index={3}
          />
          {(asLink(slice.primary.url_lien) && (
            <div className="col-5-9 w-full t-m:col-1-13">
              <Button field={slice.primary.url_lien} type="dark" className="mt-20 w-full">{slice.primary.label_lien}</Button>
            </div>
          ))}
      </div>
    </section>
  );
};



const Block = ({ classOut, classImg, slice, index }:any) => {
  return (
    <div className={classOut}>
          
      <ScrollElement
        classOut={`mb-20 ${classImg}`}
        callback={(el, prog)=>{
          const res = Math.pow((1-prog), 2)*100;
          // el.style.transform = `translate3d(0, ${prog*100}px, 0)`;
          el.style.clipPath = `polygon(0 0, 100% 0, 100% ${res}%, 0 ${res}%)`;
        }}
        windowPosition={0.6}
        min={0}
        >
          <ParrallaxInner field={slice.primary[`image_${index}`]} className="aspect-1 mediaCtn w-full" width={400}/>
      </ScrollElement>
      <TextScroll
        node="h3"
        className="hs2 mb-20"
        windowPosition={0.6 + 0.04}
        >
        {slice.primary[`titre_${index}`]}</TextScroll>
      <ScrollRichText
        field={slice.primary[`texte_${index}`]}
        windowPosition={0.6 + 0.06}
        />

    </div>
  )
}




// const usePrevSlide = ( index, slices ) => {
//   (index > 0 && slices[index-1].type == "presentation")
//   if (index > 0) {
//     return slices[index-1].type == "presentation";
//   }
//   return false;
// }

export default Realisations;
