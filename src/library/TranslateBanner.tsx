import { useEffect, useMemo, useRef, useState } from "react"

import { useScroll } from "@/library/scroll/ScrollContainer";
import useLoop from "@/hook/useLoop";
import useOnResize from "@/hook/useOnResize";

interface TranslateBannerType {
  children: React.ReactNode,
  speed ?: number
  vertical?: boolean
  scrollSpeed?: number
}

export default function TranslateBanner({children, vertical = false, speed = 1, scrollSpeed = 1}:TranslateBannerType) {
  const container = useRef<HTMLDivElement>(null);
  const item = useRef<HTMLDivElement>(null);

  const [copy, setCopy] = useState<React.ReactNode[]>([]);

  const data = useMemo(()=>({
    progress: new Progress(),
    deltaScroll: new Delta(0),
    scroll:0,
    x:(!vertical)? -100 : 0,
    y:(!vertical)? 0 : -100
  }),[])

  useOnResize(()=>{
    if (item.current && container.current) {
      setCopy(val=>[]);
      const itemWidth = (vertical)? item.current.clientHeight : item.current.clientWidth;
      const contentWidth = (vertical)? container.current.clientHeight : container.current.clientWidth;
  
      // console.log(itemWidth, contentWidth);
      
      let nb = contentWidth / itemWidth;
      let int = Math.ceil(nb);
  
      let res = itemWidth * int;
      
        
      for (let i = 0; i < int*2; i++) {
        let copy = children;
        setCopy(val=>[...val,copy]);
      }    
  
      if (!vertical) {
        container.current.style.width = res + 'px';
      } else {
        container.current.style.height = res + 'px';
      }
    }
  });

  useScroll(({animatedScroll})=>{
    data.scroll = animatedScroll;
  },'main')
  

  useLoop((delta)=>{
    if (container.current) {
      // console.log(delta);

      const deltaTime = delta / 10000 * speed;
      const delatScroll = data.deltaScroll.getDelta(data.scroll) / 2000 * scrollSpeed;

      const res = data.progress.getProgress(deltaTime+ delatScroll);

      container.current.style.transform = `translate3d(${res*data.x}%, ${res*data.y}%, 0 )`;
    }
  },{});


  return(
    <div className="tb-wrapper overflow-hidden flex flex-nowrap w-full">
      <div ref={container} className="tbContent flex flex-nowrap w-full">
        <div ref={item} className="tb-item h-fit w-fit">
          {children}
        </div>
        {copy}
      </div>
    </div>
  )
}



class Progress {
  start:number
  cur:number
  constructor() {
    this.start = 0;
    this.cur = this.start;
  }
  getProgress(delta:number) {
    this.cur += delta;
    if ( this.cur < 0) {
      this.cur = 1 + this.cur;
    }
    if ( this.cur >= 1) {
      this.cur = 0;
      return 1;
    }
    return this.cur;
  }

}


class Delta {
  start:number
  prev:number
  constructor(s:number) {
    this.start = s;
    this.prev = this.start;
  }
  getDelta(n:number) {
    let delta = n - this.prev;
    this.prev = n;
    return delta;
  }

}