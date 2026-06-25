import React from 'react';
import { cn } from '../lib/utils';
import { Package, Truck, Clock, ShieldCheck, Download, ExternalLink } from 'lucide-react';

export function CustomerSolution() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Customer Header */}
      <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 -mr-20 -mt-20 pointer-events-none"></div>
        <h2 className="text-2xl font-bold mb-2">某头部 3C 品牌年度智慧物流解决方案</h2>
        <p className="text-slate-400 text-sm mb-6 max-w-2xl">
          基于您过去半年的发货模型、退换货痛点及成本压力，我们利用 AI 算法为您重新组合了产品矩阵。
          在不降低末端消费者体验的前提下，预计为您优化 8.5% 的综合物流成本。
        </p>
        <div className="flex space-x-4">
          <button onClick={() => alert('完整方案书 (PDF) 已开始下载...')} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center">
            <Download className="w-4 h-4 mr-2" />
            下载完整方案书
          </button>
          <button onClick={() => alert('预览链接已生成并复制到剪贴板。')} className="bg-slate-800 text-slate-200 border border-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition flex items-center">
            <ExternalLink className="w-4 h-4 mr-2" />
            发送给客户预览
          </button>
        </div>
      </div>

      {/* Solution Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "极致体验版 (维持现案)",
            desc: "100% 航空件发运，适合高客单价新品首发期。",
            cost: "¥18.5",
            sla: "99.2%",
            returnRate: "低于 0.1%",
            products: ["SF 特快", "尊享保价", "上门取退"],
            isTarget: false
          },
          {
            title: "平衡增长版 (AI 推荐)",
            desc: "智能区分流向与重量段，航空与陆运组合搭配，高价值件保留特权，退换货升级专属通道。",
            cost: "¥15.8",
            sla: "98.5%",
            returnRate: "低于 0.15%",
            products: ["SF 标快 (核心区)", "经济件 (长尾区)", "高端电退专属包"],
            isTarget: true
          },
          {
            title: "成本优先版",
            desc: "以陆运网络为主，牺牲 12-24 小时绝对时效换取极致履约成本。",
            cost: "¥13.2",
            sla: "95.0%",
            returnRate: "0.3%",
            products: ["全网经济件", "标准售后通道"],
            isTarget: false
          }
        ].map((plan, idx) => (
          <div key={idx} className={cn(
            "bg-white rounded-xl p-6 border transition-all",
            plan.isTarget ? "border-blue-500 shadow-md ring-1 ring-blue-500/20 relative" : "border-slate-200 shadow-sm"
          )}>
            {plan.isTarget && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                顺丰智能推荐方案
              </div>
            )}
            <h3 className="text-lg font-bold text-slate-800 mb-2 mt-2">{plan.title}</h3>
            <p className="text-sm text-slate-500 mb-6 h-16">{plan.desc}</p>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-sm text-slate-500 flex items-center"><Truck className="w-4 h-4 mr-2 text-slate-400"/> 预计单票均价</span>
                <span className={cn("font-bold text-lg", plan.isTarget ? "text-blue-600" : "text-slate-800")}>{plan.cost}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-sm text-slate-500 flex items-center"><Clock className="w-4 h-4 mr-2 text-slate-400"/> 48H 达成率</span>
                <span className="font-semibold text-slate-700">{plan.sla}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <span className="text-sm text-slate-500 flex items-center"><ShieldCheck className="w-4 h-4 mr-2 text-slate-400"/> 逆向异常率</span>
                <span className="font-semibold text-slate-700">{plan.returnRate}</span>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 block">核心组合矩阵</span>
              <div className="flex flex-wrap gap-2">
                {plan.products.map(p => (
                  <span key={p} className={cn(
                    "px-2.5 py-1 rounded-md text-xs font-medium flex items-center",
                    plan.isTarget ? "bg-blue-50 text-blue-700 border border-blue-100" : "bg-slate-100 text-slate-600 border border-slate-200"
                  )}>
                    <Package className="w-3 h-3 mr-1" />
                    {p}
                  </span>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => alert(`已选择: ${plan.title}`)}
              className={cn(
              "w-full mt-6 py-2.5 rounded-lg text-sm font-medium transition-colors",
              plan.isTarget ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100"
            )}>
              选择此方案
            </button>
          </div>
        ))}
      </div>

      {/* Internal View Note - ONLY visible to internal staff */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800 flex items-start">
        <AlertCircle className="w-5 h-5 mr-2 shrink-0 mt-0.5 text-amber-600" />
        <div>
          <strong className="font-semibold">内部提示（对客户不可见）：</strong>
          <p className="mt-1">
            推荐方案（平衡增长版）虽然降低了客户单票均价，但通过将 45% 的非核心商圈流量下放至经济网，并剥离高昂的无门槛售后成本，
            预计本集团在该客户的<strong className="font-semibold">实际毛利率将提升 1.2%</strong>。属于双赢方案。
          </p>
        </div>
      </div>
    </div>
  );
}

// Ensure AlertCircle is imported
import { AlertCircle } from 'lucide-react';
