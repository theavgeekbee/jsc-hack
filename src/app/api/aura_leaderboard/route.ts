import { createClient } from "@/utils/supabase/server";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
    const supabase = await createClient();

    const data = await supabase.from("users").select("*");
    const leaderboard =  data.data?.sort((a, b) => b.aura - a.aura).slice(0, 10);

    return NextResponse.json({data: leaderboard});
}