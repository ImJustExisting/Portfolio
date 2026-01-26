import { useParams, Link } from "react-router-dom";

export default function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <section>
      <p>
        <Link to="/projects">← Back to Projects</Link>
      </p>
      <h2>Project Details</h2>
      <p>Project ID: {projectId}</p>
    </section>
  );
}
