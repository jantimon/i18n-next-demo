import Link from "next/link";

export default function Home() {
  return (
    <main style={{
        margin: "1rem",
        display: "inline-flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
        gap: "1rem",
        textAlign: "center"
    }}>
      <Link href="/en-US">
        English
      </Link>
      <Link href="/de-CH">
        German
      </Link>
    </main>
  );
}
