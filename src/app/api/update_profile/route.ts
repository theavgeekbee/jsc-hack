import {createClient} from "@/utils/supabase/server";
import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const supabase = await createClient();

    const {name, mission_length} = await req.json();

    const {
        data: {user},
    } = await supabase.auth.getUser();

    // const {error} = await supabase.auth.updateUser({ display_name: name })

    const {error} = await supabase
        .from("users")
        .update({name, mission_length})
        .eq("email", user?.email);

    if (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }

    return NextResponse.json({success: true});
}
