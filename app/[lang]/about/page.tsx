import { useTranslate } from "next-i18n";
import { Dynamic } from "./dynamic";

export default function Page({ params: {lang = "en-US"}}) {
    const {__} = useTranslate(lang)
    return <main>
        <h1>{__("about us")}</h1>
        <Dynamic />
    </main>

}