"use client";

import { useRef, useState } from "react";
import Hero from "./Hero";
import DevCard from "./DevCard";
import ThemePicker from "./ThemePicker";
import DownloadButton from "./DownloadButton";
import ExampleCards from "./ExampleCards";
import ErrorMessage from "./ErrorMessage";
import { fetchProfile, GitHubError } from "@/lib/github";
import type { ProcessedProfile, ThemeName } from "@/lib/types";

export default function HomeClient() {
  const [username, setUsername] = useState<string>("");
  const [profile, setProfile] = useState<ProcessedProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<ThemeName>("dark");
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  async function runFetch(name: string) {
    setLoading(true);
    setError(null);
    try {
      const p = await fetchProfile(name);
      setProfile(p);
    } catch (err) {
      setProfile(null);
      if (err instanceof GitHubError) {
        setError(err.message);
      } else {
        setError("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(name: string) {
    setUsername(name);
    setHasSearched(true);
    await runFetch(name);
  }

  function handleRetry() {
    if (username) void runFetch(username);
  }

  return (
    <>
      <Hero onSubmit={handleSubmit} loading={loading} initialValue={username} />
      {(hasSearched || loading) && (
        <section className="bg-[#010409] py-16">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 sm:px-6">
            {loading && (
              <p className="text-sm text-[#7d8590]">Fetching @{username}…</p>
            )}
            {error && !loading && (
              <ErrorMessage message={error} onRetry={handleRetry} />
            )}
            {profile && !loading && !error && (
              <>
                <ThemePicker value={theme} onChange={setTheme} />
                <div className="w-full overflow-x-auto">
                  <div className="mx-auto" style={{ width: 800 }}>
                    <DevCard profile={profile} theme={theme} ref={cardRef} />
                  </div>
                </div>
                <DownloadButton
                  targetRef={cardRef}
                  filename={`devcard-${profile.login}-${theme}.png`}
                />
              </>
            )}
          </div>
        </section>
      )}
      {!hasSearched && !profile && <ExampleCards />}
    </>
  );
}
