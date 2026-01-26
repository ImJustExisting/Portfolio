import { Link, useParams } from "react-router-dom";
import { projects } from "../../data/Projects";

export default function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <section style={{ padding: 16 }}>
        <h2>Project not found</h2>
        <Link to="/projects">Back to Projects</Link>
      </section>
    );
  }

  return (
    <section style={{ padding: 16 }}>
      <Link to="/projects">← Back</Link>

      <h1 style={{ marginTop: 10 }}>{project.title}</h1>
      {project.previewImage && (
        <img
          src={project.previewImage}
          alt={`${project.title} preview`}
          style={{
            width: "100%",
            maxWidth: 900,
            borderRadius: 12,
            margin: "12px 0",
          }}
        />
      )}
      <p>{project.longDescription}</p>

      <p>
        <strong>Category:</strong> {project.category}
        <br />
        <strong>Tags:</strong> {project.tags.join(", ")}
      </p>

      <div
        style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}
      >
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          style={{
            padding: "10px 14px",
            border: "1px solid currentColor",
            borderRadius: 10,
            textDecoration: "none",
          }}
        >
          View Live Project
        </a>
      </div>
      
    </section>
  );
}
