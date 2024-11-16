import {NextRequest, NextResponse} from "next/server";
import {generateDailyChallenge} from "@/lib/openai_integration";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const auth = req.headers.get("Authorization");

    if (!auth) {
        return new NextResponse("Authorization header is missing", { status: 400 });
    }

    const challenge = await generateDailyChallenge();

    // Store the daily challenge

    return new NextResponse(challenge, { status: 200 });
}