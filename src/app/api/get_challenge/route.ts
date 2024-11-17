import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return new NextResponse("User is not authenticated", { status: 401 });
  }

  const key = req.nextUrl.searchParams.get("challenge_id");
  if (!key) {
    return new NextResponse("Missing challenge_id", { status: 400 });
  }

  const { data: challenge, error } = await supabase
    .from("challenges")
    .select("*")
    .eq("id", key)
    .single();
  if (error) {
    return new NextResponse("Error fetching challenge", { status: 500 });
  }
  return new NextResponse(JSON.stringify(challenge), { status: 200 });
}
