"use client";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import Recaptcha from "./ReCaptcha";

type inputTypeType = 'text'| 'tel' | 'email'|'textarea'|'select';


interface inputSubDataType {
  name: string
  type: inputTypeType
  label?: string
  value?: string
  error?: boolean
  placeholder?: string
  autofocus?:boolean
  classWrap?: string
  classInpt?: string
  options?: optionsType[]
  required?: boolean
}



const dataForm = [
  { name: "service", value:"", type:"select", placeholder:"Services", required:true, label:"Services", classWrap:"wide", option: [
      {
        value: "test_1",
        label: "Test 1",
        selected: false
      },
      {
        value: "test_2",
        label: "Test 2",
        selected: true
      },
  ]},
  { name: "prenom", value:"", type:"text", placeholder:"Prenom*", autofocus:true, required:true},
  { name: "nom", value:"", type:"text", placeholder:"Nom*", required:true},
  { name: "email", value:"", type:"email", placeholder:"Email*", required:true},
  { name: "tel", value:"", type:"tel", placeholder:"Tel*", required:true},
  { name: "profession", value:"", type:"text", placeholder:"Profession*", required:true},
  { name: "nationalite", value:"", type:"text", placeholder:"Nationnalité"},
  { name: "adresse", value:"", type:"text", placeholder:"Adresse", classWrap:"wide",},
  { name: "message", value:"", type:"textarea", placeholder:"Dites nous en plus...", classWrap:"wide", required:true},
]





// async function sendForm() {
//   const response = await fetch('/api/send');
//   const data = await response.json();
//   return data;
// }


interface ContactFormType {
  className?: string
}


export default function ContactForm({className}:ContactFormType) {

  const [accepted, setAccepted] = useState<string>("disabled");
  const [inputData, setInputData] = useState<inputSubDataType[]>(dataForm as inputSubDataType[]);

  const [sendState, setSendState] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);

  const [allGood, setAallGood] = useState<string>("disabled");

  const onCheckInput = (name:string, error:string, value:string) => {
    // console.log(name, error, value, Object.keys(inputData));
    const obj = {
      name,
      value,
      error: (error == 'noError')? true : false
    };
    const newInputdata = inputData.map(el=>(el.name == name)? {...el, ...obj} : el);
    // console.log(newInputdata);
    setInputData(val => newInputdata);
  }

  const onAcceptHandler = (event:React.FormEvent<HTMLInputElement>) => {
    // console.dir(e.currentTarget.checked);
    if (event.currentTarget instanceof HTMLInputElement) {
      if (event.currentTarget.checked) {
        setAccepted("");
      } else {
        setAccepted("disabled");
      }
    }
  }

  const onSubmitHandler = useCallback(async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSendState(val=>-1);
    setLoading(val=>true);

    const formData = new FormData(event.currentTarget);

    let object = {} as Record<string, any>;

    formData.forEach((value, key) => object[key] = value);

    // console.log(object);
    const json = JSON.stringify(object);
    const response = await fetch('/api/send', {
      method: 'POST',
      body: json,
    });

    const data = await response.json();

    // console.log(data);
    // const data = await response.json();

    // setSendState(val=>parseInt(data.state));
    setLoading(val=>false);

  }, []);

  useEffect(()=>{
    const allInput = inputData.every(val=>val.error == true);
    // console.log(allInput, accepted);
    if (allInput && accepted == "") {
      setAallGood("");
    } else {
      setAallGood("disabled");
    }
  }, [inputData, accepted])

  
  
  return (
    // <GoogleReCaptchaProvider
    //   reCaptchaKey="[Your recaptcha key]"
    //   >
      <div className={`contactForm ${className}`}>
        <form className="formCtn gap-y-20 gap-x-40" onSubmit={onSubmitHandler}>
          { inputData.map(el=>(
            <Input key={el.name} data={el} onChange={onCheckInput} />
            // <Input key={el.id} name={el.name} type={el.type} placeholder={el.placeholder} autofocus={el.autofocus} onChange={onCheckInput} />
          )) }
          {/* <input type="hidden" name="time" value="" /> */}
          <div className="accept col-span-2">
            <input id="accecptCheck" type="checkbox" onChange={onAcceptHandler} required />
            <label htmlFor="accecptCheck">Lorem ipsum dolor sit amet consectetur. Sit venenatis in dictum facilisi ac egestas ipsum. Vitae augue est nunc lectus facilisis mauris suspendisse imperdiet. Diam dictum integer in gravida pretium aliquet. Scelerisque aliquet at sed proin nibh.</label>
          </div>
          {/* <Recaptcha onVerify={(token) => {
            console.log('reCAPTCHA Token:', token);
            // Send token to server for verification
          }}/> */}
          <button className={`submit ${allGood}`} >Envoyer</button>
        </form>
        {( loading &&
        <div className="loading">
          <p>LOADING ...</p>
        </div>
        )}
        <div className="info">
          {(sendState == 2 && <div className="fieldErrorCtn">Les champs ne sont pas correctements remplis</div> )}
          {(sendState == 0 && <div className="defaultErrorCtn">Une erreur est survenue, veuillez reessayer plus tard</div> )}
          {(sendState == 1 && <div className="sendedCtn">Votre email est bien envoyé</div> )}
        </div>
      </div>

    // </GoogleReCaptchaProvider>

  )
}


interface InputPropsType {
  data:dataType
  onChange?:(name:string, error:string, value:string)=>void | null

}
interface dataType {
  type: inputTypeType
  option?: optionsType[]
  placeholder?:string
  name:string
  autofocus?:boolean
  mainError?:boolean
  classWrap?: string
  classInpt?: string
  required?: boolean
  label?:string
}

interface optionsType {
  value: string
  label: string
  selected:boolean
}

// type inputRefType = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type inputRefType = any;


function Input({data : {type, option = [], placeholder, classWrap = "", classInpt = "", name, mainError = false, autofocus = false, required = false, label}, onChange}:InputPropsType) {
  const [value, setValue] = useState<string>("");
  const [focus, setFocus] = useState<string>("");
  const [error, setError] = useState<string>( (mainError)? "error" : "" );
  const input = useRef<inputRefType>(null);
  const labelRef = useRef<HTMLLabelElement>(null);

  const onChangeHandler = (e:ChangeEvent) => {
    // console.log(e.currentTarget.value);
    const inpt = input.current ;
    if (inpt) {
      const check = checkInput(inpt.value);
      setValue(inpt.value);
      if (onChange) {
        onChange(name, check, inpt.value);
      }
      if (check == "noError") {
        setError(check);
      } else {
        setError("");
      }
    }
  }
  const onFocusHandler = ()=>{
    setFocus("active");
    setError(val =>  checkInput(value));
  }
  const onBlurHandler = ()=>{
    if (value == '') {
      setFocus("");
      setError(val => '');
    } else {
      setError(val =>  checkInput(value));
    }
  }
  const checkInput = (value:string):string => {
    if (value != "") {
      switch (type) {
        case "email":
          const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,8}$/i;
          if ( regex.test(value) ) {
            return 'noError';
            // setError(val => 'noError');
          } else {
            return 'error';
            // setError(val => 'error');
          }
        break;
        case "text":
        case "textarea":
        default:
          return 'noError';
          // setError(val => 'noError');
        break;
      } 
    } else {
      // setError(val => '');
      return "";
    }
  }
  useEffect(()=>{
    if (autofocus) {
      setFocus("active");
    }
  },[]);
  
  const renderedInput = () => {
    switch(type) {
      case "textarea" :
        return (
          <textarea
            ref={input}
            rows={8}
            className={`inpt ${classInpt} ${error}`}
            name={name}
            value={value}
            // placeholder={placeholder}
            // autoFocus={autofocus}
            onChange={onChangeHandler}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            required={required}
          ></textarea>
        )
      case "select" :
        return (
          <div className="selectCtn">
            <select
              ref={input}
              name={name}
              className={`inpt ${classInpt} ${error}`}
              defaultValue={option.find(el=>(el.selected == true))?.value}
              >
                { option.map((el, index)=>(
                  <option key={index} value={el.value}>{el.label}</option>
                ))}
            </select>
          </div>
        )

      default : 
        return (
          <input
            ref={input}
            className={`inpt ${classInpt} ${error}`}
            name={name}
            type={type}
            value={value}
            // placeholder={placeholder}
            // autoFocus={autofocus}
            onChange={onChangeHandler}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            required={required}
          />
        )

    }
  }

  return (
    <div className={`inptCtn ${classWrap}`}>
      <label ref={labelRef} className={`${focus} text-Tertiary mb-4`}>{label || placeholder} {(error=="noError")? "" : ""} {(error=="error")?"✗" : ""}</label>

      { renderedInput() }
      
    </div>
  )
}



// { (type != "textarea")?
//   <input
//     ref={input}
//     className={`inpt ${error}`}
//     name={name}
//     type={type}
//     value={value}
//     // placeholder={placeholder}
//     autoFocus={autofocus}
//     onChange={onChangeHandler}
//     onFocus={onFocusHandler}
//     onBlur={onBlurHandler}
//     required
//   />
//   :
//   <textarea
//     ref={text}
//     rows={8}
//     className={`inpt ${error}`}
//     name={name}
//     value={value}
//     // placeholder={placeholder}
//     autoFocus={autofocus}
//     onChange={onChangeHandler}
//     onFocus={onFocusHandler}
//     onBlur={onBlurHandler}
//     required
//   >
//     {/* { value } */}
//   </textarea>

//   }