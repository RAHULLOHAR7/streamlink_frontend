import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Otp from "./pages/Otp";
import Live from "./pages/Live";
import AdminUsers from "./pages/AdminUsers";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // If user is trying to access root path but has a token, redirect to /live
    if (location.pathname === '/' && token) {
      navigate('/live', { replace: true });
    } 
    // If user doesn't have a token and is not on root or otp page, redirect to root
    else if (!token && !['/', '/otp', '/register'].includes(location.pathname)) {
      navigate('/', { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/live" element={<Live />} />
      <Route path="/admin/users" element={<AdminUsers />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
