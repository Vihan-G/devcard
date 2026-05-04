"use client";

import { useState } from "react";
import Hero from "./Hero";

export default function HomeClient() {
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(name: string) {
    setUsername(name);
    setLoading(true);
    // M4 will wire the fetch + card render. For now, just echo.
    setTimeout(() => setLoading(false), 250);
  }

  return (
    <>
      <Hero onSubmit={handleSubmit} loading={loading} initialValue={username} />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {username ? (
          <p className="text-center text-sm text-[#7d8590]">
            Searched: <span className="text-[#e6edf3]">@{username}</span>
          </p>
        ) : (
          <p className="text-center text-sm text-[#484f58]">
            Type a GitHub username above to generate your card.
          </p>
        )}
      </section>
    </>
  );
}
