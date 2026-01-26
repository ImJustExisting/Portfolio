import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/errorboundary/ErrorBoundary";
import RootLayout from "./layouts/RootLayout";

import Home from "./pages/Home";
import Contact from "./pages/Contact";

import ProjectsLayout from "./pages/projects/ProjectsLayout";
import ProjectsList from "./pages/projects/ProjectList";

const About = lazy(() => import("./pages/About"));
const ProjectDetails = lazy(() => import("./pages/projects/ProjectDetails"));

function RouteLoader() {
  return <div style={{ padding: 16 }}>Loading page...</div>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />

            <Route path="/projects" element={<ProjectsLayout />}>
              <Route index element={<ProjectsList />} />
              <Route path=":projectId" element={<ProjectDetails />} />
            </Route>
            
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
