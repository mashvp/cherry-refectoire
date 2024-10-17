'use client';
import { useEffect, useMemo, useRef } from "react";

import useOnResize from "@/hook/useOnResize";

import { useLenis, useScroll } from "./scroll/ScrollContainer";

interface StickySectionType {
  className?: string,
  ui: JSX.Element,
  slides: JSX.Element[],
  callback: (index:number, progress:number, slides: HTMLDivElement[])=>void
  goto?: number | null
}

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



export default function StickySection({className = "", ui, slides, callback, goto = null}:StickySectionType) {

  const slidesRef = useRef<HTMLDivElement[]>([]);

  const slidesData = useMemo<slidesDataType[]>(()=>([]), []);
  // const globalData = useMemo<globalDataType>(()=>({
  //   top:0,
  //   bottom:0
  // }), []);
  const lenis = useLenis();


  

  useOnResize((trust)=>{
    
    if (slidesRef.current) {
      if (slidesData[0] && trust) {
        // lenis.actualScroll = slidesData[0].top;
        (document.querySelector('.currentPage') as HTMLDivElement).scrollTop = 0;
        // lenis.options.
        // lenis.targetScroll = 
        // lenis.animatedScroll = slidesData[0].top;
        // lenis.scrollTo(slidesData[0].top, {immediate:true});
      }
      slidesRef.current.forEach((el, i)=>{
        slidesData[i] = {
          bounding : slidesRef.current[i].getBoundingClientRect(),
          top:0,
          bottom:0
        };
        const scrollPos = document.querySelector('.currentPage')?.scrollTop || 0;
        if (slidesData[i].bounding) {
          slidesData[i].top = slidesData[i].bounding.top + scrollPos - (window.innerHeight);
          // slidesData[i].bottom = slidesData[i].top + (slidesData[i].bounding.height);
          slidesData[i].bottom = slidesData[i].top + window.innerHeight;
        }
        // console.log(slidesData[i]);
      });
    }
  })

  useEffect(()=>{
    if (goto!=null) {
      const delta = Math.abs((document.querySelector('.currentPage') as HTMLDivElement).scrollTop - slidesData[goto].bottom)*0.001;
      lenis.scrollTo(slidesData[goto].bottom, {duration:0.4*delta, easing:(t)=>t});
    }
  }, [goto])

  useScroll(({animatedScroll})=>{
    if ( slidesRef.current  ) {
      slidesRef.current.forEach((el, i)=>{
        if (animatedScroll > slidesData[i].top && animatedScroll < slidesData[i].bottom) {
          const res = mapRange(animatedScroll, slidesData[i].top, slidesData[i].bottom, 0, 1);
          // console.log(i, res);
          callback(i, res, slidesRef.current);
        }
      });
    }
  }, "main");

  return (
    <section
      className={`stickySections relative ${className}`}
      >
        <div className="ui">
          <div className="ctn">
            {ui}
          </div>
        </div>
        <div className="wrap">
          {slides.map((item, i) => (
            <div 
              key={i} 
              ref={el => {slidesRef.current[i] = el as HTMLDivElement}}
              className="stickyCtn">
                <div className="slide"
                  >
                  {item}
                </div>
            </div>
          ))}
        </div>
    </section>
  );
}


function mapRange(value:number, x1:number, y1:number, x2=0, y2=1) {
  return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
}

 function clamp(value:number, min:number, max:number) {
    if (min < max) {
      return Math.max(Math.min(value, max), min);
    } else {
      return Math.max(Math.min(value, min), max);
    }
 }
