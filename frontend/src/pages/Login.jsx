import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validates required fields before login
    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      // Shows login error from server or fallback message
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <motion.div
      className="flex min-h-[70vh] items-center justify-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950/80 p-7 shadow-[0_18px_60px_rgba(15,23,42,0.9)] backdrop-blur-2xl">
        <div className="mb-6 flex flex-col gap-1">
          <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
          <p className="text-xs text-gray-400">
            Log in to access your tasks, progress, and dashboard.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-rose-500/50 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-300">
              Email
            </label>
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-gray-100 shadow-inner outline-none ring-1 ring-transparent transition hover:border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-gray-300">
              Password
            </label>
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-gray-100 shadow-inner outline-none ring-1 ring-transparent transition hover:border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/50 transition hover:shadow-blue-900/80 hover:brightness-110 active:scale-95"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-[11px] text-gray-400">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:text-blue-300">
            Create one
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
