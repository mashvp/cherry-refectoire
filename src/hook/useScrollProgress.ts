import { RefObject, useEffect, useMemo, useState } from "react";

import { useScroll } from "@/library/scroll/ScrollContainer";

import useOnResize from "./useOnResize";

interface useScrollProgressType {
  ref: RefObject<HTMLDivElement>
  backward?: boolean
  selfAnchor?: number
  windowPosition?: number
  windowLength?: number
  min?: number
  max?: number
  scrollerInstance ?: string
} 


interface dataMemoType {
  bounding : DOMRect | undefined
  pos : number
  // max : number
  // min : number
}

export default function useScrollProgress(callback:(progress:number)=>void,{ref, selfAnchor = 0.5, windowPosition = 0.5, windowLength = 0.5, min = -1, max = 1, scrollerInstance = "main"}:useScrollProgressType) {

  const data = useMemo<dataMemoType>(()=>({
    bounding : undefined,
    pos : 0,
    // max : (!forward)? 0 : 1,
    // min : (forward)? 0 : 1
  }), []);


  useOnResize(()=>{
    if (ref.current) {
      data.bounding = ref.current.getBoundingClientRect();
      const top = document.querySelector('.currentPage')?.scrollTop || 0;
      data.pos = data.bounding.top + top + (data.bounding.height*selfAnchor)-(window.innerHeight*windowPosition);
      // data.pos = data.bounding.top + window.scrollY + (data.bounding.height*selfAnchor)-(window.innerHeight*windowPosition);
      // console.log( data.pos);
    }
  })

  useScroll(({animatedScroll})=>{
    if ( ref.current && data.pos ) {
      const res = clamp((data.pos - animatedScroll) / (window.innerHeight*windowLength), min, max);

      callback(res);
      
    }
  },scrollerInstance);


}

function clamp(value:number, min:number, max:number) {
  // if (min < max) {
    return Math.max(Math.min(value, max), min);
  // } else {
  //   return Math.max(Math.min(value, min), max);
  // }
}