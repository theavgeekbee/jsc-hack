import Input from "@/components/Input";
import Button from "@/components/Button";

import {login, signup} from "./actions";

import "./page.css";

export default function LoginPage() {
    return (
        <>
            <section>
                <h1>Welcome aboard</h1>
                <form>
                    <Input type="email" id="email" label="Email"/>
                    <br />
                    <Input type="password" id="password" label="Password"/>
                    <br />

                    <div className="buttons">
                        <Button variant="primary" type="submit" formAction={login}>
                            Log in
                        </Button>
                        <Button variant="secondary" type="submit" formAction={signup}>
                            Sign up
                        </Button>
                    </div>
                </form>
            </section>
        </>
    );
}
