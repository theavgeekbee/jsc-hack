'use client';
import {useState} from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

import './page.css';

export default function Onboarding() {
    function submitForm(event: FormEvent<HTMLFormElement>) {
        const {name} = event.target;

        fetch("/api/update_name", {
            method: "POST",
            body: JSON.stringify({name}),
        })
            .then((response) => response.ok)
            .then(res => res);
    }

    return (
        <section>
            <form onsubmit={submitForm}>
                <Input label={"Name"} id={"name"} type={"text"} />
                <Button variant={"primary"} type={"submit"}>Submit</Button>
            </form>
        </section>
    );
}
