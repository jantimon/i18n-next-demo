import { ClientComponent } from "./ClientComponent";
import { useTranslate } from "next-i18n/context";

export default function Page() {
  return <Content />;
}

function Content() {
  const { __ } = useTranslate();
  return (
    <main>
      <h1>{__("about us")}</h1>
      <ClientComponent />
    </main>
  );
}
