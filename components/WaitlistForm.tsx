"use client";

import { FormEvent, useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "duplicate" | "error";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [whatToCreate, setWhatToCreate] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          what_to_create: whatToCreate.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(response.status === 201 ? "success" : "duplicate");
        setMessage(data.message);
        setEmail("");
        setWhatToCreate("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section className="bg-black px-6 py-20 text-white md:px-12 md:py-32">
      <div className="mx-auto max-w-2xl">
        <h2 className="mb-8 font-black text-4xl uppercase leading-none md:text-6xl">
          Get Early Access
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="mb-2 block font-mono text-sm uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              disabled={status === "loading"}
              className="w-full border-4 border-white bg-black px-4 py-3 font-mono text-lg text-white placeholder-neutral-500 focus:border-[#FF006E] focus:outline-none disabled:opacity-50"
            />
          </div>

          {/* What to Create Input */}
          <div>
            <label
              htmlFor="whatToCreate"
              className="mb-2 block font-mono text-sm uppercase tracking-wide"
            >
              What do you want to create? (Optional)
            </label>
            <textarea
              id="whatToCreate"
              value={whatToCreate}
              onChange={(e) => setWhatToCreate(e.target.value)}
              placeholder="e.g., A music player for my latest album with gated content"
              maxLength={500}
              rows={4}
              disabled={status === "loading"}
              className="w-full border-4 border-white bg-black px-4 py-3 font-mono text-lg text-white placeholder-neutral-500 focus:border-[#FF006E] focus:outline-none disabled:opacity-50"
            />
            <p className="mt-2 font-mono text-xs text-neutral-400">
              {whatToCreate.length}/500 characters
            </p>
          </div>

          {/* Honeypot field (hidden from users, catches bots) */}
          <input
            type="text"
            name="website"
            style={{ display: "none" }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full border-4 border-white bg-[#FF006E] px-8 py-4 font-black text-xl uppercase tracking-wide text-white transition-all hover:bg-white hover:text-[#FF006E] disabled:opacity-50 disabled:cursor-not-allowed md:text-2xl"
          >
            {status === "loading" ? "Submitting..." : "Request Early Access"}
          </button>

          {/* Status Messages */}
          {status === "success" && (
            <div className="border-4 border-[#00FF00] bg-black p-6 font-mono">
              <p className="font-bold text-[#00FF00]">✓ {message}</p>
            </div>
          )}

          {status === "duplicate" && (
            <div className="border-4 border-white bg-black p-6 font-mono">
              <p className="font-bold text-white">→ {message}</p>
            </div>
          )}

          {status === "error" && (
            <div className="border-4 border-[#FF006E] bg-black p-6 font-mono">
              <p className="font-bold text-[#FF006E]">✗ {message}</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
