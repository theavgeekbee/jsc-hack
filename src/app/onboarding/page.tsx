"use client";
import Button from "@/components/Button";
import { redirect } from "next/navigation";

import { FormEvent } from "react";

import styles from "./onboarding.module.css";

export default function Onboarding() {
  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!data.has("name") || !data.has("mission_length")) {
      return;
    }

    const name = data.get("name") as string;
    const length = data.get("mission_length") as string;

    fetch("/api/update_profile", {
      method: "POST",
      body: JSON.stringify({ name, mission_length: parseInt(length) }),
    })
      .then((response) => response.ok)
      .then((res) => res)
      .then(() => {
        redirect("/");
      });
  }

  return (
    <main className={styles.page}>
      <section>
        <form onSubmit={submitForm}>
          <p>
            Hello! My name is{" "}
            <input id={"name"} type={"text"} placeholder={"me"} name={"name"} />
            .
          </p>
          <p>
            I&#39;ll be staying for{" "}
            <input
              id={"length"}
              type={"number"}
              placeholder={"some"}
              name={"mission_length"}
              min={1}
            />{" "}
            months.
          </p>

          <Button variant={"primary"} type={"submit"}>
            Let&#39;s go!
          </Button>
        </form>
      </section>
    </main>
  );
}
