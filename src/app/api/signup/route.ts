import {NextRequest, NextResponse} from "next/server";
import {signUpNewUser} from "@/lib/sb_integration";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const { username, password } = await req.json();

    if (!username || !password) {
        return new NextResponse("Username or password is missing", { status: 400 });
    }

    const success = await signUpNewUser(username, password);

    return success ?
        new NextResponse("User signed up successfully", {status: 200}) :
        new NextResponse("Failed to sign up user", {status: 500});
}