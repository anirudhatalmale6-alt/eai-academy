import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Courses } from "./pages/Courses";
import { CourseDetail } from "./pages/CourseDetail";
import { Login } from "./pages/Login";
import { Admin } from "./pages/Admin";
import { EnterpriseAdvisory } from "./pages/EnterpriseAdvisory";
import { TeamPricingPage } from "./pages/TeamPricingPage";
import { CheckoutSuccess } from "./pages/CheckoutSuccess";
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
        <Route path="/enterprise-advisory" element={<EnterpriseAdvisory />} />
        <Route path="/team-pricing" element={<TeamPricingPage />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/my-courses" element={<ComingSoon title="My Courses" />} />
        <Route path="/help" element={<ComingSoon title="Help & Support" />} />
        <Route path="*" element={<ComingSoon title="Page not found" />} />
      </Routes>
    </Layout>
  );
}
