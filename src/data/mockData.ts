import { MetricCard, AIRiskAlert, StrategyItem } from '../types';

export const mockMetrics: MetricCard[] = [
  { id: '1', title: '集团总收入', value: '1,245,800', unit: '万元', trend: 'up', trendValue: '+5.2%', status: 'good' },
  { id: '2', title: '整体毛利率', value: '11.4', unit: '%', trend: 'down', trendValue: '-0.8%', status: 'warning' },
  { id: '3', title: '日均单量', value: '3,450', unit: '万单', trend: 'up', trendValue: '+8.1%', status: 'good' },
  { id: '4', title: '平均折扣率', value: '82.5', unit: '%', trend: 'down', trendValue: '-1.2%', status: 'critical' },
  { id: '5', title: '策略收益兑现率', value: '88.3', unit: '%', trend: 'down', trendValue: '-2.5%', status: 'warning' },
];

export const mockRiskAlerts: AIRiskAlert[] = [
  {
    id: 'r1',
    level: 'high',
    title: '标快产品深折扣风险预警',
    description: '华南大区 3C 行业多名头部客户（如客户A）要求标快深折扣，且历史件量兑现率仅为 62%，存在收入增长但毛利大幅稀释风险。',
    recommendation: '建议暂缓直接批复深折扣，启用【仿真推演】模块，测试阶梯折扣+件量约束的替代方案。'
  },
  {
    id: 'r2',
    level: 'medium',
    title: '电退产品华东流向成本异常',
    description: '本月华东地区电退产品操作成本环比上升 15%，逆向链路时效波动导致异常件增加。',
    recommendation: '建议区域运营介入排查逆向仓配链路，商务侧可尝试向头部客户推荐【高端电退保障服务】包。'
  }
];

export const mockStrategies: StrategyItem[] = [
  {
    id: 's1',
    name: '华东生鲜冷链旺季溢价策略',
    department: '冷运产品组',
    targetClient: '生鲜产区头部KA',
    expectedRevenue: 5000,
    actualRevenue: 4800,
    status: 'executing'
  },
  {
    id: 's2',
    name: '3C行业标快转特快提质提价',
    department: '特快产品组',
    targetClient: '华南3C中小客群',
    expectedRevenue: 1200,
    actualRevenue: 800,
    status: 'deviated',
    deviationReason: '竞对降价拦截，客户转化率低于预期'
  }
];

export const revenueTrendData = [
  { month: '1月', 标快: 400, 特快: 240, 经济: 240, 收入: 880, 毛利率: 12.1 },
  { month: '2月', 标快: 300, 特快: 139, 经济: 221, 收入: 660, 毛利率: 11.5 },
  { month: '3月', 标快: 420, 特快: 380, 经济: 250, 收入: 1050, 毛利率: 11.8 },
  { month: '4月', 标快: 450, 特快: 390, 经济: 260, 收入: 1100, 毛利率: 11.2 },
  { month: '5月', 标快: 480, 特快: 410, 经济: 280, 收入: 1170, 毛利率: 10.9 },
  { month: '6月', 标快: 520, 特快: 430, 经济: 295, 收入: 1245, 毛利率: 11.4 },
];

export const costWaterfallData = [
  { name: '总收入', value: 100, isTotal: true },
  { name: '运输成本', value: -35 },
  { name: '中转操作', value: -20 },
  { name: '末端派送', value: -25 },
  { name: '理赔/客服', value: -3 },
  { name: '销售折扣让利', value: -5.6 },
  { name: '贡献利润', value: 11.4, isTotal: true },
];

export const customerSegments = [
  { name: '高价值高粘性', value: 35, color: '#1e40af' },
  { name: '高价值易流失', value: 15, color: '#ef4444' },
  { name: '低单价高件量', value: 30, color: '#3b82f6' },
  { name: '长尾零散客', value: 20, color: '#94a3b8' },
];

export const simulatedScenarios = [
  { 
    id: 'base', 
    name: '当前基线', 
    description: '维持现状，自然增长', 
    revenueChange: '+0%', 
    marginChange: '+0%', 
    churnRisk: 'Medium', 
    difficulty: 'Low' 
  },
  { 
    id: 'opt1', 
    name: '方案A：直接深折扣', 
    description: '全面对标竞对价格，保份额', 
    revenueChange: '+12%', 
    marginChange: '-4.5%', 
    churnRisk: 'Low', 
    difficulty: 'Low',
    isRecommended: false
  },
  { 
    id: 'opt2', 
    name: '方案B：阶梯折扣+件量约束', 
    description: '设置对赌条款，达标返利', 
    revenueChange: '+8%', 
    marginChange: '-1.2%', 
    churnRisk: 'Medium', 
    difficulty: 'High',
    isRecommended: true
  },
  { 
    id: 'opt3', 
    name: '方案C：产品组合替代', 
    description: '标快保底+经济件吸纳长尾', 
    revenueChange: '+5%', 
    marginChange: '+0.5%', 
    churnRisk: 'Medium', 
    difficulty: 'Medium',
    isRecommended: true
  }
];
