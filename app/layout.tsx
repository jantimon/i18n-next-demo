import "./globals.css";
import type { Metadata } from "next";
import { LanguageProvider } from "next-i18n/context";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CSS in JS POC",
  description: "Styled Components API with ReactServerComponents",
};

export async function generateStaticParams() {
  return [{ params: { lang: "en-US" } }, { params: { lang: "de-CH" } }];
}

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { lang?: string };
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider lang={props.params.lang || "en-US"}>
          {props.children}
        </LanguageProvider>
      </body>
    </html>
  );
}
