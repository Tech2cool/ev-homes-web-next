"use client";

import { useState } from "react";
import "./login.css";
import { useUser } from "@/context/UserContext";
import { redirect } from "next/navigation";
// inside your component

export default function LoginPage() {
  const { login, loading, error } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);

    if (result.success) {
      alert("Logged in!");
      redirect("/dashboard");
      // redirect or do something
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>Login</h2>

        {error && <div className="error-message">{error}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <a className="forgot-password" href="/forgot-password">
          Forgot Password?
        </a>
      </form>
    </div>
  );
}
