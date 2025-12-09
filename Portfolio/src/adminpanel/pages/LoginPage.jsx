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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post("/api/auth/login", form);

    if (res.status === 200) {
      const user = res.data.user;
      const token = res.data.token;

      // Save user + token in auth context or state
      login(user, token);

     

      // Navigate to home page
      navigate("/");
    }

  } catch (error) {
    console.error("Login error:", error);

    // Optional: show error message
    // setError("Invalid email or password");
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

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 
              text-white font-semibold text-lg shadow-lg shadow-blue-900/50 transition"
            >
              Login
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
