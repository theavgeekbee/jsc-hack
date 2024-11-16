import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
    const token = req.headers.get("authorization") ?? "";
    const url = new URL(req.url);
    const recipeUUID = url.searchParams.get("recipeUUID") ?? "";

    // Get the recipe from the database
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const test_recipe_generate = (_t: string, _r: string) => "Recipe goes here";
    const recipe = test_recipe_generate(token, recipeUUID);

    return new NextResponse(JSON.stringify({ recipe }), { status: 200 });
}