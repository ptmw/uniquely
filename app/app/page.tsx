"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export default function AppPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <div className="text-center font-mono">
          <p className="text-xl font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-6">
        <div className="max-w-2xl border-4 border-black bg-white p-12 text-center">
          <h1 className="mb-4 font-black text-3xl uppercase">Access Denied</h1>
          <p className="mb-6 font-mono">You need to be logged in to access this page.</p>
          <a
            href="/"
            className="inline-block border-4 border-black bg-black px-6 py-3 font-bold uppercase text-white hover:bg-[#FF006E]"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-12 md:px-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 flex items-start justify-between border-b-4 border-black pb-8">
          <div>
            <h1 className="mb-2 font-black text-5xl uppercase md:text-7xl">
              Welcome to Uniquely
            </h1>
            <p className="font-mono text-lg text-neutral-600">{user.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="border-2 border-black bg-white px-4 py-2 font-mono text-sm uppercase hover:bg-black hover:text-white"
          >
            Sign Out
          </button>
        </div>

        {/* Coming Soon Content */}
        <div className="space-y-8">
          <div className="border-4 border-black bg-white p-8">
            <h2 className="mb-4 font-black text-3xl uppercase">
              The Product is Coming Soon
            </h2>
            <p className="mb-4 font-mono text-lg leading-relaxed">
              You're in! Thanks for being an early supporter.
            </p>
            <p className="font-mono text-lg leading-relaxed">
              We're putting the finishing touches on Uniquely. You'll be the first to know when
              we're ready to launch.
            </p>
          </div>

          <div className="border-4 border-[#FF006E] bg-black p-8 text-white">
            <h3 className="mb-4 font-black text-2xl uppercase">What's Next?</h3>
            <ul className="space-y-3 font-mono">
              <li className="flex gap-3">
                <span className="text-[#FF006E]">→</span>
                <span>We'll email you when the builder is ready</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF006E]">→</span>
                <span>You'll get early access before anyone else</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF006E]">→</span>
                <span>Your feedback will shape the product</span>
              </li>
            </ul>
          </div>

          <div className="bg-neutral-100 p-8 font-mono">
            <p className="font-bold">Questions? Ideas? Want to chat?</p>
            <p className="mt-2">
              Reach out to us at{" "}
              <a
                href="mailto:hello@uniquely.com"
                className="underline decoration-2 decoration-[#FF006E] hover:text-[#FF006E]"
              >
                hello@uniquely.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
