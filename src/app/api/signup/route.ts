import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse>  {
    const { email, password } = await req.json();
    if (!email || !password) {
        return new NextResponse("Email and password are required", { status: 400 });
    }

    // create the user
    return new NextResponse("User created successfully", { status: 200 });
}