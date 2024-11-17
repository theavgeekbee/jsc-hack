import {NextRequest, NextResponse} from "next/server";
import {generatePlan} from "@/lib/openai_integration";
import {createClient} from "@/utils/supabase/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
    const supabase = await createClient();
    const {data: {user}} = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({err: "User is not authenticated"}, {status: 401});
    }


    const row = await supabase.from("users").select("*").eq("email", user.email).single();

    const url = new URL(req.url);
    const length = url.searchParams.get("mission_length");
    const challenge = row.data.plan.length > 0 ?
        row.data.plan :
        await generatePlan(length ? parseInt(length) : 12)

    if (row.data.plan.length === 0)
        await supabase.from("users").update({plan: challenge}).eq("email", user.email);

    return NextResponse.json({challenge}, {status: 200});
}