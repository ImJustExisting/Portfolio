import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/errorboundary/ErrorBoundary";

import Home from "./pages/Home";
import Contact from "./pages/Contact";

import ProjectsLayout from "./pages/ProjectsLayout";
import ProjectsList from "./pages/ProjectList";

const About = lazy(() => import("./pages/About"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));

function RouteLoader() {
  return <div style={{ padding: 16 }}>Loading page...</div>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          {/* top-level routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* nested routes for Projects */}
          <Route path="/projects" element={<ProjectsLayout />}>
            <Route index element={<ProjectsList />} />
            <Route path=":projectId" element={<ProjectDetails />} />
          </Route>

          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
