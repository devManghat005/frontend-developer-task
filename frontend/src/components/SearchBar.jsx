import React from "react";

const SearchBar = ({ filters, setFilters }) => {
  const onChange = (e) =>
    // Updates the selected filter value
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <div className="mb-5 flex flex-wrap items-center gap-3">
      <input
        type="text"
        name="search"
        placeholder="Search tasks by title or description…"
        value={filters.search}
        onChange={onChange}
        className="w-full max-w-xs rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-gray-100 shadow-inner shadow-black/20 outline-none ring-1 ring-transparent transition hover:border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
      />

      <select
        name="status"
        value={filters.status}
        onChange={onChange}
        className="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-xs text-gray-200 outline-none ring-1 ring-transparent transition hover:border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">All Status</option>
        <option value="todo">Todo</option>
        <option value="in-progress">In progress</option>
        <option value="done">Done</option>
      </select>

      <select
        name="priority"
        value={filters.priority}
        onChange={onChange}
        className="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-xs text-gray-200 outline-none ring-1 ring-transparent transition hover:border-blue-500/50 focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
};

export default SearchBar;
