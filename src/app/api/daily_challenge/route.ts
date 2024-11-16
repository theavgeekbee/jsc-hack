import {NextResponse} from "next/server";
import {generateDailyChallenge} from "@/lib/openai_integration";
import {createClient} from "@/utils/supabase/server";

export async function GET(): Promise<NextResponse> {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return new NextResponse("User is not authenticated", { status: 401 });
    }

    const { data, error } = await supabase.from('challenges').select('*').eq('day', new Date().toISOString().slice(0, 10));

    if (error) {
        return new NextResponse(error.message, { status: 500 });
    }

    if (data.length === 0) {
        const challenge = await generateDailyChallenge();

        await supabase.from('challenges').insert({
            day: new Date().toISOString().slice(0, 10),
            description: challenge,
            aura: 10
        });

        return new NextResponse(challenge, { status: 200 });
    } else {
        return new NextResponse(data[0].description, { status: 200 });
    }
}