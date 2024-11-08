'use client'

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { create } from "zustand";

import { ScrollContainer } from "@/library/scroll/ScrollContainer";
import Footer from "@/component/footer/Footer";
import Header from "@/component/header/Header";
import useLoop from "@/hook/useLoop";

type transitionStateType = "idle"|"loading"|"in"|"out"|"firstLoading";


// =========================>  Store

interface TransitionFunctionType {
  fn: ()=>void
  setFn: (val: ()=>void) => void
}

export const useTransitionfunction = create<TransitionFunctionType>((set) => ({
  fn: ()=>{},
  setFn: (val) => set({ fn: val })
}));


interface TransitionStateType {
  state: transitionStateType
  setState: (val: transitionStateType) => void
}

export const useTransitionState = create<TransitionStateType>((set) => ({
  state: "firstLoading",
  setState: (val) => set({ state: val })
}));


// =========================>  Data
const navigationData = {
  prev: null,
  progress:0
};

var loadeed = [false];

// =========================>  Utils

function useLoadedMedia() {
  // const [loaded, setLoaded] = useState<number>(0);
  const [state, setState] = useState<boolean>(false);

  const pathname = usePathname();
  
  // const data = useMemo(()=>({
  //   length: 0,
  //   // progress: 0
  // }),[pathname]);

  useEffect(()=>{
    setState(false);
    // loadeed = 0;
    // setLoaded(loadeed);
    // data.progress = 0;
    navigationData.progress = 0;

    const media = document.querySelectorAll('.currentPage img') as NodeListOf<HTMLImageElement>;
    

    // const unique = Array.from(media).filter((value, index, array) => {
    //   return array.map(el=>(el.src)).indexOf(value.src) === index;
    // });

    const unique = Array.from(media).filter((value, index, array) => {
      // value.loading = 'eager';
      return value.clientHeight > 0 && value.clientWidth > 0 && value.loading == 'eager';
    }).filter((value, index, array) => {
      return array.map(el=>(el.src)).indexOf(value.src) === index;
    })

    loadeed = unique.map((el, i)=>(false));

    // data.length = unique.length;
    if (loadeed.length != 0) {
      
      unique.forEach((el, i)=>{
        // loadeed[i] = false;

        el.addEventListener('load', (e)=>{
          // console.log('load', el.src);
          loadeed[i] = true;
          update();
        });
        el.addEventListener('error', function() {
          // console.log('error', el.src);
          loadeed = [true];
          update();
        });
        if (el.complete) {
          // console.log('comp', el.src);
          loadeed[i] = true;
          update();
        }
        // setTimeout(()=>{
        //   if (el.complete) {
        //     // console.log('end', el);
        //     loadeed[i] = true;
        //     update();
        //   }
        // }, 2000);
      });

    } else {
      loadeed = [true];
      update();
    }

    // setTimeout(()=>{
    //   data.length = 1;
    //   loadeed = 1;
    //   update();
    // },2000);

  },[pathname]);


  const update = ()=> {
    // console.log(loadeed, loadeed.length);
    const nb = loadeed.filter(el=>el).length;
    navigationData.progress = nb / loadeed.length;
    if (nb >= loadeed.length) {
      setState(true);
      setTimeout(()=>{
        setState(false);
      }, 100);
    }
  }


  return state;
  // return {state:state, progress:data.progress};

  
}


function useStatePageTransition() {
  // const [state, setState] = useState<transitionStateType>('firstLoading');
  const {state, setState} = useTransitionState();
  const {setFn} = useTransitionfunction();

  const pathname = usePathname();

  const pageLoaded = useLoadedMedia();
    
  const startloading = () => {
    // console.log("start");
    // document.body.classList.add('transition');
    setState('loading');
  }

  useEffect(()=>{
    setFn(startloading);
  },[]);

  useEffect(()=>{
      // console.log(pathname);

    if (state == "loading") {
      setState('in');
    }
  },[pathname])
  

  useEffect(()=>{
    if (pageLoaded) {
      setTimeout(()=>{
        setState('out');
        // document.body.classList.remove('transition');
        setTimeout(()=>{
          setState('idle');
        }, 1000);
    }, 600);


    }
  },[pageLoaded]);

  return state;

}





// =========================>  Elements


interface Props {
  children: React.ReactNode
  footerData:any
  settingsData:any
  headerData: any
}



export default function TransitionPage({children, footerData, settingsData, headerData}: Props) {

  const currentChild = useRef<HTMLDivElement>(null);
  // const prevChild = useRef<HTMLDivElement>(null);

  const state = useStatePageTransition();

  
  useEffect(()=>{
    switch (state) {
      case 'idle':
        // console.log('idle');

        
      break;
      case 'loading':
        // console.log('loading');

        // if (prevChild.current && currentChild.current) {
        //   while (prevChild.current.firstChild) {
        //     prevChild.current.removeChild(prevChild.current?.firstChild);
        //   }
          // navigationData.prev = currentChild.current.cloneNode(true);
          // navigationData.prev.classList.remove('currentPage');
          // navigationData.prev.className = '';
          // prevChild.current.appendChild(navigationData.prev);
          
          // prevChild.current.scrollTo(0, currentChild.current.scrollTop);
          // console.log('dd')
        // }
      break;
      case 'in':
        // console.log('in');

      break;
      case 'out':
        // console.log('out');

      break;
    }
  },[state]);


  return (
    <div className={`pageTransitionContainer ${state}`}>

      {/* <div ref={prevChild} className="previousPage"></div> */}
      
      <Header data={headerData} settings={settingsData}/>

      <ScrollContainer id="main" ref={currentChild}  className="currentPage">
        {children}
        <Footer data={footerData} settings={settingsData}/>
      </ScrollContainer>

      <div className="loadingOverlay">
        <div className="w-screen h-screen grid content-center justify-center bg-ClearPrimary">
          <div className="text-Primary">
            
            
            <Progress/>
          </div>
        </div>
      </div>

    </div>
  );
}



function Progress() {

  const nbCtn = useRef<HTMLSpanElement>(null);
  const progCtn = useRef<HTMLDivElement>(null);

  const data = useMemo(()=>({
    prev : 0
  }),[]);

  useLoop(delta=>{
    data.prev = lerp(data.prev, navigationData.progress, 0.02);
    const res = data.prev * 100;
    // console.log(data.prev);
    if (nbCtn.current) {
      nbCtn.current.textContent = String(Math.floor(res)) ;
    }
    if (progCtn.current) {
      progCtn.current.style.width = `${res}%`;
    }
  }, {});


  return (
    <div className="progress grid grid-cols-2">
      <p className="text-[40px] ">Loading</p>
      <div className="a-end-end">
        <span ref={nbCtn} className="">0</span>
        <span className="">%</span>
        
      </div>
      <div className="relative h-4 w-full mt-10 bg-Tertiary col-span-2">
        <div ref={progCtn} className="bg-Primary h-4"></div>
      </div>
    </div>
  )
}



function lerp( a:number, b:number, alpha:number ):number {
  if ( b - a  < 0.01) {
    return b;
  }
  return a + alpha * ( b - a );
 }