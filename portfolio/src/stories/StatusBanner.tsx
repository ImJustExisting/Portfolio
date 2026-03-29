type Props = {
  type: "success" | "error" | "info";
  message: string;
};

const colours = {
  success: {
    background: "var(--success)",
    color: "#1a3d15",
  },
  error: {
    background: "var(--error)",
    color: "#ffffff",
  },
  info: {
    background: "var(--form)",
    color: "var(--text)",
  },
};

export default function StatusBanner({ type, message }: Props) {
  return (
    <div
      role={type === "error" ? "alert" : "status"}
      style={{
        padding: "12px 16px",
        borderRadius: 8,
        backgroundColor: colours[type].background,
        color: colours[type].color,
        fontSize: 14,
        fontWeight: 500,
      }}
    >
      {message}
    </div>
  );
}