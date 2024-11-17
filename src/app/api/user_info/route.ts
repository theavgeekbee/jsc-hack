import {createClient} from "@/utils/supabase/server";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
    const supabase = await createClient();

    const url = new URL(req.url);
    const email = url.searchParams.get("email");

    const user = await supabase.from("users").select("*").eq("email", email).single();

    return NextResponse.json({data: user.data});
}