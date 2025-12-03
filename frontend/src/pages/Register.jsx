import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      await register(form.name, form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "Registration failed";
      setError(msg);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Register</h2>
        {error && <div className="text-red-400 mb-3 text-sm">{error}</div>}

        <label className="block text-gray-300 text-sm mb-1">Name</label>
        <input
          className="w-full mb-3 px-3 py-2 rounded bg-slate-800 text-white outline-none"
          type="text"
          name="name"
          value={form.name}
          onChange={onChange}
        />

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
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded py-2"
        >
          Register
        </button>

        <p className="text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
