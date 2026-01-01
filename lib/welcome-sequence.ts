export type WelcomeSequenceStep = {
  step: number
  delayDays: number
  subject: string
  preview: string
  title: string
  paragraphs: string[]
  bullets?: string[]
  cta?: {
    label: string
    href: string
  }
}

export const welcomeSequence: WelcomeSequenceStep[] = [
  {
    step: 1,
    delayDays: 0,
    subject: '欢迎加入 Tonybook：送你一份增长清单',
    preview: '从今天开始用系统化方法做跨境增长与自动化。',
    title: '欢迎加入 Tonybook',
    paragraphs: [
      '感谢订阅，我会把跨境电商增长、AI 视觉设计与自动化系统的实战方法持续更新给你。',
      '先送你一份「增长清单」，帮助你快速梳理目标、策略与执行优先级。',
    ],
    bullets: [
      '从 0 搭建增长漏斗的关键步骤',
      '高转化内容与广告结构模板',
      '自动化工具选型与落地路径',
    ],
    cta: {
      label: '领取增长清单',
      href: '/playbooks',
    },
  },
  {
    step: 2,
    delayDays: 2,
    subject: '如何搭建可复用的跨境增长系统',
    preview: '3 个框架，帮你避免靠运气的增长。',
    title: '搭建跨境增长系统的 3 个框架',
    paragraphs: [
      '增长不是“运气好”，而是稳定的系统设计。',
      '这封邮件分享我常用的 3 个框架：目标拆解、渠道组合与转化闭环。',
    ],
    bullets: [
      '目标拆解：把 GMV 拆成可执行动作',
      '渠道组合：冷启动与规模化的不同策略',
      '转化闭环：从流量到复购的关键点',
    ],
    cta: {
      label: '查看学习路径',
      href: '/start-here',
    },
  },
  {
    step: 3,
    delayDays: 5,
    subject: 'AI 视觉与自动化如何一起提升转化',
    preview: '视觉与效率并行，真正提升业务产出。',
    title: 'AI 视觉 × 自动化：提升转化的组合拳',
    paragraphs: [
      'AI 视觉解决“吸引力”，自动化解决“持续性”。',
      '两者结合，能在不增加人力的情况下稳定产出高质量内容。',
    ],
    bullets: [
      '视觉系统：统一风格与品牌记忆点',
      '自动化工作流：减少重复劳动',
      '数据反馈：用结果反推内容迭代',
    ],
    cta: {
      label: '查看案例拆解',
      href: '/case-studies',
    },
  },
  {
    step: 4,
    delayDays: 9,
    subject: '下一步：把策略落地为行动',
    preview: '用小步快跑的方法推进增长。',
    title: '把策略落地的 4 步动作',
    paragraphs: [
      '策略看起来漂亮，落地才是关键。',
      '这封邮件送你一份落地模板，帮助你快速推进。',
    ],
    bullets: ['选择高 ROI 任务', '每周复盘指标变化', '用自动化固化流程', '持续优化内容结构'],
    cta: {
      label: '获取落地模板',
      href: '/playbooks',
    },
  },
]
