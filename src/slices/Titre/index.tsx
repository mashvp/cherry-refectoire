import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import ScrollRichText from "@/library/text/ScrollRichText";
import TextScroll from "@/library/text/TextScroll";

/**
 * Props for `Titre`.
 */
export type TitreProps = SliceComponentProps<Content.TitreSlice>;

/**
 * Component for "Titre" Slices.
 */
const Titre = ({ slice, index, slices }: TitreProps): JSX.Element => {

  const prevSlide = (index > 0 && slices[index-1].slice_type == "presentation");

  const pt = (!prevSlide)? "pt-40" : "pt-200 t-m:pt-40";

  const color = ((slice.variation == "default")? "bg-ClearPrimary text-Tertiary" : "bg-Primary text-ClearPrimary");
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`${color} ${pt} pb-40`}
    >
      <div className="wrapper gridCtn text-center">
        <TextScroll node="h1" className="hs2 col-3-11" windowPosition={0.6}>{slice.primary.titre}</TextScroll>
        <div className="richtext mt-20 col-3-11 t-m:col-1-13">
          <ScrollRichText field={slice.primary.texte} windowPosition={0.6}/>
        </div>
      </div>
    </section>
  );
};

export default Titre;
