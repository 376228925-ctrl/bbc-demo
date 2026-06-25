import React, { useState } from 'react';
import { Activity, CheckCircle2, AlertTriangle, ChevronRight, RefreshCw, X, FileText, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { mockStrategies } from '../data/mockData';

export function Execution() {
  const [selectedStrategy, setSelectedStrategy] = useState<any>(null);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-6">策略执行与价值闭环</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center">
            <p className="text-xs text-slate-500 uppercase font-bold mb-1">执行中策略数</p>
            <p className="text-2xl font-bold text-blue-600">12</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center">
            <p className="text-xs text-slate-500 uppercase font-bold mb-1">预计总收益</p>
            <p className="text-2xl font-bold text-slate-800">¥ 25.4M</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center">
            <p className="text-xs text-slate-500 uppercase font-bold mb-1">实际兑现收益</p>
            <p className="text-2xl font-bold text-emerald-600">¥ 18.2M</p>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-center">
            <p className="text-xs text-slate-500 uppercase font-bold mb-1">收益兑现率</p>
            <p className="text-2xl font-bold text-slate-800">71.6%</p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">核心策略账本 (Value Ledger)</h3>
          {mockStrategies.map(strategy => (
            <div key={strategy.id} className="flex flex-col md:flex-row items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                  strategy.status === 'completed' ? "bg-emerald-100 text-emerald-600" :
                  strategy.status === 'executing' ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"
                )}>
                  {strategy.status === 'completed' ? <CheckCircle2 className="w-5 h-5"/> :
                   strategy.status === 'executing' ? <Activity className="w-5 h-5"/> : <AlertTriangle className="w-5 h-5"/>}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{strategy.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">责任部门: {strategy.department} | 目标客户: {strategy.targetClient}</p>
                </div>
              </div>
              <div className="flex items-center gap-8 mt-4 md:mt-0 px-4">
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">预计收益</p>
                  <p className="text-sm font-medium text-slate-700">¥ {strategy.expectedRevenue.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">实际收益</p>
                  <p className={cn(
                    "text-sm font-bold",
                    strategy.actualRevenue >= strategy.expectedRevenue ? "text-emerald-600" : "text-orange-500"
                  )}>¥ {strategy.actualRevenue.toLocaleString()}</p>
                </div>
                <div className="w-24">
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                     <div 
                       className={cn("h-full", strategy.status === 'deviated' ? "bg-orange-500" : "bg-emerald-500")}
                       style={{width: `${Math.min(100, (strategy.actualRevenue / strategy.expectedRevenue) * 100)}%`}}
                     ></div>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 text-right">
                    {Math.round((strategy.actualRevenue / strategy.expectedRevenue) * 100)}%
                  </p>
                </div>
              </div>
              <div className="pl-4 md:border-l border-slate-200 shrink-0 mt-4 md:mt-0 flex flex-col justify-center gap-2">
                 <button onClick={() => setSelectedStrategy(strategy)} className="text-xs text-blue-600 font-medium hover:text-blue-800 flex items-center">
                    复盘报告 <ChevronRight className="w-3 h-3 ml-1"/>
                 </button>
                 {strategy.status === 'deviated' && (
                    <span className="text-[10px] bg-orange-50 text-orange-700 px-2 py-0.5 rounded border border-orange-100 max-w-[150px] truncate" title={strategy.deviationReason}>
                       偏差: {strategy.deviationReason}
                    </span>
                 )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedStrategy && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-slate-500" />
                <h3 className="font-bold text-slate-800">AI 智能复盘报告: {selectedStrategy.name}</h3>
              </div>
              <button onClick={() => setSelectedStrategy(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 flex-1 overflow-auto space-y-6">
              
              <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
                <div>
                  <p className="text-xs text-slate-500 uppercase">目标达成</p>
                  <div className="flex items-end gap-2 mt-1">
                    <span className="text-2xl font-bold text-slate-800">{Math.round((selectedStrategy.actualRevenue / selectedStrategy.expectedRevenue) * 100)}%</span>
                    {selectedStrategy.actualRevenue >= selectedStrategy.expectedRevenue ? 
                      <TrendingUp className="w-5 h-5 text-emerald-500 mb-1" /> : 
                      <TrendingDown className="w-5 h-5 text-orange-500 mb-1" />
                    }
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">执行周期</p>
                  <p className="text-base font-semibold text-slate-800 mt-1">30 天</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase">责任主体</p>
                  <p className="text-base font-semibold text-slate-800 mt-1">{selectedStrategy.department}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-2">执行偏差分析</h4>
                <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-700 leading-relaxed border border-slate-100">
                  {selectedStrategy.status === 'deviated' ? (
                    <p>
                      <strong className="text-orange-600">核心偏差：</strong>{selectedStrategy.deviationReason}。<br/>
                      <br/>
                      <strong className="text-slate-900">AI 归因：</strong> 在推行“阶梯折扣”时，一线销售为保当月件量KPI，放宽了准入门槛，导致低优客户享受了高优折扣。同时，华北路由由于天气原因出现两周的成本上涨，双重叠加导致利润未达预期。
                    </p>
                  ) : (
                    <p>
                      <strong className="text-emerald-600">执行良好：</strong>策略推行符合预期进度，各业务节点协同顺畅。<br/>
                      <br/>
                      <strong className="text-slate-900">AI 总结：</strong> 产品组合引导成功，客户接受了“特快+经济件”的组合方案，有效规避了单点降价风险，实现了收入与毛利的双线增长。
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-2">下一步迭代建议 (Next Actions)</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span><strong>调整系统控制：</strong>在报价系统中增加硬性校验，低于门槛的阶梯折扣需要地区总经理审批。</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span><strong>销售考核优化：</strong>将“产品组合毛利”纳入下季度销售KPI，降低单一件量指标的权重。</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500 mt-0.5">•</span>
                    <span><strong>客户回访：</strong>对已切换组合方案的Top 20客户进行深度回访，收集时效和履约体验反馈。</span>
                  </li>
                </ul>
              </div>

            </div>
            <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
              <button className="px-4 py-2 border border-slate-300 bg-white text-slate-700 rounded text-sm hover:bg-slate-50 font-medium transition">
                导出 PDF
              </button>
              <button onClick={() => setSelectedStrategy(null)} className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 font-medium transition">
                关闭报告
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
