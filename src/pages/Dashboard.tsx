import React, { useState } from 'react';
import { mockMetrics, mockStrategies } from '../data/mockData';
import { cn } from '../lib/utils';
import { Play, Loader2, Sparkles } from 'lucide-react';
import { Role } from '../types';
import { callGemini } from '../lib/api';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ZAxis } from 'recharts';

const matrixData = [
  { name: '标快-华南', growth: 12, margin: 15, rev: 800, fill: '#3b82f6' },
  { name: '特快-华东', growth: 25, margin: 22, rev: 600, fill: '#10b981' },
  { name: '经济-全网', growth: 5, margin: 5, rev: 1200, fill: '#ef4444' },
  { name: '快运-华北', growth: -2, margin: 8, rev: 400, fill: '#f59e0b' },
  { name: '冷运-华南', growth: 18, margin: 18, rev: 300, fill: '#3b82f6' },
  { name: '同城-华东', growth: 30, margin: 12, rev: 250, fill: '#8b5cf6' },
];

export function Dashboard({ role, setActiveTab }: { role: Role, setActiveTab: (tab: string) => void }) {
  const topMetrics = mockMetrics.slice(0, 4);
  const [loadingAi, setLoadingAi] = useState(false);
  const [aiReport, setAiReport] = useState<string>(`异常预警：华南地区3C行业客户标快件量稳定，但折扣后毛利下降14%。核心原因是跨省长距离流向占比显著提升，当前折扣方案未覆盖激增的操作成本。
根因分析：竞对压价信号导致一线防御性给折过深，客户结构向低重、远距离流向倾斜。
行动建议：停止直接深折扣，实施“阶梯折扣+件量约束”，向客户推荐“特快+经济件”组合以平衡成本。`);

  const handleGenerateReport = async () => {
    setLoadingAi(true);
    try {
      const prompt = `结合物流行业的背景，请根据当前的系统数据，生成一段直击问题的AI深度经营分析总结。
要求：直击问题核心，不讲废话，给出明确的异常预警、根因分析和高管视角的行动建议（不超过150字）。`;
      const res = await callGemini(prompt);
      setAiReport(res);
    } catch (error) {
      console.error(error);
      alert('AI 报告生成失败');
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="h-full flex flex-col gap-4 overflow-y-auto custom-scrollbar pb-6 pr-2">
      
      {/* AI Intelligence Agent Card (Top) */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 text-white flex flex-col shrink-0 relative overflow-hidden shadow-lg">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <Sparkles className="w-48 h-48 text-blue-500 transform translate-x-8 -translate-y-8" />
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 relative z-10 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center shadow-lg shadow-blue-900/50 shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-wide">AI 深度经营总结</h3>
              <p className="text-[10px] text-slate-400">基于全网 12.4亿 条流向数据的实时洞察</p>
            </div>
          </div>
          <button 
            onClick={handleGenerateReport}
            disabled={loadingAi}
            className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 rounded-lg text-xs font-bold transition-all border border-blue-500/30 flex items-center justify-center shrink-0 disabled:opacity-50"
          >
            {loadingAi ? <Loader2 className="w-3 h-3 mr-2 animate-spin" /> : <Play className="w-3 h-3 mr-2" />} 重新生成洞察
          </button>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 relative z-10">
          {aiReport.split('\n').map((line, idx) => {
            if (!line.trim()) return null;
            const isWarning = line.includes('异常') || line.includes('预警') || line.includes('下降');
            const isAction = line.includes('建议') || line.includes('行动');
            return (
              <div key={idx} className="flex gap-3 mb-2 last:mb-0 items-start">
                <div className="shrink-0 mt-0.5">
                  {isWarning ? <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></div> :
                   isAction ? <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div> :
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>}
                </div>
                <p className="text-sm leading-relaxed text-slate-300">
                  <strong className={cn("font-semibold mr-1", isWarning ? "text-orange-400" : isAction ? "text-emerald-400" : "text-blue-400")}>
                    {line.split('：')[0]}：
                  </strong>
                  {line.split('：').slice(1).join('：')}
                  {isAction && (
                    <button 
                      onClick={() => setActiveTab('simulation')}
                      className="ml-3 px-2 py-0.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs transition-colors inline-flex items-center"
                    >
                      一键仿真推演 <Play className="w-3 h-3 ml-1" />
                    </button>
                  )}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
        {topMetrics.map((metric) => (
          <div key={metric.id} className="bg-white rounded-lg border border-slate-200 p-4 flex flex-col justify-between h-32 shadow-sm">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">{metric.title}</p>
              <h2 className={cn(
                "text-2xl font-bold",
                metric.status === 'critical' ? 'text-red-600' : 'text-slate-900'
              )}>
                {metric.value} <span className="text-sm font-medium text-slate-500 ml-1">{metric.unit}</span>
              </h2>
            </div>
            <div className="flex justify-between items-end mt-2">
              <p className={cn(
                "text-[10px] font-bold",
                metric.trend === 'up' && metric.status === 'good' ? "text-emerald-600" : "",
                metric.trend === 'up' && metric.status !== 'good' ? "text-amber-500" : "",
                metric.trend === 'down' && metric.status === 'warning' ? "text-amber-500" : "",
                metric.trend === 'down' && metric.status === 'critical' ? "text-red-500" : ""
              )}>
                {metric.trend === 'up' ? '+' : ''}{metric.trendValue} {metric.trend === 'up' ? 'YoY' : 'Risk'}
              </p>
              <div className="flex gap-1">
                {metric.title === '平均折扣率' ? (
                  <>
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-red-300"></span>
                    <span className="w-3 h-3 rounded-full bg-slate-200"></span>
                  </>
                ) : (
                  <div className="h-4 w-16 bg-blue-50 rounded flex items-end gap-0.5 px-0.5">
                    <div className="w-full bg-blue-200 h-1/3"></div>
                    <div className="w-full bg-blue-300 h-2/3"></div>
                    <div className="w-full bg-blue-400 h-1/2"></div>
                    <div className="w-full bg-blue-600 h-full"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white rounded-lg border border-slate-200 flex flex-col min-h-[400px] shadow-sm shrink-0">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
          <h3 className="text-sm font-bold text-slate-800">产品收益健康地图 (交互式)</h3>
          <div className="flex gap-2 text-[10px] font-bold">
            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded cursor-pointer">所有产品</span>
            <span className="px-2 py-1 text-slate-500 hover:bg-slate-50 rounded cursor-pointer transition">按地区</span>
            <span className="px-2 py-1 text-slate-500 hover:bg-slate-50 rounded cursor-pointer transition">按客户群</span>
          </div>
        </div>
        <div className="flex-1 p-4 flex flex-col lg:flex-row gap-6">
          {/* Matrix Chart */}
          <div className="flex-1 bg-slate-50/50 rounded-lg border border-slate-100 p-4 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis type="number" dataKey="margin" name="毛利率" unit="%" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} />
                <YAxis type="number" dataKey="growth" name="增速" unit="%" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} />
                <ZAxis type="number" dataKey="rev" range={[100, 1500]} name="收入规模" />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }} 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                  formatter={(value: any, name: string, props: any) => {
                    if (name === 'rev') return [value + '万', '收入规模'];
                    if (name === 'margin') return [value + '%', '毛利率'];
                    if (name === 'growth') return [value + '%', '增速'];
                    return [value, name];
                  }}
                  labelFormatter={() => ''}
                />
                <Scatter 
                  name="产品流向" 
                  data={matrixData} 
                  onClick={(data) => {
                     if(data && data.name) {
                        alert(`已下钻进入 ${data.name} 详情视角`);
                     }
                  }}
                  className="cursor-pointer"
                >
                  {matrixData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} className="hover:opacity-80 transition-opacity" />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Mini Charts for Products */}
          <div className="w-full lg:w-64 flex flex-col gap-3 shrink-0">
            <h4 className="text-[10px] font-bold uppercase text-slate-400 mb-1">重点产品监控</h4>
            <div className="border border-slate-100 rounded p-3 bg-white hover:border-blue-300 transition-colors cursor-pointer">
              <p className="text-[10px] text-slate-500">标快 (Standard)</p>
              <div className="h-1.5 w-full bg-slate-100 rounded-full my-2"><div className="w-3/4 h-full bg-blue-500 rounded-full"></div></div>
              <p className="text-[10px] font-bold text-slate-700">健康度: 良好 | 收入: 800M</p>
            </div>
            <div className="border border-slate-100 rounded p-3 bg-white hover:border-emerald-300 transition-colors cursor-pointer">
              <p className="text-[10px] text-slate-500">特快 (Express)</p>
              <div className="h-1.5 w-full bg-slate-100 rounded-full my-2"><div className="w-[90%] h-full bg-emerald-500 rounded-full"></div></div>
              <p className="text-[10px] font-bold text-slate-700">健康度: 优秀 | 收入: 600M</p>
            </div>
            <div className="border border-red-100 bg-red-50/50 rounded p-3 hover:border-red-300 transition-colors cursor-pointer">
              <p className="text-[10px] text-red-500 font-bold">经济件 (Eco) - 风险预警</p>
              <div className="h-1.5 w-full bg-slate-100 rounded-full my-2"><div className="w-1/3 h-full bg-red-500 rounded-full"></div></div>
              <p className="text-[10px] font-bold text-red-700">健康度: 风险 | 增速大幅下滑</p>
            </div>
            <div className="border border-slate-100 rounded p-3 bg-white hover:border-amber-300 transition-colors cursor-pointer">
              <p className="text-[10px] text-slate-500">快运 (Freight)</p>
              <div className="h-1.5 w-full bg-slate-100 rounded-full my-2"><div className="w-1/2 h-full bg-amber-500 rounded-full"></div></div>
              <p className="text-[10px] font-bold text-slate-700">健康度: 预警 | 毛利受压</p>
            </div>
          </div>
        </div>
      </div>

      {/* Strategy Ledger / Execution Status (Bottom Row) */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 flex flex-col md:flex-row md:items-center gap-4 shrink-0 shadow-sm">
        <div className="w-48 md:border-r border-slate-100 pr-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase">本月策略账本 (Ledger)</p>
          <h4 className="text-sm font-bold text-slate-800 mt-1">预计兑现率: <span className="text-blue-600">82%</span></h4>
        </div>
        <div className="flex-1 flex flex-wrap lg:flex-nowrap items-center gap-x-8 gap-y-3 overflow-hidden">
          {mockStrategies.slice(0, 3).map((s, idx) => (
            <div key={s.id} className="flex items-center gap-2 min-w-0">
              <div className={cn(
                "w-2 h-2 rounded-full shrink-0",
                s.status === 'completed' ? "bg-emerald-500" :
                s.status === 'executing' ? "bg-blue-500" : "bg-orange-500"
              )}></div>
              <div className="text-xs truncate">
                <p className="font-bold text-slate-700 truncate" title={s.name}>{s.name}</p>
                <p className="text-slate-400 text-[10px]">
                  {s.status === 'executing' ? '执行中' : s.status === 'completed' ? '已兑现' : '偏差提醒'} | 
                  {s.status === 'executing' ? ' 预计 ' : ' 实际 '}¥{(s.expectedRevenue/10).toFixed(1)}万
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="ml-auto shrink-0 pl-2 mt-2 md:mt-0">
          <button onClick={() => setActiveTab('execution')} className="px-3 py-1.5 border border-slate-200 rounded text-[10px] font-bold hover:bg-slate-50 text-slate-600 transition-colors">
            进入策略闭环
          </button>
        </div>
      </div>
    </div>
  );
}
