import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return new NextResponse("User is not authenticated", { status: 401 });
    }

    const row = await supabase
        .from("users")
        .select("*")
        .eq("email", user.email)
        .single();

    const today = new Date();
    const truncatedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // Check the days between the last plan completion and today
    const lastPlanComplete = new Date(row.data.last_planned_completed);
    const daysBetween = (truncatedToday.getTime() - lastPlanComplete.getTime()) / (1000 * 3600 * 24);

    if (daysBetween < 1) {
        return new NextResponse("Plan already marked as complete today", { status: 420 });
    }

    console.log(daysBetween)

    await supabase
        .from("users")
        .update({
            last_planned_completed: today.toISOString()
        })
        .eq("email", user.email);


    return NextResponse.json({
        message: "Marked daily plan as complete",
        aura_change: daysBetween >= 1 && daysBetween < 2 ? 5 : -10
    }, { status: 200 });
}