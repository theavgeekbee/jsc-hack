'use client';
import Input from "@/components/Input";
import Button from "@/components/Button";
import {redirect} from "next/navigation";

import './page.css';
import {FormEvent} from "react";

export default function Onboarding() {
    function submitForm(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

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
                <Input label={"Name"} id={"name"} type={"text"} />
                <Button variant={"primary"} type={"submit"}>Submit</Button>
            </form>
        </section>
    );
}
