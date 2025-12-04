import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    location.pathname === path ? "text-white" : "text-gray-400 hover:text-white";

  const handleLogout = () => {
    // Logs the user out and redirects to login
    logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-20">
      <nav className="mx-auto mt-3 max-w-6xl rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 shadow-lg shadow-blue-900/20 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-4">
          <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500 text-sm font-semibold">
              TD
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-white">
                Task Dashboard
              </span>
              <span className="text-[11px] text-gray-400">
                Clean, secure and modern
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden items-center gap-4 text-sm sm:flex">
                <Link to="/dashboard" className={isActive("/dashboard")}>
                  Dashboard
                </Link>
                <Link to="/profile" className={isActive("/profile")}>
                  Profile
                </Link>
              </div>
            )}

            {!user ? (
              <div className="flex items-center gap-2 text-sm">
                <Link
                  to="/login"
                  className="rounded-xl border border-white/10 px-3 py-1.5 text-gray-200 transition hover:border-blue-500/60 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 px-3 py-1.5 font-medium text-white shadow-md shadow-blue-900/40 transition hover:shadow-lg hover:shadow-blue-900/60 hover:brightness-110"
                >
                  Register
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="text-xs sm:text-sm rounded-xl bg-white/5 px-3 py-1.5 text-gray-200 shadow-sm ring-1 ring-white/10 transition hover:bg-red-500/80 hover:text-white hover:ring-red-400"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
