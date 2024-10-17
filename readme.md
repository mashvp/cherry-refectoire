# Config file

config.json

```JSON
{
  "name": string,               // Nom de l'experience
  "image": string,              // lien 
  "description": string
}
```


| nom | type | obligatoire | defaut |
| --- | --- | --- | --- |
| name | string | oui | none |
| image | string | non | /thumbnail.jpg |



# Index

point d'entree de l'application index.html


asset base url :
/experiments/out/ ...


export next 
  -> next.config.js
```JS
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  assetPrefix: 'https://experiments.mashvp.com/experiments/DOSSIER_EXP/'
}

module.exports = nextConfig

```


# Update data ?

revalidate