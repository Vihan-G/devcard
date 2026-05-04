export default function Footer() {
  return (
    <footer className="border-t border-[#21262d] bg-[#010409]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="text-sm font-bold tracking-tight text-[#e6edf3]">
            devcard
          </div>
          <div className="flex flex-col items-start text-sm text-[#7d8590] sm:items-end">
            <div>
              Made by{" "}
              <a
                href="https://github.com/Vihan-G"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#e6edf3] hover:underline"
              >
                Vihan Goenka
              </a>{" "}
              · UCSD CS &apos;29
            </div>
            <a
              href="https://github.com/Vihan-G"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#e6edf3]"
            >
              github.com/Vihan-G
            </a>
          </div>
        </div>
        <div className="mt-6 border-t border-[#21262d] pt-4 text-center text-xs text-[#484f58]">
          Not affiliated with GitHub, Inc.
        </div>
      </div>
    </footer>
  );
}
