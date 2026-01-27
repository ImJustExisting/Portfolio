import { Link } from "react-router-dom";
import type { Project, ProjectCategory } from "../../store/projectSlice";

type Props = {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  projects: Project[];
  selectedCategory: ProjectCategory | "All";
  query: string;
  sort: "title-asc" | "title-desc";
  onCategoryChange: (v: ProjectCategory | "All") => void;
  onQueryChange: (v: string) => void;
  onSortChange: (v: "title-asc" | "title-desc") => void;
};

export default function ProjectsListView(props: Props) {
  const categories: Array<ProjectCategory | "All"> = ["All", "Web", "Mobile", "Design"];

  if (props.status === "loading") return <p style={{ padding: 16 }}>Loading projects…</p>;
  if (props.status === "failed") return <p style={{ padding: 16 }}>Error: {props.error}</p>;

  return (
    <section style={{ padding: 16 }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
        <input
          value={props.query}
          onChange={(e) => props.onQueryChange(e.target.value)}
          placeholder="Search…"
          style={{ padding: 10, minWidth: 220 }}
        />

        <select
          value={props.selectedCategory}
          onChange={(e) => props.onCategoryChange(e.target.value as any)}
          style={{ padding: 10 }}
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select value={props.sort} onChange={(e) => props.onSortChange(e.target.value as any)} style={{ padding: 10 }}>
          <option value="title-asc">Title A–Z</option>
          <option value="title-desc">Title Z–A</option>
        </select>
      </div>

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        {props.projects.map((p) => (
          <Link key={p.id} to={`/projects/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <article style={{ border: "1px solid #ccc", borderRadius: 12, overflow: "hidden" }}>
              {p.previewImage && (
                <img
                  src={p.previewImage}
                  alt={`${p.title} preview`}
                  style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }}
                  loading="lazy"
                />
              )}
              <div style={{ padding: 14 }}>
                <h3 style={{ margin: "0 0 6px" }}>{p.title}</h3>
                <p style={{ margin: 0 }}>{p.shortDescription}</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
