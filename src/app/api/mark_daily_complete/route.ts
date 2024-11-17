import {NextResponse} from "next/server";
import {createClient} from "@/utils/supabase/server";

export async function GET(): Promise<NextResponse> {
    const supabase = await createClient();
    const {data: {user}, error: authError} = await supabase.auth.getUser();

    if (authError || !user) {
        return new NextResponse("User is not authenticated", {status: 401});
    }

    const daily_challenge = await supabase
        .from("challenges")
        .select("*")
        .eq("day", new Date().toISOString().slice(0, 10))
        .single()

    const id = daily_challenge.data.id;

    const row = await supabase
        .from("users")
        .select("*")
        .eq("email", user.email)
        .single();

    if (row.data.completed_challenges && row.data.completed_challenges.includes(id)) {
        return NextResponse.json({ message: "Daily challenge already is completed" }, { status: 420 });
    }

    await supabase
        .from("users")
        .update({
            completed_challenges: [...(row.data.completed_challenges ?? []), id],
            aura: row.data.aura + daily_challenge.data.aura
        })
        .eq("email", user.email);

    return NextResponse.json({ message: "Marked daily challenge as complete" }, { status: 200 });
}