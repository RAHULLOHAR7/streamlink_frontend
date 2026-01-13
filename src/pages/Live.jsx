import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function Live() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
      return;
    }

    fetch(`${API}/api/live`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch(() => {
        alert("Access denied");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="center">
        <div className="loading">
          <div className="spinner"></div>
          <p>Securing your live stream connection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="live-root">
      {" "}
      {/* 🔑 NEW ROOT */}
      <header className="live-header">
        <div className="live-badge">
          <span className="live-dot"></span>
          Live Stream
        </div>
        <h1>Live Session</h1>
        <p>You are securely connected</p>
      </header>
      <main className="live-stage">
        {" "}
        {/* 🔑 FLEX AREA */}
        <div className="video-container">
          <div className="video-frame">
            <iframe
              src="https://customer-z2747aavwleylweb.cloudflarestream.com/e80db5f2e0c86cec54bb99c34a698489/iframe"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </main>
    </div>
  );
}
