export default async function handler(_, res) {
  // This removes __prerender_bypass cookie
  // More info: https://nextjs.org/docs/pages/guides/draft-mode#clear-the-draft-mode-cookie
  res.setDraftMode({ enable: false });

  return res.redirect("/");
}
