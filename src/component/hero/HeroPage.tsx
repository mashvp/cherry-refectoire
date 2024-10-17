'use client'

import { useEffect, useRef } from "react";
import { useState } from "react";

import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { useTransitionState } from "@/library/navigation/TransitionElement";
import AnimatedRichText from "@/library/text/AnimatedRichText";
import Media from "@/library/image/Media";

import Button from "../navigation/Button";

interface HeroType {
  data:any
}

export default function HeroPage({data}:HeroType) {

  // const containerRef = useRef<HTMLDivElement>(null);
  // const videoRef = useRef<HTMLVideoElement>(null);
  // const [active, setActive] = useState(false);

  const {state} = useTransitionState();

  // useEffect(()=>{
  //   if (state == "idle" || state == "out") {
  //     setActive(true);
  //   }
  // },[state]);

  return (
    <section className="heroPage relative">
          <div className="mediaCtn !absolute w-screen h-full">
            <Media field={data.media} />
          </div>
        <div className={`wrapper gridCtn ${(data.header_lite)? 'min-h-400 pt-header':'h-screen'}`}>

          <div className="col-2-7 mb-80 mt-80 z-30 text-ClearPrimary ay-end t-m:col-2-12">
            <h1 className="hs2 mb-16">{data.title}</h1>
            <div className="richtext mb-16">
              {/* <PrismicRichText field={data.texte}/> */}
              <AnimatedRichText field={data.texte} active={(state == "idle" || state == "out")} />
            </div>
            <Button field={data.url_lien}>{data.label_lien}</Button>

          </div>
        </div>
    </section>

  )
}
