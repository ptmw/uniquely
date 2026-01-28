import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const token_hash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type");
  const next = url.searchParams.get("next") || "/app";

  if (token_hash && type === "magiclink") {
    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type: "magiclink",
    });

    if (!error) {
      // Successful login - redirect to app
      return NextResponse.redirect(new URL(next, request.url));
    } else {
      // Invalid or expired token
      return NextResponse.redirect(
        new URL(`/?error=invalid_token`, request.url)
      );
    }
  }

  // If no token or invalid type, redirect to home
  return NextResponse.redirect(new URL("/", request.url));
}
