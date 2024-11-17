import Image from "next/image";

export default async function Home() {
  const { data: { user } } = await supabase.auth.getUser();

  // TODO: if user is not logged in, redirect to login page

  return <>
    <h1>Welcome back</h1>
  </>;
}
