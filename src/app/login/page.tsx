import Input from "@/components/Input";
import Button from "@/components/Button";

import { login, signup } from "./actions";

import styles from "./login.module.css";

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <div>
        <section>
          <h1>Welcome aboard!</h1>
          <form>
            <Input type="email" id="email" label="Email" />
            <br />
            <Input type="password" id="password" label="Password" />
            <br />

            <div className={styles.buttons}>
              <Button variant="primary" type="submit" formAction={login}>
                Log in
              </Button>
              <Button variant="secondary" type="submit" formAction={signup}>
                Sign up
              </Button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
