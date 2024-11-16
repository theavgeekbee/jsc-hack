import {NextRequest, NextResponse} from "next/server";
import {generatePlan} from "@/lib/openai_integration";

export async function GET(req: NextRequest): Promise<NextResponse> {
    const auth = req.headers.get("Authorization");

    if (!auth) {
        return new NextResponse("Authorization header is missing", { status: 400 });
    }

    const url = new URL(req.url);
    const length = url.searchParams.get("mission_length");

    // authenticate the user

    const challenge = await generatePlan(length ? parseInt(length) : 12);

    return new NextResponse(challenge, { status: 200 });
}