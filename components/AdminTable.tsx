"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type WaitlistEntry = {
  id: string;
  email: string;
  what_to_create: string | null;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  updated_at: string;
};

export default function AdminTable() {
  const [signups, setSignups] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  async function fetchSignups() {
    const { data, error } = await supabase
      .from("waitlist")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching signups:", error);
      return;
    }

    setSignups(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchSignups();
  }, []);

  async function handleApprove(id: string, email: string) {
    setProcessingId(id);

    try {
      const response = await fetch("/api/admin/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ waitlist_id: id, email }),
      });

      if (response.ok) {
        await fetchSignups(); // Refresh the list
        alert("Magic link sent!");
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      alert("Failed to approve user");
    } finally {
      setProcessingId(null);
    }
  }

  async function handleReject(id: string) {
    setProcessingId(id);

    try {
      const { error } = await (supabase
        .from("waitlist")
        .update({ status: "rejected" as const, updated_at: new Date().toISOString() })
        .eq("id", id) as any);

      if (error) {
        alert("Failed to reject user");
      } else {
        await fetchSignups();
      }
    } catch (error) {
      alert("Failed to reject user");
    } finally {
      setProcessingId(null);
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border-4 border-black font-mono text-sm">
        <thead>
          <tr className="bg-black text-white">
            <th className="border-2 border-white p-3 text-left">Email</th>
            <th className="border-2 border-white p-3 text-left">What They Want to Create</th>
            <th className="border-2 border-white p-3 text-left">Status</th>
            <th className="border-2 border-white p-3 text-left">Submitted</th>
            <th className="border-2 border-white p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {signups.map((signup) => (
            <tr key={signup.id} className="border-2 border-black hover:bg-neutral-100">
              <td className="border-2 border-black p-3">{signup.email}</td>
              <td className="border-2 border-black p-3">
                {signup.what_to_create || <span className="text-neutral-400">—</span>}
              </td>
              <td className="border-2 border-black p-3">
                <span
                  className={`inline-block px-2 py-1 font-bold uppercase ${
                    signup.status === "approved"
                      ? "bg-green-200 text-green-800"
                      : signup.status === "rejected"
                        ? "bg-red-200 text-red-800"
                        : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {signup.status}
                </span>
              </td>
              <td className="border-2 border-black p-3">
                {new Date(signup.created_at).toLocaleDateString()}
              </td>
              <td className="border-2 border-black p-3">
                <div className="flex gap-2">
                  {signup.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(signup.id, signup.email)}
                        disabled={processingId === signup.id}
                        className="border-2 border-black bg-[#00FF00] px-3 py-1 font-bold uppercase hover:bg-black hover:text-[#00FF00] disabled:opacity-50"
                      >
                        {processingId === signup.id ? "..." : "Approve"}
                      </button>
                      <button
                        onClick={() => handleReject(signup.id)}
                        disabled={processingId === signup.id}
                        className="border-2 border-black bg-[#FF006E] px-3 py-1 font-bold uppercase text-white hover:bg-black hover:text-[#FF006E] disabled:opacity-50"
                      >
                        {processingId === signup.id ? "..." : "Reject"}
                      </button>
                    </>
                  )}
                  {signup.status === "approved" && (
                    <button
                      onClick={() => handleApprove(signup.id, signup.email)}
                      disabled={processingId === signup.id}
                      className="border-2 border-black bg-neutral-200 px-3 py-1 font-bold uppercase hover:bg-black hover:text-white disabled:opacity-50"
                    >
                      Resend Link
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {signups.length === 0 && (
        <div className="border-4 border-black bg-neutral-50 p-12 text-center font-mono">
          <p className="text-xl font-bold">No signups yet.</p>
          <p className="mt-2 text-neutral-600">They'll appear here when people join the waitlist.</p>
        </div>
      )}
    </div>
  );
}
