import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const supabase = await createClient();

  const { auraChange } = await req.json();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userData, error } = await supabase
    .from("users")
    .select("aura")
    .eq("email", user?.email)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  // Calculate the new aura value
  const newAura = userData.aura + auraChange;

  // Update the user's aura value in the database
  const { error: updateError } = await supabase
    .from("users")
    .update({ aura: newAura })
    .eq("email", user?.email);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 400 });
  }

  return NextResponse.json({ message: "Aura updated successfully", newAura });
}
