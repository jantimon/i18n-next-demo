import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CSS in JS POC",
  description: "Styled Components API with ReactServerComponents",
};

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { lang?: string };
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          {props.children}
      </body>
    </html>
  );
}
