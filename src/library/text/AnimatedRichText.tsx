import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";

import { PrismicRichText } from "@prismicio/react";

import useTextSpanner from "./useTextSpanner";

interface AnimatedRichTextType {
  active : boolean
  // callback: ([])=>{}
  field :any
}



export default function AnimatedRichText({ active, field}:AnimatedRichTextType) {

  const instances = useRef<((el:boolean)=>void)[]>([])

  const ss = useRef(<PrismicRichText field={field} 
    components={{
      // paragraph: ({ node, children, key }) => {
      //   console.log(key);
      //   return <AnimParagraphe word callback={(active)=>(instances.current.push(active))} className="opacity-word">{children}</AnimParagraphe>
      // },
      paragraph: ({ node, children, key }) => (
        <AnimParagraphe word callback={(active)=>(instances.current.push(active))} className="opacity-word">{children}</AnimParagraphe>
      ),
      heading1: ({ node, children }) => (
        <AnimTitle callback={(active)=>(instances.current.push(active))} className="opacity-letter">{children}</AnimTitle>
      ),
      heading2: ({ node, children }) => (
        <AnimTitle callback={(active)=>(instances.current.push(active))} className="opacity-letter">{children}</AnimTitle>
      ),
    }}/>)


  // const [active, setActive] = useState(false);


  // useEffect(()=>{
  //   callback(instances.current);
  // },[]);

  useEffect(()=>{
    instances.current.forEach(el=>{
      el(active);
    })
  },[active])
  

  return ss.current;
}



interface AnimParagrapheType {
  children : string | JSX.Element | JSX.Element[] | (string | JSX.Element)[] 
  callback : (el:Dispatch<SetStateAction<boolean>>)=>void
  className ?: string
  word ?: boolean
  boxed ?: boolean
  interval ?: number
}

interface memoParagraphe {
  timer : (NodeJS.Timeout)[]
}



function AnimParagraphe({children, callback, className, word = false, boxed = false, interval = 40 }:AnimParagrapheType) {

  const txt = useRef<HTMLParagraphElement>(null);

  const [active, setActive] = useState(false);


  // console.log(word)
  const [objects, refs] = useTextSpanner({children, word, boxed});

  const data = useMemo<memoParagraphe>(()=>({
    timer : [],
  }), []);


  useEffect(()=>{
    callback(setActive);
  },[]);


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
    <p className={`text-anim ${className}`} ref={txt}>{objects}</p>

  )
}



function AnimTitle({children, callback, className, word = false, boxed = false, interval = 40 }:AnimParagrapheType) {

  const txt = useRef<HTMLParagraphElement>(null);

  const [active, setActive] = useState(false);

  // console.log(word)
  const [objects, refs] = useTextSpanner({children, word, boxed});

  const data = useMemo<memoParagraphe>(()=>({
    timer : [],
  }), []);


  useEffect(()=>{
    callback(setActive);
  },[]);


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
    <p className={`text-anim ${className}`} ref={txt}>{objects}</p>

  )
}


