import React from "react";

const SearchBar = ({ filters, setFilters }) => {
  const onChange = (e) =>
    setFilters((f) => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <input
        type="text"
        name="search"
        placeholder="Search tasks..."
        value={filters.search}
        onChange={onChange}
        className="px-3 py-2 rounded bg-slate-800 text-white text-sm"
      />

      <select
        name="status"
        value={filters.status}
        onChange={onChange}
        className="px-2 py-2 rounded bg-slate-800 text-white text-sm"
      >
        <option value="">All Status</option>
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <select
        name="priority"
        value={filters.priority}
        onChange={onChange}
        className="px-2 py-2 rounded bg-slate-800 text-white text-sm"
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
