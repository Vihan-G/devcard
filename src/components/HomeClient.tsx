"use client";

import { useState } from "react";
import Hero from "./Hero";
import DevCard from "./DevCard";
import ThemePicker from "./ThemePicker";
import { fetchProfile, GitHubError } from "@/lib/github";
import type { ProcessedProfile, ThemeName } from "@/lib/types";

export default function HomeClient() {
  const [username, setUsername] = useState<string>("");
  const [profile, setProfile] = useState<ProcessedProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<ThemeName>("dark");

  async function handleSubmit(name: string) {
    setUsername(name);
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

  return (
    <>
      <Hero onSubmit={handleSubmit} loading={loading} initialValue={username} />
      <section className="bg-[#010409] py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 sm:px-6">
          {loading && (
            <p className="text-sm text-[#7d8590]">Fetching @{username}…</p>
          )}
          {error && (
            <div className="rounded-lg border border-[#f85149]/30 bg-[#f85149]/10 px-4 py-3 text-sm text-[#ff7b72]">
              {error}
            </div>
          )}
          {profile && !loading && !error && (
            <>
              <ThemePicker value={theme} onChange={setTheme} />
              <div className="w-full overflow-x-auto">
                <div className="mx-auto" style={{ width: 800 }}>
                  <DevCard profile={profile} theme={theme} />
                </div>
              </div>
            </>
          )}
          {!profile && !loading && !error && (
            <p className="text-center text-sm text-[#484f58]">
              Type a GitHub username above to generate your card.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
