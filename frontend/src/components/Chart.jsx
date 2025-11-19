import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#00C49F", "#FF8042"];

export default function Chart({ transactions }) {
  const income = transactions.filter(t => t.type === "income").reduce((a, t) => a + t.amount, 0);
  const expense = transactions.filter(t => t.type === "expense").reduce((a, t) => a + t.amount, 0);

  const data = [
    { name: "Income", value: income },
    { name: "Expense", value: expense },
  ];

  return (
    <PieChart width={300} height={300}>
      <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
        {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
