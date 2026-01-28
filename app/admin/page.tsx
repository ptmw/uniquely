"use client";

import { useState, FormEvent } from "react";
import AdminTable from "@/components/AdminTable";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Simple password check (in a real app, this would be server-side)
    // For demo, we'll check against a hardcoded value
    // In production, use proper auth
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === "admin123") {
      setAuthed(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-6">
        <div className="w-full max-w-md">
          <div className="border-4 border-black bg-white p-8">
            <h1 className="mb-6 font-black text-3xl uppercase">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="mb-2 block font-mono text-sm uppercase">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-4 border-black px-4 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-[#FF006E]"
                  placeholder="Enter admin password"
                />
              </div>
              {error && (
                <p className="font-mono text-sm text-[#FF006E]">{error}</p>
              )}
              <button
                type="submit"
                className="w-full border-4 border-black bg-black px-6 py-3 font-bold uppercase text-white hover:bg-[#FF006E]"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-12 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="font-black text-4xl uppercase md:text-6xl">Waitlist Admin</h1>
          <button
            onClick={() => setAuthed(false)}
            className="border-2 border-black bg-white px-4 py-2 font-mono text-sm uppercase hover:bg-black hover:text-white"
          >
            Logout
          </button>
        </div>
        <AdminTable />
      </div>
    </div>
  );
}
