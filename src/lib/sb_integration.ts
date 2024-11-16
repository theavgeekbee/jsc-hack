import supabase from "@/lib/supabase";
import {Session} from "@supabase/auth-js";

export async function signUpNewUser(email: string, password: string): Promise<boolean> {
    const { error } = await supabase.auth.signUp({
        email: email,
        password: password
    })
    if (error) {
        console.error(error)
        return false
    }
    return true
}

export async function signInWithEmail(): Promise<Session | null>  {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'example@email.com',
        password: 'example-password',
    })
    if (error) {
        console.error(error)
        return null
    }
    return data.session
}
