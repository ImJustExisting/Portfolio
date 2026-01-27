import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../../data/Projects";
import type { ProjectCategory } from "../../data/Projects";

type SortOption = "title-asc" | "title-desc";

export default function ProjectsList() {
  const [category, setCategory] = useState<ProjectCategory | "All">("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("title-asc");

  const categories: Array<ProjectCategory | "All"> = [
    "All",
    "Web",
    "Mobile",
    "Design",
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let result = projects.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });

    result = result.sort((a, b) => {
      if (sort === "title-asc") return a.title.localeCompare(b.title);
      return b.title.localeCompare(a.title);
    });

    return result;
  }, [category, query, sort]);

  return (
    <section style={{ padding: 16 }}>
      <div
        style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or tag…"
          style={{ padding: 10, minWidth: 220 }}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as any)}
          style={{ padding: 10 }}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          style={{ padding: 10 }}
        >
          <option value="title-asc">Title A–Z</option>
          <option value="title-desc">Title Z–A</option>
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gap: 12,
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        }}
      >
        {filtered.map((p) => (
          <Link
            key={p.id}
            to={`/projects/${p.id}`}
            style={{ textDecoration: "none", color: "inherit", backgroundColor: "var(--CP)", borderRadius: "12px" }}
          >
            <article
              style={{
                border: "1px solid #ccc",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              {p.previewImage && (
                <img
                  src={p.previewImage}
                  alt={`${p.title} preview`}
                  style={{
                    width: "100%",
                    height: 160,
                    objectFit: "cover",
                    display: "block",
                  }}
                  loading="lazy"
                />
              )}

              <div style={{ padding: 14 }}>
                <h3 style={{ margin: "0 0 6px" }}>{p.title}</h3>
                <p style={{ margin: 0 }}>{p.shortDescription}</p>
                <small style={{color: "var(--text)"}}>{p.category} • {p.tags.join(" · ")}</small>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ marginTop: 16 }}>No projects match your filters.</p>
      )}
    </section>
  );
}
