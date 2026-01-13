// import { useEffect, useState } from "react";

// const API = import.meta.env.VITE_API_URL;

// export default function Live() {
//   const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       window.location.href = "/";
//       return;
//     }

//     fetch(`${API}/api/live`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data);
//         setIsLoading(false);
//       })
//       .catch(() => {
//         alert("Access denied");
//         setIsLoading(false);
//       });
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="center">
//         <div className="loading">
//           <div className="spinner"></div>
//           <p>Securing your live stream connection...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="live-root">
//       {" "}
//       {/* 🔑 NEW ROOT */}
//       <header className="live-header">
//         <div className="live-badge">
//           <span className="live-dot"></span>
//           Live Stream
//         </div>
//         <h1>Live Session</h1>
//         <p>You are securely connected</p>
//       </header>
//       <main className="live-stage">
//         {" "}
//         {/* 🔑 FLEX AREA */}
//         <div className="video-container">
//           <div className="video-frame">
//             <iframe
//               src="https://customer-z2747aavwleylweb.cloudflarestream.com/e80db5f2e0c86cec54bb99c34a698489/iframe"
//               allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
//               allowFullScreen
//             />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL;

export default function Live() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
  }, [API]);

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

  // Calculate responsive dimensions
  const isMobile = windowSize.width < 768;
  const videoAspectRatio = 16 / 9;
  const maxWidth = Math.min(windowSize.width * 0.95, 1200);
  const videoWidth = isMobile ? windowSize.width * 0.95 : Math.min(maxWidth, windowSize.width * 0.9);
  const videoHeight = videoWidth / videoAspectRatio;

  return (
    <div className="live-root">
      <header className="live-header">
        <div className="live-badge">
          <span className="live-dot"></span>
          Live Stream
        </div>
        <h1>Live Session</h1>
        <p>You are securely connected</p>
      </header>
      <main className="live-stage">
        <div className="video-container" style={{ maxWidth: `${maxWidth}px` }}>
          <div 
            className="video-frame" 
            style={{
              paddingTop: `${100 / videoAspectRatio}%`,
              position: 'relative',
              width: '100%'
            }}
          >
            <iframe
              src="https://customer-z2747aavwleylweb.cloudflarestream.com/e80db5f2e0c86cec54bb99c34a698489/iframe"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: isMobile ? '8px' : '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
              }}
            />
          </div>
        </div>
      </main>

      <style jsx>{`
        .live-root {
          min-height: 100vh;
          background-color: #121212;
          color: #fff;
          padding: ${isMobile ? '16px' : '24px'};
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .live-header {
          text-align: center;
          margin-bottom: ${isMobile ? '16px' : '24px'};
          width: 100%;
          max-width: 1200px;
        }

        .live-badge {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 50, 50, 0.2);
          color: #ff4d4d;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: ${isMobile ? '12px' : '14px'};
          font-weight: 600;
          margin-bottom: ${isMobile ? '12px' : '16px'};
        }

        .live-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          background: #ff4d4d;
          border-radius: 50%;
          margin-right: 8px;
          animation: pulse 1.5s infinite;
        }

        h1 {
          font-size: ${isMobile ? '24px' : '32px'};
          margin: 0 0 8px;
          color: #fff;
        }

        p {
          color: #aaa;
          margin: 0;
          font-size: ${isMobile ? '14px' : '16px'};
        }

        .live-stage {
          width: 100%;
          display: flex;
          justify-content: center;
          flex: 1;
        }

        .video-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .center {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          flex-direction: column;
        }

        .loading {
          text-align: center;
        }

        .spinner {
          border: 4px solid rgba(255, 255, 255, 0.1);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border-left-color: #4f46e5;
          animation: spin 1s linear infinite;
          margin: 0 auto 16px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        @media (max-width: 480px) {
          .live-header {
            padding: 0 8px;
          }
          
          .video-container {
            padding: 0 8px;
          }
        }
      `}</style>
    </div>
  );
}