


export default function EmailTemplate({data}:any) {


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


  return (
    <div className="">
      {Object.entries(data).map(([key, value])=>(
        <div key={key} className="">{key}: {value as string}</div>
      ))}
    </div>
  )
}