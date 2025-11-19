import { useEffect, useState, useContext } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TransactionCard from "../components/TransactionCard";
import TransactionForm from "../components/TransactionForm";
import Chart from "../components/Chart";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (user) {
      api.get("/transactions")
        .then(res => setTransactions(res.data))
        .catch(err => console.error("Failed to fetch transactions", err));
    }
  }, [user]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#f3f4f6' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Dashboard</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <TransactionForm onSuccess={() => api.get("/transactions").then(res => setTransactions(res.data))} />
              {transactions.map(t => <TransactionCard key={t._id} transaction={t} />)}
            </div>
            <div>
              <Chart transactions={transactions} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
