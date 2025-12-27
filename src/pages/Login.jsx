
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // Save token (if backend returns one)
      localStorage.setItem("token", data.token);

      console.log("Login success:", data);

      // Redirect after login
      navigate("/home");

    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to VentiCoin</h1>
        <p className="text-gray-500 mt-1">
          Your trusted platform for cryptocurrency trading
        </p>
      </div>

      <div className="w-full max-w-lg bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100">
          <div className="flex-1 py-4 text-center text-sm font-semibold bg-green-500 text-white">
            Login
          </div>
          <Link
            to="/signup"
            className="flex-1 py-4 text-center text-sm font-semibold text-green-600 bg-gray-50 hover:bg-gray-100"
          >
            Sign Up
          </Link>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900">Login to your account</h2>
          <p className="text-gray-400 text-sm mb-6 mt-1">
            Enter your email and password to access your account
          </p>

          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Email */}
            <input
              type="email"
              placeholder="you@email.com"
              className="w-full px-4 py-3 bg-blue-50 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password */}
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-blue-50 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
