"use client";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { create } from "zustand";

// =========================>  Data

interface scrollInstanceType {
  instance: instanceArray
  setInstance: (instance:instanceType) => void
}

interface instanceArray {
  [key: string]: Lenis
}

interface instanceType {
  instance: Lenis
  id: string
}

export const useScrollStore = create<scrollInstanceType>((set) => ({
  instance: {},

  setInstance: (instanceN) => set((state) => {
    const tmp = state.instance;
    tmp[instanceN.id] = instanceN.instance;
    return ({ instance: tmp })
  })
  
}));






// =========================>  Utils
export function useLenis(id = 'main') {
  const {instance} = useScrollStore();
  const lenis = instance[id];
  return lenis;
}



export function useScroll(callback:(i:Lenis)=>void, id:string) {
  const {instance} = useScrollStore();

  useEffect(()=>{
    const lenis = instance[id];

    if (lenis) {
      const cb = () => callback(lenis);
      callback(lenis);
      setTimeout(()=>{
        callback(lenis);
      },500);
      lenis.on("scroll", cb);
      return () => {
        lenis.off("scroll", cb);
        // console.log('go');
      };
    }
  }, [callback, instance]);

}







// =========================>  Element


interface args {
  id : string,
  className ?: string,
  children : React.ReactNode,
  handler ?: (lenis:Lenis) => void
}

export const ScrollContainer = React.forwardRef<HTMLDivElement, args>(({id, className, children, handler},ref): JSX.Element | null => {

  const pathname = usePathname();
  const {instance, setInstance} = useScrollStore();

  useEffect(()=>{

    var animationId = requestAnimationFrame(()=>{});
    if (instance[id]) {
      instance[id].destroy();
    }
    const container = ref as React.RefObject<HTMLDivElement>;
    if (container.current) {
      const newInstance = new Lenis({
        wrapper: container.current
      });
      const raf = (time: number) => {
        newInstance.raf(time);
        requestAnimationFrame(raf);
      };
      animationId = requestAnimationFrame(raf);
      setInstance({
        id,
        instance: newInstance
      })
    }
    return () => {
      cancelAnimationFrame(animationId);
    };
    
  },[pathname]);
    
  
  useEffect(()=>{
    if (handler) {
      const lenis = instance[id];
  
      if (lenis) {
        const cb = () => handler(lenis);
        handler(lenis);
        lenis.on("scroll", cb);
        return () => {
          lenis.off("scroll", cb);
        };
      }
    }
  },[handler]);



  return (
    <div
    className={className}
    // ref={container}
    ref={ref}
    >
      {children}
    </div>
  );

});










// interface args {
//   id : string,
//   className ?: string,
//   children : React.ReactNode
// }

// export const ScrollContainer = React.forwardRef<HTMLDivElement, args>(({id, className, children },ref): JSX.Element | null => {


// // export const ScrollContainer:useLenis = (callback) => {
//   const [instance, setCurInstance] = useState<Lenis | null>(null);
//   // const container = useRef<HTMLDivElement>(null);
//   const pathname = usePathname();

//   const {setInstance} = useScrollStore();

//   useEffect(()=>{

//     // console.log(container.current, instance);

//     if (instance) {
//       instance.destroy();
//     }
//     // console.log(ref);
//     setTimeout(()=>{

//       const container = ref as React.RefObject<HTMLDivElement>;
//       if (container.current) {
//         const newInstance = new Lenis({
//           wrapper: container.current
//         });
//         setCurInstance(newInstance);
  
//         setInstance({
//           id,
//           instance: newInstance
//         })
  
//       }
//     },500);
    
//   },[pathname, ref]);
    

//   // useEffect(()=>{
//   //   const lenis = instance;


//   //   if (lenis) {
//   //     const cb = () => {
//   //       lenis
//   //     };
//   //     lenis.on("scroll", cb);
//   //     return () => {
//   //       lenis.off("scroll", cb);
//   //     };
//   //   }
//   // }, [callback, instance]);



//   useEffect(() => {
//     const lenis = instance;

//     if (lenis) {
//       const raf = (time: number) => {
//         lenis.raf(time);
//         // console.log(instance);
//         requestAnimationFrame(raf);
//       };
  
//       const animationId = requestAnimationFrame(raf);
  
//       // console.log(instanceNB);
//       // instanceNB += 1;

  
//       return () => {
//         cancelAnimationFrame(animationId);
//         // lenis.destroy();
//       };

//     }
//   }, [instance]);

//   return (
//     <div
//     className={className}
//     // ref={container}
//     ref={ref}
//     >
//       {children}
//     </div>
//   );

// });






