import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  LineChart, 
  Users, 
  Calculator, 
  Workflow, 
  Handshake, 
  Lightbulb, 
  Activity,
  Users2,
  Brain,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Role } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  role: Role;
  setRole: (role: Role) => void;
}

const MENU_ITEMS = [
  { id: 'mindset', label: '用户思维重塑', icon: Brain, roles: ['GROUP_MGMT', 'REGIONAL_FRONTLINE', 'PRODUCT_REVENUE'] },
  { id: 'dashboard', label: '首页：经营驾驶舱', icon: LayoutDashboard, roles: ['GROUP_MGMT', 'PRODUCT_REVENUE'] },
  { id: 'stakeholder', label: '生态与利益协同', icon: Users2, roles: ['GROUP_MGMT', 'REGIONAL_FRONTLINE', 'PRODUCT_REVENUE'] },
  { id: 'product', label: '收益分析中心', icon: LineChart, roles: ['GROUP_MGMT', 'PRODUCT_REVENUE'] },
  { id: 'customer', label: '客户场景洞察', icon: Users, roles: ['REGIONAL_FRONTLINE'] },
  { id: 'pricing', label: '科学报价与审批', icon: Calculator, roles: ['REGIONAL_FRONTLINE', 'PRODUCT_REVENUE'] },
  { id: 'simulation', label: 'AI 仿真推演', icon: Workflow, roles: ['GROUP_MGMT', 'PRODUCT_REVENUE'] },
  { id: 'co-creation', label: '方案共创(客户)', icon: Handshake, roles: ['REGIONAL_FRONTLINE', 'B2B_CUSTOMER'] },
  { id: 'opportunities', label: '商业机会洞察', icon: Lightbulb, roles: ['GROUP_MGMT'] },
  { id: 'execution', label: '策略价值闭环', icon: Activity, roles: ['GROUP_MGMT', 'REGIONAL_FRONTLINE', 'PRODUCT_REVENUE'] },
];

export function Layout({ children, activeTab, setActiveTab, role, setRole }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const visibleMenuItems = MENU_ITEMS.filter(item => item.roles.includes(role));
  
  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden relative">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 flex flex-col text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:w-56 shrink-0",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-slate-800 flex items-center justify-between lg:justify-start gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold shrink-0">SF</div>
            <div className="leading-tight">
              <p className="text-sm font-bold tracking-wider text-white">智能产品收益</p>
            </div>
          </div>
          <button 
            className="lg:hidden p-1 text-slate-400 hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          <ul className="space-y-0 text-sm">
            {visibleMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center px-6 py-3 transition-colors text-left",
                      isActive 
                        ? "bg-blue-600 text-white font-medium" 
                        : "text-slate-400 hover:bg-slate-800"
                    )}
                  >
                    <Icon className="w-4 h-4 mr-3 shrink-0" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 p-3 rounded-lg">
            <p className="text-[10px] text-slate-400 uppercase font-bold mb-1">当前角色</p>
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value as Role);
                setMobileMenuOpen(false);
              }}
              className="bg-transparent text-xs w-full outline-none text-white appearance-none cursor-pointer"
            >
              <option value="GROUP_MGMT">集团管理层视角</option>
              <option value="REGIONAL_FRONTLINE">地区一线视角</option>
              <option value="PRODUCT_REVENUE">产品收益团队视角</option>
              <option value="B2B_CUSTOMER">B端客户视角</option>
            </select>
          </div>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col h-full overflow-hidden w-full lg:w-auto">
        {/* Top Header */}
        <header className="h-14 bg-white border-b border-slate-200 px-4 lg:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button 
              className="lg:hidden p-1.5 -ml-1.5 text-slate-600 hover:bg-slate-100 rounded-md"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-base lg:text-lg font-bold flex items-center gap-2 truncate max-w-[150px] sm:max-w-xs">
              <span className="w-1.5 lg:w-2 h-5 lg:h-6 bg-blue-600 rounded-full shrink-0"></span>
              <span className="truncate">{MENU_ITEMS.find(i => i.id === activeTab)?.label || '集团经营健康驾驶舱'}</span>
            </h1>
            <div className="hidden md:flex items-center text-[10px] lg:text-xs bg-slate-100 rounded px-2 py-1 gap-2 border border-slate-200 shrink-0">
              <span className="text-slate-500">数据更新: 最近</span>
              <span className="text-green-600 font-bold underline cursor-pointer hover:text-green-700">刷新数据</span>
            </div>
          </div>
          <div className="flex items-center gap-3 lg:gap-6 shrink-0">
            <div className="hidden sm:flex gap-4">
              <div className="text-right">
                <p className="text-[9px] lg:text-[10px] text-slate-400 uppercase font-bold">收入健康指数</p>
                <p className="text-xs lg:text-sm font-bold text-blue-600">88.5 <span className="text-[9px] lg:text-[10px] text-green-500 font-normal">↑ 2.4%</span></p>
              </div>
              <div className="text-right border-l pl-3 lg:pl-4 border-slate-200">
                <p className="text-[9px] lg:text-[10px] text-slate-400 uppercase font-bold">折扣风险预警</p>
                <p className="text-xs lg:text-sm font-bold text-orange-500">中低度 (12)</p>
              </div>
            </div>
            <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-blue-700 font-bold text-[10px] lg:text-xs shrink-0 shadow-sm">
              {role === 'GROUP_MGMT' ? '管' : role === 'REGIONAL_FRONTLINE' ? '区' : role === 'PRODUCT_REVENUE' ? '收' : '客'}
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-auto bg-slate-50/50 p-3 lg:p-4 custom-scrollbar">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </div>

        {/* Stakeholder Flow Rail (Footer) */}
        <footer className="h-12 lg:h-12 bg-white border-t border-slate-200 px-4 lg:px-6 flex items-center shrink-0 overflow-x-auto custom-scrollbar">
          <p className="text-[9px] lg:text-[10px] font-bold text-slate-400 mr-4 shrink-0 hidden sm:block">核心业务价值流 (Value Flow)</p>
          <div className="flex items-center gap-2 shrink-0">
            {[
              { step: 1, title: '发现异常信号', roles: '首页驾驶舱', match: ['dashboard', 'opportunities'] },
              { step: 2, title: '识别业务场景', roles: '客户洞察', match: ['customer', 'stakeholder'] },
              { step: 3, title: '生成方案与报价', roles: '收益分析 / 报价', match: ['product', 'pricing'] },
              { step: 4, title: 'AI 仿真推演', roles: '风险控制', match: ['simulation'] },
              { step: 5, title: '方案共创交付', roles: 'B端客户', match: ['co-creation'] },
              { step: 6, title: '策略价值复盘', roles: '闭环追踪', match: ['execution'] },
            ].map((node, idx, arr) => {
              const isActive = node.match.includes(activeTab);
              return (
                <React.Fragment key={node.step}>
                  <div className={cn(
                    "flex items-center gap-1.5 px-2 py-1 rounded transition-colors cursor-default shrink-0",
                    isActive ? "bg-blue-100 border border-blue-200 shadow-sm" : "bg-slate-50 border border-transparent hidden sm:flex"
                  )}>
                    <span className={cn("text-[9px] lg:text-[10px] font-bold", isActive ? "text-blue-700" : "text-slate-500")}>
                      {node.step} <span className={cn(isActive ? "inline" : "hidden lg:inline")}>{node.title}</span>
                    </span>
                    <span className={cn("text-[9px] lg:text-[10px] font-medium hidden lg:inline", isActive ? "text-blue-500" : "text-slate-400")}>
                      {node.roles}
                    </span>
                  </div>
                  {idx < arr.length - 1 && <div className="text-slate-300 mx-0.5 hidden sm:block shrink-0">→</div>}
                </React.Fragment>
              )
            })}
          </div>
          <div className="ml-auto flex gap-4 shrink-0 pl-4 border-l border-slate-100">
            <p className="text-[9px] lg:text-[10px] flex items-center gap-1 text-slate-500 truncate">
               本节点操作数据将自动流转至下一环
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
