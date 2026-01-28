import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, what_to_create, website } = body;

    // Honeypot check - if 'website' field is filled, it's a bot
    if (website) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Validate what_to_create length if provided
    if (what_to_create && what_to_create.length > 500) {
      return NextResponse.json(
        { error: "Description too long (max 500 characters)" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Try to insert the new signup
    const { data, error } = await (supabase
      .from("waitlist")
      .insert({
        email: normalizedEmail,
        what_to_create: what_to_create?.trim() || null,
        status: "pending" as const,
      })
      .select()
      .single() as any);

    // Check if it's a duplicate email (unique constraint violation)
    if (error?.code === "23505") {
      // Duplicate email - update what_to_create if new value provided
      if (what_to_create?.trim()) {
        await (supabase
          .from("waitlist")
          .update({
            what_to_create: what_to_create.trim(),
            updated_at: new Date().toISOString(),
          })
          .eq("email", normalizedEmail) as any);
      }

      return NextResponse.json(
        {
          success: true,
          message: "You're already on the list! We'll email you soon.",
        },
        { status: 200 }
      );
    }

    // Handle other database errors
    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save signup. Please try again." },
        { status: 500 }
      );
    }

    // Success - new signup
    return NextResponse.json(
      {
        success: true,
        message: "Thanks! We'll review your request and email you if you're selected for early access.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
