import { Link, NavLink, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import mark from "../assets/empathetic-mark.png";
import { useAuth } from "../lib/auth";

const nav = [
  { to: "/", label: "Home", icon: "⌂", end: true },
  { to: "/courses", label: "Courses", icon: "◎" },
  { to: "/workshops", label: "Live Workshops", icon: "✦" },
  { to: "/team", label: "Team", icon: "◈" },
  { to: "/ai-advisory", label: "AI Advisory", icon: "⛁" },
];

export function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col w-[248px] shrink-0 border-r border-line px-4 py-5 sticky top-0 h-screen bg-bg">
      <Link to="/" className="flex items-center gap-2.5 px-2.5 pb-4">
        <img src={mark} alt="Empathetic AI" className="w-[32px] h-[32px]" />
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
        <a
          href="https://www.empathetic-ai.com"
          className="flex items-center gap-3 px-3 py-2 rounded-[9px] text-[14.5px] font-medium hover:bg-black/5"
        >
          <span className="w-[18px] text-center text-accent">↗</span> AI Products
        </a>
        <SideLink to="/help" label="Help" icon="?" />
      </nav>
    </aside>
  );
}

// The sidebar is desktop only, so phones get a compact scrolling nav bar.
function MobileNav() {
  return (
    <div className="md:hidden sticky top-0 z-40 bg-bg border-b border-line -mx-4 sm:-mx-6 px-4 sm:px-6">
      <div className="flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={mark} alt="Empathetic AI" className="w-[26px] h-[26px]" />
          <span className="leading-none">
            <span className="block text-[14px] font-semibold">Empathetic AI</span>
            <span className="block text-[10px] font-medium text-ink2 tracking-[0.5px]">
              ACADEMY
            </span>
          </span>
        </Link>
      </div>
      <nav className="flex gap-1.5 overflow-x-auto pb-2.5 -mx-1 px-1">
        {nav.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.end}
            className={({ isActive }) =>
              `shrink-0 rounded-full px-3.5 py-1.5 text-[13.5px] font-semibold whitespace-nowrap border ${
                isActive
                  ? "bg-ink text-white border-ink"
                  : "bg-white text-ink border-line"
              }`
            }
          >
            {n.label}
          </NavLink>
        ))}
      </nav>
    </div>
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
          isActive ? "text-accent-ink" : "text-ink hover:bg-black/5"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`w-[18px] text-center ${isActive ? "text-accent" : "text-ink2"}`}
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
  const { user, signOut } = useAuth();
  return (
    <div className="grid md:grid-cols-[248px_1fr] min-h-screen">
      <Sidebar />
      <main className="px-4 sm:px-6 md:px-7 pt-0 md:pt-4 pb-12">
        <MobileNav />
        <div className="flex justify-end items-center gap-3.5 h-11 mb-1.5">
          <span className="hidden sm:flex items-center gap-2 bg-panel border border-line rounded-[10px] px-3.5 py-2 text-ink2 text-sm w-[240px]">
            ⌕ Search courses
          </span>
          {user ? (
            <>
              <Link to="/my-courses" className="text-[14.5px] font-semibold">
                My Courses
              </Link>
              <button
                onClick={() => signOut()}
                className="text-[14.5px] font-semibold text-ink2 hover:text-ink"
              >
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-[14.5px] font-semibold">
                Sign in
              </Link>
              <Link to="/login" className="btn btn-accent">
                Start free
              </Link>
            </>
          )}
        </div>
        <div key={pathname}>{children}</div>
      </main>
    </div>
  );
}
