export interface ComparisonBar {
  label: string;
  valueText: string;
  percentage: number; // 0 to 100
  colorClass: string;
  offsetLabel?: string;
}

export interface NPSBar {
  label: string;
  percentage: number; // 0 to 100
  colorClass: string;
}

export interface MetricCardData {
  title: string;
  metric: string;
  metricLabel: string;
  isPositive: boolean;
  cardType: "comparison" | "nps";
  comparisonData?: ComparisonBar[];
  npsData?: NPSBar[];
}

export interface ThroughputItem {
  label: string;
  value: number;
  color: string;
}

export interface DashboardDetails {
  headline: string;
  cards: MetricCardData[];
  throughput: ThroughputItem[];
}

export const dashboardTabs: string[] = [
  "Home",
  "Teams",
  "People",
  "Delivery",
  "DevFinOps",
  "AI Impact",
  "DevEx"
];

export const sidebarTools: string[] = [
  "All Tools",
  "Cursor",
  "GitHub Copilot",
  "Claude Code",
  "Windsurf",
  "Amazon Q",
  "Code Rabbit",
  "Greptile",
  "Cursor Bugbot"
];

// Exact Jellyfish data mappings for "AI Impact" -> "All Tools"
const aiImpactAllTools: DashboardDetails = {
  headline: "Maximize Impact",
  cards: [
    {
      title: "Issue Cycle Time",
      metric: "47%",
      metricLabel: "faster work",
      isPositive: true,
      cardType: "comparison",
      comparisonData: [
        {
          label: "with AI",
          valueText: "17 h",
          percentage: 45,
          colorClass: "bg-[#0D3152]", // Light Blue accent
          offsetLabel: "- 8h"
        },
        {
          label: "without AI",
          valueText: "1d 1h",
          percentage: 100,
          colorClass: "bg-slate-200"
        }
      ]
    },
    {
      title: "PR Cycle Time",
      metric: "7%",
      metricLabel: "slower reviews",
      isPositive: false,
      cardType: "comparison",
      comparisonData: [
        {
          label: "with AI",
          valueText: "1d 10h",
          percentage: 100,
          colorClass: "bg-rose-200",
          offsetLabel: "+ 2h"
        },
        {
          label: "without AI",
          valueText: "1d 8h",
          percentage: 85,
          colorClass: "bg-slate-200"
        }
      ]
    },
    {
      title: "AI NPS",
      metric: "28",
      metricLabel: "How likely is it that you would...",
      isPositive: true,
      cardType: "nps",
      npsData: [
        { label: "Promoters", percentage: 55, colorClass: "bg-cyan-400" },
        { label: "Neutrals", percentage: 18, colorClass: "bg-slate-200" },
        { label: "Detractors", percentage: 27, colorClass: "bg-rose-400" }
      ]
    }
  ],
  throughput: [
    { label: "with Copilot", value: 65, color: "bg-sky-400" },
    { label: "with Cursor", value: 85, color: "bg-[#0D3152]" },
    { label: "with Gemini", value: 92, color: "bg-sky-500" },
    { label: "with 2+ Tools", value: 98, color: "bg-cyan-500" },
    { label: "without AI", value: 35, color: "bg-slate-300" }
  ]
};

export const dashboardDataSet: Record<string, Record<string, DashboardDetails>> = {
  "AI Impact": {
    "All Tools": aiImpactAllTools
  }
};

// Generate exact mappings for other sidebar tools under "AI Impact"
sidebarTools.forEach((tool) => {
  if (tool === "All Tools") return;

  dashboardDataSet["AI Impact"][tool] = {
    headline: `Maximize Impact (${tool})`,
    cards: [
      {
        title: "Issue Cycle Time",
        metric: tool === "Cursor" ? "52%" : tool === "Claude Code" ? "62%" : "40%",
        metricLabel: "faster work",
        isPositive: true,
        cardType: "comparison",
        comparisonData: [
          {
            label: `with ${tool}`,
            valueText: tool === "Cursor" ? "15 h" : "18 h",
            percentage: 40,
            colorClass: "bg-[#0D3152]",
            offsetLabel: tool === "Cursor" ? "- 10h" : "- 6h"
          },
          {
            label: "without AI",
            valueText: "1d 1h",
            percentage: 100,
            colorClass: "bg-slate-200"
          }
        ]
      },
      {
        title: "PR Cycle Time",
        metric: tool === "Cursor" ? "12%" : "5%",
        metricLabel: tool === "Cursor" ? "faster reviews" : "slower reviews",
        isPositive: tool === "Cursor",
        cardType: "comparison",
        comparisonData: [
          {
            label: `with ${tool}`,
            valueText: "1d 5h",
            percentage: tool === "Cursor" ? 75 : 95,
            colorClass: tool === "Cursor" ? "bg-[#0D3152]" : "bg-rose-200",
            offsetLabel: tool === "Cursor" ? "- 3h" : "+ 1h"
          },
          {
            label: "without AI",
            valueText: "1d 8h",
            percentage: 100,
            colorClass: "bg-slate-200"
          }
        ]
      },
      {
        title: "AI NPS",
        metric: tool === "Cursor" ? "45" : tool === "Claude Code" ? "52" : "25",
        metricLabel: `Satisfaction score recommending ${tool}`,
        isPositive: true,
        cardType: "nps",
        npsData: [
          { label: "Promoters", percentage: tool === "Cursor" ? 68 : 72, colorClass: "bg-cyan-400" },
          { label: "Neutrals", percentage: 15, colorClass: "bg-slate-200" },
          { label: "Detractors", percentage: tool === "Cursor" ? 17 : 13, colorClass: "bg-rose-400" }
        ]
      }
    ],
    throughput: [
      { label: "Refactoring", value: tool === "Cursor" ? 95 : 75, color: "bg-sky-400" },
      { label: "Debugging", value: 80, color: "bg-[#0D3152]" },
      { label: "Boilerplate", value: 85, color: "bg-sky-500" },
      { label: "Testing", value: tool === "Claude Code" ? 95 : 70, color: "bg-cyan-500" },
      { label: "Standard Work", value: 35, color: "bg-slate-300" }
    ]
  };
});

// Fallback generate data for all other tabs to make dashboard fully responsive
dashboardTabs.forEach((tab) => {
  if (tab === "AI Impact") return;

  dashboardDataSet[tab] = {};
  sidebarTools.forEach((tool) => {
    dashboardDataSet[tab][tool] = {
      headline: `${tab} Details`,
      cards: [
        {
          title: "DORA Lead Time",
          metric: "2.4h",
          metricLabel: "optimal status",
          isPositive: true,
          cardType: "comparison",
          comparisonData: [
            { label: "Current", valueText: "2.4 h", percentage: 80, colorClass: "bg-[#0D3152]" },
            { label: "Benchmark", valueText: "3.5 h", percentage: 100, colorClass: "bg-slate-200" }
          ]
        },
        {
          title: "Deployment Frequency",
          metric: "Daily",
          metricLabel: "high performant",
          isPositive: true,
          cardType: "comparison",
          comparisonData: [
            { label: "Current", valueText: "3 / day", percentage: 95, colorClass: "bg-[#0D3152]" },
            { label: "Target", valueText: "1 / day", percentage: 35, colorClass: "bg-slate-200" }
          ]
        },
        {
          title: "Change Failure Rate",
          metric: "< 5%",
          metricLabel: "exceptional resilience",
          isPositive: true,
          cardType: "nps",
          npsData: [
            { label: "Passed", percentage: 95, colorClass: "bg-cyan-400" },
            { label: "Hotfixes", percentage: 4, colorClass: "bg-slate-200" },
            { label: "Rollbacks", percentage: 1, colorClass: "bg-rose-400" }
          ]
        }
      ],
      throughput: [
        { label: "Feature Work", value: 70, color: "bg-sky-400" },
        { label: "Bug Fixes", value: 15, color: "bg-[#0D3152]" },
        { label: "Technical Debt", value: 10, color: "bg-sky-500" },
        { label: "Infrastructure", value: 5, color: "bg-slate-300" }
      ]
    };
  });
});
