import { useEffect, useRef } from "react";

import { PrismicNextImage } from "@prismicio/next"
import { asLink } from "@prismicio/client";

import { useTransitionState } from "../navigation/TransitionElement";

interface MediaType {
  field: any
  autoplay?: boolean
  classNaame?: string
  width?: number
}

export default function Media({field, autoplay = false, classNaame = "", width = 1920}:MediaType) {

  // const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const {state} = useTransitionState();

  const nfield = {dimensions:{width:field.width, height:field.height}, ...field};
  

  useEffect(()=>{
    if (state == "idle" || state == "out") {
      videoRef.current?.play();
    }
  },[state]);

  
  return (asLink(field) &&
    (field.kind == 'image')? (
      <PrismicNextImage field={nfield} className={classNaame} width={width} />
    ) : ( 
      <video ref={videoRef} playsInline muted loop src={field.url} className={classNaame} />
    )
  )
  

  // return (field.kind == "image")? (
  //   <img src={field.url} />
    
  // ):(
  //   <video ref={videoRef} playsInline muted loop src={field.url} />
  // )

  
}