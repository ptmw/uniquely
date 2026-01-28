import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { waitlist_id, email } = body;

    if (!waitlist_id || !email) {
      return NextResponse.json(
        { error: "Missing waitlist_id or email" },
        { status: 400 }
      );
    }

    // Update waitlist status to approved
    const { error: updateError } = await (supabase
      .from("waitlist")
      .update({
        status: "approved" as const,
        updated_at: new Date().toISOString(),
      })
      .eq("id", waitlist_id) as any);

    if (updateError) {
      console.error("Error updating waitlist:", updateError);
      return NextResponse.json(
        { error: "Failed to update waitlist status" },
        { status: 500 }
      );
    }

    // Send magic link via Supabase Auth
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || request.nextUrl.origin;

    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${baseUrl}/api/auth/callback`,
      },
    });

    if (authError) {
      console.error("Error sending magic link:", authError);
      return NextResponse.json(
        { error: "Failed to send magic link" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User approved and magic link sent",
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
