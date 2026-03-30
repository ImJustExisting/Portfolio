import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProjects, setCategory, setQuery, setSort } from "../../store/projectSlice";
import { useEffect } from "react";
import ProjectCard from "../../stories/ProjectCard";
import type { ProjectCategory } from "../../data/Projects";
import style from "./projects.module.css";

type SortOption = "title-asc" | "title-desc";

const categories: Array<ProjectCategory | "All"> = [
  "All",
  "Web",
  "Mobile",
  "Design",
];

export default function ProjectsList() {
  const dispatch = useAppDispatch();
  const {items, status, error, selectedCategory, query, sort} = useAppSelector((state) => state.projects);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProjects());
    }
  }, [dispatch, status]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let result = items.filter((p) => {
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });

    result = [...result].sort((a, b) =>
      sort === "title-asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

    return result;
  }, [items, selectedCategory, query, sort]);

  if (status === "loading") {
    return <p style={{ padding: 16 }}>Loading projects...</p>;
  }
  if (status === "failed") {
    return <p style={{ padding: 16 }}>Error: {error}</p>;
  }

  return (
    <section style={{ padding: 16 }}>
      <div
        style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}
      >
        <input
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
          placeholder="Search by title or tag…"
          className={style.searchTag}
        />

        <select
          value={selectedCategory}
          onChange={(e) => dispatch(setCategory(e.target.value as ProjectCategory | "All"))}
          className={style.selector}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => dispatch(setSort(e.target.value as SortOption))}
          className={style.sort}
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
          <div key={p.id}>
            <ProjectCard 
            id={p.id}
            title={p.title}
            shortDescription={p.shortDescription}
            previewImage={p.previewImage}
            category={p.category}
            tags={p.tags}
            />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ marginTop: 16 }}>No projects match your filters.</p>
      )}
    </section>
  );
}
