export type Role = 
  | 'GROUP_MGMT' // 集团管理层
  | 'REGIONAL_FRONTLINE' // 地区一线团队
  | 'PRODUCT_REVENUE' // 产品收益团队
  | 'B2B_CUSTOMER'; // B 端客户

export interface UserContext {
  role: Role;
  name: string;
}

export interface MetricCard {
  id: string;
  title: string;
  value: string | number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  status?: 'good' | 'warning' | 'critical';
}

export interface AIRiskAlert {
  id: string;
  level: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  recommendation: string;
}

export interface StrategyItem {
  id: string;
  name: string;
  department: string;
  targetClient: string;
  expectedRevenue: number;
  actualRevenue: number;
  status: 'executing' | 'completed' | 'deviated';
  deviationReason?: string;
}
