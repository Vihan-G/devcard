interface Props {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: Props) {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-3 rounded-xl border border-[#f85149]/30 bg-[#f85149]/10 px-5 py-5 text-center">
      <div className="flex items-center gap-2 text-sm font-semibold text-[#ff7b72]">
        <ErrorIcon />
        Something went wrong
      </div>
      <p className="text-sm text-[#e6edf3]">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 inline-flex h-9 items-center justify-center rounded-md border border-[#30363d] bg-[#21262d] px-4 text-sm font-medium text-[#e6edf3] transition-colors hover:border-[#58a6ff] hover:bg-[#30363d]"
        >
          Try again
        </button>
      )}
    </div>
  );
}

function ErrorIcon() {
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
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
