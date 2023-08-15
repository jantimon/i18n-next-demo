import { useTranslate, useLanguage } from "next-i18n/context";
import Link from "next/link";
import { Messages } from "./messages";

export default function Home() {
  const { __ } = useTranslate();
  const lang = useLanguage();
  return (
    <main>
      <h1>{__("Welcome {name}", { name: "Next.js" })}</h1>

      <Messages />

      <p>{__("a react server components compatible i18n demo")}</p>

      <Link href={`/${lang}/about`}>About</Link>
    </main>
  );
}
