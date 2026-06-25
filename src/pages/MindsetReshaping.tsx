import React, { useState } from 'react';
import { Brain, Edit2, Save, Target, Activity, Lightbulb, Users, TrendingUp, BookOpen, Layers, Network, Wallet, Link, Info } from 'lucide-react';
import { cn } from '../lib/utils';

interface CanvasItem {
  id: string;
  title: string;
  content: string;
  guide: string;
  icon: React.ElementType;
  theme: 'blue' | 'emerald' | 'orange' | 'purple';
}

const initialData: Record<string, CanvasItem> = {
  partners: {
    id: 'partners',
    title: '关键协同生态 (Key Partners)',
    icon: Network,
    theme: 'orange',
    content: '1. AI 底层大模型服务商 (提供推理与生成能力)\n2. 内部 ERP/财务系统 (提供流向与成本数据源)\n3. 核心 B 端大客户共创标杆',
    guide: 'BCC理念：识别谁能为你提供资源。智能产品收益系统需要数据底座与算法能力的强强联合。'
  },
  activities: {
    id: 'activities',
    title: '核心运营动作 (Key Activities)',
    icon: Activity,
    theme: 'orange',
    content: '1. 实时流向与成本数据获取分析\n2. AI 策略仿真推演与自动化报价生成\n3. 业务价值流的闭环追踪与收益复盘',
    guide: 'BCC理念：为了交付价值主张必须执行的关键动作。系统核心在于“算得清、推得准、落得实”。'
  },
  resources: {
    id: 'resources',
    title: '核心资源资产 (Key Resources)',
    icon: Layers,
    theme: 'orange',
    content: '1. 集团全网海量流向与履约成本数据\n2. 沉淀多年的物流经营分析业务模型\n3. 强大的 AI 智能推演算法与算力底座',
    guide: 'BCC理念：支撑商业模式的底层资产。数据资产和模型算法是本系统的核心护城河。'
  },
  value_prop: {
    id: 'value_prop',
    title: '价值创造主张 (Value Proposition)',
    icon: Lightbulb,
    theme: 'blue',
    content: '核心主张：打破零和博弈，提供“智能产品收益”平台。\n\n1. 赋能管理层：全局视角的收益监控与风险智能推演。\n2. 赋能一线：快速生成组合报价，提升谈单成功率与提成。\n3. 赋能B端客户：透明的供应链优化与结构化降本方案。',
    guide: 'BCC理念：你为客户解决了什么问题？本系统不只是工具，而是为三类核心用户带来切实的业务增量。'
  },
  relationships: {
    id: 'relationships',
    title: '客户信任关系 (Customer Relationships)',
    icon: Users,
    theme: 'emerald',
    content: '1. 从“管控与博弈”走向“赋能与共创”\n2. 依靠高准度的 AI 预测建立数据信任\n3. 提供系统级的常态化业务诊断',
    guide: 'BCC理念：建立并保持怎样的关系？通过数字化透明和智能化推演，降低内部沟通与外部谈判的信任成本。'
  },
  channels: {
    id: 'channels',
    title: '触达与交付渠道 (Channels)',
    icon: Link,
    theme: 'emerald',
    content: '1. 集团管理层：宏观经营驾驶舱大屏\n2. 地区一线：移动端报价审批与策略推荐\n3. B端客户：客户洞察与组合方案共创看板',
    guide: 'BCC理念：如何让客户体验到价值？针对不同层级用户，提供最贴合其工作流的系统界面与触点。'
  },
  segments: {
    id: 'segments',
    title: '目标客群细分 (Customer Segments)',
    icon: Target,
    theme: 'emerald',
    content: '1. 集团本部管理层：核心诉求是守住利润底线，维护价格体系纪律，实现高质量增长。\n2. 地区一线销售/网点：核心诉求是快速响应客户，拿下大单并确保个人团队提成。\n3. B端合作客户：核心诉求是获得极致的综合物流性价比与稳定的履约保障。',
    guide: 'BCC理念：谁是你最重要的客户？必须精准瞄准系统的使用者，满足不同角色的核心利益诉求。'
  },
  cost: {
    id: 'cost',
    title: '产品推行成本 (Cost Structure)',
    icon: Wallet,
    theme: 'purple',
    content: '1. 系统建设与大模型 API 调用成本\n2. 一线销售的系统使用学习与切换成本\n3. 盲目跟风降价带来的直接利润损失（机会成本）\n\n*策略：通过直观的 UI 设计与 AI 自然语言交互降低学习门槛。',
    guide: 'BCC理念：驱动该商业模式的成本有哪些？除了显性的系统成本，还要关注用户的隐性切换成本。'
  },
  revenue: {
    id: 'revenue',
    title: '系统业务价值 (Revenue Streams)',
    icon: TrendingUp,
    theme: 'purple',
    content: '1. 止损价值：避免单边降价带来的毛利流失。\n2. 增量价值：通过“快慢组合”提升整体装载率与运力复用。\n3. 效率价值：大幅缩短复杂报价的审批与测算周期。\n\n*策略：算清每一笔账，让智能决策直接转化为财务收益。',
    guide: 'BCC理念：价值如何转化为回报？系统的最终成功在于能否切实改善公司的财报利润率。'
  }
};

export function MindsetReshaping() {
  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [showGuides, setShowGuides] = useState(true);

  const handleEdit = (id: string, content: string) => {
    setEditingId(id);
    setEditContent(content);
  };

  const handleSave = () => {
    if (editingId) {
      setData(prev => ({
        ...prev,
        [editingId]: {
          ...prev[editingId],
          content: editContent
        }
      }));
      setEditingId(null);
    }
  };

  const CanvasCard = ({ item, className = "" }: { item: CanvasItem, className?: string }) => {
    const isEditing = editingId === item.id;
    const Icon = item.icon;

    const themeStyles = {
      blue: "bg-blue-50 border-blue-200 text-blue-900 icon-bg-blue-100 icon-text-blue-600",
      emerald: "bg-emerald-50 border-emerald-200 text-emerald-900 icon-bg-emerald-100 icon-text-emerald-600",
      orange: "bg-orange-50 border-orange-200 text-orange-900 icon-bg-orange-100 icon-text-orange-600",
      purple: "bg-purple-50 border-purple-200 text-purple-900 icon-bg-purple-100 icon-text-purple-600"
    }[item.theme];

    const [bg, border, text, iconBg, iconText] = themeStyles.split(' ');

    return (
      <div className={cn("rounded-xl border p-4 flex flex-col shadow-sm transition-all relative group h-full", bg, border, className)}>
        <div className="flex items-start justify-between mb-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className={cn("p-1.5 rounded-lg", iconBg.replace('icon-bg-', 'bg-'), iconText.replace('icon-text-', 'text-'))}>
              <Icon className="w-4 h-4" />
            </div>
            <h3 className={cn("font-bold text-sm", text.replace('text-', 'text-'))}>{item.title}</h3>
          </div>
          {!isEditing && (
            <button 
              onClick={() => handleEdit(item.id, item.content)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-black/5 rounded text-slate-500"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {showGuides && (
          <div className="mb-3 p-2 bg-white/60 rounded text-[11px] text-slate-600 border border-white/40 flex items-start gap-1.5 shrink-0">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-70" />
            <p className="leading-relaxed">{item.guide}</p>
          </div>
        )}
        
        <div className="flex-1 overflow-y-auto custom-scrollbar relative min-h-[100px]">
          {isEditing ? (
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full h-full min-h-[120px] p-3 rounded-lg border focus:outline-none focus:ring-2 resize-none text-sm bg-white/90 focus:ring-black/5 text-slate-800 border-slate-300"
              placeholder="输入您的洞察..."
            />
          ) : (
            <div className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed h-full">
              {item.content}
            </div>
          )}
        </div>
        
        {isEditing && (
          <div className="mt-3 flex justify-end shrink-0">
            <button 
              onClick={handleSave}
              className="flex items-center px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-bold hover:bg-slate-800 transition"
            >
              <Save className="w-3 h-3 mr-1" /> 保存
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* Header Section */}
      <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 shadow-sm text-white shrink-0">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center shrink-0">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-wide">BCC 商业分析画布 (Business Case Canvas)</h2>
                <p className="text-xs text-slate-400 mt-1">深度融合 BCC 教学理念与物流产品收益核心逻辑</p>
              </div>
            </div>
            <div className="text-xs text-slate-300 leading-relaxed max-w-3xl space-y-2">
              <p><strong className="text-indigo-400">教学理念集成：</strong>BCC 强调从“拍脑袋决策”向“系统化商业论证”转变。在这里，我们不再单纯记录客户的压价要求，而是将每一次报价申请视为一个完整的商业案例（Business Case）。</p>
              <p><strong className="text-emerald-400">结合收益管理：</strong>通过这个互动画布，要求一线和产品团队在申请折扣前，必须理清“客户场景”、“运力成本”、“组合方案”与“内部生态利益”。只有逻辑闭环，AI 推演才会通过。</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-3 shrink-0">
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 min-w-[200px]">
              <div className="flex items-center gap-2 text-xs text-indigo-300 font-bold mb-2">
                  <BookOpen className="w-4 h-4" /> BCC 核心六问
              </div>
              <ul className="text-[10px] text-slate-400 space-y-1 list-disc list-inside">
                  <li>为什么要做？(痛点与需求)</li>
                  <li>我们提供什么？(价值主张)</li>
                  <li>怎么交付？(运营与渠道)</li>
                  <li>和谁一起？(伙伴与关系)</li>
                  <li>怎么赚钱？(收益模型)</li>
                  <li>成本多少？(成本结构)</li>
              </ul>
            </div>
            <button 
              onClick={() => setShowGuides(!showGuides)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-medium transition border border-slate-700 flex justify-center items-center"
            >
              <Info className="w-3 h-3 mr-1" /> {showGuides ? '隐藏教学指引' : '显示教学指引'}
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Grid - Desktop (10 cols), Mobile (1 col) */}
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto custom-scrollbar pb-6 pr-2">
        <div className="grid grid-cols-1 lg:grid-cols-10 lg:grid-rows-[minmax(180px,1fr)_minmax(180px,1fr)] gap-4">
          
          <div className="lg:col-span-2 lg:row-span-2">
            <CanvasCard item={data.partners} />
          </div>
          
          <div className="lg:col-span-2 lg:row-span-2 flex flex-col gap-4">
            <div className="flex-1"><CanvasCard item={data.activities} /></div>
            <div className="flex-1"><CanvasCard item={data.resources} /></div>
          </div>

          <div className="lg:col-span-2 lg:row-span-2">
            <CanvasCard item={data.value_prop} className="border-2 shadow-md border-blue-300" />
          </div>

          <div className="lg:col-span-2 lg:row-span-2 flex flex-col gap-4">
            <div className="flex-1"><CanvasCard item={data.relationships} /></div>
            <div className="flex-1"><CanvasCard item={data.channels} /></div>
          </div>

          <div className="lg:col-span-2 lg:row-span-2">
            <CanvasCard item={data.segments} />
          </div>
        </div>

        {/* Bottom Finance Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-auto min-h-[220px]">
          <CanvasCard item={data.cost} />
          <CanvasCard item={data.revenue} />
        </div>
      </div>
    </div>
  );
}

