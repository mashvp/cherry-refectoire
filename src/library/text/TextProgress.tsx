'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { KeyTextField } from "@prismicio/client";
import useLoop from "@/hook/useLoop";
import useOnResize from "@/hook/useOnResize";
import useScrollProgress from "@/hook/useScrollProgress";

import { useScroll } from "../scroll/ScrollContainer";
import useTextSpanner from "./useTextSpanner";

type childrenType =any
// type childrenType = string | JSX.Element | JSX.Element[] | (string | JSX.Element)[] | KeyTextField

interface progressType {
  progress : number
}

interface TextSpanerType {
  children: childrenType
  progress: progressType
  node ?: 'p' | 'h1' | 'h2' | 'h3' | 'div'
  className?: string
  callback?: (el:HTMLSpanElement, progress:number)=>void
  interval ?: number
  word?: boolean
  boxed?: boolean
  backward?: boolean
} 


export default function TextProgress({children, progress, className = '', node = 'p',  callback = (el, prog)=>{el.style.opacity = String(prog)}, word = false, boxed = false, backward, interval = 0.1}:TextSpanerType) {

  const txt = useRef<HTMLDivElement>(null);

  const [objects, refs] = useTextSpanner({children, word, boxed});

  useLoop(()=>{
    // console.log(progress);
    const nb = refs.current.length;

    const base = mapRange(interval, 0, 1, 1, nb );
    const duration = 1 / base;
    const offset = mapRange(interval, 0, 1, 0, duration );

    refs.current.forEach((el, i)=>{
      const sens = (backward)? i : (nb-i -1);
      const start = offset * sens;
      const end = start+duration;
      // console.log(start, end);
      const prog = clamp(mapRange(progress.progress, start, end, 1, 0), 0, 1);
      callback(el, prog);
    });
  }, {})

  // useEffect(()=>{
  //   const nb = refs.current.length;

  //   const base = mapRange(interval, 0, 1, 1, nb );
  //   const duration = 1 / base;
  //   const offset = mapRange(interval, 0, 1, 0, duration );

  //   refs.current.forEach((el, i)=>{
  //     const sens = (backward)? i : (nb-i -1);
  //     const start = offset * sens;
  //     const end = start+duration;
  //     // console.log(start, end);
  //     const prog = clamp(mapRange(progress, start, end, 1, 0), 0, 1);
  //     callback(el, prog);
  //   });
  // },[progress]);


  switch (node) {
    case 'h1':
      return <h1 className={className} ref={txt}>{objects}</h1>;
    break;
    case 'h2':
      return <h2 className={className} ref={txt}>{objects}</h2>;
    break;
    case 'h3':
      return <h3 className={className} ref={txt}>{objects}</h3>;
    break;
    case 'div':
      return <div className={className} ref={txt}>{objects}</div>;
    break;
    case 'p':
    default:
      return <p className={className} ref={txt}>{objects}</p>;
    break;
  }

  // return (
  //   <div className="" ref={txt}>{objects}</div>
  // )
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







// interface TextSpanerType {
//   children: childrenType
//   callback: (el:HTMLSpanElement, progress:number)=>void
//   interval ?: number
//   letter?: boolean
//   boxed?: boolean
//   backward?: boolean
//   anchor?: number
//   end?: number
//   duree?: number
// } 

// interface dataMemoType {
//   bounding : DOMRect | undefined
//   pos : number
//   // max : number
//   // min : number
// }



// export default function TextScroll({children, callback, letter = true, boxed = false, backward, interval = 0.5, anchor = 0.5, end = 0.5, duree = 0.5 }:TextSpanerType) {

//   const txt = useRef<HTMLDivElement>(null);

//   const [objects, refs] = useTextSpanner({children, letter, boxed});

//   const data = useMemo<dataMemoType>(()=>({
//     bounding : undefined,
//     pos : 0,
//     // max : (!forward)? 0 : 1,
//     // min : (forward)? 0 : 1
//   }), []);


//   useOnResize(()=>{
//     if (txt.current) {
//       data.bounding = txt.current.getBoundingClientRect();
//       data.pos = data.bounding.top + window.scrollY + (data.bounding.height*anchor)-(window.innerHeight*end);
//     }
//   })

//   useScroll(({animatedScroll})=>{
//     if ( txt.current && data.pos ) {
//       const res = (data.pos - animatedScroll) / (window.innerHeight*duree);
//       const nb = refs.current.length;


//       const base = mapRange(interval, 0, 1, 1, nb );
//       const duration = 1 / base;
//       const offset = mapRange(interval, 0, 1, 0, duration );

      
//       refs.current.forEach((el, i)=>{
//         const sens = (backward)? i : (nb-i -1);
//         const start = offset * sens;
//         const end = start+duree;
//         // console.log(start, end);
//         const prog = clamp(mapRange(res, start, end, 1, 0), 0, 1);
//         callback(el, prog);
//       });
      
//     }
//   },"main");





//   return (
//     <div className="text-base" ref={txt}>{objects}</div>

//   )
// }


