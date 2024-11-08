'use client';
import { useMemo, useRef, useState } from "react";

import { AnimLink } from "@/library/navigation/AnimLink";
import { asLink, Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import { useLenis, useScroll } from "@/library/scroll/ScrollContainer";
import Button from "@/component/navigation/Button";
import ScrollRichText from "@/library/text/ScrollRichText";
import StickySection from "@/library/StickySection";
import TextProgress from "@/library/text/TextProgress";
import TextScroll from "@/library/text/TextScroll";
import useOnResize from "@/hook/useOnResize";

/**
 * Props for `Slider`.
 */
export type SliderProps = SliceComponentProps<Content.SliderSlice>;

interface slidesDataType {
  bounding : DOMRect | undefined
  top : number
  bottom : number
  // max : number
  // min : number
}
interface globalDataType {
  top: number,
  bottom: number
}


/**
 * Component for "Slider" Slices.
 */


const Slider = ({ slice }: SliderProps): JSX.Element => {

  const indexRef = useRef<HTMLDivElement[]>([]);
  const imgsRef = useRef<HTMLDivElement[]>([]);
  const [goto, setGoto] = useState<number | null>(null);

  // const data = useMemo(()=>([
  //   { progress : 0 },
  //   { progress : 0 },
  //   { progress : 0 },
  //   { progress : 0 },
  //   { progress : 0 },
  //   { progress : 0 },
  //   { progress : 0 },
  //   { progress : 0 },
  //   { progress : 0 },
  //   { progress : 0 },
  //   { progress : 0 },
  //   { progress : 0 },
  //   { progress : 0 },
  // ]), []);

  // const data = useMemo(()=>(Array.from({length:slice.primary.slides.length}).map(()=>({ progress : 0 }))),[]);
  const data = useMemo(()=>(Array(slice.primary.slides.length).fill(null).map(()=>({ progress : 0 }))),[]);

  return (
    <StickySection
      // data-slice-type={slice.slice_type}
      // data-slice-variation={slice.variation}
      className=""
      goto={goto}
      callback={(index, progress, slides)=>{


        // const maxLength = slides.length -1;
        const invertProg = 1-progress;
        
        indexRef.current.forEach((el, i)=>{ 
          
          switch (true) {
            // /=====================================>> After (Next + 2)
            case index-2 >= i:
              {
                // indexRef.current[i].style.height = `${40}px`;
                // indexRef.current[i].style.transform = `translate3d( 0, ${-20}px, 0)`;
                let nb = indexRef.current[i].querySelector('p') as HTMLDivElement;
                let round = indexRef.current[i].querySelector('div') as HTMLDivElement;
                nb.style.transform = `scale(0)`;
                round.style.transform = `scale(1)`;
                round.style.opacity = `1`;

                imgsRef.current[i].style.transform = `scale(1)`;

                // data[i].progress = 1;

              }
            break;
            // /=====================================>> Next
            case index-1 == i:
              {
                // indexRef.current[i].style.height = `${40+70*invertProg}px`;
                // indexRef.current[i].style.transform = `translate3d( 0, ${-20*progress}px, 0)`;

                // indexRef.current[i].style.height = `${40+70*invertProg}%`;
                // indexRef.current[i].style.transform = `translate3d( 0, ${-20*progress}%, 0)`;
                indexRef.current[i].style.padding = `${6*invertProg}% 0`;

                let nb = indexRef.current[i].querySelector('p') as HTMLDivElement;
                let round = indexRef.current[i].querySelector('div') as HTMLDivElement;
                nb.style.transform = `scale(${invertProg})`;
                round.style.transform = `scale(${progress})`;
                round.style.opacity = `${progress}`;

                imgsRef.current[i].style.transform = `scale(1)`;
                
                // data[i] = {progress : invertProg};

                
              }
            break;
            // /=====================================>> Current
            case index == i:
              {
                // indexRef.current[i].style.height = `${40+70*progress}px`;
                // indexRef.current[i].style.transform = `translate3d( 0, ${-30*invertProg}px, 0)`;

                // indexRef.current[i].style.height = `${40+70*progress}%`;
                // indexRef.current[i].style.transform = `translate3d( 0, ${-30*invertProg}%, 0)`;

                indexRef.current[i].style.padding = `${6*progress}% 0`;


                let nb = indexRef.current[i].querySelector('p') as HTMLDivElement;
                let round = indexRef.current[i].querySelector('div') as HTMLDivElement;
                nb.style.transform = `scale(${progress})`;
                round.style.transform = `scale(${invertProg})`;
                round.style.opacity = `${invertProg}`;

                imgsRef.current[i].style.transform = `scale(${1+(0.4*invertProg)})`;

                data[i].progress = (invertProg * 2) - 0.5;

              }
            break;
            // /=====================================>> Before
            case index+1 <= i:
              {
                // indexRef.current[i].style.height = `${40}px`;
                // indexRef.current[i].style.transform = `translate3d( 0, ${-30}px, 0)`;
                let nb = indexRef.current[i].querySelector('p') as HTMLDivElement;
                let round = indexRef.current[i].querySelector('div') as HTMLDivElement;
                nb.style.transform = `scale(0)`;
                round.style.transform = `scale(1)`;
                round.style.opacity = `1`;

                imgsRef.current[i].style.transform = `scale(1.4)`;

                // data[i].progress = 0;

              }
            break;
          }
        })

      }}

      ui={
        <div className="wrapper gridCtn w-full h-full">
          <nav className="h-fit ay-center col-1-6">
            {slice.primary.slides.map((item, index) => (
              <div
                key={index}
                ref={el=>{indexRef.current[index] = el as HTMLDivElement}}
                className="text-ClearPrimary hs2 grid h-fit w-fit relative"
                
                >
                <p className="text-[100px] t-m:text-[40px] h-fit w-fit absolute m-auto -top-200 -bottom-200 -left-200 -right-200 ">{String(index+1).padStart(2, "0")}</p>
                <div className="p-10  rounded-4 col-1 row-1 a-center-center pointer-events-auto cursor-pointer group" onClick={()=>{
                  setGoto(index);
                }}>
                  <div className="h-8 w-8 rounded-4 bg-ClearPrimary border-ClearPrimary border-2 scale-100 group-hover:scale-150 group-hover:bg-transparent transition-all"></div>
                </div>
              </div>
            ))}
          </nav>
        </div>
      }

      slides={slice.primary.slides.map((item, i) => (
        <div className="w-full h-full overflow-hidden relative" key={i}>
          <div
            className="absolute-full mediaCtn"
            ref={el=>{imgsRef.current[i] = el as HTMLDivElement}}
            >
            <PrismicNextImage field={item.image} width={1920} />
          </div>
          <div className="gridCtn wrapper w-full h-full grid">
            <div className="col-8-13 row-1 ay-center z-40 text-ClearPrimary t-m:col-5-13">
              <TextScroll node="h2" className="hs2 mb-24">{item.titre}</TextScroll>
              {/* <TextProgress progress={data[i]} node="h2" className="hs2 mb-24">{item.titre}</TextProgress> */}
              
              <ScrollRichText field={item.texte} />
            </div>
            {(asLink(item.url_lien) && (
              <div className="col-1-13 row-1 a-center-end mb-100 z-40">
                <Button className="min-w-400 t-m:min-w-200" field={item.url_lien}>{item.label_lien}</Button>
              </div>
            ))}
          </div>
        </div>
      ))}
      />
  );
};

export default Slider;



/*
'use client;'
import { useMemo, useRef } from "react";

import { AnimLink } from "@/library/navigation/AnimLink";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import { useScroll } from "@/library/scroll/ScrollContainer";
import ScrollRichText from "@/library/text/ScrollRichText";
import TextScroll from "@/library/text/TextScroll";
import useOnResize from "@/hook/useOnResize";

export type SliderProps = SliceComponentProps<Content.SliderSlice>;

interface slidesDataType {
  bounding : DOMRect | undefined
  top : number
  bottom : number
  // max : number
  // min : number
}
interface globalDataType {
  top: number,
  bottom: number
}



const Slider = ({ slice }: SliderProps): JSX.Element => {

  const slides = useRef<HTMLDivElement[]>([]);

  const slidesData = useMemo<slidesDataType[]>(()=>([]), []);
  const globalData = useMemo<globalDataType>(()=>({
    top:0,
    bottom:0
  }), []);


  useOnResize(()=>{
    if (slides.current) {
      slides.current.forEach((el, i)=>{
        slidesData[i].bounding = slides.current[i].getBoundingClientRect();
        const top = document.querySelector('.currentPage')?.scrollTop || 0;
        slidesData[i].top = slidesData[i].bounding.top + top - (window.innerHeight);
        slidesData[i].bottom = slidesData[i].top + (slidesData[i].bounding.height);
        // el.bounding = slides.current[i].getBoundingClientRect();
        // const top = document.querySelector('.currentPage')?.scrollTop || 0;
        // el.pos = el.bounding.top + top + (el.bounding.height)-(window.innerHeight);
      });
    }
  })

  useScroll(({animatedScroll})=>{
    if ( slides.current  ) {
      slides.current.forEach((el, i)=>{
        if (animatedScroll > slidesData[i].top && animatedScroll < slidesData[i].bottom) {
          console.log(i);
        }
        // const res = clamp((slidesData[i].pos - animatedScroll) / (window.innerHeight), 0, 1);

      });

    }
  }, "main");




  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="stickySections relative"
    >
      <div className="ui">
      {slice.primary.slides.map((item, index) => (
        <div className="">
          <p>{index}</p>
          <div className="h-4 w-4 rounded-4 bg-ClearPrimary"></div>
        </div>
      ))}

      </div>

      <div className="wrap">
        {slice.primary.slides.map((item, i) => (
          <div 
          key={i} 
          ref={el => slides.current[i] = el}
          className="stickyCtn">
            <div className="slide">

              <div className="absolute-full mediaCtn">
                <PrismicNextImage field={item.image} />
              </div>

              <div className="gridCtn wrapper">
                <div className="">
                  <TextScroll node="h2">{item.titre}</TextScroll>
                </div>

                <AnimLink field={item.url_lien}>{item.label_lien}</AnimLink>

              </div>

              

            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Slider;
*/