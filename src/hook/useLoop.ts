import React, { useMemo } from "react";

interface useAnimationFrameType {
  // nextAnimationFrameHandler: (nb:number)=>void
  duration?: number,
  shouldAnimate?:boolean
}



const useLoop = (fn:(nb:number)=>void, {
	// nextAnimationFrameHandler,
	duration = Number.POSITIVE_INFINITY,
	shouldAnimate = true
}:useAnimationFrameType) => {
	const frame = React.useRef(0);
	// keep track of when animation is started
	const firstFrameTime = React.useRef(performance.now());

	const animate = (now:number) => {

    if (duration != Infinity) {
      let timeFraction = (now - firstFrameTime.current) / duration;
      if (timeFraction > 1) {
        timeFraction = 1;
      }
  
      if (timeFraction <= 1) {
        fn(timeFraction);
        // nextAnimationFrameHandler(timeFraction);
        if (timeFraction != 1) frame.current = requestAnimationFrame(animate);
      }
    } else {
      // console.log(now, frame.current);
      fn(now - frame.current);
      frame.current = now;
      requestAnimationFrame(animate);
    }
	};

	React.useEffect(() => {
		// console.log(shouldAnimate);
		if (shouldAnimate) {
			firstFrameTime.current = performance.now();
			frame.current = requestAnimationFrame(animate);
		} else {
			cancelAnimationFrame(frame.current);
		}

		return () => cancelAnimationFrame(frame.current);
	}, [shouldAnimate]);
};


export default useLoop;
