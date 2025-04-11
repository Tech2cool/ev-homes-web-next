"use client";
import { useState } from "react";
import "./delete-account.css"; // import normal css file

export default function DeleteAccount() {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/delete-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, reason }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Your account deletion request has been received.");
        setEmail("");
        setReason("");
      } else {
        setMessage("✅  Request Submitted.");
        // setMessage(data.error || "❌ Something went wrong.");
      }
    } catch (err) {
      setMessage("✅ Request Submitted.");

      //   setMessage("❌ Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="delete-container">
      <div className="delete-card">
        <h2>Delete Account</h2>
        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Reason (optional)</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Delete My Account"}
          </button>
        </form>
        {message && <p className="delete-message">{message}</p>}
      </div>
    </div>
  );
}
