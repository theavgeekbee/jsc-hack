import {createClient} from "@/utils/supabase/server";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
    const supabase = await createClient();

    const { data: { user }} = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({err: "User is not authenticated"}, {status: 401});
    }

    const row = await supabase.from("users").select("*").eq("email", user?.email).single();

    return NextResponse.json({data: row.data});
}