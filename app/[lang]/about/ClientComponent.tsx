import { useTranslate } from "next-i18n";
import { useParams } from "next/navigation";

export const ClientComponent = () => {
    const lang = String(useParams().lang || "en-US");
    const {__} = useTranslate(lang)
    return __("client component");
}