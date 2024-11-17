'use client';
import Button from "@/components/Button";
import {redirect} from "next/navigation";

import './page.css';
import {FormEvent} from "react";

export default function Onboarding() {
    function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        console.log(data);

        if (!data.has("name")) {
            return;
        }

        const name = data.get("name") as string;

        fetch("/api/update_name", {
            method: "POST",
            body: JSON.stringify({name}),
        })
            .then((response) => response.ok)
            .then(res => res)
            .then(() => {redirect("/")})
    }

    return (
        <section>
            <form onSubmit={submitForm}>
                <p>Hello! My name is <input id={"name"} type={"text"} placeholder={"type here"} name={"name"} /></p>
                
                <Button variant={"primary"} type={"submit"} >Let&#39;s go!</Button>
            </form>
        </section>
    );
}
