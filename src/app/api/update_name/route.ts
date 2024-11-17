import {createClient} from "@/utils/supabase/server";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const supabase = await createClient();

    const {name} = await req.json();

    const {
        data: {user},
    } = await supabase.auth.getUser();

    const {error} = await supabase
        .from("users")
        .update({name: name})
        .eq("email", user?.email);

    if (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

    return NextResponse.json({success: true});
}