import { useTranslate } from "next-i18n";
import Link from "next/link";
import { Messages } from "./messages";

export async function generateStaticParams() {
  return [
    { params: { lang: "en-US" } },
    { params: { lang: "de-CH" } },
  ];
}

export default function Home({ params: {lang = "en-US"}}) {
  const {__} = useTranslate(lang)
  return (
    <main>
      <h1>{__("Welcome {name}", {name: "Next.js"})}</h1>

      <Messages />

      <p>{__("a react server components compatible i18n demo")}</p>

      <Link href={`/${lang}/about`}>About</Link>
    </main>
  );
}

