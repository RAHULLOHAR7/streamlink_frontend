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
    const toastId = toast.loading("Sending access code...");

    try {
      const res = await fetch(`${API}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to send access code", {
          id: toastId,
        });
        return;
      }

      toast.success("Access code sent to your email", {
        id: toastId,
      });

      nav("/otp", { state: { email } });
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
          <span className="badge">Step 1 of 2</span>
          <h2>Request Access</h2>
          <p>Enter your email to receive a secure access code</p>
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
              Your email will only be used for this session
            </p>
          </div>

          <button className="btn btn-full" disabled={!email || loading}>
            {loading ? "Sending Access Code..." : "Send Access Code"}
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
