import { colorForLanguage } from "./languages";
import type {
  GitHubRepo,
  GitHubUser,
  LanguageSlice,
  ProcessedProfile,
} from "./types";

export class GitHubError extends Error {
  constructor(
    message: string,
    public code: "NOT_FOUND" | "RATE_LIMIT" | "NETWORK" | "UNKNOWN",
  ) {
    super(message);
    this.name = "GitHubError";
  }
}

const API_BASE = "https://api.github.com";

async function ghFetch(url: string): Promise<Response> {
  let res: Response;
  try {
    res = await fetch(url, {
      headers: { Accept: "application/vnd.github+json" },
      cache: "no-store",
    });
  } catch {
    throw new GitHubError(
      "Couldn't reach GitHub. Check your connection and try again.",
      "NETWORK",
    );
  }
  if (res.status === 404) {
    throw new GitHubError("User not found.", "NOT_FOUND");
  }
  if (res.status === 403) {
    throw new GitHubError(
      "GitHub rate limit exceeded. Try again in an hour.",
      "RATE_LIMIT",
    );
  }
  if (!res.ok) {
    throw new GitHubError(`GitHub returned ${res.status}.`, "UNKNOWN");
  }
  return res;
}

function buildLanguageSlices(repos: GitHubRepo[]): LanguageSlice[] {
  const counts = new Map<string, number>();
  for (const repo of repos) {
    if (!repo.language) continue;
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  }
  const total = Array.from(counts.values()).reduce((a, b) => a + b, 0);
  if (total === 0) return [];

  const sorted = Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, 5);
  const rest = sorted.slice(5);

  const slices: LanguageSlice[] = top.map(([name, count]) => ({
    name,
    percentage: Math.round((count / total) * 1000) / 10,
    color: colorForLanguage(name),
  }));

  if (rest.length > 0) {
    const restCount = rest.reduce((a, [, c]) => a + c, 0);
    slices.push({
      name: "Other",
      percentage: Math.round((restCount / total) * 1000) / 10,
      color: "#8b8b8b",
    });
  }

  // Normalize so percentages sum to ~100 after rounding.
  const sum = slices.reduce((a, s) => a + s.percentage, 0);
  if (sum > 0 && slices.length > 0) {
    const drift = Math.round((100 - sum) * 10) / 10;
    slices[0].percentage = Math.round((slices[0].percentage + drift) * 10) / 10;
  }
  return slices;
}

export async function fetchProfile(username: string): Promise<ProcessedProfile> {
  const trimmed = username.trim();
  if (!trimmed) throw new GitHubError("Enter a GitHub username.", "NOT_FOUND");

  const [userRes, reposRes] = await Promise.all([
    ghFetch(`${API_BASE}/users/${encodeURIComponent(trimmed)}`),
    ghFetch(
      `${API_BASE}/users/${encodeURIComponent(trimmed)}/repos?per_page=100&sort=updated`,
    ),
  ]);

  const user = (await userRes.json()) as GitHubUser;
  const repos = (await reposRes.json()) as GitHubRepo[];

  const sourceRepos = repos.filter((r) => !r.fork);
  const totalStars = sourceRepos.reduce((a, r) => a + r.stargazers_count, 0);
  const topRepos = [...sourceRepos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 3)
    .map((r) => ({ name: r.name, stars: r.stargazers_count }));
  const languages = buildLanguageSlices(sourceRepos);
  const memberSince = new Date(user.created_at).getUTCFullYear().toString();

  return {
    login: user.login,
    name: user.name ?? user.login,
    avatarUrl: user.avatar_url,
    bio: user.bio,
    location: user.location,
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    memberSince,
    totalStars,
    topRepos,
    languages,
  };
}

export function formatCompact(n: number): string {
  if (n < 1000) return n.toString();
  if (n < 1_000_000) {
    const v = n / 1000;
    return `${v >= 10 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, "")}k`;
  }
  const v = n / 1_000_000;
  return `${v >= 10 ? Math.round(v) : v.toFixed(1).replace(/\.0$/, "")}M`;
}
