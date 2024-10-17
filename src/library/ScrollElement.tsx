'use client';
import { useRef } from "react";

import useScrollProgress from "@/hook/useScrollProgress";

type childrenType = JSX.Element | JSX.Element[] 

interface ScrollElementType {
  children: childrenType
  // node ?: 'p' | 'h1' | 'h2' | 'h3' | 'div'
  classIn?: string
  classOut?: string
  callback?: (el:HTMLDivElement, progress:number)=>void

  selfAnchor?: number
  windowPosition?: number
  windowLength?: number
  min?: number
  max?: number
} 

export default function ScrollElement({children, classIn = '', classOut = '',  callback = (el, prog)=>{el.style.opacity = String(1-prog)}, selfAnchor = 0.5, windowPosition = 0.5, windowLength = 0.5, min = -1, max = 1}:ScrollElementType) {

  const ctn = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useScrollProgress((progress) => {
    if (inner.current) callback(inner.current, progress)
  },{
    ref:ctn,
    selfAnchor,
    windowPosition,
    windowLength,
    min,
    max
  });

  return (
    <div className={classOut} ref={ctn}>
      <div className={`${classIn} w-full h-full`} ref={inner}>
      {children}
      </div>
    </div>
  );

  

}


// function mapRange(value:number, x1:number, y1:number, x2=0, y2=1) {
//   return (value - x1) * (y2 - x2) / (y1 - x1) + x2;
// }

//  function clamp(value:number, min:number, max:number) {
//     if (min < max) {
//       return Math.max(Math.min(value, max), min);
//     } else {
//       return Math.max(Math.min(value, min), max);
//     }
//  }


