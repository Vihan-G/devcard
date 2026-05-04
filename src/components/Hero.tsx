import SearchForm from "./SearchForm";

interface Props {
  onSubmit: (username: string) => void;
  loading?: boolean;
  initialValue?: string;
}

export default function Hero({ onSubmit, loading, initialValue }: Props) {
  return (
    <section className="border-b border-[#21262d] bg-[#010409]">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-[#e6edf3] sm:text-5xl md:text-6xl">
          Your GitHub, beautifully presented.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-[#7d8590] sm:text-lg">
          Generate a shareable developer card from your GitHub profile.
          <br className="hidden sm:inline" /> No login. No setup. Just type and download.
        </p>
        <div className="mt-10">
          <SearchForm
            onSubmit={onSubmit}
            loading={loading}
            initialValue={initialValue}
          />
        </div>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {["No login required", "Free forever", "Works in seconds"].map(
            (label) => (
              <li
                key={label}
                className="flex items-center gap-1.5 rounded-full border border-[#21262d] bg-[#0d1117] px-3 py-1 text-xs text-[#7d8590]"
              >
                <CheckIcon />
                {label}
              </li>
            ),
          )}
        </ul>
        <p className="mt-4 text-xs text-[#484f58]">
          GitHub limits unauthenticated requests to 60/hour.
        </p>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3fb950"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}
