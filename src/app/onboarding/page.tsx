'use client';
import {useState} from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import {redirect} from "next/navigation";

import './page.css';

export default function Onboarding() {
    function submitForm(event: FormEvent<HTMLFormElement>) {
        const {name} = event.target;

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
            <form onsubmit={submitForm}>
                <p>Hello! My name is <input id={"name"} type={"text"} placeholder={"type here"} /></p>
                
                <Button variant={"primary"} type={"submit"}>Let's go!</Button>
            </form>
        </section>
    );
}
