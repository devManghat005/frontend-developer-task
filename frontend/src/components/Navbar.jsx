import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-900 text-white px-4 py-3 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">
        Task Dashboard
      </Link>

      <div className="flex gap-4 items-center">
        {user && (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
          </>
        )}
        {!user ? (
          <>
            <Link to="/login" className="px-3 py-1 border rounded">
              Login
            </Link>
            <Link to="/register" className="px-3 py-1 border rounded">
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-600 rounded text-sm"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

