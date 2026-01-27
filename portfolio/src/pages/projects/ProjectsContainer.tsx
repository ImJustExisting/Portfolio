import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProjects, setCategory, setQuery, setSort } from "../../store/projectSlice";
import ProjectsListView from "./ProjectListView";

export default function ProjectsContainer() {
  const dispatch = useAppDispatch();
  const { items, status, error, selectedCategory, query, sort } = useAppSelector((s) => s.projects);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProjects());
  }, [dispatch, status]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let result = items.filter((p) => {
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchesQuery =
        !q || p.title.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });

    result = [...result].sort((a, b) =>
      sort === "title-asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );

    return result;
  }, [items, selectedCategory, query, sort]);

  return (
    <ProjectsListView
      status={status}
      error={error}
      projects={filtered}
      selectedCategory={selectedCategory}
      query={query}
      sort={sort}
      onCategoryChange={(v) => dispatch(setCategory(v))}
      onQueryChange={(v) => dispatch(setQuery(v))}
      onSortChange={(v) => dispatch(setSort(v))}
    />
  );
}
