import {NextRequest, NextResponse} from "next/server";
import {signInWithEmail} from "@/lib/sb_integration";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const { username, password } = await req.json();

    if (!username || !password) {
        return new NextResponse("Username or password is missing", { status: 400 });
    }

    const result = await signInWithEmail(username, password);

    return result ?
        new NextResponse(result.access_token, {status: 200}) :
        new NextResponse("Failed to sign in user", {status: 500});
}