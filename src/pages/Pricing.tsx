import React, { useState } from 'react';
import { Search, Calculator, AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react';
import { cn } from '../lib/utils';
import { callGemini } from '../lib/api';

export function Pricing() {
  const [customerName, setCustomerName] = useState('某头部 3C 品牌 (客户A)');
  const [scenario, setScenario] = useState('客户近期主推 1.5-3kg 的中端配件，要求降低运费，竞对极兔、中通压价竞标。');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

  const handleGeneratePricing = async () => {
    setAiLoading(true);
    try {
      const prompt = `客户名称：${customerName}
客户场景/诉求：${scenario}

请作为顺丰的高级定价分析师，给出一个科学的报价与折扣治理建议。
要求包含：
1. 建议报价区间
2. 折扣效率与风险评估
3. 替代/组合方案推荐
以清晰的 Markdown 格式输出。`;
      const result = await callGemini(prompt);
      setAiSuggestion(result);
    } catch (err) {
      console.error(err);
      setAiSuggestion('生成失败，请稍后重试。');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto h-full overflow-y-auto pb-8">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-4">科学报价与折扣治理中心</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">客户名称</label>
              <input 
                type="text" 
                value={customerName}
                onChange={e => setCustomerName(e.target.value)}
                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-slate-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">客户场景描述</label>
              <textarea 
                rows={4}
                value={scenario}
                onChange={e => setScenario(e.target.value)}
                className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-slate-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <button 
              onClick={handleGeneratePricing}
              disabled={aiLoading}
              className={cn(
                "w-full py-2.5 rounded-lg text-sm font-bold text-white shadow transition-all flex items-center justify-center",
                aiLoading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              )}
            >
              {aiLoading ? (
                <span className="flex items-center"><Calculator className="w-4 h-4 mr-2 animate-spin" /> AI 分析中...</span>
              ) : (
                <span className="flex items-center"><Calculator className="w-4 h-4 mr-2" /> 智能生成科学报价建议</span>
              )}
            </button>
          </div>
          
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 min-h-[300px] flex flex-col max-h-[500px]">
            {aiSuggestion ? (
              <div className="prose prose-sm prose-slate max-w-none text-slate-700 overflow-y-auto flex-1 custom-scrollbar pr-2" dangerouslySetInnerHTML={{ __html: aiSuggestion.replace(/\n/g, '<br/>') }} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 flex-1">
                <Calculator className="w-12 h-12 mb-3 text-slate-300" />
                <p>填写左侧客户场景信息，点击生成报价建议</p>
              </div>
            )}
            
            {aiSuggestion && (
               <div className="mt-4 pt-4 border-t border-slate-200 flex justify-end shrink-0">
                  <button 
                     onClick={() => alert('审批流已发起，已流转至地区总经理与财务审核节点。')}
                     className="px-4 py-2 bg-slate-900 text-white rounded text-sm font-medium hover:bg-slate-800 transition"
                  >
                     生成审批申请
                  </button>
               </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-red-200 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 p-2 opacity-10"><ShieldAlert className="w-16 h-16 text-red-500"/></div>
           <h3 className="text-sm font-bold text-red-800 mb-2">价格底线预警</h3>
           <p className="text-2xl font-bold text-red-600 mb-1">¥ 12.5 <span className="text-sm font-normal text-slate-500">/ 票</span></p>
           <p className="text-xs text-slate-600">低于此价格将产生账面亏损，目前竞对报价约为 11.8</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-blue-200 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 p-2 opacity-10"><CheckCircle className="w-16 h-16 text-blue-500"/></div>
           <h3 className="text-sm font-bold text-blue-800 mb-2">同类客户价格中枢</h3>
           <p className="text-2xl font-bold text-blue-600 mb-1">¥ 14.2 - 15.8</p>
           <p className="text-xs text-slate-600">华南区 3C 行业月发件量 1万+ 客户均价</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-amber-200 shadow-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 p-2 opacity-10"><AlertTriangle className="w-16 h-16 text-amber-500"/></div>
           <h3 className="text-sm font-bold text-amber-800 mb-2">折扣效率评估</h3>
           <p className="text-2xl font-bold text-amber-600 mb-1">低效危险</p>
           <p className="text-xs text-slate-600">直接降价 15% 预计导致毛利下降 22%，件量增量无法弥补</p>
        </div>
      </div>
    </div>
  );
}
