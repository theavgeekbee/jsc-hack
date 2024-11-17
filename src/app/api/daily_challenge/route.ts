import {NextResponse} from "next/server";
import {generateDailyChallenge} from "@/lib/openai_integration";
import {createClient} from "@/utils/supabase/server";

export async function GET(): Promise<NextResponse> {
    const supabase = await createClient();

    const {data: {user}} = await supabase.auth.getUser()

    if (!user) {
        return new NextResponse("User is not authenticated", {status: 401});
    }

    const {data, error} = await supabase
        .from('challenges')
        .select('*')
        .eq('day', new Date().toISOString().slice(0, 10))
        .single();

    if (error) {
        return new NextResponse(error.message, {status: 500});
    }

    const challenge = data ? data.description : await generateDailyChallenge();

    if (data.length === 0) {
        await supabase.from('challenges').insert({
            day: new Date().toISOString().slice(0, 10),
            description: challenge,
            aura: 10
        });
    }

    return NextResponse.json({challenge}, {status: 200});
}