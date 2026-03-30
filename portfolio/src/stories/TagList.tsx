type Props = {
  tags: string[];
  color?: string;
};

export default function TagList({ tags, color = "var(--text)" }: Props) {
  if (tags.length === 0) return null;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {tags.map((tag) => (
        <span
          key={tag}
          style={{
            fontSize: 12,
            padding: "3px 10px",
            borderRadius: 99,
            border: "1px solid var(--CP)",
            color: color,
            backgroundColor: "transparent",
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}