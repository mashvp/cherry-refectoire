'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import useTextSpanner from "./useTextSpanner";

// type childrenType = React.ReactNode;
type childrenType = string | JSX.Element | JSX.Element[] | (string | JSX.Element)[] 


interface TextSpanerType {
  children: childrenType
  className: string
  active?: boolean
  interval ?: number
  word?: boolean
  boxed?: boolean
  backward?: boolean
  anchor?: number
  end?: number
  duree?: number
} 

interface dataMemoType {
  timer : NodeJS.Timeout[]
}


export default function TextAnim({children, className, active, word = false, boxed = false, backward, interval = 40 }:TextSpanerType) {

  const txt = useRef<HTMLDivElement>(null);

  // console.log(word)
  const [objects, refs] = useTextSpanner({children, word, boxed});

  const data = useMemo<dataMemoType>(()=>({
    timer : [],
  }), []);



  useEffect(()=>{
    if ( txt.current ) {
      if (active) {     
        refs.current.forEach((el,i)=>{
          data.timer.push(setTimeout(()=>{
            el.classList.add('active');
          },i*interval));
        });
        
      } else {
        data.timer.forEach(el=>{
          clearTimeout(el);
        });
        refs.current.forEach(el=>{
            el.classList.remove('active');
        });
      }
    }
  },[active]);


  return (
    <div className={`text-anim ${className}`} ref={txt}>{objects}</div>

  )
}






