import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f4f6'
    }}>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: 'white',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '448px'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', color: '#1da1f2', marginBottom: '16px' }}>Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{
            width: '100%',
            border: '1px solid #d1d5db',
            padding: '8px',
            borderRadius: '4px',
            marginBottom: '16px',
            fontSize: '14px',
            fontFamily: 'inherit'
          }}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            width: '100%',
            border: '1px solid #d1d5db',
            padding: '8px',
            borderRadius: '4px',
            marginBottom: '16px',
            fontSize: '14px',
            fontFamily: 'inherit'
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            width: '100%',
            border: '1px solid #d1d5db',
            padding: '8px',
            borderRadius: '4px',
            marginBottom: '16px',
            fontSize: '14px',
            fontFamily: 'inherit'
          }}
          required
        />
        <button type="submit" style={{
          width: '100%',
          backgroundColor: '#1da1f2',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '4px',
          border: 'none',
          cursor: 'pointer',
          marginBottom: '16px',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'background-color 0.2s'
        }} onMouseOver={e => e.target.style.backgroundColor = '#1a91da'} onMouseOut={e => e.target.style.backgroundColor = '#1da1f2'}>
          Register
        </button>
        <p style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center' }}>
          Already have an account? <Link to="/login" style={{ color: '#1da1f2', textDecoration: 'none', fontWeight: '500' }}>Login</Link>
        </p>
      </form>
    </div>
  );
}
