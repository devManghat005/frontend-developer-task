import React, { useEffect, useState } from "react";

const defaultTask = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium"
};

const TaskForm = ({ onSubmit, editingTask }) => {
  const [task, setTask] = useState(defaultTask);

  useEffect(() => {
    if (editingTask) setTask(editingTask);
    else setTask(defaultTask);
  }, [editingTask]);

  const handleChange = (e) =>
    setTask((t) => ({ ...t, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return;
    onSubmit(task);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900 p-4 rounded-lg mb-4 flex flex-col gap-3"
    >
      <div className="flex gap-3 flex-wrap">
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Task title"
          className="flex-1 min-w-[200px] px-3 py-2 bg-slate-800 text-white rounded text-sm"
        />
        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="px-2 py-2 bg-slate-800 text-white rounded text-sm"
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
        </select>
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          className="px-2 py-2 bg-slate-800 text-white rounded text-sm"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description (optional)"
        className="w-full px-3 py-2 bg-slate-800 text-white rounded text-sm"
        rows={2}
      />

      <button
        type="submit"
        className="self-end px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm text-white"
      >
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
