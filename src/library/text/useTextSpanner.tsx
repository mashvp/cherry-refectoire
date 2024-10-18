import React from "react";
import { useEffect, useRef, useState } from "react";

type childrenType = string | JSX.Element | JSX.Element[] | (string | JSX.Element)[] 

interface useTextSpanerType {
  children: childrenType
  word?: boolean
  boxed?: boolean
  backward?: boolean
} 

type dd = [JSX.Element[], React.MutableRefObject<HTMLSpanElement[]>];

export default function useTextSpanner({children, word = false}:useTextSpanerType):dd {
  const [spanned, setSpanned] = useState<JSX.Element[]>([]);

  const elements = useRef<(HTMLSpanElement)[]>([]);

  useEffect(()=>{
    const checkArray = (children:childrenType):(JSX.Element[])=> {
      if (children) {
        if (Array.isArray(children)) {
          const res = children.map(el=>{
            return checkArray(el);
          });
          return res.flat();
        } else {
          return checkType(children);
        }
      }
      return [];
    }
    const spanString = (string:string):JSX.Element[] =>{
      const wordArray = string
        // .trim()
        .replace(/ /g, " %%% ")
        .split(" ")
        .filter(val =>(val != ""));
      if (wordArray.length != 0) {
        const modifWord:JSX.Element[] = wordArray.map((wordEl, i)=>{
          if (wordEl == "%%%") {
            return <span className="space" key={i}> </span>;
          } else {
            // console.log(word);
            if ( !word) {
              return <span className="word" key={uniqueKey()}>{
                wordEl.split("").map((char, i)=> (
                  <span className="letter" ref={el => {elements.current.push(el as HTMLSpanElement)}} key={uniqueKey()}>{char}</span>
                ))
              }</span> 
            } else {
              // console.log( children)

              return <span className="word" ref={el => {elements.current.push(el as HTMLSpanElement)}} key={uniqueKey()}>{ wordEl }</span> 
            }
          }
        });
        return modifWord;
      }
      return [];
    }
    // const checkType = (el: string | JSX.Element):JSX.Element[] => {
    const checkType = (el:any):JSX.Element[] => {
      // console.log(typeof el);
      // if (typeof el == "string") {
      //   return spanString(el);
      // } else {
      //   if (el.type == 'br') {
      //     const modif = React.cloneElement(el, {...el.props, key:uniqueKey(el)});
      //     return [modif];
      //   } else {
      //     const modif = React.cloneElement(el, {...el.props, key:uniqueKey(el), children: checkArray(el.props.children)});
      //     return [modif];
      //   }
      // }

      switch(true) {
        case (typeof el == "string"):
          return spanString(el);
        break;
        case (el.type == 'br'):
          // const modif = React.cloneElement(el, {...el.props, key:uniqueKey(el)});
          return [React.cloneElement(el, {...el.props, key:uniqueKey(el)})];
        break;
        case (typeof el == "object"):
          // const modif = React.cloneElement(el, {...el.props, key:uniqueKey(el), children: checkArray(el.props.children)});
          return [React.cloneElement(el, {...el.props, key:uniqueKey(el), children: checkArray(el.props.children)})];
          // if (el.props?.children) {
          //   return [React.cloneElement(el, {...el.props, key:uniqueKey(el), children: checkArray(el.props.children)})];
          // } else {
          //   return [React.cloneElement(el, {...el.props, key:uniqueKey(el), children: checkArray(el.text)})];
          // }
        break;
        default:
          // const modif = React.cloneElement(el, {...el.props, key:uniqueKey(el), children: checkArray(el.props.children)});
          return [React.cloneElement(el, {...el.props, key:uniqueKey(el), children: checkArray(el.props.children)})];
        break;
      }


    }
    
    elements.current = []
    const res = checkArray(children);
    setSpanned(res);
  
  },[children]);

  return [spanned, elements];
}



const uniqueKey = (el?:JSX.Element):string => {
  if (el && el.key) {
    return String(el.key);
  } else {
    return `${Math.floor(Math.random()*100000)}${Math.floor(Math.random()*100000)}`;
  }
}