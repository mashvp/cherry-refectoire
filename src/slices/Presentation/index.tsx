import { asLink, Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import Button from "@/component/navigation/Button";
import ScrollRichText from "@/library/text/ScrollRichText";
import TextScroll from "@/library/text/TextScroll";

/**
 * Props for `Presentation`.
 */
export type PresentationProps = SliceComponentProps<Content.PresentationSlice>;

/**
 * Component for "Presentation" Slices.
 */
const Presentation = ({ slice }: PresentationProps): JSX.Element => {

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative text-ClearPrimary z-20 -mb-150 t-m:mb-0"
    >
      {/* <div className="relative text-ClearPrimary z-20"> */}

        <div className="bg-Primary absolute w-full h-[calc(100%-150px)] overflow-hidden t-m:h-full t-m:pb-40 ">
          <div className="absolute w-full h-full bg-center opacity-20 bg-repeat" style={{backgroundImage: `url(${slice.primary.background.url})`}}>
          </div>
        </div>
        <div className="wrapper gridCtn relative z-10 pt-40  t-m:pb-40">
          {(asLink(slice.primary.url_lien_top) && (
            <div className="col-2-12 row-1 ax-center pb-60">
              <Button field={slice.primary.url_lien_top}>{slice.primary.label_lien_top}</Button>
            </div>
          ))}
          <div className="col-3-7 row-2 d-xs:col-2-7 z-20 ay-center h-min t-m:col-1-10">
            <TextScroll node="h2" className="hs2 pb-16">{slice.primary.titre}</TextScroll>
            <div className="richtext mb-20">
              <ScrollRichText field={slice.primary.contenu} />
            </div>
            {(asLink(slice.primary.url_lien) && (
              <Button field={slice.primary.url_lien}>{slice.primary.label_lien}</Button>
            ))}
          </div>
          <div className="mediaCtn aspect-[560/860] d-xs:col-6-13 col-6-12 row-2 t-m:col-5-13">
            <PrismicNextImage field={slice.primary.image} width={800}  height={800} />
          </div>
        </div>
      {/* </div> */}
    </section>
  );
};

export default Presentation;
