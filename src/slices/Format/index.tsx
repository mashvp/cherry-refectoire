'use client';
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Button from "@/component/navigation/Button";
import ParrallaxInner from "@/library/image/ParallaxInner";
import ScrollElement from "@/library/ScrollElement";
import ScrollRichText from "@/library/text/ScrollRichText";
import TextScroll from "@/library/text/TextScroll";

/**
 * Props for `Format`.
 */
export type FormatProps = SliceComponentProps<Content.FormatSlice>;

/**
 * Component for "Format" Slices.
 */
const Format = ({ slice, index, slices }: FormatProps): JSX.Element => {
  const prevSlide = (index > 0 && slices[index-1].slice_type == "presentation")

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`${(prevSlide)? "pt-250" : "pt-80"} bg-ClearPrimary text-Tertiary overflow-hidden t-m:pb-40`}
    >
      <div className="wrapper gridCtn " style={{gridTemplateRows:'repeat(11, min-content)'}}>
        <TextScroll node="h2" className="col-1-6 row-1 hs2 mb-16 t-m:col-1-13">
          {slice.primary.titre}
        </TextScroll>
        <div className="richText col-1-6 row-2 t-m:col-1-13">
          {/* <PrismicRichText field={slice.primary.texte} /> */}
          <ScrollRichText field={slice.primary.texte} />
        </div>


        <Image 
          className="w-[150%] mt-10w col-1-3 row-3 ax-end t-m:row-3 t-m:col-1-7 t-m:w-full t-m:m-auto"
          field={slice.primary.image_1}
          offset={40} 
          />
        <Image 
          className="w-[90%] col-6-9 row-2-4 t-m:hidden"
          field={slice.primary.image_2}
          offset={180} 
          />
        <Image 
          className="w-[110%] ml-20 col-10-13 row-3 ay-end t-m:row-6 t-m:col-7-13 t-m:w-full t-m:m-auto"
          field={slice.primary.image_3}
          offset={120} 
          wPos={0.2}
          />
        <Image 
          className="w-[90%] col-3-7 row-7-12 ax-center t-m:row-10 t-m:col-1-7 t-m:w-full t-m:m-auto"
          field={slice.primary.image_4}
          offset={40} 
          />
        <Image 
          className="w-[74%] mt-100 mb-40 col-7-11 row-6-8 t-m:row-13 t-m:col-7-13 t-m:w-full t-m:m-auto"
          field={slice.primary.image_5}
          offset={100} 
          wPos={0.2}
          wLength={0.6}
          />
        <Image 
          className="w-[100%] mt-150 -mb-80 mr-20 col-10-13 row-10-12 ax-end t-m:hidden"
          field={slice.primary.image_6}
          offset={190} 
          wPos={0.6}
          />


        <Text
          class1="col-3-6 row-3 ay-end t-m:row-4 t-m:col-1-7"
          class2="col-2-6 row-4 t-m:row-5 t-m:col-1-7"
          class3="col-2-6 row-5 t-m:row-6 t-m:col-1-7"
          index={1}
          field={slice.primary}
          wPos={0.65}
          />

        <Text
          class1="col-6-10 -mr-40 row-3 a-end-end t-m:row-7 t-m:col-1-7 t-m:mr-0"
          class2="col-8-12 row-4 t-m:row-8 t-m:col-1-7"
          class3="col-8-12 row-5  t-m:row-9 t-m:col-1-7"
          index={2}
          field={slice.primary}
          wPos={0.4}
          />

        <Text
          class1="col-1-4 row-7 t-m:row-14 t-m:col-1-7"
          class2="col-1-4 ml-40 row-8 t-m:row-15 t-m:col-1-7 t-m:ml-0"
          class3="col-1-4 ml-40 row-9 t-m:row-16 t-m:col-1-7 t-m:ml-0"
          index={3}
          field={slice.primary}
          wPos={0.78}
          wLength={0.16}

          />

        <Text
          class1="col-8-13 row-7 ml-40 t-m:row-11 t-m:col-1-11 t-m:whitespace-normal t-m:ml-0"
          class2="col-7-13 row-8 t-m:row-12 t-m:col-1-7 t-m:whitespace-normal"
          class3="col-7-13 row-9 t-m:row-13 t-m:col-1-7"
          index={4}
          field={slice.primary}
          wPos={0.6}
          wLength={0.12}
          />



      </div>
    </section>
  );
};


const Image = ({field, className, offset, wPos = 0.5, wLength = 0.5, min = -1}:any) => {
  return (
    <ScrollElement
      classOut={className}
      callback={(el, prog)=>{
        el.style.transform = `translate3d(0, ${prog*offset}px, 0)`;
      }}
      windowPosition={wPos}
      windowLength={wLength}
      min={min}
      >
        <ParrallaxInner field={field} className="aspect-1 mediaCtn w-full" width={400} height={400}/>
    </ScrollElement>
  )
}
{/* <div className="img1 aspect-1 mediaCtn w-[150%] mt-10w col-1-3 row-3 ax-end">
//<div className="img1 aspect-1 mediaCtn w-[280px] mt-10w col-1-3 row-3 ax-end"> 
{/* <PrismicNextImage field={slice.primary.image_1} /> 
</div> */}



const Text = ({field, index, class1, class2, class3,  wPos = 0.5, wLength = 0.15, min = 0}:any) => {
  return (
    <>
      <TextScroll
        // node="h3"
        className={`${class1} hs2 h-min z-10 whitespace-nowrap`}
        windowPosition={wPos}
        windowLength={wLength}
        >
          {field[`texte_${index}_ligne_1`]}
      </TextScroll>
      <TextScroll
        // node="h3"
        className={`${class2} hs2 h-min z-10 whitespace-nowrap`}

        windowPosition={wPos-0.045}
        windowLength={wLength}
        >
          {field[`texte_${index}_ligne_2`]}
      </TextScroll>
      <ScrollElement
        classOut={`${class3} z-10 text-cta`}
        windowPosition={wPos-0.045}
        windowLength={wLength}
        >
        <Button type="raw" field={field[`url_${index}`]}>{field[`label_${index}`]}</Button>
      </ScrollElement>
    </>
  )
}



export default Format;
