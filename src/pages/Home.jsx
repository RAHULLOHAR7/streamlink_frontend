import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const nav = useNavigate();

  useEffect(() => {
    document.title = "Secure Live Stream | Arpit Video Production";
  }, []);

  return (
    <div className="auth-hero">
      <div className="home-panel">
        <span className="home-eyebrow">Secure access to the live session</span>

        <h1 className="home-title">
          Private &amp; secure
          <br />
          live streaming, in minutes.
        </h1>

        <p className="home-subtitle">
          Enter your email address to continue. We'll send you a one-time
          passcode to verify your access and securely connect you to the live
          stream. No account creation required.
        </p>

        <div className="home-cta-row">
          <button className="btn" onClick={() => nav("/register")}>
            Request Access
          </button>
        </div>

        <div className="home-meta-row">
          <span className="home-highlight">No passwords, no friction.</span>
          <span className="home-caption">
            Viewer entries are fully OTP verified.
          </span>
        </div>
      </div>
    </div>
  );
}
