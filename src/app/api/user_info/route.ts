import {NextRequest, NextResponse} from "next/server";
import {generatePlan} from "@/lib/openai_integration";

export async function GET(req: NextRequest): Promise<NextResponse> {
    return new NextResponse(null, { status: 200 });
}

