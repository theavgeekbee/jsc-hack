'use client';
import Button from "@/components/Button";
import {redirect} from "next/navigation";

import './page.css';
import {FormEvent} from "react";

export default function Onboarding() {
    function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (!data.has("name") || !data.has("length")) {
            return;
        }

        const name = data.get("name") as string;
        const length = data.get("length") as number;

        fetch("/api/update_profile", {
            method: "POST",
            body: JSON.stringify({name, mission_length: length}),
        })
            .then((response) => response.ok)
            .then(res => res)
            .then(() => {redirect("/")})
    }

    return (
        <section>
            <form onSubmit={submitForm}>
                <p>Hello! My name is <input id={"name"} type={"text"} placeholder={"me"} name={"name"} />.</p>
                <p>I'll be staying for <input id={"length"} type={"number"} placeholder={"some"} name={"mission_length"} /> months.</p>
                
                <Button variant={"primary"} type={"submit"} >Let&#39;s go!</Button>
            </form>
        </section>
    );
}
