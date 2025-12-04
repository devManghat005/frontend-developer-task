import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axiosClient from "../api/axiosClient";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import SearchBar from "../components/SearchBar";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    priority: ""
  });
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    const params = {};
    if (filters.search) params.search = filters.search;
    if (filters.status) params.status = filters.status;
    if (filters.priority) params.priority = filters.priority;

    const res = await axiosClient.get("/tasks", { params });
    setTasks(res.data);
  };

  useEffect(() => {
    // Loads tasks whenever filters change
    fetchTasks();
  }, [filters]);

  const handleCreateOrUpdate = async (taskData) => {
    if (editingTask) {
      const res = await axiosClient.put(`/tasks/${editingTask._id}`, taskData);
      setTasks((prev) =>
        prev.map((t) => (t._id === editingTask._id ? res.data : t))
      );
      setEditingTask(null);
    } else {
      const res = await axiosClient.post("/tasks", taskData);
      setTasks((prev) => [res.data, ...prev]);
    }
  };

  const handleDelete = async (id) => {
    // Deletes a task by id
    await axiosClient.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <motion.div
      className="mx-auto flex max-w-5xl flex-col gap-5"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
          <p className="mt-1 text-xs text-gray-400">
            Manage your tasks with a clean, secure dashboard.
          </p>
        </div>
        {editingTask && (
          <button
            onClick={() => setEditingTask(null)}
            className="text-xs rounded-xl bg-slate-900/80 px-3 py-1.5 text-gray-300 ring-1 ring-slate-700/80 transition hover:bg-slate-800 hover:text-white"
          >
            Cancel editing
          </button>
        )}
      </div>

      <TaskForm onSubmit={handleCreateOrUpdate} editingTask={editingTask} />

      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.9)] backdrop-blur-2xl">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-sm font-medium text-gray-100">Your Tasks</h2>
          <span className="text-[11px] text-gray-400">
            {tasks.length} task{tasks.length !== 1 ? "s" : ""} found
          </span>
        </div>

        <SearchBar filters={filters} setFilters={setFilters} />

        <TaskList
          tasks={tasks}
          onEdit={(task) => setEditingTask(task)}
          onDelete={handleDelete}
        />
      </div>
    </motion.div>
  );
};

export default Dashboard;
