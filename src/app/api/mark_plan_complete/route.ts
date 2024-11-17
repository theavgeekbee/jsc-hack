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

    if (!row.data.last_planned_completed) {
        // Set the streak to 1 and the last planned completed to today
        await supabase
            .from("users")
            .update({
                last_planned_completed: new Date().toISOString().slice(0, 10),
                streak: 1,
                aura: 10
            })
            .eq("email", user.email);
        return NextResponse.json({message: "Marked daily plan as complete", aura_change: 10}, { status: 200 });
    }

    const today = new Date();
    const truncatedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    // Check the days between the last plan completion and today
    const lastPlanComplete = new Date(row.data.last_planned_completed);
    const daysBetween = (truncatedToday.getTime() - lastPlanComplete.getTime()) / (1000 * 3600 * 24);

    if (daysBetween < 1) {
        return new NextResponse("Plan already marked as complete today", { status: 420 });
    }

    await supabase
        .from("users")
        .update({
            last_planned_completed: today.toISOString()
        })
        .eq("email", user.email);

    if (daysBetween >= 1 && daysBetween < 2) {
        const existingStreak = await supabase.from("users").select("streak").eq("email", user.email).single();
        await supabase.from("users").update({streak: ++(existingStreak.data!.streak as number)}).eq("email", user.email);
    } else {
        await supabase.from("users").update({streak: 0}).eq("email", user.email);
    }

    const aura_change = daysBetween >= 1 && daysBetween < 2 ? 5 : -10;

    await supabase
        .from("users")
        .update({aura: row.data.aura as number + aura_change})
        .eq("email", user.email);

    return NextResponse.json({
        message: "Marked daily plan as complete",
        aura_change: daysBetween >= 1 && daysBetween < 2 ? 5 : -10
    }, { status: 200 });
}