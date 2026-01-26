import { Link } from "react-router-dom";

const projects = [
  { id: "budget-buddy", title: "Budget Buddy" },
  { id: "diy-organizer", title: "DIY Project Organizer" },
];

export default function ProjectsList() {
  return (
    <ul>
      {projects.map((p) => (
        <li key={p.id}>
          <Link to={p.id}>{p.title}</Link>
        </li>
      ))}
    </ul>
  );
}
