import Script from "next/script";
import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";

export default function ReCaptcha() {

  // const data = use 
  
  // const [captchatoken, setCaptchaToken] = useState("");

  // useEffect(() => {
  //   setValue("recaptcha_response", captchatoken);
  // });

  // const onSubmit = async (data) => {
  //   console.log(data);

  //   setResult("Sending....");
  //   const formData = new FormData();

  //   formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

  //   for (const key in data) {
  //     if (key === "file") {
  //       formData.append(key, data[key][0]);
  //     } else {
  //       formData.append(key, data[key]);
  //     }
  //   }

  //   // const res = await fetch("https://api.web3forms.com/submit", {
  //   //   method: "POST",
  //   //   body: formData
  //   // }).then((res) => res.json());

  //   // if (res.success) {
  //   //   console.log("Success", res);
  //   //   setResult(res.message);
  //   // } else {
  //   //   console.log("Error", res);
  //   //   setResult(res.message);
  //   // }
  // };

  return (
    <div className="App">

        {/* <input
          type="hidden"
          name="recaptchaResponse"
          id="recaptchaResponse"
        />
   

      <Script
        id="recaptcha-load"
        strategy="lazyOnload"
        src={`https://www.google.com/recaptcha/api.js?render=RECAPTCHA_SITE_KEY`}
        onLoad={() => {
          grecaptcha.ready(function () {
            grecaptcha
              .execute("RECAPTCHA_SITE_KEY", {
                action: "contact"
              })
              .then(function (token) {
                //console.log(token);
                setCaptchaToken(token);
              });
          });
        }}
      /> */}
    </div>
  );
}

