import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Link href="/en-US">English</Link>
      <Link href="/de-CH">German</Link>
    </main>
  );
}
