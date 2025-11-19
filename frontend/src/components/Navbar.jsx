import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      padding: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1da1f2' }}>Finance Tracker</h1>
      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: '#374151' }}>{user.name}</span>
          <button
            onClick={logout}
            style={{
              backgroundColor: '#ef4444',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={e => e.target.style.backgroundColor = '#dc2626'}
            onMouseOut={e => e.target.style.backgroundColor = '#ef4444'}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
