import React, { useState, useEffect } from 'react';
import {
  FolderKanban,
  Target,
  Library,
  Archive,
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
  Zap,
  Layout,
  Users,
  RefreshCw,
  Search,
  Database,
  Layers,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types & Interfaces ---

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
  comingSoon?: boolean;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-200 py-3' : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-lg">P</div>
          <span className="font-semibold text-xl tracking-tight">PARA System</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
          <button onClick={() => scrollToSection('concept')} className="hover:text-black transition-colors">核心概念</button>
          <button onClick={() => scrollToSection('benefits')} className="hover:text-black transition-colors">优势</button>
          <button onClick={() => scrollToSection('pricing')} className="hover:text-black transition-colors">定价</button>
          <button onClick={() => scrollToSection('faq')} className="hover:text-black transition-colors">FAQ</button>
        </div>

        <div className="hidden md:block">
          <button
            onClick={() => scrollToSection('pricing')}
            className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-all transform hover:scale-105"
          >
            立即购买
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-200 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-4 text-base font-medium text-gray-800">
              <button onClick={() => scrollToSection('concept')} className="text-left py-2">核心概念</button>
              <button onClick={() => scrollToSection('benefits')} className="text-left py-2">优势</button>
              <button onClick={() => scrollToSection('pricing')} className="text-left py-2">定价</button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="bg-black text-white px-5 py-3 rounded-xl text-center mt-2"
              >
                立即购买
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = ['./assets/1.PNG', './assets/2.PNG', './assets/3.PNG'];

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 overflow-hidden bg-gray-50">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wider">
            重塑数字生活秩序
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-[1.1]">
            你的数字生活，<br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
              从混乱到掌控。
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            告别文件堆积与目标拖延。PARA 系统——一套让 1000+ 用户找回执行力的终极管理方案。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-full font-medium text-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              获取 PARA 系统 <ArrowRight size={20} />
            </button>
            <button
              onClick={() => document.getElementById('concept')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-medium text-lg hover:bg-gray-50 transition-all flex items-center justify-center"
            >
              深入了解吗？
            </button>
          </div>
        </motion.div>

        {/* Image Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-20 relative group"
        >
          {/* Carousel Container */}
          <div className="relative w-full h-auto rounded-2xl shadow-2xl border border-gray-200 overflow-hidden bg-white">
            {/* Images */}
            <div className="relative aspect-[2/1]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={images[currentSlide]}
                  alt={`PARA System Screenshot ${currentSlide + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index
                  ? 'bg-gray-900 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const BentoGrid = () => {
  const cards = [
    {
      title: "Projects",
      subtitle: "正在进行",
      desc: "有明确目标和截止日期的事情。完成即归档。",
      icon: <FolderKanban className="w-8 h-8 mb-4 text-blue-600" />,
      items: ["下周汇报", "生日派对", "月度读书"],
      colSpan: "md:col-span-1",
      bg: "bg-white"
    },
    {
      title: "Areas",
      subtitle: "责任领域",
      desc: "你需要持续关注的人生板块，没有结束时间。",
      icon: <Target className="w-8 h-8 mb-4 text-green-600" />,
      items: ["健康管理", "财务规划", "职业发展"],
      colSpan: "md:col-span-1",
      bg: "bg-white"
    },
    {
      title: "Resources",
      subtitle: "资源库",
      desc: "感兴趣但暂时不急用的知识和灵感宝库。",
      icon: <Library className="w-8 h-8 mb-4 text-purple-600" />,
      items: ["设计灵感", "旅行攻略", "代码片段"],
      colSpan: "md:col-span-1",
      bg: "bg-white"
    },
    {
      title: "Archives",
      subtitle: "历史归档",
      desc: "已完成或暂不活跃的内容，保留经验备查。",
      icon: <Archive className="w-8 h-8 mb-4 text-amber-600" />,
      items: ["已交付项目", "过去照片", "旧笔记"],
      colSpan: "md:col-span-1",
      bg: "bg-gray-50"
    }
  ];

  return (
    <section id="concept" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">不仅仅是整理，<br />是关于<span className="text-gray-400">流动的逻辑</span>。</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Tiago Forte 提出的 PARA 方法论，用四个简单的维度，重构你的信息架构。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className={`p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 ${card.bg}`}
            >
              {card.icon}
              <div className="flex items-baseline gap-2 mb-2">
                <h3 className="text-2xl font-bold text-gray-900">{card.title}</h3>
                <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">{card.subtitle}</span>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">{card.desc}</p>
              <ul className="space-y-2">
                {card.items.map((item, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-500">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-2"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Comparison = () => {
  return (
    <section id="benefits" className="py-32 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              告别大海捞针，<br />
              <span className="text-gray-500">拥抱瞬间触达。</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              这是我五年实战打磨的系统。它不只是一个文件夹结构，而是一套让你从「想做」变成「在做」，从「焦虑」变成「掌控」的行动引擎。
            </p>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="p-3 bg-red-500/10 rounded-xl mr-6">
                  <Search className="text-red-500" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-gray-300">曾经的痛点</h4>
                  <p className="text-gray-500">文件乱七八糟，找东西像大海捞针；目标太多，不知道优先做什么。</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="p-3 bg-blue-500/10 rounded-xl mr-6">
                  <Zap className="text-blue-500" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-white">PARA 的解法</h4>
                  <p className="text-gray-400">3秒内定位任何文件。Projects 文件夹直接展示当前最重要的任务，告别选择困难。</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-20 blur-xl"></div>
            <div className="relative bg-gray-900 rounded-2xl border border-gray-800 p-8">
              <div className="flex items-center space-x-2 mb-6 border-b border-gray-800 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <span className="text-gray-300 flex items-center gap-3"><FolderKanban size={18} /> 1. Projects</span>
                  <span className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded">Focus</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg opacity-70">
                  <span className="text-gray-300 flex items-center gap-3"><Target size={18} /> 2. Areas</span>
                  <span className="text-xs text-gray-500">Maintain</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg opacity-70">
                  <span className="text-gray-300 flex items-center gap-3"><Library size={18} /> 3. Resources</span>
                  <span className="text-xs text-gray-500">Collect</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg opacity-70">
                  <span className="text-gray-300 flex items-center gap-3"><Archive size={18} /> 4. Archives</span>
                  <span className="text-xs text-gray-500">Store</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { icon: <Zap size={24} />, title: "60秒快速上手", desc: "无需复杂学习，按照指南60秒搭建基础框架，即刻可用。" },
    { icon: <Layout size={24} />, title: "多平台适配", desc: "Notion, Obsidian, Apple Notes, 甚至本地文件夹，通通适用。" },
    { icon: <Users size={24} />, title: "真实实战经验", desc: "不是理论搬运，而是2年实战打磨、1000+用户验证的系统。" },
    { icon: <RefreshCw size={24} />, title: "持续进化", desc: "购买不仅仅是文档，而是一个持续更新、不断优化的解决方案。" }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4 text-gray-900">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const tiers: PricingTier[] = [
    {
      name: "基础版",
      price: "¥49",
      description: "适合想要快速入门的初学者",
      features: [
        "PARA系统完整实操指南 (15章)",
        "基础 Notion 模板",
        "多平台设置方案 (Notes/Files)",
        "基础常见问题解答"
      ]
    },
    {
      name: "进阶版",
      price: "¥99",
      description: "最受欢迎的选择，含高级模板",
      recommended: true,
      features: [
        "包含基础版所有内容",
        "Notion 高级模板 (含自动化)",
        "实战案例库 (4大职业场景)",
        "社群答疑支持",
        "终身免费更新"
      ],
      comingSoon: true
    },
    {
      name: "旗舰版",
      price: "¥199",
      description: "1对1 咨询，打造私人定制",
      features: [
        "包含进阶版所有内容",
        "1对1 定制化咨询 (60分钟)",
        "专属 VIP 答疑渠道",
        "赠送 LifeOS 完整系统",
        "优先体验新功能"
      ],
      comingSoon: true
    }
  ];

  return (
    <section id="pricing" className="py-32 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">选择你的方案</h2>
          <p className="text-xl text-gray-500">一次付费，终身掌控。</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`relative p-8 rounded-3xl border flex flex-col ${tier.recommended
                ? 'border-blue-500 shadow-2xl scale-105 z-10 bg-white'
                : 'border-gray-200 bg-gray-50 hover:bg-white hover:border-gray-300 transition-all'
                }`}
            >
              {tier.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              {tier.comingSoon && (
                <div className="absolute top-4 right-4 bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  Coming Soon
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className="text-gray-500 text-sm mb-6 h-10">{tier.description}</p>
              <div className="text-4xl font-bold mb-8">{tier.price}</div>

              <ul className="space-y-4 mb-8 flex-1">
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start text-sm text-gray-700">
                    <CheckCircle2 className="w-5 h-5 mr-3 text-green-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled={tier.comingSoon}
                className={`w-full py-4 rounded-xl font-bold transition-all ${tier.comingSoon
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : tier.recommended
                      ? 'bg-black text-white hover:bg-gray-800'
                      : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50'
                  }`}>
                {tier.comingSoon ? '敬请期待' : '立即购买'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 bg-gradient-to-br from-gray-900 to-black rounded-3xl text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">🎁 前100位早鸟福利</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              前100位购买用户可获得：30分钟 1对1 答疑 + 加入实践者社群 + 优先体验新功能。
            </p>
            <div className="flex justify-center items-center gap-2 text-sm text-gray-400">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              优惠进行中
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    { question: "我是小白，能学会吗？", answer: "当然可以！PARA设计初衷就是简单易用，60秒就能上手。我的指南从零开始讲解，配有大量图文和案例，只要你会用电脑，就能轻松掌握。" },
    { question: "我不用 Notion，能用这个系统吗？", answer: "完全可以！PARA是一套底层逻辑，适用于任何工具。我提供了Apple Notes、电脑文件夹、云盘等多种平台的设置方案。" },
    { question: "购买后多久能收到资料？", answer: "付款后立即发送！所有资料都是电子版，通过微信或邮箱发送，随时随地可以学习。" },
    { question: "如果不满意可以退款吗？", answer: "我对内容质量有信心。如果购买后7天内觉得不适合，可以联系我全额退款，无需理由。" },
    { question: "需要花很多时间维护吗？", answer: "不需要！PARA最大的优势就是轻量维护。每周只需5分钟整理一次，就能保持系统运转。" },
  ];

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">常见问题</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 cursor-pointer" onClick={() => setOpenIndex(openIndex === idx ? null : idx)}>
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg text-gray-900">{faq.question}</h3>
                <span className="text-gray-400 text-2xl font-light">{openIndex === idx ? '−' : '+'}</span>
              </div>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-gray-500 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">P</div>
              <span className="font-bold text-xl">PARA System</span>
            </div>
            <p className="text-gray-500 mb-6 max-w-sm">
              专注于 Notion、AI 工具、个人效率提升。帮助更多人通过系统化思维，掌控数字生活。
            </p>
            <div className="flex space-x-4">
              {/* Social icons would go here */}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">联系方式</h4>
            <p className="text-gray-500 mb-2">微信: NeymarJaMo</p>
            <p className="text-gray-500">备注: PARA</p>
          </div>

          <div>
            <h4 className="font-bold mb-6">法律信息</h4>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li className="hover:text-black cursor-pointer">隐私政策</li>
              <li className="hover:text-black cursor-pointer">服务条款</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-gray-100 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} ThoughtsCounts. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <Hero />
      <Features />
      <BentoGrid />
      <Comparison />

      {/* Testimonials Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center text-3xl font-bold mb-16">用户反馈</h2>
          <div className="flex flex-col md:flex-row gap-8">
            {[
              { name: "李明", role: "产品经理", content: "用了PARA之后，同时管理5个项目也不慌了。每天早上打开Projects文件夹，立即知道今天的重点。" },
              { name: "小红", role: "自媒体创作者", content: "作为创作者，灵感和素材特别多。现在Resources文件夹成了我的宝库，每次创作都能快速找到灵感！" },
              { name: "王芳", role: "程序员", content: "技术文档、项目代码、学习笔记，之前桌面全是文件夹。现在用PARA，整个数字空间焕然一新。" }
            ].map((t, i) => (
              <div key={i} className="flex-1 bg-gray-50 p-8 rounded-2xl">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
                <p className="text-gray-600 mb-6 italic">"{t.content}"</p>
                <div className="font-bold">{t.name}</div>
                <div className="text-sm text-gray-400">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Pricing />
      <FAQ />

      {/* CTA Bottom */}
      <section className="py-24 bg-gray-900 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">60秒后，<br />拥有井井有条的数字世界。</h2>
          <button
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 bg-white text-black rounded-full text-lg font-bold hover:bg-gray-200 transition-all transform hover:scale-105"
          >
            立即获取完整系统
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}