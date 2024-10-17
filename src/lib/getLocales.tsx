/*
 *@param {import("@prismicio/types").PrismicDocument} doc
 * @param {import("@prismicio/client").Client} client
 *
 * @returns {Promise<(import("@prismicio/types").PrismicDocument & { lang_name: string })[]>}
 */
export async function getLocales(doc:any, client:any) {
  const [repository, altDocs] = await Promise.all([
    client.getRepository(),
    doc.alternate_languages.length > 0
      ? client.getAllByIDs(
          doc.alternate_languages.map((altLang:any) => altLang.id),
          {
            lang: '*',
            // Exclude all fields to speed up the query.
            fetch: `${doc.type}.__nonexistent-field__`,
          }
        )
      : Promise.resolve([]),
  ])

  return [doc, ...altDocs].map((doc) => {
    return {
      ...doc,
      lang_name: repository.languages.find(
        (lang:any) => lang.id === doc.lang
      ).name,
    }
  })
}