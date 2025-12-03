import React from "react";

const TaskList = ({ tasks, onEdit, onDelete }) => {
  if (!tasks.length)
    return <div className="text-gray-400 text-sm">No tasks found.</div>;

  return (
    <div className="space-y-3">
      {tasks.map((t) => (
        <div
          key={t._id}
          className="bg-slate-900 p-4 rounded-lg flex justify-between gap-3 items-start"
        >
          <div>
            <h3 className="text-white font-semibold text-sm">{t.title}</h3>
            <p className="text-gray-400 text-xs mt-1">{t.description}</p>
            <div className="text-xs text-gray-400 mt-2 flex gap-3">
              <span>Status: {t.status}</span>
              <span>Priority: {t.priority}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onEdit(t)}
              className="px-3 py-1 text-xs bg-slate-700 rounded text-white"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(t._id)}
              className="px-3 py-1 text-xs bg-red-600 rounded text-white"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
