export default function TransactionCard({ transaction }) {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <p style={{ fontWeight: 'bold' }}>{transaction.category}</p>
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>{new Date(transaction.date).toLocaleDateString()}</p>
      </div>
      <p style={{
        color: transaction.type === "income" ? '#22c55e' : '#ef4444',
        fontWeight: 'bold',
        fontSize: '16px'
      }}>
        {transaction.type === "income" ? "+" : "-"}${transaction.amount}
      </p>
    </div>
  );
}
