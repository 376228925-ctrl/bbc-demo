import React, { useState } from 'react';
import { customerSegments } from '../data/mockData';
import { cn } from '../lib/utils';
import { User, Activity, AlertTriangle, CheckCircle, Clock, Search, MapPin, Package, Shield, Scale, Play, Loader2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { callGemini } from '../lib/api';

export function CustomerScenario() {
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState('');

  const handleGenerateAnalysis = async () => {
    setLoading(true);
    try {
      const prompt = `表象：客户以竞对价格为由，要求标快产品整体降价 15%。
深层根因诊断：客户近期主推 1.5-3kg 的中端配件，对运费敏感度上升。但由于其退换货率上升至 2.5%，且竞对逆向物流体验差，客户不敢真正全量切走订单，只是在使用“降量”策略施压。

请给出一段攻防策略建议（100字以内）。`;
      const res = await callGemini(prompt);
      setAiAnalysis(res);
    } catch (err) {
      setAiAnalysis('AI 分析失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Overview */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="搜索客户名称、行业或区域..." 
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            defaultValue="某头部 3C 品牌 (客户A)"
          />
        </div>
        <div className="flex space-x-3 text-sm">
          <div className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-md border border-blue-100 font-medium">战略 KA 客户</div>
          <div className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-100 font-medium">高价值高流失风险</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Profile */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-3">客户业务全景画像</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-xs text-slate-500 mb-1 flex items-center"><User className="w-3 h-3 mr-1"/> 客户行业</p>
                <p className="text-sm font-semibold text-slate-800">3C 电子及配件</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1 flex items-center"><MapPin className="w-3 h-3 mr-1"/> 核心发货仓</p>
                <p className="text-sm font-semibold text-slate-800">华南 (东莞、深圳)</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1 flex items-center"><Activity className="w-3 h-3 mr-1"/> 日均发件量</p>
                <p className="text-sm font-semibold text-slate-800">12,500 票</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1 flex items-center"><Scale className="w-3 h-3 mr-1"/> 核心重量段</p>
                <p className="text-sm font-semibold text-slate-800">1.5kg - 3.0kg</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1 flex items-center"><Clock className="w-3 h-3 mr-1"/> 核心诉求时效</p>
                <p className="text-sm font-semibold text-slate-800">48H (占比 75%)</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1 flex items-center"><Shield className="w-3 h-3 mr-1"/> 附加服务诉求</p>
                <p className="text-sm font-semibold text-slate-800">全量保价、高端电退</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1 flex items-center"><Package className="w-3 h-3 mr-1"/> 当前竞对压力</p>
                <p className="text-sm font-semibold text-red-600">极兔、中通压价竞标</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1 flex items-center"><AlertTriangle className="w-3 h-3 mr-1"/> 流失风险预警</p>
                <p className="text-sm font-semibold text-red-600">High (近期降量 15%)</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h4 className="text-sm font-semibold text-slate-800 mb-4">历史产品组合表现</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600">SF 特快 (占比 45%)</span>
                  <span className="font-medium text-slate-800">兑现率 92%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '45%'}}></div>
                </div>
                
                <div className="flex justify-between items-center text-sm pt-2">
                  <span className="text-slate-600">SF 标快 (占比 50%)</span>
                  <span className="font-medium text-red-600">兑现率 62% ↓</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{width: '50%'}}></div>
                </div>

                <div className="flex justify-between items-center text-sm pt-2">
                  <span className="text-slate-600">其他 (占比 5%)</span>
                  <span className="font-medium text-slate-800">兑现率 85%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-slate-400 h-2 rounded-full" style={{width: '5%'}}></div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-sm text-slate-300 flex flex-col">
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                <AlertTriangle className="w-4 h-4 text-amber-500 mr-2" />
                AI 诉求深层识别
              </h4>
              <p className="text-xs leading-relaxed mb-3">
                <strong className="text-white">表象：</strong> 客户以竞对价格为由，要求标快产品整体降价 15%。
              </p>
              <p className="text-xs leading-relaxed mb-3">
                <strong className="text-white">深层根因诊断：</strong> 客户近期主推 1.5-3kg 的中端配件，对运费敏感度上升。但由于其退换货率上升至 2.5%，且竞对逆向物流体验差，客户<strong className="text-amber-400">并不敢真正全量切走订单</strong>，只是在使用“降量”策略施压。
              </p>
              <div className="flex-1">
                {aiAnalysis ? (
                  <p className="text-xs leading-relaxed text-blue-100 bg-blue-900/30 p-3 rounded border border-blue-900">
                    <strong className="text-blue-400 block mb-1">攻防策略建议：</strong> 
                    {aiAnalysis}
                  </p>
                ) : (
                  <div className="h-full flex items-center justify-center border border-dashed border-slate-700 rounded-lg bg-slate-800/50 p-4 opacity-70">
                    <p className="text-xs text-slate-400 text-center">点击下方按钮生成最新攻防策略建议</p>
                  </div>
                )}
              </div>
              <button 
                onClick={handleGenerateAnalysis}
                disabled={loading}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold py-2 rounded-lg text-xs transition flex justify-center items-center"
              >
                {loading ? <Loader2 className="w-3 h-3 mr-2 animate-spin" /> : <Play className="w-3 h-3 mr-2" />} 生成攻防策略建议
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Macro Segments (Mocked Pie) */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col">
          <h3 className="text-base font-semibold text-slate-800 mb-4">大区客户价值分层结构</h3>
          <div className="flex-1 h-64 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={customerSegments}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px', color: '#475569' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-xs text-blue-800 font-medium">当前客户归属：高价值易流失阵营。此类客户占大区收入 15%，是本季度核心保卫战目标。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
