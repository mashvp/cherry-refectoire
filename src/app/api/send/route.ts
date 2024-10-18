import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

import { createClient } from '@/prismicio';
import EmailTemplate from '@/library/contact/EmailTemplate';

const resend = new Resend(process.env.RESEND);


async function getSettings(): Promise<any> {
  const client = createClient();
  const page = await client.getSingle("settings");
  return page;
  // return {
  //   title: page.data.meta_title,
  //   description: page.data.meta_description,
  // };
}




export async function POST(request: NextRequest, res:NextResponse) {
  const formData = await request.json();
  const settings =  await getSettings();

  const template = EmailTemplate({data:formData});

  try {
    const { data, error } = await resend.emails.send({
      from: `Noreply <noreply@resend.com>`,
      // to: ["pecou.brice@gmail.com"],
      // subject: `test`,
      // react: ""
      // from: `Noreply <noreply@${request.headers.host.value}>`,
      to: [settings.data.contact],
      subject: `${settings.data.siteTitle} `,
      react: EmailTemplate({data:formData})
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}


