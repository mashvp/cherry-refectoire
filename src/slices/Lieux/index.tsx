import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import TextScroll from "@/library/text/TextScroll";

/**
 * Props for `Lieux`.
 */
export type LieuxProps = SliceComponentProps<Content.LieuxSlice>;


/**
 * Component for "Lieux" Slices.
 */
const Lieux = ({ slice, index, slices }: LieuxProps): JSX.Element => {

  const total = 0.5;

  const step = total / slice.primary.localisation.length;



  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`grid t-m:grid-cols-1`}
    >
      {slice.primary.localisation.map((item, i) => (
        <div className="col-span-1 row-1 h-60w relative grid t-m:row-[unset]">
          <div className="mediaCtn w-full h-full col-1 row-1">
            <PrismicNextImage field={item.background} width={600} />
          </div>
          <div className="col-1 row-1 a-center-center z-10 pr-40 pl-40">
            <TextScroll windowPosition={ 0.5 - (step*i)} className="text-ClearPrimary hs1">{item.titre}</TextScroll>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Lieux;
