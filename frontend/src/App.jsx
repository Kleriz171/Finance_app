import { BrowserRouter as Router, Routes, Route, Navigate, useContext } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <AuthProvider>
        <Router>
          <ToastContainer position="top-right" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

function RequireAuth({ children }) {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f4f6'
      }}>
        <div style={{ fontSize: '18px', color: '#4b5563' }}>Loading...</div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
}

export default App;
