"use client";

import type { ThemeName } from "@/lib/types";

interface Option {
  name: ThemeName;
  label: string;
  swatch: string;
  ring: string;
}

const OPTIONS: Option[] = [
  {
    name: "dark",
    label: "Dark",
    swatch: "#0d1117",
    ring: "linear-gradient(90deg, #8b5cf6, #3b82f6, #22d3ee)",
  },
  {
    name: "midnight",
    label: "Midnight",
    swatch: "#000000",
    ring: "linear-gradient(90deg, #ec4899, #a855f7, #6366f1)",
  },
  {
    name: "ocean",
    label: "Ocean",
    swatch: "#0c1e35",
    ring: "linear-gradient(90deg, #22d3ee, #3b82f6, #4f46e5)",
  },
];

interface Props {
  value: ThemeName;
  onChange: (theme: ThemeName) => void;
}

export default function ThemePicker({ value, onChange }: Props) {
  return (
    <div
      role="radiogroup"
      aria-label="Card theme"
      className="flex items-center gap-3"
    >
      {OPTIONS.map((opt) => {
        const active = opt.name === value;
        return (
          <button
            key={opt.name}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={opt.label}
            title={opt.label}
            onClick={() => onChange(opt.name)}
            className="group relative flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-105"
            style={{
              padding: 2,
              background: active ? opt.ring : "transparent",
              border: active ? "none" : "1px solid #30363d",
            }}
          >
            <span
              className="block h-full w-full rounded-full"
              style={{ background: opt.swatch }}
            />
          </button>
        );
      })}
    </div>
  );
}
