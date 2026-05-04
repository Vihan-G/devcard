"use client";

import { useState } from "react";

interface Props {
  onSubmit: (username: string) => void;
  loading?: boolean;
  initialValue?: string;
}

export default function SearchForm({ onSubmit, loading, initialValue = "" }: Props) {
  const [value, setValue] = useState(initialValue);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = value.trim().replace(/^@/, "");
    if (!trimmed || loading) return;
    onSubmit(trimmed);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-row"
    >
      <div className="relative flex-1">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-base text-[#484f58]">
          @
        </span>
        <input
          type="text"
          inputMode="text"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="GitHub username"
          aria-label="GitHub username"
          className="h-12 w-full rounded-lg border border-[#30363d] bg-[#0d1117] pl-9 pr-4 text-base text-[#e6edf3] placeholder:text-[#484f58] outline-none transition-colors focus:border-[#58a6ff] focus:ring-2 focus:ring-[#58a6ff]/30"
        />
      </div>
      <button
        type="submit"
        disabled={loading || value.trim().length === 0}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 px-6 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Loading…" : "Generate →"}
      </button>
    </form>
  );
}
