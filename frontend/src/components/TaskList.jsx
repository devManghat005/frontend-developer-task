import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const statusColor = {
  "todo": "bg-slate-800 text-slate-200 border-slate-600/60",
  "in-progress": "bg-amber-500/10 text-amber-300 border-amber-500/60",
  "done": "bg-emerald-500/10 text-emerald-300 border-emerald-500/60"
};

const priorityDot = {
  low: "bg-emerald-400",
  medium: "bg-amber-400",
  high: "bg-rose-400"
};

const TaskList = ({ tasks, onEdit, onDelete }) => {
  if (!tasks.length) {
    // Shows a placeholder when there are no tasks
    return (
      <div className="mt-6 flex flex-col items-center gap-2 text-sm text-gray-400">
        <div className="h-10 w-10 rounded-full border border-dashed border-gray-600/80" />
        <p>No tasks yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {tasks.map((t) => (
          <motion.div
            key={t._id}
            layout
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/70 p-4 shadow-md shadow-black/50 backdrop-blur-xl hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-900/40"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-400" />
                <h3 className="text-sm font-semibold text-white">{t.title}</h3>
              </div>

              {t.description && (
                <p className="max-w-xl text-xs text-gray-300">{t.description}</p>
              )}

              <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-gray-400">
                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 ${statusColor[t.status] || statusColor["todo"]}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  <span className="capitalize">{t.status}</span>
                </span>

                <span className="inline-flex items-center gap-1 rounded-full bg-slate-800/70 px-2 py-0.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      priorityDot[t.priority] || priorityDot.medium
                    }`}
                  />
                  <span className="capitalize">{t.priority} priority</span>
                </span>

                <span className="text-[10px] text-gray-500">
                  Created {new Date(t.createdAt).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2 text-[11px]">
              <button
                onClick={() => onEdit(t)}
                className="rounded-lg bg-slate-800/90 px-3 py-1 text-gray-100 shadow-sm ring-1 ring-slate-700/70 transition hover:bg-blue-500 hover:text-white hover:ring-blue-400"
              >
                Edit
              </button>

              <button
                onClick={() => onDelete(t._id)}
                // Removes the selected task
                className="rounded-lg bg-slate-900/90 px-3 py-1 text-rose-300 shadow-sm ring-1 ring-rose-500/40 transition hover:bg-rose-600 hover:text-white hover:ring-rose-400"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList;
