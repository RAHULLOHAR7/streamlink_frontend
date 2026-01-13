import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const API = import.meta.env.VITE_API_URL;

export default function Otp() {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(300);
  const nav = useNavigate();
  const { state } = useLocation();
  const email = state?.email;

  useEffect(() => {
    document.title = "Verify Access | Arpit Video Production";
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!email) {
    return (
      <div className="auth-hero">
        <div className="card">
          <p>Session expired. Please request access again.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Verifying access...");

    try {
      const res = await fetch(`${API}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        toast.success("Access verified. Welcome!", { id: toastId });
        nav("/live");
      } else {
        toast.error(data.message || "Invalid access code", {
          id: toastId,
        });
      }
    } catch {
      toast.error("Verification failed", {
        id: toastId,
      });
    }
  };

  const handleResend = async () => {
    const toastId = toast.loading("Sending new access code...");

    try {
      const res = await fetch(`${API}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to resend code", {
          id: toastId,
        });
        return;
      }

      setTimer(300);
      toast.success("New access code sent", {
        id: toastId,
      });
    } catch {
      toast.error("Could not resend code", {
        id: toastId,
      });
    }
  };

  return (
    <div className="auth-hero">
      <div className="card otp-card">
        <div className="card-header">
          <span className="badge">Step 2 of 2</span>
          <h2>Verify Access Code</h2>
          <p>Enter the 6-digit code sent to {email}</p>

          <div className="timer">
            <span>Code expires in: </span>
            <span className="timer-count">{formatTime(timer)}</span>
          </div>
        </div>

        <form className="card-body" onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">One-time Password</label>
            <div className="input-wrapper">
              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="000000"
                autoFocus
              />
            </div>
            <p className="input-hint">Enter the 6-digit code from your email</p>
          </div>

          <button
            className="btn btn-full"
            disabled={otp.length !== 6 || timer === 0}
          >
            {timer === 0 ? "Code Expired" : "Enter Live Session"}
          </button>
        </form>

        <div className="card-footer">
          <button
            type="button"
            className="link-button"
            onClick={handleResend}
            disabled={timer > 0}
          >
            {timer > 0 ? `Resend OTP (${formatTime(timer)})` : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}
