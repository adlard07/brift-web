import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const OverallSpendingGraph = ({ dummyData }) => {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dummyData}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FE8F34" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#FE8F34" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
          <XAxis
            dataKey="month"
            stroke="#9CA3AF"
            tick={{ fontSize: 12, fill: "#9CA3AF" }}
            axisLine={{ stroke: "#4B5563" }}
          />
          <YAxis
            stroke="#9CA3AF"
            tick={{ fontSize: 12, fill: "#9CA3AF" }}
            axisLine={{ stroke: "#4B5563" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(24, 24, 27, 0.95)",
              borderColor: "#52525b",
              color: "#fff",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.5)",
            }}
            labelStyle={{ color: "#FE8F34", fontWeight: "bold" }}
          />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#FE8F34"
            strokeWidth={0.7}
            dot={{
              r: 3,
              fill: "#FE8F34",
              strokeWidth: 2,
              stroke: "#1f2937",
            }}
            activeDot={{
              r: 4,
              fill: "#FE8F34",
              strokeWidth: 2,
              stroke: "#1f2937",
            }}
            filter="drop-shadow(0 0 6px rgba(254, 143, 52, 0.4))"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default OverallSpendingGraph;
