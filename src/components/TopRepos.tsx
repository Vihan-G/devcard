import { formatCompact } from "@/lib/github";

interface Repo {
  name: string;
  stars: number;
}

interface Props {
  repos: Repo[];
}

export default function TopRepos({ repos }: Props) {
  if (repos.length === 0) return null;
  return (
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
        Top repos
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {repos.map((r) => (
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
  );
}
