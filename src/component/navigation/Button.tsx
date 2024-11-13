import { KeyTextField } from "@prismicio/client";
import { AnimLink } from "@/library/navigation/AnimLink";
import { PrismicNextLink } from "@prismicio/next";

interface ButtonType {
  children: JSX.Element | KeyTextField | string,
  className?: string
  field: any
  type?: 'raw' | 'clear' | 'dark'| 'noColor'; 
  target?: null | '_blank'
}

export default function Button({children, field, className, type = 'clear', target}:ButtonType) {

  // const clas = `block p-8 pr-24 pl-24 rounded-4 uppercase text-cta text-center bg-ClearPrimary w-fit min-w-200 text-Tertiary whitespace-nowrap ${className}`;
  const clas = {
    base : `block p-16 pr-24 pl-24 rounded-4 uppercase text-cta text-center w-fit min-w-200 whitespace-nowrap`,
    result : ''
  }
  switch (type) {
    case 'clear':
      clas.result = `${clas.base} text-Tertiary bg-ClearPrimary hover:bg-Tertiary hover:text-ClearPrimary transition ${className}`;
      break;
    case 'dark':
      clas.result = `${clas.base} text-ClearPrimary bg-Tertiary hover:bg-Primary hover:text-ClearPrimary transition ${className}`;
      break;

    case 'noColor':
      clas.result = `${clas.base} ${className}`;
      break;
  }

  return ((target != '_blank')?(
    <AnimLink className={clas.result} field={field}>
      {children}
    </AnimLink>
  ):(
    <PrismicNextLink field={field} className={clas.result} target="_blank">
      {children}
    </PrismicNextLink>
  )
  )
}

{/* <AnimLink className={`${className} ${(!raw)? 'block p-8 pr-24 pl-24 rounded-4 uppercase text-cta text-center bg-ClearPrimary w-fit min-w-200 text-Tertiary whitespace-nowrap': ''}`} field={field}> */}
