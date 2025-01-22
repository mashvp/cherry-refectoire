
import { NextRequest, NextResponse } from 'next/server';
// import { Resend } from 'resend';

import { createClient } from '@/prismicio';
import EmailTemplate from '@/library/contact/EmailTemplate';

// ============================= Nodemailer

import nodemailer from 'nodemailer';
// import { renderToStaticMarkup } from 'react-dom/server';

const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_PORT = process.env.SMTP_SERVER_PORT;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;




async function getSettings(): Promise<any> {
  const client = createClient();
  const page = await client.getSingle("settings");
  return page;
}


function getContact(settings:any, formData:any) {
  const idContact = formData.service;
  
  const email = settings.data.contact.filter((el:any, i:number)=>(Number(idContact) == i))[0];
  return email;
}

export async function POST(request: NextRequest, res:NextResponse) {
  const formData = await request.json();

  const settings = await getSettings();
  
  const destination = getContact(settings, formData);

  console.log(destination);

  formData.service = destination.label;
  
  const template = await EmailTemplate({data:formData});

  const transporter = nodemailer.createTransport({
    host: SMTP_SERVER_HOST,
    port: Number(SMTP_SERVER_PORT),
    secure: true,
    auth: {
      user: SMTP_SERVER_USERNAME,
      pass: SMTP_SERVER_PASSWORD,
    },
    // tls: {
    //   // rejectUnauthorized: false,
    //   maxVersion: 'TLSv1.2',
    //   minVersion: 'TLSv1.2',
    //   // ciphers: 'TLS_AES_128_GCM_SHA256',
    //   // ciphers:'SSLv3'
    // },
  });

  try {
    const isVerified = await transporter.verify();
  } catch (error) {
    // console.error('Something Went Wrong', error);
    // return JSON.stringify('Something Went Wrong');
    return Response.json({error, state:0  });
  }

  

  return await sendEmail(transporter, destination, formData, settings, template)

  // try {
  //   await new Promise<void>((resolve, reject) => {
  //     const info =  transporter.sendMail({
  //       from: `Noreply <noreply@cherrybomb-catering.com>`,
  //       to: destination.email,
  //       replyTo: `${formData.email}`,
  //       subject: `[${settings.data.site_title}] Nouveau message - ${destination.label}`,
  //       html:template
  //     });
  //     resolve(); 
  //   });
  //   return NextResponse.json({state:1});
  // } catch (error) {
  //   // console.error('Something Went Wrong', error);
  //   // return JSON.stringify(error);
  //   return Response.json({ error, state:0 });
  // }
  

}



const sendEmail = async (transporter:any, destination:any, formData:any, settings:any, template:any) => {
  try {
    const info = await transporter.sendMail({
      from: `Noreply <noreply@mashvp.com>`,
      to: destination.email,
      replyTo: `${formData.email}`,
      subject: `[${settings.data.site_title}] Nouveau message - ${destination.label}`,
      html:template
    })

    console.log('Email sent: ' + info.response)
    return NextResponse.json({state:1});

  } catch (error) {
    console.error('Error sending email: ', error)
  return Response.json({ error, state:0 });

  }
}




/*
// ============================= Resend

const resend = new Resend(process.env.RESEND);



async function getSettings(): Promise<any> {
  const client = createClient();
  const page = await client.getSingle("settings");
  return page;
}



export async function POST(request: NextRequest, res:NextResponse) {
  const formData = await request.json();
  const settings =  await getSettings();

  const template = EmailTemplate({data:formData});

  try {
    const { data, error } = await resend.emails.send({
      // from: `Noreply <noreply@resend.com>`,
      from: `Noreply <noreply@mashvp.com>`,
      to: [settings.data.contact],
      subject: `${settings.data.siteTitle} `,
      react: template
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

*/


/*
// ============================= Brevo

var Brevo = require('@getbrevo/brevo');

async function getSettings(): Promise<any> {
  const client = createClient();
  const page = await client.getSingle("settings");
  return page;

}


export async function POST(request: NextRequest, res:NextResponse) {
  const formData = await request.json();
  const settings =  await getSettings();

  const template = EmailTemplate({data:formData});



  let defaultClient = brevo.ApiClient.instance;

  let apiKey = defaultClient.authentications['apiKey'];
  apiKey.apiKey = 'YOUR API KEY';
  
  let apiInstance = new brevo.TransactionalEmailsApi();
  let sendSmtpEmail = new brevo.SendSmtpEmail();
  
  sendSmtpEmail.subject = `${settings.data.siteTitle} `;
  sendSmtpEmail.htmlContent = "<html><body><h1>Common: This is my first transactional email {{params.parameter}}</h1></body></html>";
  sendSmtpEmail.sender = { "name": "Noreply", "email": "noreply@mashvp.com" };
  sendSmtpEmail.to = [
    { "email": settings.data.contact, "name": "sample-name" }
  ];
  // sendSmtpEmail.replyTo = { "email": "example@brevo.com", "name": "sample-name" };
  // sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
  // sendSmtpEmail.params = { "parameter": "My param value", "subject": "common subject" };
  


  
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    console.log('API called successfully. Returned data: ' + JSON.stringify(data));
  }, function (error) {
    console.error(error);
  });


}

*/













