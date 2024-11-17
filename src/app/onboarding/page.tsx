'use client';
import {useState} from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import {redirect} from "next/navigation";

export default function Onboarding() {
    const [name, setName] = useState<undefined | string>(undefined);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function submitForm(_: FormData) {
        if (!name) {
            return;
        }

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
            <form>
                <Input label={"Name"} id={"name"} type={"text"} onChange={
                    (event) => setName(event.target.value)
                }/>
                <Button variant={"primary"} type={"submit"} formAction={submitForm}>Submit</Button>
            </form>
        </section>
    );
}