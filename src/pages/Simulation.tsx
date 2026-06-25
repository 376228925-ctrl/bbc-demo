import React, { useState } from 'react';
import { simulatedScenarios as defaultScenarios } from '../data/mockData';
import { cn } from '../lib/utils';
import { CheckCircle2, AlertCircle, Play, SlidersHorizontal, Loader2 } from 'lucide-react';
import { callGemini } from '../lib/api';

export function Simulation() {
  const [selectedProblem, setSelectedProblem] = useState('头部3C客户(客户A)强硬要求标快深折扣降价 15%');
  const [simulatedScenarios, setSimulatedScenarios] = useState(defaultScenarios);
  const [loading, setLoading] = useState(false);
  const [aiReasoning, setAiReasoning] = useState(`历史数据显示，直接拼底价（方案A）极易引发竞对二次跟进，最终份额不变但行业利润被摧毁。
方案B（阶梯折扣）能有效绑定客户旺季产能，锁定件量基盘，保障资源利用率，是目前风险收益比最优的防守策略。
同时建议在长尾低值订单上启动方案C（经济件平替）作为补充。`);

  const runSimulation = async () => {
    setLoading(true);
    try {
      const prompt = `请作为顺丰的AI推演引擎，针对以下问题进行策略推演：
问题：${selectedProblem}

要求返回 JSON 格式的数组，每个对象包含以下字段（不需要 markdown 标记）：
- id: 方案ID
- name: 方案名称
- description: 方案描述
- revenueChange: 预计收入影响 (如 "+12%")
- marginChange: 预计毛利影响 (如 "-4.5%")
- churnRisk: 客户流失风险 (Low, Medium, High)
- difficulty: 落地难度 (Low, Medium, High)
- isRecommended: 是否推荐 (布尔值)

并在最后附加一段分析原因，放在一个独立的 JSON 字段 "reasoning" 中。
因此总返回格式应为：
{
  "scenarios": [...],
  "reasoning": "..."
}`;
      const response = await callGemini(prompt);
      // Clean up markdown block if present
      const cleaned = response.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      if (parsed.scenarios) {
        setSimulatedScenarios(parsed.scenarios);
      }
      if (parsed.reasoning) {
        setAiReasoning(parsed.reasoning);
      }
    } catch (err) {
      console.error(err);
      alert('AI 推演失败，请检查 API 配置');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Configuration Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center justify-between shrink-0">
        <div className="flex-1 w-full">
          <label className="block text-xs font-medium text-slate-500 mb-1">当前待解决经营命题</label>
          <input 
            type="text"
            value={selectedProblem}
            onChange={(e) => setSelectedProblem(e.target.value)}
            className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm bg-slate-50 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex space-x-3 shrink-0 mt-4 md:mt-0">
          <button className="flex items-center text-sm bg-slate-100 text-slate-700 px-4 py-2 rounded-md hover:bg-slate-200 transition-colors border border-slate-200">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            调节参数
          </button>
          <button 
            onClick={runSimulation}
            disabled={loading}
            className="flex items-center text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors shadow-sm disabled:bg-blue-400"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
            运行 AI 仿真推演
          </button>
        </div>
      </div>

      {/* Simulation Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-y-auto">
        {simulatedScenarios.map((scenario) => (
          <div key={scenario.id} className={cn(
            "rounded-xl border p-5 flex flex-col relative overflow-hidden transition-all",
            scenario.isRecommended ? "bg-blue-50/50 border-blue-200 shadow-md ring-1 ring-blue-500/20" : "bg-white border-slate-200 shadow-sm opacity-90 hover:opacity-100"
          )}>
            {scenario.isRecommended && (
              <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                AI 推荐
              </div>
            )}
            
            <h4 className="text-sm font-bold text-slate-800 mb-1">{scenario.name}</h4>
            <p className="text-xs text-slate-500 h-8 line-clamp-2 mb-4">{scenario.description}</p>
            
            <div className="space-y-3 flex-1">
              <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                <span className="text-slate-500">预计收入影响</span>
                <span className={cn("font-semibold", scenario.revenueChange?.startsWith('+') ? "text-emerald-600" : "text-slate-700")}>
                  {scenario.revenueChange}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                <span className="text-slate-500">预计毛利影响</span>
                <span className={cn("font-semibold", scenario.marginChange?.startsWith('-') ? "text-red-600" : "text-emerald-600")}>
                  {scenario.marginChange}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                <span className="text-slate-500">客户流失风险</span>
                <span className="font-medium text-slate-700">{scenario.churnRisk}</span>
              </div>
              <div className="flex justify-between items-center text-sm pb-2">
                <span className="text-slate-500">落地执行难度</span>
                <span className="font-medium text-slate-700">{scenario.difficulty}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <button className={cn(
                "w-full py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center",
                scenario.isRecommended 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              )}>
                {scenario.isRecommended ? (
                  <><CheckCircle2 className="w-4 h-4 mr-1" /> 采纳此策略</>
                ) : (
                  '选择此策略'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Reasoning */}
      <div className="bg-slate-900 rounded-xl p-6 text-slate-300 shadow-lg shrink-0 mt-auto">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 text-blue-400 mr-3 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-white mb-2">AI 深度推演依据</h3>
            <p className="text-sm leading-relaxed mb-4 text-slate-300 whitespace-pre-wrap">
              {aiReasoning}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400 border border-slate-700">置信度: 92%</span>
              <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400 border border-slate-700">基于近 3 个月 120 份同类竞标复盘</span>
              <span className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-400 border border-slate-700">模型: Gemini 2.5 Flash</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
