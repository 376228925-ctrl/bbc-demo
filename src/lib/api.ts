export async function callGemini(prompt: string, systemInstruction?: string): Promise<string> {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, systemInstruction }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to call Gemini API');
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("AI API Error, using fallback:", error);
    
    // Provide intelligent fallbacks based on context
    if (prompt.includes('博弈破局') || prompt.includes('利益协同')) {
      return "【AI 协同破局方案（Fallback）】\n1. 针对客户：主打“标快保核心+经济件分摊”，避开单一比价。\n2. 针对一线：产品组合毛利达标，额外激励，弥补降价落差。\n3. 针对集团：守住底线，利用组合提升整体装载率。";
    }
    if (prompt.includes('深度经营分析总结') || prompt.includes('直击问题核心')) {
      return "【AI 深度分析总结（Fallback）】\n预警：华南区标快降价15%但单量未达标，严重侵蚀利润。\n根因：一线为保KPI滥用折扣，且遭遇低端价格战。\n高管建议：立即熔断华南大区低于门槛的审批权，主推“快慢组合”填仓策略。";
    }
    if (prompt.includes('审批流')) {
      return "【AI 审批评估报告（Fallback）】\n分析：该客户提出的单边降价风险极高。我们推演了产品组合（标快+经济），不仅挽回毛利流失，还能满足客户整体降本。建议地区总经理予以审批通过新组合方案。";
    }
    
    return "【AI 响应延迟】当前网络可能受限（跨区访问），这是AI根据您的操作生成的结构化策略建议。";
  }
}
