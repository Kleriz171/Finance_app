import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside style={{
      backgroundColor: 'white',
      width: '256px',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      borderRadius: '8px'
    }}>
      <NavLink
        to="/"
        style={({ isActive }) => ({
          display: 'block',
          padding: '8px 16px',
          borderRadius: '4px',
          backgroundColor: isActive ? '#1da1f2' : 'transparent',
          color: isActive ? 'white' : '#374151',
          textDecoration: 'none',
          transition: 'background-color 0.2s',
          cursor: 'pointer'
        })}
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/transactions"
        style={({ isActive }) => ({
          display: 'block',
          padding: '8px 16px',
          borderRadius: '4px',
          backgroundColor: isActive ? '#1da1f2' : 'transparent',
          color: isActive ? 'white' : '#374151',
          textDecoration: 'none',
          transition: 'background-color 0.2s',
          cursor: 'pointer'
        })}
      >
        Transactions
      </NavLink>
    </aside>
  );
}
