import { useTranslate } from "next-i18n";

export default function Page({ params: {lang = "en-US"}}) {
    const {__} = useTranslate(lang)
    return <main>
        {__("about us")}
    </main>

}