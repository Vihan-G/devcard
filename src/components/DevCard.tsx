"use client";

import { forwardRef } from "react";
import type { ProcessedProfile, ThemeName } from "@/lib/types";
import { formatCompact } from "@/lib/github";

interface ThemeStyle {
  background: string;
  accent: string;
}

const THEMES: Record<ThemeName, ThemeStyle> = {
  dark: {
    background: "#0d1117",
    accent: "linear-gradient(90deg, #8b5cf6 0%, #3b82f6 50%, #22d3ee 100%)",
  },
  midnight: {
    background: "#000000",
    accent: "linear-gradient(90deg, #ec4899 0%, #a855f7 50%, #6366f1 100%)",
  },
  ocean: {
    background: "#0c1e35",
    accent: "linear-gradient(90deg, #22d3ee 0%, #3b82f6 50%, #4f46e5 100%)",
  },
};

interface Props {
  profile: ProcessedProfile;
  theme?: ThemeName;
}

const DevCard = forwardRef<HTMLDivElement, Props>(function DevCard(
  { profile, theme = "dark" },
  ref,
) {
  const t = THEMES[theme];

  return (
    <div
      ref={ref}
      className="relative overflow-hidden font-sans"
      style={{
        width: 800,
        height: 420,
        background: t.background,
        border: "1px solid #21262d",
        borderRadius: 12,
        color: "#e6edf3",
        boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)",
      }}
    >
      <div
        style={{ height: 4, width: "100%", background: t.accent }}
        aria-hidden
      />

      <div style={{ padding: "24px 32px 20px 32px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.avatarUrl}
            alt={`${profile.login} avatar`}
            crossOrigin="anonymous"
            width={80}
            height={80}
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              border: "3px solid #30363d",
              boxShadow: "0 6px 16px rgba(0,0,0,0.4)",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#e6edf3",
                    letterSpacing: "-0.01em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {profile.name}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "#7d8590",
                    fontFamily:
                      "var(--font-jetbrains-mono), ui-monospace, monospace",
                    marginTop: 2,
                  }}
                >
                  @{profile.login}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  whiteSpace: "nowrap",
                  fontSize: 14,
                  color: "#e6edf3",
                  fontWeight: 600,
                }}
              >
                <span style={{ color: "#e3b341" }}>★</span>
                <span>{formatCompact(profile.totalStars)} stars</span>
              </div>
            </div>
            {profile.bio && (
              <div
                style={{
                  marginTop: 8,
                  fontSize: 13,
                  color: "#7d8590",
                  fontStyle: "italic",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  lineHeight: 1.4,
                }}
              >
                &ldquo;{profile.bio}&rdquo;
              </div>
            )}
            <div
              style={{
                marginTop: 8,
                fontSize: 12,
                color: "#7d8590",
                display: "flex",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
              }}
            >
              {profile.location && <span>📍 {profile.location}</span>}
              {profile.location && <span style={{ color: "#484f58" }}>·</span>}
              <span>Since {profile.memberSince}</span>
            </div>
          </div>
        </div>

        <div
          style={{
            height: 1,
            background: "#21262d",
            margin: "16px 0 14px 0",
          }}
          aria-hidden
        />

        <div style={{ display: "flex", gap: 40, marginBottom: 14 }}>
          <Stat label="Repos" value={formatCompact(profile.publicRepos)} />
          <Stat label="Followers" value={formatCompact(profile.followers)} />
          <Stat label="Following" value={formatCompact(profile.following)} />
        </div>

        {profile.topRepos.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <div
              style={{
                fontSize: 11,
                color: "#7d8590",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 6,
              }}
            >
              Top repos
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {profile.topRepos.map((r) => (
                <div
                  key={r.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: 13,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#58a6ff",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        color: "#58a6ff",
                        fontWeight: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {r.name}
                    </span>
                  </div>
                  <div style={{ color: "#7d8590", whiteSpace: "nowrap" }}>
                    ★ {formatCompact(r.stars)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {profile.languages.length > 0 && (
          <div>
            <div
              style={{
                fontSize: 11,
                color: "#7d8590",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                marginBottom: 6,
              }}
            >
              Languages
            </div>
            <div style={{ display: "flex", gap: 2, height: 8 }}>
              {profile.languages.map((lang, i) => (
                <div
                  key={lang.name}
                  style={{
                    flexBasis: `${lang.percentage}%`,
                    background: lang.color,
                    borderTopLeftRadius: i === 0 ? 4 : 0,
                    borderBottomLeftRadius: i === 0 ? 4 : 0,
                    borderTopRightRadius:
                      i === profile.languages.length - 1 ? 4 : 0,
                    borderBottomRightRadius:
                      i === profile.languages.length - 1 ? 4 : 0,
                  }}
                />
              ))}
            </div>
            <div
              style={{
                marginTop: 8,
                display: "flex",
                flexWrap: "wrap",
                gap: "6px 14px",
                fontSize: 11,
                color: "#7d8590",
              }}
            >
              {profile.languages.map((lang) => (
                <div
                  key={lang.name}
                  style={{ display: "flex", alignItems: "center", gap: 5 }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: lang.color,
                    }}
                  />
                  <span>
                    {lang.name} {lang.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          position: "absolute",
          right: 16,
          bottom: 10,
          fontSize: 10,
          color: "#484f58",
          letterSpacing: "0.02em",
        }}
      >
        devcard.vercel.app
      </div>
    </div>
  );
});

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#e6edf3",
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 11,
          color: "#7d8590",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          marginTop: 2,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default DevCard;
