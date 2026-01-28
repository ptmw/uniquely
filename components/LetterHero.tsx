export default function LetterHero() {
  return (
    <section className="min-h-screen bg-neutral-50 px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-3xl">
        {/* Title - Bold and attention-grabbing */}
        <h1 className="mb-12 font-black text-5xl uppercase leading-none tracking-tight md:text-7xl">
          Listen Up—
        </h1>

        {/* Letter content */}
        <div className="space-y-8 font-mono text-lg leading-relaxed md:text-xl">
          <p className="font-bold">
            I'm Mark. I make music. I make art. I make things on the internet.
          </p>

          <p>And I'm tired of the same broken promise:</p>

          <div className="border-l-4 border-black pl-6 italic">
            <p>"Build your dream website! (Just pick from these 50 identical templates.)"</p>
            <p className="mt-2">"Complete creative freedom! (As long as you learn JavaScript.)"</p>
          </div>

          <p className="font-bold text-2xl">Bullshit.</p>

          <p>
            Creators don't need templates. We need tools that actually{" "}
            <span className="bg-[#FF006E] px-2 py-1 text-white">LET US CREATE</span>.
          </p>

          <p className="font-bold">So here's what I built: Uniquely.</p>

          <div className="my-12 space-y-4 border-4 border-black bg-white p-8">
            <p className="font-bold">You describe what you want. The AI builds it.</p>
            <p>Not some cookie-cutter layout. YOUR vision.</p>
          </div>

          <div className="space-y-4">
            <p>
              Want a site that feels like a late-night jazz club?{" "}
              <span className="font-bold underline decoration-4 decoration-[#FF006E]">Type it.</span>
            </p>
            <p>
              Want a gallery with dark, moody vibes and gated content?{" "}
              <span className="font-bold underline decoration-4 decoration-[#FF006E]">Type it.</span>
            </p>
            <p>
              Want a music player that doesn't look like every other Bandcamp page?{" "}
              <span className="font-bold underline decoration-4 decoration-[#FF006E]">
                Type. It.
              </span>
            </p>
          </div>

          <p className="font-bold text-xl">
            This is what Squarespace SHOULD have been.
            <br />
            Fast. Unique. Actually functional.
          </p>

          <div className="flex gap-4">
            <span className="text-2xl">→</span>
            <div className="space-y-2">
              <p>No developers.</p>
              <p>No plugins.</p>
              <p>No templates.</p>
            </div>
          </div>

          <p>Just you, your idea, and a tool that gets it.</p>

          <p className="font-bold text-xl">
            If you're a creator who's sick of settling, you're in the right place.
          </p>

          <p className="text-2xl font-black">
            Let's build something that doesn't look like everything else.
          </p>

          {/* Signature */}
          <div className="mt-16 pt-8 border-t-4 border-black">
            <p className="font-black text-2xl">— Mark Daisy</p>
          </div>

          {/* P.S. */}
          <div className="mt-12 bg-black p-6 text-white">
            <p className="font-bold">P.S.</p>
            <p className="mt-2">
              This isn't for Silicon Valley engineers. This is for artists, musicians, designers,
              writers. The people who actually make the internet interesting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
