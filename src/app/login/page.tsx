import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button";

import { login, signup } from "./actions";

import "./page.css";

export default function LoginPage() {
  return (
    <>
      <section>
        <h1>Welcome aboard</h1>
        <Input type="email" id="email" label="Email" />
        <Input type="password" id="password" label="Password" />

        <Button variant="primary" type="submit" formAction={login}>
          Log in
        </Button>
        <Button variant="secondary" type="submit" formAction={signup}>
          Sign up
        </Button>
      </section>
    </>
  );
}
