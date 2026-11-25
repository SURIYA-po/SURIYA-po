import React, { useState,useEffect,navigate } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
// import "../css/TailwindOnly.css"
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
   useEffect(() => {
    import("../css/TailwindOnly.css");
  }, []);
  const { login } = useAuth()
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSuccess(false);

    try {
      const res = await api.post("/api/auth/login", form);

      if (res.status === 200) {
        const user = res.data.user;
        const token = res.data.token;

        login(user, token);
        setSuccess(true);

        setTimeout(() => {
          navigate("/admin");
        }, 800);
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        (err?.response?.status === 401
          ? "Invalid email or password. Please try again."
          : "Something went wrong. Please try again later.");
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">

      {/* 🔵 Blue floating glow blob */}
      <div className="absolute -top-32 -left-20 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-40 animate-pulse"></div>

      {/* 🔵 Second glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-800 rounded-full blur-[200px] opacity-30"></div>

      {/* 🔲 Glassmorphic Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-3xl shadow-2xl">

          {/* Title */}
          <h2 className="text-4xl font-bold text-blue-400 text-center mb-8 tracking-wide drop-shadow-lg">
            Welcome Back
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label className="text-gray-300 text-sm ml-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 rounded-xl bg-black/40 border border-blue-700 text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-300 text-sm ml-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full mt-1 p-3 rounded-xl bg-black/40 border border-blue-700 text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="••••••••"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 bg-red-500/15 border border-red-500/40 text-red-400 text-sm px-4 py-3 rounded-xl animate-pulse">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="flex items-center gap-2 bg-green-500/15 border border-green-500/40 text-green-400 text-sm px-4 py-3 rounded-xl">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Login successful! Redirecting…
              </div>
            )}

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: loading ? 1 : 1.03 }}
              whileTap={{ scale: loading ? 1 : 0.97 }}
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold text-lg shadow-lg shadow-blue-900/50 transition flex items-center justify-center gap-2
                ${loading ? "bg-blue-800 cursor-not-allowed opacity-70" : "bg-blue-600 hover:bg-blue-700"} text-white`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                  Signing in…
                </>
              ) : (
                "Login"
              )}
            </motion.button>

            {/* Register link */}
            <p className="text-gray-400 text-center text-sm mt-4">
              Don't have an account?{" "}
              <span className="text-blue-400 cursor-pointer hover:underline">
                <Link to="/register">Register</Link>
              </span>
            </p>

              <p className="text-gray-400 text-center text-sm mt-4">
              Go to Home{" "}
              <span className="text-blue-400 cursor-pointer hover:underline">
                <Link to="/">Home</Link>
              </span>
            </p>

          </form>
        </div>
      </motion.div>
    </div>
  );
}
