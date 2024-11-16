import {NextRequest, NextResponse} from "next/server";
import {generateRecipe} from "@/lib/openai_integration";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const token = req.headers.get("authorization") ?? "";

    const { ingredients, specialInstructions } = await req.json();

    const recipe = await generateRecipe(token, ingredients, specialInstructions);

    return new NextResponse(JSON.stringify({ recipe }), { status: 200 });
}