'use client';
import { useEffect, useMemo, useRef } from "react";

import { PrismicNextImage } from "@prismicio/next";
import { useScroll } from "@/library/scroll/ScrollContainer";
import useOnResize from "@/hook/useOnResize";

interface ParrallaxInnerType {
  field : any
  className ?: string
  offset?: number
  width?: number
}


export default function ParrallaxInner({field, className = '', offset = 100, width = 1000}:ParrallaxInnerType) {

  const img = useRef<HTMLDivElement>(null);

  const data = useMemo(()=>({
    top :  0,
    bottom : 0
  }), []);

  useScroll(({animatedScroll})=>{
    if ( img.current ) {
      const el = img.current.querySelector("img");

      const res = mapRange(animatedScroll, data.top, data.bottom, -offset/2, offset/2);
  
      if (el) {
        el.style.transform = `translate3d(0, ${res}px, 0)`;
      }
    }
  },"main")

  useOnResize(()=>{
    if (img.current) {
      const bounding = img.current.getBoundingClientRect();
      const top = document.querySelector('.currentPage')?.scrollTop || 0;
      data.top = bounding.top + top- window.innerHeight;
      data.bottom = bounding.top + bounding.height + top;

      const el = img.current.querySelector("img");
      if (el) {
        el.style.height = `calc(100% + ${Math.abs(offset)}px)`;
      }
    }
  })


  return (
    <div className={`para ${className}`} ref={img} >
      <PrismicNextImage field={field}  className="w-full" width={width} />
      {/* <img src={field.url} loading="lazy"  className="w-full" /> */}
    </div>
  )
}


function mapRange(value:number, x1:number, y1:number, x2=0, y2=1) {
  return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
}
