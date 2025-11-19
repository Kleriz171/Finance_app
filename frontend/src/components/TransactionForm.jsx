import { useState } from "react";
import api from "../api/api";
import { toast } from "react-toastify";

export default function TransactionForm({ onSuccess }) {
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    if (!category || !amount) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      await api.post("/transactions", { type, category, amount: parseFloat(amount) });
      toast.success("Transaction added!");
      setCategory(""); setAmount("");
      onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add transaction");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      backgroundColor: 'white',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <select value={type} onChange={e => setType(e.target.value)} style={{
          border: '1px solid #d1d5db',
          padding: '8px',
          borderRadius: '4px',
          flex: 1,
          fontFamily: 'inherit',
          fontSize: '14px'
        }}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input 
          type="text" 
          placeholder="Category" 
          value={category} 
          onChange={e => setCategory(e.target.value)} 
          style={{
            border: '1px solid #d1d5db',
            padding: '8px',
            borderRadius: '4px',
            flex: 1,
            fontFamily: 'inherit',
            fontSize: '14px'
          }} 
          required 
        />
        <input 
          type="number" 
          placeholder="Amount" 
          value={amount} 
          onChange={e => setAmount(e.target.value)} 
          style={{
            border: '1px solid #d1d5db',
            padding: '8px',
            borderRadius: '4px',
            flex: 1,
            fontFamily: 'inherit',
            fontSize: '14px'
          }} 
          required 
        />
        <button 
          type="submit" 
          style={{
            backgroundColor: '#1da1f2',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '500',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={e => e.target.style.backgroundColor = '#1a91da'}
          onMouseOut={e => e.target.style.backgroundColor = '#1da1f2'}
        >
          Add
        </button>
      </div>
    </form>
  );
}
