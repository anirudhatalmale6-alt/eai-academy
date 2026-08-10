import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Courses } from "./pages/Courses";
import { CourseDetail } from "./pages/CourseDetail";
import { Login } from "./pages/Login";
import { Admin } from "./pages/Admin";
import { EnterpriseAdvisory } from "./pages/EnterpriseAdvisory";
import { Team } from "./pages/Team";
import { Workshops } from "./pages/Workshops";
import { CheckoutSuccess } from "./pages/CheckoutSuccess";
import { MyCourses } from "./pages/MyCourses";
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
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/ai-advisory" element={<EnterpriseAdvisory />} />
        {/* Old links kept working. */}
        <Route path="/enterprise-advisory" element={<EnterpriseAdvisory />} />
        <Route path="/team" element={<Team />} />
        <Route path="/team-pricing" element={<Team />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/help" element={<ComingSoon title="Help & Support" />} />
        <Route path="*" element={<ComingSoon title="Page not found" />} />
      </Routes>
    </Layout>
  );
}
