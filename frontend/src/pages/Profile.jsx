import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", bio: "" });
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Loads user data into the form on mount
    if (user) {
      setForm({ name: user.name || "", bio: user.bio || "" });
    }
  }, [user]);

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const res = await axiosClient.put("/users/me", form);
      setForm({ name: res.data.name, bio: res.data.bio });
      setStatus("Profile updated successfully.");
    } catch {
      // Shows update error message
      setStatus("Error updating profile. Please try again.");
    }
  };

  return (
    <motion.div
      className="mx-auto flex max-w-3xl flex-col gap-5"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
    >
      <div>
        <h1 className="text-2xl font-semibold text-white">Profile</h1>
        <p className="mt-1 text-xs text-gray-400">
          Your basic information and a short bio.
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.9)] backdrop-blur-2xl md:flex-row">
        <div className="flex flex-1 flex-col gap-4">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-300">
                Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-gray-100 shadow-inner outline-none ring-1 ring-transparent transition hover:border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-gray-300">
                Bio
              </label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={onChange}
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-gray-100 shadow-inner outline-none ring-1 ring-transparent transition hover:border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Tell us briefly how you use this dashboard or what you're working on."
              />
            </div>

            <button
              type="submit"
              className="mt-1 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-white shadow-lg shadow-blue-900/50 transition hover:shadow-blue-900/80 hover:brightness-110 active:scale-95"
            >
              Save changes
            </button>

            {status && (
              <div className="text-[11px] text-gray-300">
                {status}
              </div>
            )}
          </form>
        </div>

        <div className="mt-4 flex w-full flex-col items-center gap-3 text-xs text-gray-300 md:mt-0 md:w-56">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-xl font-semibold text-white shadow-lg shadow-blue-900/70">
            {user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="text-center">
            <p className="font-medium text-white">{user?.name}</p>
            <p className="text-[11px] text-gray-400">{user?.email}</p>
          </div>
          <p className="max-w-xs text-[11px] text-gray-400">
            This profile is local to the app and stored securely via hashed auth and
            JWT with your data in MongoDB.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
