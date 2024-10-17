// const prismic = require("@prismicio/client");
// const sm = require("./slicemachine.config.json");

/** @type {import('next').NextConfig} */
const nextConfig = async () => {
  // const client = prismic.createClient(sm.repositoryName);

  // const repository = await client.getRepository();
  // const locales = repository.languages.map((lang) => lang.id);

  // console.log(locales);

  return {
    reactStrictMode: false,
    // i18n: {
    //   // These are all the locales you want to support in
    //   // your application
    //   locales: ['en-us', 'fr-fr'],
    // //   // This is the default locale you want to be used when visiting
    // //   // a non-locale prefixed path e.g. `/hello`
    //   // defaultLocale: locales[0],
    //   // defaultLocale: "en-us",
    //   defaultLocale: "fr-fr",
    // },
    // trailingSlash: true,
  };
};

module.exports = nextConfig;
