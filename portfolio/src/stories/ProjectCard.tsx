import { Link } from "react-router-dom";
import type { ProjectCategory } from "../data/Projects";

type Props = {
  id: string;
  title: string;
  shortDescription: string;
  previewImage?: string;
  category: ProjectCategory;
  tags: string[];
};

export default function ProjectCard({
  id,
  title,
  shortDescription,
  previewImage,
  category,
  tags,
}: Props) {
  return (
    <Link
      to={`/projects/${id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <article
        style={{
          border: "1px solid #ccc",
          borderRadius: 12,
          overflow: "hidden",
          backgroundColor: "var(--CP)",
          maxWidth: 320,
        }}
      >
        {previewImage && (
          <img
            src={previewImage}
            alt={`${title} preview`}
            style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }}
            loading="lazy"
          />
        )}
        <div style={{ padding: 14 }}>
          <h3 style={{ margin: "0 0 6px" }}>{title}</h3>
          <p style={{ margin: "0 0 6px" }}>{shortDescription}</p>
          <small>{category} • {tags.join(" · ")}</small>
        </div>
      </article>
    </Link>
  );
}