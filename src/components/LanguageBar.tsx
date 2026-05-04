import type { LanguageSlice } from "@/lib/types";

interface Props {
  languages: LanguageSlice[];
}

export default function LanguageBar({ languages }: Props) {
  if (languages.length === 0) return null;
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
        Languages
      </div>
      <div style={{ display: "flex", gap: 2, height: 8 }}>
        {languages.map((lang, i) => (
          <div
            key={lang.name}
            style={{
              flexBasis: `${lang.percentage}%`,
              background: lang.color,
              borderTopLeftRadius: i === 0 ? 4 : 0,
              borderBottomLeftRadius: i === 0 ? 4 : 0,
              borderTopRightRadius: i === languages.length - 1 ? 4 : 0,
              borderBottomRightRadius: i === languages.length - 1 ? 4 : 0,
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
        {languages.map((lang) => (
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
  );
}
