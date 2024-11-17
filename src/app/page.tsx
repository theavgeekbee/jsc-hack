'use server';

import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

import './page.css'

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const row = await supabase.from("users").select("*").eq("email", user.email).single();
  
  if (!row.data.name) {
    redirect("/onboarding");
  }

  const url = "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  return <>
    <header style={{backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 50%), rgba(0, 0, 0, 0%)), url("${url}")`}}>
      <h1>Welcome back</h1>
    </header>
  </>;
}
