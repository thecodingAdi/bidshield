'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface BenfordData {
  actual_distribution: Record<number, number>;
  expected_distribution: Record<number, number>;
  chi_square_statistic: number;
  is_suspicious: boolean;
  interpretation: string;
}

export default function BenfordChart({ data }: { data: BenfordData }) {
  const chartData = Array.from({ length: 9 }, (_, i) => {
    const digit = i + 1;
    return {
      digit: digit.toString(),
      actual: data.actual_distribution[digit] || 0,
      expected: data.expected_distribution[digit] || 0,
    };
  });

  return (
    <div className="space-y-6">
      <div className="h-[300px] min-h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="digit" 
              label={{ value: 'First Digit', position: 'insideBottom', offset: -10, fontSize: 12, fill: '#6b7280' }} 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis 
              label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft', fontSize: 12, fill: '#6b7280' }} 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <Tooltip 
              cursor={{ fill: '#f9fafb' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value: any) => [`${value}%`, '']}
            />
            <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
            <Bar 
              name="Actual Distribution" 
              dataKey="actual" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]} 
              barSize={24}
            />
            <Bar 
              name="Expected (Benford's Law)" 
              dataKey="expected" 
              fill="#9ca3af" 
              fillOpacity={0.6} 
              radius={[4, 4, 0, 0]} 
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Statistical Signal</span>
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider ${
              data.is_suspicious 
                ? 'bg-rose-100 text-rose-700 border border-rose-200' 
                : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
            }`}>
              {data.is_suspicious ? 'SUSPICIOUS' : 'NORMAL'}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-gray-400 uppercase block">Chi-Square Statistic</span>
            <code className="text-sm font-mono font-bold text-gray-700">{data.chi_square_statistic}</code>
          </div>
        </div>
        
        <div className="pt-2 border-t border-gray-200/60">
          <p className="text-sm text-gray-700 leading-relaxed font-medium">
            {data.interpretation}
          </p>
        </div>
      </div>
    </div>
  );
}
