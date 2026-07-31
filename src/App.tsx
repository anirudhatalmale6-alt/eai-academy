import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Courses } from "./pages/Courses";
import { CourseDetail } from "./pages/CourseDetail";
import { Login } from "./pages/Login";
import { Admin } from "./pages/Admin";
import { ComingSoon } from "./pages/ComingSoon";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:slug" element={<CourseDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/certifications" element={<ComingSoon title="Certifications" />} />
        <Route path="/events" element={<ComingSoon title="Events" />} />
        <Route path="/community" element={<ComingSoon title="Community" />} />
        <Route path="/for-teams" element={<ComingSoon title="For Teams" />} />
        <Route path="/for-firms" element={<ComingSoon title="For Firms" />} />
        <Route path="/help" element={<ComingSoon title="Help & Support" />} />
        <Route path="*" element={<ComingSoon title="Page not found" />} />
      </Routes>
    </Layout>
  );
}
