import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const defaultTask = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium"
};

const TaskForm = ({ onSubmit, editingTask }) => {
  const [task, setTask] = useState(defaultTask);

  useEffect(() => {
    // Syncs form state when editing a task
    if (editingTask) setTask(editingTask);
    else setTask(defaultTask);
  }, [editingTask]);

  const handleChange = (e) =>
    setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prevents submitting empty task titles
    if (!task.title.trim()) return;
    onSubmit(task);
  };

  return (
    <motion.form
      layout
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25 }}
      className="mb-5 rounded-2xl border border-white/10 bg-slate-950/70 p-4 shadow-xl shadow-black/40 backdrop-blur-xl"
    >
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[220px]">
          <label className="mb-1 block text-xs font-medium text-gray-300">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="e.g. Finish frontend assignment"
            className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-gray-100 shadow-inner outline-none ring-1 ring-transparent transition hover:border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-300">Status</label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-xs text-gray-200 outline-none ring-1 ring-transparent transition hover:border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-300">Priority</label>
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-xs text-gray-200 outline-none ring-1 ring-transparent transition hover:border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="mt-3">
        <label className="mb-1 block text-xs font-medium text-gray-300">
          Description
        </label>
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Optional details, acceptance criteria, links…"
          rows={2}
          className="w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-gray-100 shadow-inner outline-none ring-1 ring-transparent transition hover:border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-lg shadow-blue-900/50 transition hover:shadow-blue-900/80 hover:brightness-110 active:scale-95"
        >
          <span className="relative z-10">
            {editingTask ? "Update Task" : "Add Task"}
          </span>
          <span className="absolute inset-0 -translate-x-full bg-white/20 transition duration-300 hover:translate-x-full" />
        </button>
      </div>
    </motion.form>
  );
};

export default TaskForm;
