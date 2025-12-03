import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useAuth();
  const [form, setForm] = useState({ name: "", bio: "" });
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (user) {
      setForm({ name: user.name || "", bio: user.bio || "" });
    }
  }, [user]);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const res = await axiosClient.put("/users/me", form);
      setForm({ name: res.data.name, bio: res.data.bio });
      setStatus("Profile updated");
    } catch (err) {
      setStatus("Error updating profile");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>

        <form
          onSubmit={onSubmit}
          className="bg-slate-900 p-4 rounded-lg flex flex-col gap-3"
        >
          <label className="text-sm text-gray-300">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            className="px-3 py-2 rounded bg-slate-800 text-white text-sm"
          />

          <label className="text-sm text-gray-300">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={onChange}
            rows={3}
            className="px-3 py-2 rounded bg-slate-800 text-white text-sm"
          />

          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-600 rounded text-sm"
          >
            Save
          </button>
          {status && (
            <div className="text-xs text-gray-300 mt-2">{status}</div>
          )}
        </form>

        <button
          onClick={logout}
          className="mt-4 px-4 py-2 bg-red-600 rounded text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
