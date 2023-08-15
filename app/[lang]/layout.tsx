import { LanguageProvider } from "next-i18n/context";

export async function generateStaticParams() {
  return [{ params: { lang: "en-US" } }, { params: { lang: "de-CH" } }];
}

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { lang?: string };
}) {
  return (
    <LanguageProvider lang={props.params.lang || "en-US"}>
      {props.children}
    </LanguageProvider>
  );
}
