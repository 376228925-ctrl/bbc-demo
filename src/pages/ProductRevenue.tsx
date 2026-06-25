import React, { useState } from 'react';
import { revenueTrendData, costWaterfallData } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, ComposedChart } from 'recharts';
import { callGemini } from '../lib/api';
import { Loader2, X } from 'lucide-react';
import { cn } from '../lib/utils';

export function ProductRevenue() {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [showModal, setShowModal] = useState(false);

  const generateActionPlan = async () => {
    setLoading(true);
    try {
      const prompt = `基于以下诊断结论：
本月整体利润率微降 0.8%，主要驱动因素非单一产品降价，而是产品结构与流向结构叠加恶化。
特快件量占比从上月 35% 下滑至 31%，同时标快件在高成本的“华南-华北”跨区流向占比激增。表面上看是折扣让利过多，根因是销售为了达成件量指标，用高价产品平替了低端长尾需求。

请作为物流产品专家，给出一份具体、可落地的经营行动策略建议（包含产品策略、定价调整和考核建议，150字以内）。`;
      const res = await callGemini(prompt);
      setSuggestion(res);
    } catch (err) {
      setSuggestion('生成失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <select className="border border-slate-300 rounded px-3 py-1.5 text-sm bg-slate-50 focus:ring-blue-500 focus:border-blue-500">
          <option>全部产品</option>
          <option>标快</option>
          <option>特快</option>
          <option>经济</option>
          <option>电退</option>
        </select>
        <select className="border border-slate-300 rounded px-3 py-1.5 text-sm bg-slate-50">
          <option>全国大区</option>
          <option>华南</option>
          <option>华东</option>
        </select>
        <select className="border border-slate-300 rounded px-3 py-1.5 text-sm bg-slate-50">
          <option>全行业</option>
          <option>3C电子</option>
          <option>生鲜医药</option>
        </select>
        <div className="flex-1"></div>
        <button className="bg-slate-900 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-slate-800 transition-colors">
          深度分析
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-base font-semibold text-slate-800 mb-4">产品收入与毛利趋势</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={revenueTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Bar yAxisId="left" dataKey="标快" stackId="a" fill="#1e3a8a" />
                <Bar yAxisId="left" dataKey="特快" stackId="a" fill="#3b82f6" />
                <Bar yAxisId="left" dataKey="经济" stackId="a" fill="#93c5fd" />
                <Line yAxisId="right" type="monotone" dataKey="毛利率" stroke="#f59e0b" strokeWidth={3} dot={{r: 4}} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost Waterfall Placeholder (Using BarChart as a proxy) */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-base font-semibold text-slate-800 mb-4">标准件成本结构拆解 (单票)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costWaterfallData} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#475569'}} width={90} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px' }} />
                <Bar dataKey="value" fill="#64748b" radius={[0, 4, 4, 0]} barSize={20}>
                  {
                    costWaterfallData.map((entry, index) => (
                      <cell key={`cell-${index}`} fill={entry.isTotal ? '#0f172a' : entry.value < 0 ? '#ef4444' : '#10b981'} />
                    ))
                  }
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Root Cause Card */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 shadow-sm">
        <h3 className="text-sm font-bold text-indigo-900 flex items-center mb-3">
          <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
          AI 根因诊断结论
        </h3>
        <p className="text-sm text-indigo-800 leading-relaxed mb-4">
          本月整体利润率微降 0.8%，主要驱动因素非单一产品降价，而是<strong className="font-semibold text-indigo-950">产品结构与流向结构叠加恶化</strong>。<br/>
          特快件量占比从上月 35% 下滑至 31%，同时标快件在高成本的“华南-华北”跨区流向占比激增。表面上看是折扣让利过多，根因是销售为了达成件量指标，用高价产品平替了低端长尾需求。
        </p>
        {suggestion && (
          <div className="mb-4 p-3 bg-white/50 rounded border border-indigo-200 text-indigo-900 text-sm">
            <strong className="block mb-1">AI 策略建议：</strong>
            <div dangerouslySetInnerHTML={{ __html: suggestion.replace(/\n/g, '<br/>') }} />
          </div>
        )}
        <div className="flex space-x-3">
          <button onClick={generateActionPlan} disabled={loading} className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded hover:bg-indigo-700 transition flex items-center disabled:opacity-50">
            {loading ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : null} 生成行动建议
          </button>
          <button onClick={() => setShowModal(true)} className="text-xs bg-white text-indigo-700 border border-indigo-200 px-3 py-1.5 rounded hover:bg-indigo-50 transition">
            查看流向明细
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">流向毛利明细查询 (Top 5 异动)</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex-1 overflow-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 font-medium">起止流向</th>
                    <th className="px-4 py-2 font-medium">产品</th>
                    <th className="px-4 py-2 font-medium">日均单量</th>
                    <th className="px-4 py-2 font-medium">平均折扣</th>
                    <th className="px-4 py-2 font-medium">毛利率</th>
                    <th className="px-4 py-2 font-medium">异动原因</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { route: '华南 -> 华北', product: '标快', vol: '12.5万', disc: '78%', margin: '-2.1%', reason: '重货占比过高' },
                    { route: '华东 -> 西南', product: '特快', vol: '8.2万', disc: '85%', margin: '15.4%', reason: '空运成本上升' },
                    { route: '华北 -> 华东', product: '经济', vol: '25.0万', disc: '65%', margin: '5.2%', reason: '装载率下降' },
                    { route: '华中 -> 华南', product: '标快', vol: '15.1万', disc: '75%', margin: '-0.5%', reason: '竞对价格战' },
                    { route: '西南 -> 华南', product: '快运', vol: '1.2万', disc: '62%', margin: '8.8%', reason: '干线路由调整' },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-800">{row.route}</td>
                      <td className="px-4 py-3">{row.product}</td>
                      <td className="px-4 py-3">{row.vol}</td>
                      <td className="px-4 py-3">{row.disc}</td>
                      <td className={cn("px-4 py-3", row.margin.startsWith('-') ? "text-red-500 font-medium" : "text-emerald-500")}>{row.margin}</td>
                      <td className="px-4 py-3 text-slate-500">{row.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-100 flex justify-end">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-slate-900 text-white rounded text-sm hover:bg-slate-800">
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
