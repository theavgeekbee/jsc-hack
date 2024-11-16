import {NextRequest, NextResponse} from "next/server";
import {generatePlan} from "@/lib/openai_integration";

export async function GET(req: NextRequest): Promise<NextResponse> {
    const auth = req.headers.get("Authorization");

    if (!auth) {
        return new NextResponse("Authorization header is missing", { status: 400 });
    }

    const url = new URL(req.url);
    const mission_duration = url.searchParams.get("mission_duration");

    // authenticate the user

    const plan = await generatePlan(auth, mission_duration ? parseInt(mission_duration) : 12);

    return new NextResponse(plan, { status: 200 });
}