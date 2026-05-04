export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python: "#3572A5",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  Ruby: "#701516",
  PHP: "#4F5D95",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Vue: "#41b883",
  Dart: "#00B4AB",
  Scala: "#c22d40",
  "C#": "#178600",
  Haskell: "#5e5086",
};

export const DEFAULT_LANGUAGE_COLOR = "#8b8b8b";

export function colorForLanguage(name: string): string {
  return LANGUAGE_COLORS[name] ?? DEFAULT_LANGUAGE_COLOR;
}
