/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { StakeholderMap } from './pages/StakeholderMap';
import { ProductRevenue } from './pages/ProductRevenue';
import { CustomerScenario } from './pages/CustomerScenario';
import { Simulation } from './pages/Simulation';
import { CustomerSolution } from './pages/CustomerSolution';
import { Pricing } from './pages/Pricing';
import { Opportunities } from './pages/Opportunities';
import { Execution } from './pages/Execution';
import { MindsetReshaping } from './pages/MindsetReshaping';
import { Role } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [role, setRole] = useState<Role>('GROUP_MGMT');

  useEffect(() => {
    // Role-based default tab switching
    const getRoleAllowedTabs = (r: Role) => {
      switch(r) {
        case 'GROUP_MGMT': return ['mindset', 'dashboard', 'stakeholder', 'product', 'simulation', 'opportunities', 'execution'];
        case 'REGIONAL_FRONTLINE': return ['mindset', 'stakeholder', 'customer', 'pricing', 'co-creation', 'execution'];
        case 'PRODUCT_REVENUE': return ['mindset', 'dashboard', 'stakeholder', 'product', 'pricing', 'simulation', 'execution'];
        case 'B2B_CUSTOMER': return ['co-creation'];
      }
    };
    
    const allowedTabs = getRoleAllowedTabs(role);
    if (!allowedTabs.includes(activeTab)) {
      setActiveTab(allowedTabs[0]);
    }
  }, [role, activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case 'mindset': return <MindsetReshaping />;
      case 'dashboard': return <Dashboard role={role} setActiveTab={setActiveTab} />;
      case 'stakeholder': return <StakeholderMap />;
      case 'product': return <ProductRevenue />;
      case 'customer': return <CustomerScenario />;
      case 'simulation': return <Simulation />;
      case 'co-creation': return <CustomerSolution />;
      case 'pricing': return <Pricing />;
      case 'opportunities': return <Opportunities />;
      case 'execution': return <Execution />;
      default: return <Dashboard role={role} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} role={role} setRole={setRole}>
      <div className="animate-in fade-in duration-500 h-full">
        {renderContent()}
      </div>
    </Layout>
  );
}
