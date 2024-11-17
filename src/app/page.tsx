'use server';

import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

import Home from "@/app/home";

import './page.css'

export default async function MainPage() {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const row = await supabase.from("users").select("*").eq("email", user.email).single();

    if (!row.data.name) {
        redirect("/onboarding");
    }

    return <Home />
}
