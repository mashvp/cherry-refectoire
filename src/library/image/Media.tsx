import { useEffect, useRef } from "react";

import { PrismicNextImage } from "@prismicio/next"

import { useTransitionState } from "../navigation/TransitionElement";

interface MediaType {
  field: any
  autoplay?: boolean
}

export default function Media({field, autoplay = false}:MediaType) {

  // const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const {state} = useTransitionState();

  

  useEffect(()=>{
    if (state == "idle" || state == "out") {
      videoRef.current?.play();
    }
  },[state]);
  

  return (field.kind == "image")? (
    <img src={field.url} />
  ):(
    <video ref={videoRef} playsInline muted loop src={field.url} />
  )

  
}