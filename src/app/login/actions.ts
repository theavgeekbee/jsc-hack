'use server'

import {revalidatePath} from 'next/cache'
import {redirect} from 'next/navigation'

import {createClient} from '@/utils/supabase/server'

export async function login(formData: FormData) {
    if (!formData.get('email') || !formData.get('password'))
        return;

    if ((formData.get('password') as string).length < 6)
        return;


    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const {error} = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const {error} = await supabase.auth.signUp({
        email: data.email,
        password: data.password
    })
    const result = await supabase.from('users').insert({
        email: data.email,
        aura: 0,
        plan: {}
    });

    if (result.error) {
        redirect('/error')
    }

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}