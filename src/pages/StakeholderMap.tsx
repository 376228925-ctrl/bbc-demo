import React, { useState } from 'react';
import { callGemini } from '../lib/api';
import { Loader2, Zap, RefreshCw, CheckCircle2, TrendingUp, Users } from 'lucide-react';
import { cn } from '../lib/utils';

export function StakeholderMap() {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState('');

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const prompt = `物流行业中，客户要性价比、一线要件量提成、集团要利润。当客户以竞对低价要求降价15%时，请给出一段简短的“利益协同与博弈破局”AI建议（150字以内）。重点说明如何用产品组合化解单边降价。`;
      const res = await callGemini(prompt);
      setAnalysis(res);
    } catch (err) {
      setAnalysis('分析失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
          <h2 className="text-lg font-semibold text-slate-900">生态与利益协同模型</h2>
          <button onClick={handleAnalyze} disabled={loading} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold hover:bg-indigo-100 transition flex items-center">
            {loading ? <Loader2 className="w-3 h-3 mr-1 animate-spin" /> : <Zap className="w-3 h-3 mr-1" />}
            AI 博弈均衡分析
          </button>
        </div>
        
        {analysis && (
          <div className="mb-8 p-4 bg-indigo-900 text-indigo-100 rounded-xl border border-indigo-800 shadow-inner">
             <div className="flex items-center gap-2 mb-2">
               <Zap className="w-4 h-4 text-indigo-400" />
               <h3 className="font-bold text-sm text-white">AI 协同破局方案</h3>
             </div>
             <div className="text-sm leading-relaxed opacity-90" dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br/>') }} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 relative overflow-hidden group hover:shadow-md transition">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition duration-500">
               <Users className="w-24 h-24 text-blue-500" />
            </div>
            <h3 className="text-sm font-bold text-blue-900 mb-3 flex items-center relative z-10">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
              客户诉求 (B端客户)
            </h3>
            <ul className="text-sm text-blue-800 space-y-2 relative z-10">
              <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-blue-400 mr-1.5 mt-0.5 shrink-0"/> 极致的单票履约成本</li>
              <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-blue-400 mr-1.5 mt-0.5 shrink-0"/> 稳定的交付时效体验</li>
              <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-blue-400 mr-1.5 mt-0.5 shrink-0"/> 逆向物流的高效处理</li>
            </ul>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 relative overflow-hidden group hover:shadow-md transition">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition duration-500">
               <TrendingUp className="w-24 h-24 text-emerald-500" />
            </div>
            <h3 className="text-sm font-bold text-emerald-900 mb-3 flex items-center relative z-10">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
              地区一线 (销售/网点)
            </h3>
            <ul className="text-sm text-emerald-800 space-y-2 relative z-10">
              <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1.5 mt-0.5 shrink-0"/> 完成当月单量/收入KPI</li>
              <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1.5 mt-0.5 shrink-0"/> 降低获客与签约难度</li>
              <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mr-1.5 mt-0.5 shrink-0"/> 确保个人及团队提成</li>
            </ul>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 relative overflow-hidden group hover:shadow-md transition">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition duration-500">
               <RefreshCw className="w-24 h-24 text-slate-900" />
            </div>
            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center relative z-10">
              <span className="w-2 h-2 rounded-full bg-slate-800 mr-2"></span>
              集团管理层 (产品/商分)
            </h3>
            <ul className="text-sm text-slate-700 space-y-2 relative z-10">
              <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-slate-400 mr-1.5 mt-0.5 shrink-0"/> 守住单票毛利底线</li>
              <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-slate-400 mr-1.5 mt-0.5 shrink-0"/> 维护全网价格带纪律</li>
              <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-slate-400 mr-1.5 mt-0.5 shrink-0"/> 优化产能与装载率</li>
            </ul>
          </div>
        </div>

        <h3 className="text-base font-semibold text-slate-800 mb-6">价值协同链路设计</h3>
        
        <div className="relative pt-4">
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-gradient-to-r from-blue-100 via-indigo-100 to-emerald-100 -translate-y-1/2 hidden lg:block z-0 rounded-full"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 relative z-10">
            {[
              { step: 1, title: '异常洞察', desc: '预警价格偏差', roles: '商分/系统' },
              { step: 2, title: '根因诊断', desc: '深挖客户诉求', roles: 'AI 分析引擎' },
              { step: 3, title: '策略生成', desc: '组合拳替代降价', roles: '产品/定价' },
              { step: 4, title: '仿真推演', desc: '测算利润底线', roles: '产品+商分' },
              { step: 5, title: '一线谈判', desc: '拿着方案去打仗', roles: '销售+网点' },
              { step: 6, title: '闭环复盘', desc: '检验兑现率', roles: '管理层' },
            ].map((node) => (
              <div key={node.step} className="bg-white border-2 border-slate-50 hover:border-indigo-100 rounded-xl p-5 shadow-sm hover:shadow-lg transition-all flex flex-col items-center text-center group cursor-default">
                <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-indigo-600 text-slate-400 group-hover:text-white flex items-center justify-center font-bold text-sm mb-4 transition-colors">
                  {node.step}
                </div>
                <h4 className="text-sm font-bold text-slate-800 mb-1">{node.title}</h4>
                <p className="text-xs text-indigo-600 font-medium mb-2">{node.desc}</p>
                <div className="mt-auto pt-3 border-t border-slate-100 w-full">
                   <p className="text-[10px] text-slate-400 uppercase">{node.roles}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
