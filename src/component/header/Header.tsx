'use client';

import { useEffect, useRef, useState } from "react";
import { create } from "zustand";

import { AnimLink } from "@/library/navigation/AnimLink";
import { useScroll } from "@/library/scroll/ScrollContainer";
import { useTransitionState } from "@/library/navigation/TransitionElement";

import Button from "../navigation/Button";
import { CallMenu, Geoloc, Instagram } from "../icons";

interface HeaderStateType {
  state: boolean
  setState: (val: boolean) => void
}

export const useHeaderState = create<HeaderStateType>((set) => ({
  state: false,
  setState: (val) => set({ state: val })
}));

export default function Header({data, settings}:any) {

  // const ctn = useRef<HTMLElement>(null);
  const {state, setState} = useHeaderState();
  const [scrollState, setScrollState] = useState(false);

  const statePage = useTransitionState();

  
  const buttonBg = (process.env.NEXT_PUBLIC_INSTANCE == "cherry")? 'bg-Primary hover:bg-Tertiary transition' : 'bg-ClearPrimary';
  const buttonText = (process.env.NEXT_PUBLIC_INSTANCE == "cherry")? 'text-ClearPrimary hover:text-ClearPrimary transition' : 'text-Primary';
  // -- -- -- -- -- -- --  
  const buttonBgScrolled = (process.env.NEXT_PUBLIC_INSTANCE == "cherry")? 'bg-ClearPrimary hover:bg-Primary transition' : 'bg-ClearPrimary';
  const buttonTextScrolled = (process.env.NEXT_PUBLIC_INSTANCE == "cherry")? 'text-Primary hover:text-ClearPrimary transition' : 'text-Primary';
  // -- -- -- -- -- -- --  
  const text = (process.env.NEXT_PUBLIC_INSTANCE == "cherry")? 'text-Primary hover:text-Tertiary transition' : 'text-ClearPrimary';
  const textScrolled = (process.env.NEXT_PUBLIC_INSTANCE == "cherry")? 'text-ClearPrimary  hover:text-Tertiary transition' : 'text-ClearPrimary';

  useEffect(()=>{
    switch (statePage.state) {
      case 'idle':

      break;
      case 'loading':
        
      break;
      case 'in':
        
      break;
      case 'out':
        setState(false);
      break;
    }
  },[statePage]);

  useScroll(({animatedScroll})=>{
    // if (ctn.current) {
      if(animatedScroll > 0) {
        setScrollState(true);
        // ctn.current.classList.add("scrolled");
      } else {
        setScrollState(false);
        // ctn.current.classList.remove("scrolled");
      }
    // }
  },"main");

  return (
    <header
      // ref={ctn}
      
      className={`header-main z-100 fixed w-full h-header text-ClearPrimary pr-40 pl-40 grid t-m:grid-cols-header-m group t-m:pr-20 t-m:pl-20  ${(scrollState)? "scrolled": ""} ${(state)? "open": ""}`}
      >
      <div className="bg absolute w-screen bg-Primary "></div>

      <div className="row-1 ay-center z-10">
        <div className="block t-m:hidden">
          <AnimLink field={data.url_localisation} className={`uppercase ${(scrollState || state)? ` ${textScrolled}`: text}`}>
            <Geoloc />
          </AnimLink>

        </div>
        <div
          className={`hidden t-m:block ${(scrollState || state)? ` ${textScrolled}`: text}`}
          onClick={()=>{
            setState(!state)
          }}
          >
          <CallMenu/>
        </div>
      </div>

      <div className="nav-main flex flex-nowrap row-1 a-center-center gap-40 z-10 text-center t-m:row-2 group-[.open]: t-m:flex-col t-m:col-1-3 t-m:ay-start t-m:w-full t-m:pt-40">
        {data.navigation.map((item:any, i:number) => (
          <AnimLink key={i} field={item.lien} className={`uppercase ${(scrollState || state)? ` ${textScrolled}`: text}`}>{item.label}</AnimLink>
        ))}
      </div>

      <div className="row-1 a-end-center flex flex-nowrap gap-20 z-10">
        <a href={settings.instagram} className={`block ay-center ${(scrollState || state)? ` ${textScrolled}`: text}`} target="_blank">
          <Instagram/>
        </a>
        <Button field={data.url_bouton} type="noColor" className={`btnn ${(scrollState || state)? buttonBgScrolled+' '+buttonTextScrolled : buttonBg+' '+buttonText }`}>{data.label_bouton}</Button>
      </div>

    </header>
  )
}
