import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 h-14 border-b border-[#21262d] bg-[#010409]/95 backdrop-blur">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#e6edf3] transition-opacity hover:opacity-80"
        >
          <CardIcon />
          <span className="text-base font-bold tracking-tight">devcard</span>
        </Link>
        <a
          href="https://github.com/Vihan-G/devcard"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-[#7d8590] transition-colors hover:text-[#e6edf3]"
        >
          <GitHubIcon />
          <span className="hidden sm:inline">View source</span>
        </a>
      </div>
    </header>
  );
}

function CardIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <circle cx="8" cy="11" r="2" />
      <path d="M14 10h4M14 14h4M6 16h6" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.73.5.66 5.57.66 11.84c0 5.02 3.25 9.27 7.76 10.78.57.1.78-.25.78-.55v-2.13c-3.16.69-3.83-1.36-3.83-1.36-.51-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.74 2.66 1.24 3.31.94.1-.74.4-1.24.72-1.53-2.52-.29-5.18-1.26-5.18-5.62 0-1.24.45-2.26 1.17-3.06-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.17.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.18-1.48 3.14-1.17 3.14-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.82 1.17 3.06 0 4.37-2.66 5.33-5.2 5.61.41.35.77 1.04.77 2.1v3.11c0 .3.21.66.79.55 4.5-1.51 7.75-5.76 7.75-10.78C23.34 5.57 18.27.5 12 .5z" />
    </svg>
  );
}
