import { Link, NavLink, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Home", icon: "⌂", end: true },
  { to: "/courses", label: "Courses", icon: "◎" },
  { to: "/certifications", label: "Certifications", icon: "✦" },
  { to: "/events", label: "Events", icon: "▤" },
  { to: "/community", label: "Community", icon: "◍" },
];

const navSecondary = [
  { to: "/for-teams", label: "For Teams", icon: "◨" },
  { to: "/for-firms", label: "For Firms", icon: "⛁" },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col w-[248px] shrink-0 border-r border-line px-4 py-5 sticky top-0 h-screen bg-bg">
      <Link to="/" className="flex items-center gap-2.5 px-2.5 pb-4">
        <span className="w-[30px] h-[30px] rounded-lg bg-gradient-to-br from-cyan to-[#7c5cff] text-white flex items-center justify-center text-sm">
          ≋
        </span>
        <span className="leading-none">
          <span className="block text-[15.5px] font-semibold">Empathetic AI</span>
          <span className="block text-[11px] font-medium text-ink2 tracking-[0.5px]">
            ACADEMY
          </span>
        </span>
      </Link>

      <nav className="flex flex-col">
        {nav.map((n) => (
          <SideLink key={n.to} {...n} />
        ))}
        <div className="border-t border-line my-3.5 mx-1.5" />
        {navSecondary.map((n) => (
          <SideLink key={n.to} {...n} />
        ))}
        <a
          href="https://www.empathetic-ai.com"
          className="flex items-center gap-3 px-3 py-2 rounded-[9px] text-[14.5px] font-medium hover:bg-black/5"
        >
          <span className="w-[18px] text-center text-cyan">↗</span> AI Products
        </a>
        <SideLink to="/help" label="Help" icon="?" />
      </nav>
    </aside>
  );
}

function SideLink({
  to,
  label,
  icon,
  end,
}: {
  to: string;
  label: string;
  icon: string;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-[9px] text-[14.5px] font-medium mb-0.5 ${
          isActive ? "text-cyan-ink" : "text-ink hover:bg-black/5"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`w-[18px] text-center ${isActive ? "text-cyan" : "text-ink2"}`}
          >
            {icon}
          </span>
          {label}
        </>
      )}
    </NavLink>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div className="grid md:grid-cols-[248px_1fr] min-h-screen">
      <Sidebar />
      <main className="px-4 sm:px-6 md:px-7 pt-4 pb-12">
        <div className="flex justify-end items-center gap-3.5 h-11 mb-1.5">
          <span className="hidden sm:flex items-center gap-2 bg-panel border border-line rounded-[10px] px-3.5 py-2 text-ink2 text-sm w-[240px]">
            ⌕ Search courses
          </span>
          <Link to="/login" className="text-[14.5px] font-semibold">
            Sign in
          </Link>
          <Link to="/login" className="btn btn-dark">
            Start free
          </Link>
        </div>
        <div key={pathname}>{children}</div>
      </main>
    </div>
  );
}
