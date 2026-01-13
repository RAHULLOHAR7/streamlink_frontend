import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Search, Download, CheckCircle, XCircle, Loader2, ArrowUp, ArrowDown } from 'lucide-react';

const API = import.meta.env.VITE_API_URL;

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API}/api/auth/users`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data.users || []);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const sortedUsers = [...users].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="center">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-users">
      <h1>Registered Users</h1>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>OTP</th>
              <th>OTP Expiry</th>
              <th>Verified</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.length > 0 ? (
              sortedUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.email}</td>
                  <td>{user.otp || 'N/A'}</td>
                  <td>{user.otpExpiry ? formatDate(user.otpExpiry) : 'N/A'}</td>
                  <td>
                    <span className={`status ${user.verified ? 'verified' : 'not-verified'}`}>
                      {user.verified ? '✓' : '✗'}
                    </span>
                  </td>
                  <td>{formatDate(user.createdAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <style jsx>{`
        .admin-users {
          padding: 20px;
          color: #fff;
        }
        
        h1 {
          font-size: 24px;
          margin-bottom: 20px;
          color: #fff;
        }
        
        .table-container {
          width: 100%;
          overflow-x: auto;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
          background: #1e1e1e;
          border-radius: 8px;
          overflow: hidden;
        }
        
        th, td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #333;
        }
        
        th {
          background-color: #2d2d2d;
          font-weight: 500;
          color: #ccc;
          text-transform: uppercase;
          font-size: 0.8em;
        }
        
        tr:hover {
          background-color: #2a2a2a;
        }
        
        .status {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 500;
          font-size: 0.9em;
        }
        
        .verified {
          background-color: rgba(74, 222, 128, 0.1);
          color: #4ade80;
        }
        
        .not-verified {
          background-color: rgba(248, 113, 113, 0.1);
          color: #f87171;
        }
        
        .no-data {
          text-align: center;
          padding: 40px;
          color: #888;
        }
        
        @media (max-width: 768px) {
          th, td {
            padding: 10px 8px;
            font-size: 0.9em;
          }
        }
      `}</style>
    </div>
  );
}