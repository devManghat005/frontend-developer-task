import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -left-32 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-32 h-80 w-80 rounded-full bg-pink-500/20 blur-3xl" />
      </div>

      <Navbar />

      <main className="pt-20 pb-10 px-4">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="*"
              element={
                <div className="flex h-[60vh] items-center justify-center text-lg text-gray-300">
                  Page not found.
                </div>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
