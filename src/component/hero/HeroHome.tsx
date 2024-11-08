'use client'
import Lottie from "lottie-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { useTransitionState } from "@/library/navigation/TransitionElement";
import { asLink } from "@prismicio/client";
import * as prismic from "@prismicio/client";
import ScrollElement from "@/library/ScrollElement";
import ScrollRichText from "@/library/text/ScrollRichText";
import TextScroll from "@/library/text/TextScroll";

import Button from "../navigation/Button";

interface HeroType {
  data:any,
  lottie:any
}

export default function HeroHome({data, lottie}:HeroType) {

  // const containerRef = useRef<HTMLDivElement>(null);
  // const videoRef = useRef<HTMLVideoElement>(null);

  // const {state} = useTransitionState();

  // useEffect(()=>{q
  //   if (state == "idle" || state == "out") {
  //     videoRef.current?.play();
  //     containerRef.current?.classList.add('active');
  //   }
  // },[state]);


  const nfield = {dimensions:{width:data.media.width, height:data.media.height}, ...data.media};

  return (
    <section className="heroHome overflow-hidden">
      <div className={`top pt-header ${(process.env.NEXT_PUBLIC_INSTANCE == "cherry")?'bg-ClearPrimary': 'bg-Primary'}`}>
        <div className="wrapper gridCtn gap-y-0 pt-60">

          {(data.background_logo && (
            <div className="background col-2-12 row-1 t-m:col-1-13 t-m:-mr-40 t-m:-ml-40">
              <PrismicNextImage className="w-full" field={data.background_logo} />
            </div>
          ))}
          <div className="logo col-2-12 row-start-1 t-m:col-1-13">
          <Lottie animationData={lottie} loop={false} />
          </div>
          {(data.texte_top &&
          <div className={`txt col-2-12 text-center mb-40 t-m:col-1-13 ${(process.env.NEXT_PUBLIC_INSTANCE == "cherry")?'text-Primary': 'text-ClearPrimary'}`}>
            <p>{data.texte_top}</p>
          </div>
          )}
          {(asLink(data.media) &&
            <ScrollElement
              classOut="col-2-12 mb-[-25%] z-10 t-m:col-1-13 t-m:-mr-40 t-m:-ml-40"
              classIn="mediaCtn aspect-[578/275]"
              callback={(el, prog)=>{
                // el.style.transform = `scale(${1+prog*0.2})`;
                // el.style.filter = `blur(${1-prog*6}px)`;
                // el.style.transform = `translate3d(0, ${prog*28}%, 0)`;
                el.style.transform = `translate3d(0, ${prog*20}%, 0) scale(${1+prog*0.2})`;
              }}
              windowPosition={0.56}
              windowLength={0.5}
              max={0}
              >
                {(data.media.kind == 'image')?
                  <PrismicNextImage field={nfield} className="w-full h-auto mb-[-50%]" width={800} />
                : 
                  <video playsInline autoPlay muted loop className="w-full h-auto mb-[-50%]" src={data.media.url} />
                }
            </ScrollElement>
          )}

        </div>
      </div>
      <div className="bottom relative ">
        <ScrollElement
          classOut="absolute-full overflow-hidden"
          classIn="mediaCtn"
          callback={(el, prog)=>{
            el.style.transform = `scale(${prog*0.2+1})`;
            el.style.filter = `blur(${prog*6}px)`;
          }}
          windowPosition={0.7}
          windowLength={0.8}
          selfAnchor={0.5}
          min={0}
          >
            <PrismicNextImage field={data.image_backgound} className="" width={1920} />
        </ScrollElement>
        {/* <div className="mediaCtn absolute-full">
          <PrismicNextImage field={data.image_backgound} />
        </div> */}

        <div className="wrapper gridCtn gap-y-0 pt-[36vw] pb-[20vw] relative z-20">

          <div className="col-1-7 text-ClearPrimary t-m:col-1-13">
            {/* <h1 className="text-hs2 mb-24 font-titre"> */}
              <TextScroll
                node="h1"
                className="text-hs2 mb-24 font-titre"
                interval={0.2}
                // callback={(el, prog)=>{el.style.opacity = String(prog)}}
                >
                  {data.titre}
              </TextScroll>
            {/* </h1> */}
            <div className="mb-24 richtext">
              <ScrollRichText field={data.contenu} />
            </div>
            {(asLink(data.url_lien) && (          
              <Button field={data.url_lien}>{data.label_lien}</Button>
            ))}
          </div>

        </div>

      </div>
    </section>
    // <div ref={containerRef} className="hero w-full h-screen grid grid-cols-12 relative">
    //   <div className="mediaCtn absolute w-full h-full">
    //     { (video && video.url)?
    //       <video ref={videoRef} playsInline muted poster={image.url || ""}>
    //         <source src={video.url} type="video/mp4" />
    //       </video>
    //       :
    //       <PrismicNextImage field={image}></PrismicNextImage>
    //     }
    //   </div>
    //   <div className="wrapper col-span-6 col-start-2 h-fit pb-40 self-end relative z-10">
    //     <h1 className="text-white text-h1 pb-40"><TextAnim className="opacity-letter" active={(state=="idle")}>{title as string}</TextAnim></h1>
    //     {(  text &&
    //       <div className=" text-white">
    //           <AnimatedRichText field={text} active={(state=="idle" || state == "out")}/>
    //       </div>
    //     )}
        
    //   </div>
    // </div>
  )
}
