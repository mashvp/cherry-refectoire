'use client';
import { useEffect, useRef, useState } from "react";

import { useTransitionState } from "@/library/navigation/TransitionElement";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Media`.
 */
export type MediaProps = SliceComponentProps<Content.MediaSlice>;

/**
 * Component for "Media" Slices.
 */
const Media = ({ slice }: MediaProps): JSX.Element => {

  const videoRef = useRef<HTMLVideoElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const ctnRef = useRef<HTMLDivElement>(null);

  // const {state} = useTransitionState();

  // useEffect(()=>{
  //   if (state == "idle" || state == "out") {
  //     videoRef.current?.play();
  //   }
  // },[state]);

  useEffect(()=>{
    if (btnRef.current && videoRef.current) {
      const fn = () => {
        if (ctnRef.current && videoRef.current) {
          videoRef.current.play();
          ctnRef.current.classList.add('hidden');
        }
      }
      btnRef.current.addEventListener('click', fn);
      // return () => {
      //   btnRef.current.removeEventListener('click', fn);
      // }
    }
  },[])
  

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative"
    >
      {(slice.variation == "default")? (
        <div className="aspect-[1660/880] w-full mediaCtn">
          <PrismicNextImage field={slice.primary.image} />
        </div>
        ):(
          <>
          <div className="aspect-[1660/880] w-full mediaCtn">
            <video ref={videoRef} playsInline muted loop src={slice.primary.video.url} />
          </div>
          <div className=" absolute-full w-full h-full grid z-20" ref={ctnRef}>
            <div className="mediaCtn col-1 row-1 filterDark">
              <PrismicNextImage field={slice.primary.miniature} />
            </div>
            <div className="col-1 row-1 a-center-center z-20">
              <p className="hs1 a-center-center text-ClearPrimary cursor-pointer" ref={btnRef}>Lire la video</p>
            </div>
          </div>
          </>
        )}
    </section>
  );
};

export default Media;
