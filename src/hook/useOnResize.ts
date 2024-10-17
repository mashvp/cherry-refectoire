import { useEffect } from "react";

export default function useOnResize(callback:(trust:boolean)=>void) {
  useEffect(()=>{
    callback(false); 

    setTimeout(()=>{
      callback(false)
    },400);

    var timer:NodeJS.Timeout = setTimeout(()=>{},100);
    const resizeHandler = ()=>{
      clearTimeout(timer);
      timer = setTimeout(()=>{
        callback(true)
      },400);
    }

    window.addEventListener('resize', resizeHandler);
    return ()=>{
      window.removeEventListener('resize', resizeHandler);

    }
  },[])
}