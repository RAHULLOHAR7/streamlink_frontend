import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

export default function Register() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    document.title = "Request Access | Arpit Video Production";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    const toastId = toast.loading("Granting access...");

    try {
      const res = await fetch(`${API}/api/auth/direct-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to grant access", {
          id: toastId,
        });
        return;
      }

      // Store token and redirect to live page
      if (data.token) {
        localStorage.setItem("token", data.token);
        toast.success("Access granted! Redirecting...", {
          id: toastId,
        });
        nav("/live");
      } else {
        toast.error("No token received", {
          id: toastId,
        });
      }
    } catch {
      toast.error("Server error. Try again.", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-hero">
      <div className="card">
        <div className="card-header">
          <h2>Request Access</h2>
          <p>Enter your email to access the live stream</p>
        </div>

        <form className="card-body" onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <div className="input-wrapper">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </div>
            <p className="input-hint">
              Enter your email to get instant access
            </p>
          </div>

          <button className="btn btn-full" disabled={!email || loading}>
            {loading ? "Granting Access..." : "Get Access"}
          </button>
        </form>

        <div className="card-footer">
          <p className="security-note">
            Your access is secured with end-to-end encryption
          </p>
        </div>
      </div>
    </div>
  );
}
