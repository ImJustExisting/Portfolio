type Props = {
  label: string;
  variant?: "primary" | "ghost";
  disabled?: boolean;
  onClick?: () => void;
};

export default function Button({
  label,
  variant = "primary",
  disabled = false,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "10px 18px",
        borderRadius: 10,
        border: variant === "ghost" ? "1px solid var(--CP)" : "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        backgroundColor: variant === "primary" ? "var(--CP)" : "transparent",
        color: "var(--text)",
        fontWeight: 500,
      }}
    >
      {label}
    </button>
  );
}