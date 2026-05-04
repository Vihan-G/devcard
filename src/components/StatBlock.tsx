interface Props {
  label: string;
  value: string;
}

export default function StatBlock({ label, value }: Props) {
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
