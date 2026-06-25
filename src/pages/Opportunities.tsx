import React, { useState } from 'react';
import { Lightbulb, Target, TrendingUp, Radar, BarChart3, Plus } from 'lucide-react';
import { cn } from '../lib/utils';
import { callGemini } from '../lib/api';

export function Opportunities() {
  const [insightLoading, setInsightLoading] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);

  const mockOpportunities = [
    { name: '半小时达急件配送', category: '新产品研发', target: '高端零售/医药', expectedRev: '1.2亿/年', status: '规划中', risk: '中' },
    { name: '跨境逆向物流优化', category: '服务升级', target: '3C/服饰独立站', expectedRev: '8500万/年', status: '试点中', risk: '高' },
    { name: '同城冷链即时达', category: '场景延伸', target: '生鲜/烘焙', expectedRev: '4000万/年', status: '待评审', risk: '低' },
  ];

  const handleGenerateInsight = async () => {
    setInsightLoading(true);
    try {
      const prompt = `当前市场趋势：电商退货率上升，同城即时需求增加，高端冷链需求增加。
请作为顺丰的高级商业洞察分析师，提供 2-3 个具备落地价值的新物流产品机会，并简述理由和试点建议。`;
      const result = await callGemini(prompt);
      setInsight(result);
    } catch (err) {
      console.error(err);
      setInsight('生成洞察失败，请重试。');
    } finally {
      setInsightLoading(false);
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 shrink-0">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800">高价值商业机会池</h2>
            <button className="text-sm bg-slate-900 text-white px-3 py-1.5 rounded flex items-center hover:bg-slate-800 transition">
              <Plus className="w-4 h-4 mr-1" /> 新建商机
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">机会名称</th>
                  <th className="px-4 py-3">分类</th>
                  <th className="px-4 py-3">目标客群</th>
                  <th className="px-4 py-3">预计年收入</th>
                  <th className="px-4 py-3">状态</th>
                  <th className="px-4 py-3 rounded-tr-lg">风险评估</th>
                </tr>
              </thead>
              <tbody>
                {mockOpportunities.map((opp, idx) => (
                  <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                    <td className="px-4 py-4 font-semibold text-slate-800">{opp.name}</td>
                    <td className="px-4 py-4 text-slate-600"><span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">{opp.category}</span></td>
                    <td className="px-4 py-4 text-slate-600">{opp.target}</td>
                    <td className="px-4 py-4 text-green-600 font-medium">{opp.expectedRev}</td>
                    <td className="px-4 py-4 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <div className={cn("w-2 h-2 rounded-full", opp.status === '规划中' ? "bg-amber-500" : opp.status === '试点中' ? "bg-blue-500" : "bg-slate-400")}></div>
                        {opp.status}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{opp.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 shadow-sm text-white flex flex-col">
          <div className="flex items-center mb-4">
            <Radar className="w-5 h-5 text-blue-400 mr-2" />
            <h2 className="text-lg font-bold">AI 市场机会雷达</h2>
          </div>
          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            基于全网异动数据与竞对动作监控，AI 可自动聚类生成新的产品机会。
          </p>
          <div className="flex-1 bg-slate-800/50 rounded-lg p-4 border border-slate-700 overflow-y-auto min-h-0 custom-scrollbar text-sm text-slate-300">
             {insight ? (
                <div dangerouslySetInnerHTML={{ __html: insight.replace(/\n/g, '<br/>') }} />
             ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 opacity-60">
                   <Lightbulb className="w-8 h-8 mb-2" />
                   <p>点击下方按钮生成最新洞察</p>
                </div>
             )}
          </div>
          <button 
            onClick={handleGenerateInsight}
            disabled={insightLoading}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold py-2.5 rounded-lg text-sm transition flex justify-center items-center"
          >
            {insightLoading ? 'AI 正在扫描全网数据...' : '生成智能商业洞察'}
          </button>
        </div>
      </div>
    </div>
  );
}
