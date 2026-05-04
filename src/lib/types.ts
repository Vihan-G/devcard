export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepo {
  name: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
}

export interface LanguageSlice {
  name: string;
  percentage: number;
  color: string;
}

export interface ProcessedProfile {
  login: string;
  name: string;
  avatarUrl: string;
  bio: string | null;
  location: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  memberSince: string;
  totalStars: number;
  topRepos: { name: string; stars: number }[];
  languages: LanguageSlice[];
}

export type ThemeName = "dark" | "midnight" | "ocean";
