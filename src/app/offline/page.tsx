import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1>You are offline! Bro</h1>
      <Link href="/" prefetch={false}>
        back home
      </Link>
    </>
  );
}
