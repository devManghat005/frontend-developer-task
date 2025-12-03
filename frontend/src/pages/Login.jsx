import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Login</h2>
        {error && <div className="text-red-400 mb-3 text-sm">{error}</div>}

        <label className="block text-gray-300 text-sm mb-1">Email</label>
        <input
          className="w-full mb-3 px-3 py-2 rounded bg-slate-800 text-white outline-none"
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
        />

        <label className="block text-gray-300 text-sm mb-1">Password</label>
        <input
          className="w-full mb-4 px-3 py-2 rounded bg-slate-800 text-white outline-none"
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded py-2"
        >
          Login
        </button>

        <p className="text-gray-400 text-sm mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-400">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
