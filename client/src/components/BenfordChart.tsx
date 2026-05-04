'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface BenfordData {
  actual_distribution: Record<number, number>;
  expected_distribution: Record<number, number>;
  chi_square_statistic: number;
  is_suspicious: boolean;
  interpretation: string;
}

interface BenfordChartProps {
  data: BenfordData;
}

export default function BenfordChart({ data }: BenfordChartProps) {
  const chartData = Object.keys(data.expected_distribution).map(digit => ({
    digit,
    actual: (data.actual_distribution[Number(digit)] || 0).toFixed(1),
    expected: (data.expected_distribution[Number(digit)] || 0).toFixed(1)
  }));

  return (
    <div className="space-y-6">
      <div className="h-[300px] min-h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%" debounce={100} minHeight={300}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <XAxis 
              dataKey="digit" 
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={false}
              tick={{ fill: '#4b5563', fontSize: 11, fontWeight: 700 }}
            />
            <YAxis 
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={false}
              tick={{ fill: '#4b5563', fontSize: 11, fontWeight: 700 }}
            />
            <Tooltip 
              cursor={{ fill: '#f3f4f6' }}
              contentStyle={{ borderRadius: '0px', border: '1px solid #d1d5db', boxShadow: 'none' }}
              formatter={(value: any) => [`${value}%`, '']}
            />
            <Legend 
              verticalAlign="top" 
              align="right" 
              iconType="rect" 
              wrapperStyle={{ paddingBottom: '20px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }} 
            />
            <Bar 
              name="Actual Frequency" 
              dataKey="actual" 
              fill="#1a3a5c" 
              isAnimationActive={false} 
              barSize={20}
            />
            <Bar 
              name="Benford Expected" 
              dataKey="expected" 
              fill="#9ca3af" 
              isAnimationActive={false}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-[#faf9f6] border border-[#d1d5db]">
          <div className="text-[10px] font-black text-[#4b5563] uppercase tracking-widest mb-1">Chi-Square Statistic</div>
          <div className="text-xl font-mono font-bold text-[#1a3a5c]">{data.chi_square_statistic.toFixed(4)}</div>
        </div>
        <div className={`p-4 border ${data.is_suspicious ? 'bg-[#fef2f2] border-[#8b0000]' : 'bg-[#f0f9f1] border-[#1e5631]'}`}>
          <div className="text-[10px] font-black uppercase tracking-widest mb-1">Evaluation Status</div>
          <div className={`text-lg font-black uppercase ${data.is_suspicious ? 'text-[#8b0000]' : 'text-[#1e5631]'}`}>
            {data.is_suspicious ? 'Suspicious Deviation' : 'Normal Distribution'}
          </div>
        </div>
      </div>
    </div>
  );
}
