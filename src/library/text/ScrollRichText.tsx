'use client';
import { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from "react";

import { PrismicRichText } from "@prismicio/react";

import TextScroll from "./TextScroll";
import useTextSpanner from "./useTextSpanner";

interface AnimatedRichTextType {
  // active : boolean
  // callback: ([])=>{}
  field :any
  windowPosition?: number
}



export default function ScrollRichText({field, windowPosition = 0.5}:AnimatedRichTextType) {

  const ss = useRef(<PrismicRichText field={field} 
    components={{
      // paragraph: ({ node, children, key }) => {
      //   console.log(key, children);
      //   return <TextScroll word>{key} {children}</TextScroll>
      // },
      paragraph: ({ node, children }) => (
        <TextScroll word windowPosition={windowPosition}>{children}</TextScroll>
      ),
      heading1: ({ node, children }) => (
        <TextScroll node="h1">{children}</TextScroll>
      ),
      heading2: ({ node, children }) => (
        <TextScroll node="h2">{children}</TextScroll>
      ),
    }}/>)

    // const ss = useRef(<TextScroll node="div"><PrismicRichText c field={field} /></TextScroll>);


  return ss.current;
}

