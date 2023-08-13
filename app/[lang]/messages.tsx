import { useState } from "react";
import { useTranslate } from "next-i18n";
import { useParams } from 'next/navigation'


export const Messages = () => {
    const [count, setCount] = useState(0);
    const lang = String(useParams().lang || "en-US");
    const {__} = useTranslate(lang)

    return <>
        <p>{__("messages", {count})}</p>
        <button onClick={() => setCount(count + 1)}>+1</button>
    </>

}