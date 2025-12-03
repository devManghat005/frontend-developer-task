import React, { useEffect, useState } from "react";
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
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    await axiosClient.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <TaskForm onSubmit={handleCreateOrUpdate} editingTask={editingTask} />

        <SearchBar filters={filters} setFilters={setFilters} />

        <TaskList
          tasks={tasks}
          onEdit={(task) => setEditingTask(task)}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Dashboard;
