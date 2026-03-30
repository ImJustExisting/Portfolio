type Props = {
  title: string;
  subtitle?: string;
  level?: 1 | 2 | 3;
  align?: "left" | "center" | "right";
  color?: string;
};

export default function SectionHeading({
  title,
  subtitle,
  level = 2,
  align = "left",
  color = "var(--text)",
}: Props) {
  const Tag = `h${level}` as "h1" | "h2" | "h3";

  return (
    <div style={{ textAlign: align, marginBottom: 16 }}>
      <Tag
        style={{
          margin: 0,
          color: color,
          borderBottom: "3px solid var(--CP)",
          display: "inline-block",
          paddingBottom: 4,
        }}
      >
        {title}
      </Tag>
      {subtitle && (
        <p style={{ margin: "8px 0 0", color: color, fontSize: 15, opacity: 0.85 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}