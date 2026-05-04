"use client";

import { useState } from "react";
import { downloadCardPng } from "@/lib/export";

interface Props {
  targetRef: React.RefObject<HTMLElement | null>;
  filename: string;
}

export default function DownloadButton({ targetRef, filename }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload() {
    if (!targetRef.current || busy) return;
    setBusy(true);
    setError(null);
    try {
      await downloadCardPng(targetRef.current, filename);
    } catch {
      setError("Couldn't generate PNG. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleDownload}
        disabled={busy}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#30363d] bg-[#21262d] px-5 text-sm font-semibold text-[#e6edf3] transition-colors hover:border-[#58a6ff] hover:bg-[#30363d] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <DownloadIcon />
        {busy ? "Rendering…" : "Download PNG"}
      </button>
      {error && <p className="text-xs text-[#ff7b72]">{error}</p>}
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
