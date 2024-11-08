
// import { renderToString } from "react-dom/server";

const getData = async (component:any) => {
  const ReactDOMServer = (await import('react-dom/server')).default;
  const staticMarkup = ReactDOMServer.renderToStaticMarkup(component);
  return staticMarkup;
};

export default async function EmailTemplate({data}:any) {

  const element = (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <title>Simple Transactional Email</title>
      </head>
      <body>
        <table role="presentation" border={0} className="body">
          <tr>
            <td className="container">

    <div className="">
      {Object.entries(data).map(([key, value])=>(
        <div key={key} className="">{key}: {value as string}</div>
      ))}
    </div>

            </td>
          </tr>
        </table>
      </body>
    </html>
  )

  const html = await getData(element);

  return '<!doctype html>'+html;
  // return '<!doctype html>'+renderToString(element);
  // return element;

  // service: 'test_2',
  // prenom: 'eef',
  // nom: 'efesf',
  // email: 'fesf@kjh.fr',
  // tel: '0987654321',
  // profession: 'kljh',
  // nationalite: '',
  // adresse: '',
  // message: 'esfes',
  // time: 


}