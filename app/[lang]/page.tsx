import { useTranslate } from "next-i18n";
import { Dynamic } from "./dynamic";
import styles from "./page.module.css";
import Link from "next/link";

export async function generateStaticParams() {
  return [
    { params: { lang: "en-US" } },
    { params: { lang: "de-CH" } },
  ];
}

export default function Home({ params: {lang = "en-US"}}) {
  const {__} = useTranslate(lang)
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{__("Welcome {name}", {name: "Next.js"})}</h1>

      <Dynamic />

      <p>{__("a react server components compatible i18n demo")}</p>

      <Link href={`/${lang}/about`}>About</Link>
    </main>
  );
}

