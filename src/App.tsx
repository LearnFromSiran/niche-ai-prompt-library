import React, { useState, useEffect, useMemo } from 'react';

// ============================================================================
// PREMIUM & FREE CORE DATASETS
// ============================================================================

const CATEGORIES = [
  { id: 'all', name: 'All Collections', color: 'slate', icon: 'grid' },
  { id: 'niche-ai', name: 'Niche AI Builders', color: 'cyan', icon: 'sparkles' },
  { id: 'real-estate', name: 'Real Estate Agents', color: 'emerald', icon: 'home' },
  { id: 'hr', name: 'HR & People Ops', color: 'indigo', icon: 'users' },
  { id: 'marketing', name: 'Marketing Specialists', color: 'pink', icon: 'megaphone' },
  { id: 'premium', name: 'Pro Locked Formulas', color: 'amber', icon: 'crown' }
];

const PRESET_PROMPTS = [
  // --- NICHE AI BUSINESS PROMPTS ---
  {
    id: 'niche-ai-validator',
    category: 'niche-ai',
    title: 'AI Micro-Niche Opportunity Validator',
    isPremium: false,
    description: 'Score an AI product idea for urgency, buyer clarity, workflow pain, competition, MVP simplicity, and willingness to pay.',
    template: 'You are a strict AI startup validation advisor. Evaluate this AI micro-niche idea: [niche idea]. Target buyer: [specific buyer]. Current painful workflow: [manual workflow]. Budget range or willingness to pay: [budget signal]. Existing alternatives: [alternatives]. Score the idea from 1-10 across urgency, buyer clarity, frequency, willingness to pay, AI advantage, build complexity, and competition risk. Then give: 1. A sharper niche positioning statement, 2. The smallest paid MVP, 3. Three buyer interview questions, 4. One 7-day validation experiment, and 5. A kill/continue recommendation.'
  },
  {
    id: 'niche-ai-offer',
    category: 'niche-ai',
    title: 'Paid AI Offer Positioning Builder',
    isPremium: false,
    description: 'Transform a raw AI tool idea into a clear paid offer with buyer pain, outcome, proof, scope, and pricing tiers.',
    template: 'You are a productized AI service strategist. Turn this idea into a compelling paid offer: [AI product or service idea]. Target niche: [target niche]. Main business outcome: [desired outcome]. Buyer objections: [objections]. Delivery model: [SaaS, automation, chatbot, agent, templates, consulting]. Create: 1. One-sentence positioning, 2. Before/after transformation, 3. Three pricing tiers, 4. Deliverables included, 5. Guarantee or risk reversal, 6. Landing page hero copy, and 7. A concise cold DM pitch.'
  },
  {
    id: 'niche-ai-agent-spec',
    category: 'niche-ai',
    title: 'AI Agent MVP Specification',
    isPremium: false,
    description: 'Design a lean, buildable AI agent with inputs, outputs, decision rules, human review points, and launch scope.',
    template: 'You are a senior AI product manager. Design an MVP specification for an AI agent that helps [target user] accomplish [job to be done]. Required inputs: [inputs]. Desired outputs: [outputs]. Risk constraints: [risks or compliance concerns]. Write: 1. Core user story, 2. MVP feature list, 3. Non-goals for version one, 4. Agent workflow steps, 5. Prompt architecture, 6. Data needed, 7. Human approval checkpoints, 8. Success metrics, and 9. A two-week build plan.'
  },
  {
    id: 'niche-ai-content-engine',
    category: 'niche-ai',
    title: 'Niche AI Content Engine',
    isPremium: false,
    description: 'Create authority-building content angles for a narrow AI product so customers understand the pain and buy faster.',
    template: 'You are a niche B2B content strategist. Build a 30-day content engine for an AI offer serving [target niche]. Product promise: [product promise]. Buyer pain: [pain point]. Channels: [channels]. Generate: 10 problem-aware posts, 8 education posts, 6 proof posts, 4 objection-handling posts, and 2 direct offer posts. Each post needs a hook, key point, CTA, and the buyer intent stage.'
  },

  // --- REAL ESTATE PROMPTS ---
  {
    id: 're-listing',
    category: 'real-estate',
    title: 'Inclusive Property Listing Generator',
    isPremium: false,
    description: 'Generate polished, highly persuasive property listing copy optimized to highlight key features, layout benefits, and location context without relying on tired real estate clichﾃｩs.',
    template: 'You are an elite real estate marketing copywriter. Write a compelling 180-word property listing description for a [property type] located in [neighborhood or city]. The target buyers are [target audience, e.g., young families, downsizers]. The listing must emphasize these key standout features: [highlight features, e.g., smart-home integration, chef-kitchen]. Maintain a [desired tone, e.g., warm, sophisticated] tone throughout. Conclude with a strong, urgent call to action inviting readers to book a private showing. Avoid clichﾃｩ phrases such as "nestled", "won\'t last long", or "dream home".'
  },
  {
    id: 're-social',
    category: 'real-estate',
    title: 'High-Engagement Social Media Teaser',
    isPremium: false,
    description: 'Create high-engagement captions for Instagram, Facebook, and LinkedIn to generate instant messages, leads, and viewing signups.',
    template: 'You are a social media growth manager for a boutique real estate brokerage. Craft an engaging social media post promoting a newly listed [property type] in [neighborhood or city]. Highlight the open, light-filled layout, the proximity to [local amenity], and the seller\'s willingness to [buyer incentive, e.g., pay closing costs, offer warranty]. Keep the text under 120 words. Use a high-energy but professional tone. Include exactly 5 relevant, localized hashtags and end with a call to action directing readers to slide into your DMs or click the link in bio for private viewing times.'
  },
  {
    id: 're-market-update',
    category: 'real-estate',
    title: 'Monthly Neighborhood Authority Newsletter',
    isPremium: false,
    description: 'Establish absolute geographical authority with buyers and sellers by summarizing neighborhood trends, sales volumes, and days-on-market stats.',
    template: 'You are a real estate trusted advisor preparing a monthly neighborhood market update newsletter. Write a 200-word email newsletter targeting [buyers or sellers] in the [neighborhood or zip code] area. Provide the following metrics in bullet-point format: Median Sale Price is [median price], Average Days on Market is [days on market], and Inventory level is [inventory trend]. Explain exactly what these trends mean for your readers this season. Use a confident, reassuring, and analytical tone. Conclude with an invitation to schedule a complimentary home equity valuation consultation.'
  },
  {
    id: 're-open-house',
    category: 'real-estate',
    title: 'Open House Fast Follow-Up Email',
    isPremium: false,
    description: 'Send a strategic relationship-building email to open house attendees within 2 hours of the event to capture representation.',
    template: 'You are an attentive real estate agent following up after today\'s open house. Write a warm and brief follow-up email to a prospective buyer who visited the [property type] at [address]. Reference how busy the viewing was and highlight [standout property feature] which seemed to resonate with visitors. Ask one simple low-friction question: "Are you looking to buy within the next 30 days, or are you just testing the neighborhood waters?" Keep the tone professional, friendly, and low-pressure.'
  },
  
  // --- HR & PEOPLE OPS PROMPTS ---
  {
    id: 'hr-job-desc',
    category: 'hr',
    title: 'Bias-Free Inclusive Job Description',
    isPremium: false,
    description: 'Produce inclusive, gender-neutral job descriptions that focus on objective impact, collaboration, and psychological safety.',
    template: 'You are a Senior Talent Acquisition Lead. Write an inclusive, gender-neutral job description for a [job title] in the [department name] at [company name]. Outline the 3 core high-impact responsibilities: [list responsibilities], required competencies: [list competencies], and the company benefits package: [list benefits]. Highlight our unique remote-first and psychological safety culture. Ensure the language contains no gendered terms, corporate buzzwords, or unnecessary educational barriers. Keep the entire description under 200 words.'
  },
  {
    id: 'hr-interview-questions',
    category: 'hr',
    title: 'Behavioral Culture-Fit Rubric',
    isPremium: false,
    description: 'Construct a precise structural behavioral screening rubric designed to assess teamwork, accountability, and problem-solving.',
    template: 'You are preparing an interview panel questionnaire for candidates applying to the [job title] role. Generate 5 behavioral screening questions designed specifically to assess the candidates proficiency in [key quality, e.g., conflict resolution, ambiguity tolerance]. For each question, provide a detailed "High-Proficiency Answer Guide" representing what a stellar response looks like. Present the questions and guide as clear, structured bullet points.'
  },
  {
    id: 'hr-onboarding',
    category: 'hr',
    title: 'First-Week Hybrid Onboarding Sequence',
    isPremium: false,
    description: 'Onboard remote or hybrid candidates seamlessly with an structured, friendly first-week schedule that prevents immediate burnout.',
    template: 'You are an Employee Experience specialist. Draft a comprehensive onboarding welcome email for a new hire joining as a [role title] starting on [start date]. Include a warm, enthusiastic welcome, a brief outline of the team culture, and a structured day-by-day plan for their first 3 days focused on connection rather than documentation. Mention that their dedicated onboarding buddy is [buddy name]. Use an energetic, supportive, and professional tone.'
  },

  // --- MARKETING PROMPTS ---
  {
    id: 'mkt-blog-ideas',
    category: 'marketing',
    title: 'Topical Authority SEO Cluster Plan',
    isPremium: false,
    description: 'Generate high-CTR keyword clusters, blog article titles, and structured outlines designed to rank on Google search result pages.',
    template: 'You are an SEO content architect. Generate 5 distinct, high-impact blog post ideas targeting the core topical keyword "[target keyword]" for [industry/niche]. For each idea, deliver: 1. A catchy, SEO-optimized title under 60 characters, 2. A brief 3-sentence editorial summary, and 3. A structured 4-part logical outline. Ensure the topics address search queries ranging from informational to transactional intent.'
  },
  {
    id: 'mkt-social-campaign',
    category: 'marketing',
    title: 'Multi-Channel Viral Product Launch',
    isPremium: false,
    description: 'Scale a product launch campaign across LinkedIn, Instagram, and X by tailoring tone-of-voice to match each platform.',
    template: 'You are a multi-channel digital marketer promoting the launch of [product or service name]. Create 3 distinct promotional copy assets tailored specifically for: 1. LinkedIn (thought-leadership, data-backed, high-professionalism), 2. X/Twitter (hook-driven, punchy, brief, formatted with line breaks), and 3. Instagram (visually narrative, value-first, emoji-punctuated). Each asset must include a clear, single call to action to sign up on the waiting list and include relevant hashtags.'
  },
  {
    id: 'mkt-email-funnel',
    category: 'marketing',
    title: 'High-Ticket Nurture Welcome Sequence',
    isPremium: false,
    description: 'Draft a three-part email automation sequence designed to transition cold subscribers into high-intent discovery call bookings.',
    template: 'You are a direct-response copywriter. Write a 3-part email welcome nurture sequence for new subscribers of [your business or newsletter name]. Email 1 (Day 1): Deliver the promised lead magnet and establish a core belief shift. Email 2 (Day 3): Share a transformation case study demonstrating how a client solved [core problem]. Email 3 (Day 5): Pitch an exclusive, limited invitation to book a private diagnostic strategy call. Provide 3 alternative high-open subject lines for each email.'
  },

  // --- PREMIUM CLASSIFIED SECRETS (DRIVES MONETIZATION & Stripe/Gumroad sales) ---
  {
    id: 'prem-re-funnel',
    category: 'premium',
    title: 'Premium Real Estate Funnel Suite',
    isPremium: true,
    description: 'Unlock this highly optimized 3-step high-converting copy blueprint for suburban lead capture campaigns.',
    template: 'You are a master real estate lead-generation expert. Draft a 3-step Facebook Ad sequence for a listing in [suburban area] priced at [listing price]. Ad 1: Hook the passive browser with [hook]. Ad 2: Retarget website visitors with social proof and [scarcity factor]. Ad 3: Direct-to-Lead form ad inviting buyers to download [lead magnet name]. For each ad, output: Headline, Primary Text, Image/Video concept description, and Call to Action.'
  },
  {
    id: 'prem-hr-retention',
    category: 'premium',
    title: 'Organizational Retention Risk Audit Rubric',
    isPremium: true,
    description: 'A masterpiece prompt used to run risk analyses on remote departments and identify communication bottlenecks.',
    template: 'You are a Senior organizational consultant specialized in retention. Design a comprehensive audit template to evaluate employee churn risk for a remote [department] team size of [team size]. Develop a 10-point evaluation checklist targeting compensation, cognitive burnout, alignment, and [custom factor]. For each risk area, provide a corresponding, objective diagnostic interview question and 3 progressive intervention strategies.'
  },
  {
    id: 'prem-mkt-funnel',
    category: 'premium',
    title: 'High-Ticket Agency Welcome & Retargeting Sequence',
    isPremium: true,
    description: 'Generate a high-conversion welcome email sequence structure used by digital agencies selling premium services.',
    template: 'You are an elite direct-response email marketer. Write a 5-part email automation sequence designed to onboard and upsell new signups for [product/service] priced at [price point]. Email 1: Frame the problem and build trust. Email 2: The paradigm shift hook. Email 3: Introducing the mechanism of action. Email 4: Addressing friction objections. Email 5: Ultimate scarcity pitch with deadline for [bonus]. For each email, deliver 3 alternative high-open rate subject lines and a full high-fidelity copy template.'
  },
  {
    id: 'prem-seo-pillar',
    category: 'premium',
    title: 'Pillar Page Topical Authority Generator',
    isPremium: true,
    description: 'Generate complete thematic clusters, sub-topics, semantic relationships and optimized meta packages.',
    template: 'You are an expert SEO architect. Build a highly detailed Topical Authority Map for the main keyword phrase: "[core keyword]". Generate 1 pillar page strategy and 8 sub-topic cluster articles categorized by user intent (Informational, Commercial, Navigational). For each sub-topic, provide: Semantic keyword modifiers, high-relevance internal linking anchor guidelines, search intent target, and draft an optimized meta description under 155 characters.'
  }
];

const CURATED_TOOLS = [
  {
    name: "ChatGPT Plus (OpenAI)",
    category: "General Intelligence & Custom GPTs",
    description: "The gold standard for conversational brainstorming, creative ideation, and rapid prototype drafting. Leverage our custom templates with GPT-4o for flawless outputs.",
    badge: "Industry Favorite",
    link: "https://chatgpt.com"
  },
  {
    name: "Claude Pro (Anthropic)",
    category: "Elite Copywriting & Coding Workspace",
    description: "Renowned for its natural, nuanced writing voice, deep context capacity, and high-fidelity logical reasoning. Outstanding for premium agency copy.",
    badge: "Staff Pick",
    link: "https://claude.ai"
  },
  {
    name: "Gemini Advanced (Google)",
    category: "Search-Grounded Workflows",
    description: "Excel at compiling real-time Google search summaries, handling large document attachments, and running fast API requests inside our sandbox playground.",
    badge: "API Integrator",
    link: "https://gemini.google.com"
  }
];

const VALIDATED_MICRO_NICHES = [
  {
    title: 'AI Intake Follow-Up Assistant',
    buyer: 'solo immigration lawyers serving Japanese-speaking clients',
    pain: 'they waste hours rewriting intake notes, follow-up emails, and document request messages',
    budget: '$49-$199/month if it saves 3+ hours weekly',
    delivery: 'AI intake assistant + prompt workflow + approval checklist',
    channel: 'LinkedIn, local business groups, cold email, and partner webinars',
    score: 84,
    free: true
  },
  {
    title: 'AI Listing Copy Kit for Boutique Realtors',
    buyer: 'solo real estate agents with 3-10 active listings per month',
    pain: 'they need polished listing copy, social teasers, and open-house follow-ups but rewrite everything manually',
    budget: '$29-$99/month for faster listing launches',
    delivery: 'listing copy generator + social captions + follow-up email workflow',
    channel: 'local realtor Facebook groups, Instagram DMs, and brokerage newsletters',
    score: 78,
    free: true
  },
  {
    title: 'AI Review Reply System for Dental Clinics',
    buyer: 'small dental clinics with 1-5 locations',
    pain: 'they ignore or delay Google review replies, hurting local trust and search conversion',
    budget: '$49-$149/month if it improves reputation workflow consistency',
    delivery: 'review response prompt system + escalation rules + monthly reporting template',
    channel: 'cold email to clinic managers, local SEO agencies, and dental practice groups',
    score: 82,
    free: true
  },
  {
    title: 'AI Job Description Cleaner for HR Consultants',
    buyer: 'independent HR consultants serving small businesses',
    pain: 'they spend too much time rewriting biased, bloated, unclear job descriptions',
    budget: '$39-$129/month for faster client delivery',
    delivery: 'job description rewrite workflow + bias checklist + interview rubric generator',
    channel: 'LinkedIn posts, HR communities, and direct outreach to fractional HR consultants',
    score: 76,
    free: true
  },
  {
    title: 'AI SOP Builder for Cleaning Companies',
    buyer: 'residential cleaning businesses with 5-30 cleaners',
    pain: 'owners train staff verbally and lack consistent checklists for recurring jobs',
    budget: '$49-$199/month if it reduces training mistakes',
    delivery: 'SOP generator + room-by-room checklist templates + trainer handoff pack',
    channel: 'cleaning business Facebook groups, YouTube comments, and local business communities',
    score: 86,
    free: false
  },
  {
    title: 'AI Proposal Builder for Web Design Freelancers',
    buyer: 'freelance web designers selling $1k-$5k projects',
    pain: 'they lose deals because proposals are slow, vague, or not outcome-focused',
    budget: '$19-$79/month or $49 template pack',
    delivery: 'proposal generator + scope checklist + objection handling email sequence',
    channel: 'Twitter/X build-in-public, freelance Discords, and cold DM replies',
    score: 81,
    free: false
  },
  {
    title: 'AI Parent Update Writer for Tutoring Centers',
    buyer: 'local tutoring centers with 30-200 students',
    pain: 'staff struggle to write consistent parent progress updates after sessions',
    budget: '$49-$149/month if it saves admin time and improves parent retention',
    delivery: 'progress update generator + tone controls + retention risk flags',
    channel: 'education owner groups, local tutoring directories, and email outreach',
    score: 83,
    free: false
  },
  {
    title: 'AI Menu Description Optimizer for Small Restaurants',
    buyer: 'independent restaurants updating menus seasonally',
    pain: 'menu descriptions are generic and do not highlight margin-friendly dishes',
    budget: '$29-$99 per menu refresh',
    delivery: 'menu copy optimizer + upsell language + dietary tag checklist',
    channel: 'local restaurant associations, Instagram DMs, and food service consultants',
    score: 74,
    free: false
  },
  {
    title: 'AI Client Recap Writer for Fitness Coaches',
    buyer: 'online fitness coaches managing 20-100 clients',
    pain: 'they spend evenings writing check-in recaps, habit notes, and accountability messages',
    budget: '$29-$99/month if it saves 5+ hours weekly',
    delivery: 'client check-in recap workflow + tone presets + risk flag checklist',
    channel: 'fitness coach communities, Instagram, and coaching software groups',
    score: 85,
    free: false
  },
  {
    title: 'AI Grant Drafting Assistant for Nonprofit Consultants',
    buyer: 'grant writers and nonprofit consultants serving small nonprofits',
    pain: 'they repeatedly rewrite organization summaries, impact narratives, and budget justifications',
    budget: '$99-$299/month if it speeds up grant draft preparation',
    delivery: 'grant narrative prompt system + evidence checklist + reviewer risk audit',
    channel: 'LinkedIn, nonprofit consultant directories, and grant writer associations',
    score: 88,
    free: false
  }
];

// ============================================================================
// UTILITY HELPERS
// ============================================================================

const parsePlaceholders = (text: string): string[] => {
  if (!text) return [];
  const regex = /\[([^\]]+)\]/g;
  const matches: string[] = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (!matches.includes(match[1])) {
      matches.push(match[1]);
    }
  }
  return matches;
};

// ============================================================================
// MAIN APPLICATION
// ============================================================================

export default function App() {
  // Navigation & Page State
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  
  // App Personalization & Affiliate Override States (For passive income control)
  const [gumroadLink, setGumroadLink] = useState('https://gumroad.com/l/your-premium-pass');
  const [affiliateTag, setAffiliateTag] = useState('nicheai');
  const [sponsorBannerText, setSponsorBannerText] = useState('Creator Notice: Drive traffic using specific social media niches. Capture email addresses below to build your recurring /mo list asset.');
  const [sponsorBannerLink, setSponsorBannerLink] = useState('#lead-generation-anchor');
  
  // Lead Generation Capture System (Build your newsletter list)
  const [emailForUnlock, setEmailForUnlock] = useState('');
  const [leadCaptured, setLeadCaptured] = useState(() => {
    try {
      return localStorage.getItem('niche_lead_captured') === 'true';
    } catch { return false; }
  });

  // Custom Saved Prompts State
  const [customPrompts, setCustomPrompts] = useState(() => {
    try {
      const saved = localStorage.getItem('niche_custom_prompts');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    } catch { return []; }
  });

  // Favorite Prompts State
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('niche_favorites');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      }
      return [];
    } catch { return []; }
  });

  // Paywall Trigger & Unlock States
  const [isUnlocked, setIsUnlocked] = useState(() => {
    try {
      return localStorage.getItem('niche_premium_unlocked') === 'true';
    } catch { return false; }
  });
  const [showPaywallModal, setShowPaywallModal] = useState(false);

  // Creator Studio/Admin Panel toggles
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Traffic / Earnings Simulator Settings (To map the $300/month roadmap)
  const [simTraffic, setSimTraffic] = useState(2500); // monthly visits
  const [simConversionRate, setSimConversionRate] = useState(1.5); // % conversion for premium checkout
  const [simPremiumPrice, setSimPremiumPrice] = useState(19); // $ per premium pass
  const [simAffiliateClicks, setSimAffiliateClicks] = useState(180); // affiliate clicks
  const [simAffiliateComm, setSimAffiliateComm] = useState(6.50); // average commission $

  // Current Prompt Interactive Editor State
  const [selectedPrompt, setSelectedPrompt] = useState(PRESET_PROMPTS[0]);
  const [editorValues, setEditorValues] = useState<Record<string, string>>({});
  const [activePlaceholderList, setActivePlaceholderList] = useState<string[]>([]);
  const [customFormulaTitle, setCustomFormulaTitle] = useState('');
  const [customFormulaBody, setCustomFormulaBody] = useState('');

  // Live Testing Sandbox State
  const [sandboxPromptInput, setSandboxPromptInput] = useState('');
  const [aiOutput, setAiOutput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiErrorMessage, setAiErrorMessage] = useState('');
  const [systemInstructions, setSystemInstructions] = useState('You are an expert, context-aware AI assistant optimized to execute templates with strict constraints.');

  // Multi-Step Wizard Builder State
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardRole, setWizardRole] = useState('Senior Conversion Copywriter');
  const [wizardContext, setWizardContext] = useState('');
  const [wizardTask, setWizardTask] = useState('');
  const [wizardFormat, setWizardFormat] = useState('high conversion direct-response copy layout');
  const [wizardConstraints, setWizardConstraints] = useState('Under 200 words, highly professional, no buzzwords');
  const [wizardGeneratedPrompt, setWizardGeneratedPrompt] = useState('');

  // Guided launch studio state
  const [launchBuyer, setLaunchBuyer] = useState('solo immigration lawyers serving Japanese-speaking clients');
  const [launchPain, setLaunchPain] = useState('they waste hours rewriting intake notes, follow-up emails, and document request messages');
  const [launchBudget, setLaunchBudget] = useState('$49-$199/month if it saves 3+ hours weekly');
  const [launchDelivery, setLaunchDelivery] = useState('AI intake assistant + prompt workflow + approval checklist');
  const [launchChannel, setLaunchChannel] = useState('LinkedIn, local business groups, cold email, and partner webinars');
  const [launchBrief, setLaunchBrief] = useState('');

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactStatus, setContactStatus] = useState(''); 

  // Feedback notifications
  const [toastMessage, setToastMessage] = useState('');

  // ==========================================
  // SYNC PERSISTENCE
  // ==========================================
  useEffect(() => {
    localStorage.setItem('niche_custom_prompts', JSON.stringify(customPrompts));
  }, [customPrompts]);

  useEffect(() => {
    localStorage.setItem('niche_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('niche_premium_unlocked', isUnlocked ? 'true' : 'false');
  }, [isUnlocked]);

  useEffect(() => {
    localStorage.setItem('niche_lead_captured', leadCaptured ? 'true' : 'false');
  }, [leadCaptured]);

  // Load placeholders whenever the selected prompt changes
  useEffect(() => {
    if (selectedPrompt) {
      const placeholders = parsePlaceholders(selectedPrompt.template);
      setActivePlaceholderList(placeholders);
      const initialValues: Record<string, string> = {};
      placeholders.forEach(placeholder => {
        initialValues[placeholder] = '';
      });
      setEditorValues(initialValues);
    }
  }, [selectedPrompt]);

  // Sync customized template preview to AI Sandbox text area
  const customizedPromptText = useMemo(() => {
    if (!selectedPrompt) return '';
    let result = selectedPrompt.template;
    Object.keys(editorValues).forEach(placeholder => {
      const userVal = editorValues[placeholder];
      const replacement = userVal.trim() !== '' ? `**${userVal}**` : `[${placeholder}]`;
      result = result.split(`[${placeholder}]`).join(replacement);
    });
    return result;
  }, [selectedPrompt, editorValues]);

  // Clean version for clipboard copy (without asterisks highlight)
  const customizedPromptRaw = useMemo(() => {
    if (!selectedPrompt) return '';
    let result = selectedPrompt.template;
    Object.keys(editorValues).forEach(placeholder => {
      const userVal = editorValues[placeholder];
      const replacement = userVal.trim() !== '' ? userVal : `[${placeholder}]`;
      result = result.split(`[${placeholder}]`).join(replacement);
    });
    return result;
  }, [selectedPrompt, editorValues]);

  // Initialize the sandbox input with the active customized prompt whenever it updates.
  useEffect(() => {
    if (customizedPromptRaw) {
      setSandboxPromptInput(customizedPromptRaw);
    }
  }, [customizedPromptRaw]);

  const promptReadiness = useMemo(() => {
    const unresolved = activePlaceholderList.filter(placeholder => !editorValues[placeholder]?.trim());
    const filledCount = activePlaceholderList.length - unresolved.length;
    const completionScore = activePlaceholderList.length === 0
      ? 100
      : Math.round((filledCount / activePlaceholderList.length) * 100);
    const hasRole = /you are|act as|role:/i.test(customizedPromptRaw);
    const hasAudience = /target|buyer|customer|audience|user|niche/i.test(customizedPromptRaw);
    const hasOutput = /output|format|deliver|create|generate|write|provide/i.test(customizedPromptRaw);
    const hasConstraints = /under|avoid|must|exactly|include|exclude|tone|constraint/i.test(customizedPromptRaw);
    const structureScore = [hasRole, hasAudience, hasOutput, hasConstraints].filter(Boolean).length * 25;
    const score = Math.round((completionScore * 0.55) + (structureScore * 0.45));

    return {
      score,
      completionScore,
      unresolved,
      label: score >= 90 ? 'Sell-ready' : score >= 75 ? 'Strong draft' : score >= 55 ? 'Needs context' : 'Incomplete',
      color: score >= 90 ? 'emerald' : score >= 75 ? 'amber' : 'rose',
      checks: [
        { label: 'Expert role', pass: hasRole },
        { label: 'Buyer context', pass: hasAudience },
        { label: 'Output format', pass: hasOutput },
        { label: 'Quality constraints', pass: hasConstraints }
      ]
    };
  }, [activePlaceholderList, editorValues, customizedPromptRaw]);

  // ==========================================
  // EARNING CALCULATION METRICS
  // ==========================================
  const calculatedEarningStats = useMemo(() => {
    const premiumSales = Math.floor(simTraffic * (simConversionRate / 100));
    const premiumRevenue = premiumSales * simPremiumPrice;
    const affiliateRevenue = simAffiliateClicks * simAffiliateComm;
    const totalRevenue = premiumRevenue + affiliateRevenue;
    const progressPercent = Math.min((totalRevenue / 300) * 100, 100).toFixed(1);
    
    return {
      premiumSales,
      premiumRevenue,
      affiliateRevenue,
      totalRevenue: totalRevenue.toFixed(2),
      progressPercent,
      isGoalReached: totalRevenue >= 300
    };
  }, [simTraffic, simConversionRate, simPremiumPrice, simAffiliateClicks, simAffiliateComm]);

  // ==========================================
  // USER ACTIONS
  // ==========================================

  const handleCopyText = (text, label = "Prompt copied to clipboard!") => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showToast(label);
    } catch (err) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(label);
        });
      }
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => { setToastMessage(''); }, 3000);
  };

  const toggleFavorite = (promptId) => {
    if (favorites.includes(promptId)) {
      setFavorites(favorites.filter(id => id !== promptId));
      showToast("Removed from portfolio");
    } else {
      setFavorites([...favorites, promptId]);
      showToast("Saved to your custom playbook portfolio!");
    }
  };

  const selectAndFocusPrompt = (prompt) => {
    if (prompt.isPremium && !isUnlocked) {
      setShowPaywallModal(true);
      return;
    }
    setSelectedPrompt(prompt);
    const el = document.getElementById('interactive-editor-workspace');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ============================================================================
  // LEAD MAGNET EXPORTER & SIMULATED LIST BUILDER
  // ============================================================================
  const handleExportBundle = () => {
    const chosenPrompts = allPrompts.filter(p => favorites.includes(p.id));
    if (chosenPrompts.length === 0) {
      showToast("Please bookmark some prompts using the heart icon first!");
      return;
    }

    let output = `# Niche AI Premium Playbook - Curated Prompt Collection\n`;
    output += `Generated on ${new Date().toLocaleDateString()} | Empowering Workflow Automation\n\n`;
    output += `Import these prompts in ChatGPT, Claude, or Gemini. Replace bracketed parameters with your specific criteria.\n\n`;
    output += `---\n\n`;

    chosenPrompts.forEach((p, idx) => {
      output += `## ${idx + 1}. ${p.title}\n`;
      output += `**Category:** ${p.category.toUpperCase()} | ${p.isPremium ? '虫 Premium Recipe' : '笨ｨ Standard Workflow'}\n\n`;
      output += `> ${p.description}\n\n`;
      output += `### Ready-to-Use Prompt Blueprint:\n\`\`\`\n${p.template}\n\`\`\`\n\n`;
      output += `---\n\n`;
    });

    output += `\n*Automated via Niche Prompt Library. Scaling operational productivity by 300%.*`;

    // Download file locally as markdown file
    const element = document.createElement("a");
    const file = new Blob([output], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "Niche_AI_Playbook_Collection.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast("Downloaded curated playbook! Perfect to sell or use as a lead magnet.");
  };

  const getSmartExampleForPlaceholder = (placeholder: string) => {
    const key = placeholder.toLowerCase();
    if (key.includes('niche')) return 'solo immigration lawyers serving Japanese-speaking clients';
    if (key.includes('buyer') || key.includes('audience') || key.includes('user')) return 'busy boutique agency owners with 5-20 employees';
    if (key.includes('workflow') || key.includes('pain')) return 'manually reviewing client intake forms and rewriting follow-up emails';
    if (key.includes('budget') || key.includes('price')) return '$49-$199 per month if it saves 3+ hours weekly';
    if (key.includes('alternative')) return 'spreadsheets, generic ChatGPT prompts, outsourced admin support';
    if (key.includes('product') || key.includes('service') || key.includes('idea')) return 'an AI intake assistant that drafts client-ready follow-up emails';
    if (key.includes('outcome')) return 'reduce response time and increase booked consultations';
    if (key.includes('objection')) return 'data privacy, accuracy, setup time, and unclear ROI';
    if (key.includes('channel')) return 'LinkedIn, niche Facebook groups, cold email, and partner webinars';
    if (key.includes('tone')) return 'confident, practical, premium, and low-hype';
    if (key.includes('role') || key.includes('title')) return 'AI workflow strategist';
    if (key.includes('city') || key.includes('neighborhood')) return 'Austin, Texas';
    if (key.includes('feature')) return 'automated summaries, approval checklist, and branded exports';
    return 'specific, measurable business context';
  };

  const fillSmartExamples = () => {
    if (activePlaceholderList.length === 0) {
      showToast('This prompt has no variables to fill.');
      return;
    }

    const examples: Record<string, string> = {};
    activePlaceholderList.forEach(placeholder => {
      examples[placeholder] = editorValues[placeholder]?.trim() || getSmartExampleForPlaceholder(placeholder);
    });
    setEditorValues(examples);
    showToast('Filled variables with smart niche examples.');
  };

  const handleExportLaunchPack = () => {
    if (!selectedPrompt) return;

    const output = `# ${selectedPrompt.title} - Launch Pack

Readiness: ${promptReadiness.score}/100 (${promptReadiness.label})
Category: ${selectedPrompt.category}

## Final Prompt
\`\`\`
${customizedPromptRaw}
\`\`\`

## Buyer Promise
Use this prompt to produce faster, more structured, commercially useful output for a specific niche workflow.

## Quality Checklist
${promptReadiness.checks.map(check => `- ${check.pass ? '[x]' : '[ ]'} ${check.label}`).join('\n')}

## Unresolved Variables
${promptReadiness.unresolved.length ? promptReadiness.unresolved.map(item => `- ${item}`).join('\n') : '- None'}

## Suggested Productization
- Offer it as a one-click template inside a paid prompt library.
- Bundle it with a short Loom walkthrough and one done-for-you example.
- Add a 7-day validation worksheet so buyers know exactly how to use it.

## Sales Page Hook
Stop staring at a blank AI chat. Use this field-tested prompt workflow to turn a narrow business problem into a practical output in minutes.
`;

    const element = document.createElement('a');
    const file = new Blob([output], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedPrompt.id}_launch_pack.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast('Downloaded launch pack for this prompt.');
  };

  const handleLeadCapture = (e) => {
    e.preventDefault();
    if (!emailForUnlock || !emailForUnlock.includes('@')) {
      showToast("Please enter a valid email address.");
      return;
    }
    setLeadCaptured(true);
    showToast('Lead magnet unlocked. Scroll down to export your playbook.');
  };

  // ==========================================
  // CONTACT SUBMIT HANDLER
  // ==========================================
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      setContactStatus('error');
      return;
    }
    setContactStatus('success');
    // Clear form inputs
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  // ==========================================
  // WIZARD CONSTRUCTOR
  // ==========================================
  const generateWizardPrompt = () => {
    const formatted = `You are an elite, highly credentialed ${wizardRole.trim() || 'professional'}.
Context: ${wizardContext.trim() || 'No specific context provided.'}
Core Task & Specific Objective: ${wizardTask.trim() || 'Deliver pristine corporate strategy outputs.'}
Required Output Structure / Format: ${wizardFormat.trim()}
Constraints, Guardrails & Nuance details: ${wizardConstraints.trim()}`;
    setWizardGeneratedPrompt(formatted);
    setWizardStep(4);
  };

  const handleSaveWizardPrompt = () => {
    if (!wizardGeneratedPrompt) return;
    const newPromptObj = {
      id: `custom-${Date.now()}`,
      category: 'custom',
      title: 'Wizard Engineered Prompt',
      isPremium: false,
      description: wizardTask.slice(0, 80) + '...',
      template: wizardGeneratedPrompt
    };
    setCustomPrompts([newPromptObj, ...customPrompts]);
    setSelectedPrompt(newPromptObj);
    showToast("Prompt successfully added to your local library!");
    setActiveTab('home');
    setWizardStep(1);
    setWizardContext('');
    setWizardTask('');
  };

  const generateLaunchBrief = () => {
    const buyer = launchBuyer.trim() || 'a specific business buyer';
    const pain = launchPain.trim() || 'a costly manual workflow';
    const budget = launchBudget.trim() || 'a clear monthly budget';
    const delivery = launchDelivery.trim() || 'a simple AI workflow';
    const channel = launchChannel.trim() || 'direct outreach and niche communities';
    const urgencyScore = /hour|cost|lost|manual|delay|risk|client|revenue/i.test(pain) ? 8 : 6;
    const budgetScore = /\$|month|mo|budget|pay|price/i.test(budget) ? 8 : 5;
    const buildScore = /assistant|prompt|workflow|checklist|template|automation/i.test(delivery) ? 8 : 6;
    const totalScore = Math.round(((urgencyScore + budgetScore + buildScore) / 30) * 100);

    const brief = `# AI Micro-Niche Launch Brief

## Niche
${buyer}

## Pain Worth Solving
${pain}

## Commercial Signal
${budget}

## Smallest Paid Offer
${delivery}

## Niche Score
${totalScore}/100

Why: urgency ${urgencyScore}/10, budget clarity ${budgetScore}/10, build simplicity ${buildScore}/10.

## Paid Offer
We help ${buyer} solve "${pain}" using ${delivery}, so they can save time, respond faster, and reduce operational drag without hiring extra staff.

## Pricing
- Starter: $19 - template pack and checklist
- Pro: $49/month - reusable workflow, examples, and launch pack
- Done-with-you: $299 - setup, customization, and first workflow review

## Landing Page Hero
Headline: Stop losing hours to ${pain}.
Subheadline: Launch a practical AI workflow for ${buyer} using ${delivery}. Validate demand before you build a full SaaS.
CTA: Get the launch pack

## First Outreach Message
Hi [Name], I am testing a small AI workflow for ${buyer}. It helps with ${pain}. If I showed you a 3-minute demo, would you tell me whether this is worth paying for?

## 7-Day Validation Plan
Day 1: List 30 buyers from ${channel}.
Day 2: Send 15 short validation messages.
Day 3: Interview 3 buyers about the workflow pain.
Day 4: Create one demo using the prompt workflow.
Day 5: Ask for preorders or pilot users.
Day 6: Refine price and guarantee.
Day 7: Publish the offer page and send 20 follow-ups.

## Recommended Stack
- Landing page: Carrd, Framer, or Notion
- Checkout: Gumroad or Lemon Squeezy
- Email capture: Beehiiv or ConvertKit
- Automation: Zapier, Make, or n8n
- AI execution: ChatGPT, Claude, or Gemini
`;

    setLaunchBrief(brief);
    showToast('Generated launch brief. Copy or export it before building.');
  };

  const exportLaunchBrief = () => {
    if (!launchBrief) {
      showToast('Generate the launch brief first.');
      return;
    }

    const element = document.createElement('a');
    const file = new Blob([launchBrief], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'AI_Micro_Niche_Launch_Brief.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast('Downloaded AI micro-niche launch brief.');
  };

  const loadMicroNiche = (niche) => {
    if (!niche.free && !isUnlocked) {
      setShowPaywallModal(true);
      return;
    }

    setLaunchBuyer(niche.buyer);
    setLaunchPain(niche.pain);
    setLaunchBudget(niche.budget);
    setLaunchDelivery(niche.delivery);
    setLaunchChannel(niche.channel);
    setLaunchBrief('');
    showToast(`Loaded ${niche.title}. Generate the launch brief next.`);
  };

  // ==========================================
  // LOCAL PROMPT QUALITY LAB
  // ==========================================
  const testPromptWithGemini = async (promptToSend) => {
    if (!promptToSend || promptToSend.trim() === '') {
      setAiErrorMessage('Please enter a valid customized prompt to test.');
      return;
    }

    setIsAiLoading(true);
    setAiErrorMessage('');
    setAiOutput('');
    setActiveTab('sandbox'); 
    const cleanPrompt = promptToSend.replace(/\*\*/g, '').trim();
    setSandboxPromptInput(cleanPrompt);

    await new Promise(resolve => setTimeout(resolve, 450));

    const placeholders = parsePlaceholders(cleanPrompt);
    const hasRole = /you are|act as|role:/i.test(cleanPrompt);
    const hasAudience = /target|buyer|customer|audience|user|niche/i.test(cleanPrompt);
    const hasOutput = /output|format|deliver|create|generate|write|provide/i.test(cleanPrompt);
    const hasConstraints = /under|avoid|must|exactly|include|exclude|tone|constraint/i.test(cleanPrompt);
    const hasValidation = /score|validate|metric|experiment|test|rank|recommendation/i.test(cleanPrompt);
    const score = Math.min(
      100,
      35 +
        (hasRole ? 15 : 0) +
        (hasAudience ? 15 : 0) +
        (hasOutput ? 15 : 0) +
        (hasConstraints ? 10 : 0) +
        (hasValidation ? 10 : 0) -
        placeholders.length * 2
    );

    const recommendations = [
      hasRole ? 'Role is explicit enough for consistent model behavior.' : 'Add a specific expert role at the start.',
      hasAudience ? 'Buyer/audience context is present.' : 'Name the exact buyer, niche, or user segment.',
      hasOutput ? 'The output expectation is clear.' : 'Specify the exact deliverable and structure.',
      hasConstraints ? 'Useful constraints are included.' : 'Add limits for tone, length, exclusions, and quality bar.',
      placeholders.length === 0 ? 'No unresolved placeholders remain.' : `Fill these unresolved fields before selling/exporting: ${placeholders.join(', ')}.`
    ];

    const resultText = `Prompt Quality Lab Report

Score: ${score}/100
Commercial readiness: ${score >= 85 ? 'Ready to sell or ship as a premium template.' : score >= 70 ? 'Strong, but tighten the remaining gaps before charging.' : 'Needs stronger buyer context and deliverable constraints.'}

What works:
- ${recommendations.filter(item => !item.startsWith('Add') && !item.startsWith('Name') && !item.startsWith('Specify') && !item.startsWith('Fill')).join('\n- ') || 'The prompt has a workable foundation.'}

Improve next:
- ${recommendations.filter(item => item.startsWith('Add') || item.startsWith('Name') || item.startsWith('Specify') || item.startsWith('Fill')).join('\n- ') || 'Add one proof-oriented example output to make the template feel more premium.'}

Premium upgrade suggestion:
Add a final section asking the AI to produce "assumptions, risks, and next best action" so users get strategic judgment, not only raw copy.`;

    setAiOutput(resultText);
    setIsAiLoading(false);
  };

  // ==========================================
  // FILTERED PROMPT LISTS
  // ==========================================
  const allPrompts = useMemo(() => {
    return [...PRESET_PROMPTS, ...customPrompts];
  }, [customPrompts]);

  const filteredPrompts = useMemo(() => {
    if (!searchQuery) return allPrompts;
    const lowerQuery = searchQuery.toLowerCase();
    return allPrompts.filter(p => 
      p.title.toLowerCase().includes(lowerQuery) || 
      p.description.toLowerCase().includes(lowerQuery) ||
      p.template.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    );
  }, [allPrompts, searchQuery]);

  const categoryFilteredPrompts = useMemo(() => {
    if (activeTab === 'home' || activeTab === 'all') return filteredPrompts;
    if (activeTab === 'favorites') {
      return allPrompts.filter(p => favorites.includes(p.id));
    }
    if (activeTab === 'premium') {
      return filteredPrompts.filter(p => p.isPremium);
    }
    return filteredPrompts.filter(p => p.category === activeTab && !p.isPremium);
  }, [filteredPrompts, activeTab, allPrompts, favorites]);

  const buildAffiliateUrl = (link: string) => {
    const separator = link.includes('?') ? '&' : '?';
    return `${link}${separator}ref=${encodeURIComponent(affiliateTag)}`;
  };

  const renderSponsorSlot = (placement: string) => {
    if (isUnlocked) return null;

    return (
      <div className="bg-slate-900 border border-amber-400/20 rounded-2xl p-4 text-left space-y-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[9px] font-black uppercase tracking-widest text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2 py-1 rounded-full">
            Sponsored
          </span>
          <span className="text-[10px] text-slate-500">{placement}</span>
        </div>
        <div>
          <h4 className="text-sm font-black text-white">Promote an AI tool, course, or template here</h4>
          <p className="text-xs text-slate-400 leading-relaxed mt-1">
            This freemium slot is designed for affiliate links, sponsor deals, newsletter swaps, or your own paid prompt bundle.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href={gumroadLink}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl"
          >
            Sponsor this slot
          </a>
          <button
            onClick={() => setActiveTab('tools')}
            className="bg-slate-800 hover:bg-slate-700 text-white text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl"
          >
            View affiliate tools
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased font-sans selection:bg-indigo-500/30 selection:text-white">
      
      {/* GLOBAL TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 border border-indigo-400/30 transition-all duration-300 animate-slideUp">
          <svg className="w-5 h-5 text-emerald-300 animate-pulse shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-semibold text-xs tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* ============================================================================
          REVENUE SPONSOR / LEAD MAGNET CAPTURE NOTICE BAR
          ============================================================================ */}
      {sponsorBannerText && (
        <div className="bg-gradient-to-r from-amber-500/20 via-indigo-600/25 to-amber-500/20 text-white py-2.5 px-4 text-center border-b border-indigo-500/20 text-[11px] font-semibold tracking-wide flex items-center justify-center gap-2 flex-wrap">
          <span className="bg-amber-400 text-slate-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-sm">Passive blueprint</span>
          <span>{sponsorBannerText}</span>
          <a 
            href={sponsorBannerLink} 
            className="text-emerald-400 hover:text-emerald-300 underline font-extrabold"
          >
            Claim Blueprint &gt;          </a>
        </div>
      )}

      {/* ============================================================================
          HEADER / PREMIUM WORKSPACE NAVIGATION
          ============================================================================ */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo Area */}
            <button 
              onClick={() => { setActiveTab('home'); setSearchQuery(''); }} 
              className="flex items-center gap-3 text-left focus:outline-none group"
            >
              <div className="bg-gradient-to-tr from-amber-500 via-indigo-500 to-emerald-500 p-2.5 rounded-2xl text-slate-950 shadow-md shadow-indigo-500/10 group-hover:scale-105 transition-transform duration-200">
                <svg className="w-5.5 h-5.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="font-extrabold text-base sm:text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  Niche AI Launch Studio <span className="text-[9px] font-black tracking-widest text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-md ml-1.5 uppercase">PRO</span>
                </h1>
                <p className="text-[10px] text-indigo-400 font-bold tracking-widest uppercase hidden sm:block">Micro-niche validation and offer builder</p>
              </div>
            </button>

            {/* Desktop Navigation Link Tabs */}
            <nav className="hidden lg:flex items-center space-x-1">
              {[
                { id: 'home', label: 'All Presets' },
                { id: 'real-estate', label: 'Real Estate Agents' },
                { id: 'hr', label: 'HR Professionals' },
                { id: 'marketing', label: 'Marketers' },
                { id: 'premium', label: 'Pro Formulas' },
                { id: 'tools', label: 'AI Software Directory' },
                { id: 'pricing', label: 'Pricing' },
                { id: 'contact', label: 'Contact Curation' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 ${
                    activeTab === tab.id 
                      ? 'bg-slate-800 text-emerald-400 border border-slate-700/60 shadow-inner' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {/* Action Group: Admin panel toggle & Favorites bar */}
            <div className="flex items-center gap-3">
              
              <button
                onClick={() => setShowAdminPanel(!showAdminPanel)}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all border ${
                  showAdminPanel 
                    ? 'bg-emerald-500 text-slate-950 border-emerald-300' 
                    : 'bg-slate-950 text-emerald-400 border-slate-800 hover:bg-slate-900'
                }`}
                title="Creator Studio & Monetization Config"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                {showAdminPanel ? "Close Studio" : "Studio Panel"}
              </button>

              <button 
                onClick={() => setActiveTab('favorites')}
                className={`relative p-2.5 rounded-xl transition-all ${
                  activeTab === 'favorites' ? 'bg-slate-800 text-pink-400' : 'text-slate-400 hover:text-white hover:bg-slate-850'
                }`}
                title="View Bookmarked Collection"
              >
                <svg className="w-5 h-5" fill={favorites.length > 0 ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {favorites.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('sandbox')}
                className="hidden md:flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-slate-950 font-black px-4.5 py-2.5 rounded-xl text-xs tracking-wider uppercase transition-all duration-200 shadow-lg"
              >
                Sandbox
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile scrollable tabs view */}
      <div className="lg:hidden bg-slate-900 border-b border-slate-800 overflow-x-auto flex px-3 py-2.5 gap-1.5 scrollbar-none">
        {[
          { id: 'home', label: 'All Collections' },
          { id: 'real-estate', label: 'Real Estate' },
          { id: 'hr', label: 'HR Ops' },
          { id: 'marketing', label: 'Marketing' },
          { id: 'premium', label: 'Premium Pro' },
          { id: 'tools', label: 'AI Directory' },
          { id: 'pricing', label: 'Pricing' },
          { id: 'contact', label: 'Contact' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); }}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-[11px] font-bold transition-all ${
              activeTab === tab.id 
                ? 'bg-slate-850 text-emerald-400 border border-slate-700' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ============================================================================
          CREATOR STUDIO / ADMIN CONTROL CENTER
          ============================================================================ */}
      {showAdminPanel && (
        <div className="bg-slate-900 border-b border-indigo-500/30 py-8 px-4 sm:px-6 lg:px-8 text-slate-200 shadow-2xl relative">
          <div className="max-w-7xl mx-auto space-y-6">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <span className="bg-emerald-400/15 text-emerald-400 font-extrabold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full border border-emerald-400/30">
                  Creator Monetization Dashboard (Local Config Only)
                </span>
                <h3 className="text-2xl font-black text-white mt-2 tracking-tight">Your $300/Month Passive Income Blueprint</h3>
                <p className="text-xs text-slate-400 mt-1">Configure your product pricing, affiliate identifiers, and simulate your business growth curve below.</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Simulated Monthly Earnings</span>
                  <p className="text-xl font-black text-emerald-400">${calculatedEarningStats.totalRevenue} / $300.00</p>
                </div>
                <div className="w-14 h-14 rounded-full border-4 border-slate-800 flex items-center justify-center font-extrabold text-xs text-white bg-indigo-950/40">
                  {calculatedEarningStats.progressPercent}%
                </div>
              </div>
            </div>

            {/* Income Goal Breakdown Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              <div className="bg-slate-950 p-4.5 rounded-2xl border border-slate-855 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                  <span>1. Platform Traffic</span>
                  <span className="text-indigo-400 font-bold text-[10px]">Visits/Mo</span>
                </h4>
                <input 
                  type="range" 
                  min="200" 
                  max="10000" 
                  step="100" 
                  value={simTraffic}
                  onChange={(e) => setSimTraffic(Number(e.target.value))}
                  className="w-full accent-emerald-400"
                />
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>{simTraffic.toLocaleString()} Visits</span>
                  <span className="text-emerald-400 font-normal">Conversion goal</span>
                </div>
                <p className="text-[10px] text-slate-500">Estimate monthly unique readers browsing your premium prompt blueprints.</p>
              </div>

              <div className="bg-slate-950 p-4.5 rounded-2xl border border-slate-855 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                  <span>2. Premium Conversions</span>
                  <span className="text-indigo-400 font-bold text-[10px]">{simConversionRate}% Rate</span>
                </h4>
                <input 
                  type="range" 
                  min="0.5" 
                  max="10" 
                  step="0.5" 
                  value={simConversionRate}
                  onChange={(e) => setSimConversionRate(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>{calculatedEarningStats.premiumSales} Sales/Mo</span>
                  <span>at ${simPremiumPrice}/pass</span>
                </div>
                <p className="text-[10px] text-slate-500">Percentage of visitors buying full premium unlocked bundle access.</p>
              </div>

              <div className="bg-slate-950 p-4.5 rounded-2xl border border-slate-855 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                  <span>3. Creator Pricing ($)</span>
                  <span className="text-indigo-400 font-bold text-[10px]">Per Sale</span>
                </h4>
                <input 
                  type="number" 
                  value={simPremiumPrice}
                  onChange={(e) => setSimPremiumPrice(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-slate-900 border border-slate-850 rounded-lg p-1.5 text-xs font-bold text-white focus:outline-none focus:border-indigo-500"
                />
                <p className="text-[10px] text-slate-400 font-semibold text-emerald-400">Yields: ${calculatedEarningStats.premiumRevenue}/month</p>
                <p className="text-[10px] text-slate-500">Customize the listing price you set on payment gateways like Gumroad or Stripe.</p>
              </div>

              <div className="bg-slate-950 p-4.5 rounded-2xl border border-slate-855 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                  <span>4. Affiliate Revenue</span>
                  <span className="text-indigo-400 font-bold text-[10px]">${calculatedEarningStats.affiliateRevenue}/mo</span>
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold uppercase mb-1">Clicks</label>
                    <input 
                      type="number" 
                      value={simAffiliateClicks}
                      onChange={(e) => setSimAffiliateClicks(Math.max(0, Number(e.target.value)))}
                      className="w-full bg-slate-900 border border-slate-850 rounded-lg p-1.5 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] text-slate-400 font-bold uppercase mb-1">Payout ($)</label>
                    <input 
                      type="number" 
                      step="0.5"
                      value={simAffiliateComm}
                      onChange={(e) => setSimAffiliateComm(Math.max(0, Number(e.target.value)))}
                      className="w-full bg-slate-900 border border-slate-850 rounded-lg p-1.5 text-xs text-white"
                    />
                  </div>
                </div>
                <p className="text-[10px] text-slate-500">Clicks and payouts on tools page, custom GPT referrals, or hosting deals.</p>
              </div>

            </div>

            {/* Custom URLs Config Section */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-200 uppercase tracking-wide">Stripe/Gumroad Premium Checkout Link</label>
                <input
                  type="text"
                  value={gumroadLink}
                  onChange={(e) => setGumroadLink(e.target.value)}
                  placeholder="https://gumroad.com/l/your-premium-pass"
                  className="w-full text-xs font-mono bg-slate-900 border border-slate-850 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
                <span className="text-[10px] text-slate-400 block leading-tight">Configuring this replaces checkout actions on locked prompt buttons.</span>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-200 uppercase tracking-wide">Affiliate Refer Tag Modifier</label>
                <input
                  type="text"
                  value={affiliateTag}
                  onChange={(e) => setAffiliateTag(e.target.value)}
                  placeholder="e.g. nicheai"
                  className="w-full text-xs font-mono bg-slate-900 border border-slate-855 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
                <span className="text-[10px] text-slate-400 block leading-tight">Appended automatically on your Tool outbound links to track payouts.</span>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-200 uppercase tracking-wide">Custom Announcement Banner</label>
                <input
                  type="text"
                  value={sponsorBannerText}
                  onChange={(e) => setSponsorBannerText(e.target.value)}
                  placeholder="Enter notice banner text..."
                  className="w-full text-xs bg-slate-900 border border-slate-855 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-500"
                />
                <span className="text-[10px] text-slate-400 block leading-tight">Appears at the absolute top of the page. Use to capture email subscribers!</span>
              </div>

            </div>

            {/* Simulated Live Traffic Performance Metrics */}
            <div className="flex flex-wrap justify-between items-center text-xs font-semibold text-slate-400 bg-slate-950 p-4 rounded-xl border border-indigo-500/10">
              <span className="flex items-center gap-1.5 text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                Passive Stream Target: ${calculatedEarningStats.totalRevenue} / $300.00
              </span>
              <span>
                {calculatedEarningStats.isGoalReached 
                  ? '脂 Fantastic! Your metrics successfully cross the $300 monthly benchmark!' 
                  : `笞・・Needs ${(300 - Number(calculatedEarningStats.totalRevenue)).toFixed(2)} more to cross monthly benchmark.`
                }
              </span>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================================
          GLOBAL HERO SECTION
          ============================================================================ */}
      {activeTab === 'home' && (
        <section className="relative overflow-hidden bg-slate-950 text-white py-14 md:py-20 border-b border-slate-800">
          <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full text-xs font-semibold bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 animate-bounce">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Newly Upgraded May 2026 Workflows
            </span>
            
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
              Find a Profitable AI Micro-Niche, <br />
              <span className="bg-gradient-to-r from-emerald-400 via-indigo-400 to-amber-300 bg-clip-text text-transparent">
                Build a Paid Offer in Minutes
              </span>
            </h2>
            
            <p className="max-w-3xl mx-auto text-sm md:text-lg text-slate-400 leading-relaxed font-light">
              Validate a niche idea, generate offer positioning, audit prompt quality, and export a launch-ready playbook before you spend weeks building the wrong AI product.
            </p>

            {/* Hero Global Filter */}
            <div className="max-w-xl mx-auto bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-md flex flex-col sm:flex-row gap-2">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search niche ideas, offers, agents, launch packs..."
                  className="block w-full pl-11 pr-4 py-3 bg-transparent border-0 text-white placeholder-slate-500 focus:ring-0 focus:outline-none text-xs sm:text-sm font-semibold"
                />
              </div>
              <button 
                onClick={() => {
                  const target = document.getElementById('browse-templates-header');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-5 py-3 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20 text-xs tracking-wider uppercase flex items-center justify-center"
              >
                Find a Niche
              </button>
            </div>

            {/* Quick action shortcuts */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-400 pt-2">
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Niche validation</span>
              <span className="w-1 h-1 rounded-full bg-slate-700"></span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Paid offer builder</span>
              <span className="w-1 h-1 rounded-full bg-slate-700"></span>
              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Launch pack export</span>
            </div>

            {!isUnlocked && (
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-800 px-2.5 py-1 rounded-full">Free plan: sponsor supported</span>
                <button onClick={() => setActiveTab('pricing')} className="text-[10px] font-black uppercase tracking-widest text-amber-300 underline">
                  Remove ads with Pro
                </button>
              </div>
            )}

          </div>
        </section>
      )}

      {/* ============================================================================
          MAIN PAGE BODY
          ============================================================================ */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* GUIDED AI NICHE LAUNCH WIZARD */}
        {activeTab === 'home' && (
          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl mb-12 border border-emerald-500/20 relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-5">
                <div>
                  <span className="bg-emerald-400/10 text-emerald-300 font-extrabold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-400/20">
                    Guided launch wizard
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black mt-3 mb-2">Build one sellable AI niche offer before you code anything.</h3>
                  <p className="text-slate-400 text-xs md:text-sm max-w-xl leading-relaxed">
                    Enter a buyer, painful workflow, budget signal, and delivery model. The studio generates a launch brief with scoring, pricing, landing copy, outreach, validation plan, and tool stack.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Buyer</label>
                    <input value={launchBuyer} onChange={(e) => setLaunchBuyer(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Budget Signal</label>
                    <input value={launchBudget} onChange={(e) => setLaunchBudget(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Painful Manual Workflow</label>
                    <input value={launchPain} onChange={(e) => setLaunchPain(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Paid Delivery</label>
                    <input value={launchDelivery} onChange={(e) => setLaunchDelivery(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Acquisition Channel</label>
                    <input value={launchChannel} onChange={(e) => setLaunchChannel(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button onClick={generateLaunchBrief} className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-5 py-3 rounded-xl transition-all text-xs tracking-wider uppercase">
                    Generate Launch Brief
                  </button>
                  <button onClick={exportLaunchBrief} className="bg-slate-800 hover:bg-slate-700 text-white font-black px-5 py-3 rounded-xl transition-all text-xs tracking-wider uppercase">
                    Export MD
                  </button>
                  <button onClick={() => handleCopyText(launchBrief || 'Generate the launch brief first.', 'Launch brief copied.')} className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-5 py-3 rounded-xl transition-all text-xs tracking-wider uppercase">
                    Copy
                  </button>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 min-h-[420px] max-h-[520px] overflow-y-auto">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Launch Brief Preview</span>
                  <span className="text-[10px] font-black text-emerald-400">{launchBrief ? 'Generated' : 'Ready'}</span>
                </div>
                <pre className="whitespace-pre-wrap text-xs leading-relaxed text-slate-300 font-mono">
                  {launchBrief || 'Fill the fields and click "Generate Launch Brief" to produce a concrete niche score, offer, landing page hook, outreach message, 7-day validation plan, and recommended stack.'}
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'home' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {[
              {
                title: '1. Validate the niche',
                body: 'Open the Niche AI validator, smart-fill examples, then replace them with a real buyer workflow.',
                action: 'Open Validator',
                promptId: 'niche-ai-validator'
              },
              {
                title: '2. Shape the paid offer',
                body: 'Turn the workflow into a promise, tiers, objection handling, and landing-page copy.',
                action: 'Build Offer',
                promptId: 'niche-ai-offer'
              },
              {
                title: '3. Export the launch pack',
                body: 'Use the readiness score, quality lab, and launch pack export before publishing or selling.',
                action: 'Show Lab',
                promptId: 'niche-ai-agent-spec'
              }
            ].map(item => (
              <button
                key={item.title}
                onClick={() => {
                  const prompt = PRESET_PROMPTS.find(p => p.id === item.promptId);
                  if (prompt) selectAndFocusPrompt(prompt);
                }}
                className="bg-slate-900 border border-slate-800 hover:border-emerald-500/35 rounded-2xl p-5 text-left transition-all group"
              >
                <h4 className="font-black text-white text-sm group-hover:text-emerald-400">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-2">{item.body}</p>
                <span className="inline-block mt-4 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                  {item.action} &gt;
                </span>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'home' && (
          <div className="mb-12 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Validated starting points</span>
                <h3 className="text-xl font-black text-white mt-1">Start from a micro-niche with real buyer pain.</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl">Pick an idea, generate a launch brief, then validate demand before building. Free examples are open; Pro examples are stronger niche kits.</p>
              </div>
              <button onClick={() => setActiveTab('pricing')} className="text-[10px] font-black uppercase tracking-widest text-amber-300 underline">
                Unlock all niche kits
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {VALIDATED_MICRO_NICHES.map(niche => (
                <button
                  key={niche.title}
                  onClick={() => loadMicroNiche(niche)}
                  className={`bg-slate-900 border rounded-2xl p-5 text-left transition-all hover:scale-[1.01] ${
                    niche.free || isUnlocked ? 'border-slate-800 hover:border-emerald-500/35' : 'border-amber-400/25 hover:border-amber-400/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-black text-white text-sm leading-snug">{niche.title}</h4>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-2">{niche.buyer}</p>
                    </div>
                    <span className={`text-[10px] font-black px-2 py-1 rounded-full ${
                      niche.score >= 85 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-300'
                    }`}>
                      {niche.score}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-3 leading-relaxed line-clamp-2">{niche.pain}</p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800">
                    <span className="text-[10px] text-slate-500 font-bold">{niche.budget}</span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${niche.free || isUnlocked ? 'text-emerald-400' : 'text-amber-300'}`}>
                      {niche.free || isUnlocked ? 'Load idea' : 'Pro'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'home' && !isUnlocked && (
          <div className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              {renderSponsorSlot('Homepage native ad')}
            </div>
            <div className="bg-slate-900 border border-emerald-500/20 rounded-2xl p-4 space-y-3">
              <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400">Affiliate funnel</span>
              <h4 className="font-black text-white text-sm">Earn from tools users already need</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                The free plan routes users to AI tools, hosting, checkout, and automation products with your referral tag.
              </p>
              <button onClick={() => setActiveTab('tools')} className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[10px] uppercase tracking-widest px-3 py-2 rounded-xl">
                Open affiliate directory
              </button>
            </div>
          </div>
        )}

        {/* Master Catalog Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SECTION (7 Columns): Content Catalogs, Tabs & Playbooks */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Horizontal Categorized Tab filters (on catalog views) */}
            {(activeTab === 'home' || activeTab === 'all' || activeTab === 'favorites') && (
              <div className="space-y-4">
                <h3 id="browse-templates-header" className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                  <span className="w-1 h-5 rounded-full bg-emerald-500"></span>
                  Niche Launch Workflows
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => { setActiveTab(cat.id); setSearchQuery(''); }}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        activeTab === cat.id 
                          ? 'bg-slate-900 border-indigo-500/40 text-emerald-400 shadow-md ring-1 ring-indigo-500/10' 
                          : 'bg-slate-900/45 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <h4 className="font-bold text-xs truncate capitalize">{cat.name.replace('Collection', '')}</h4>
                      <p className="text-[10px] text-slate-500 mt-1">
                        {cat.id === 'premium' ? 'Premium locked' : 'Free presets'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Catalog list header */}
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black tracking-wider uppercase text-slate-400">
                  {activeTab === 'home' ? 'Launch-Ready AI Workflows' : 
                   activeTab === 'favorites' ? 'Curated Favorites Portfolio' : 
                   `${activeTab.toUpperCase().replace('-', ' ')} Playbook`}
                </h3>
                
                {activeTab === 'favorites' && categoryFilteredPrompts.length > 0 && leadCaptured && (
                  <button
                    onClick={handleExportBundle}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-3.5 py-1.5 rounded-xl text-[10px] tracking-widest uppercase transition-all flex items-center gap-1"
                  >
                    Export Curated MD Playbook
                  </button>
                )}
              </div>

              {/* Grid List Renderer */}
              {categoryFilteredPrompts.length === 0 ? (
                <div className="bg-slate-900/45 p-12 rounded-3xl border border-slate-800 text-center space-y-4">
                  <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto text-slate-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-slate-300 text-sm">No templates mapped here</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try updating your active navigation filter or clearing your lookup keyword query.
                  </p>
                  <button 
                    onClick={() => { setSearchQuery(''); setActiveTab('home'); }}
                    className="bg-slate-800 hover:bg-slate-700 text-white text-[10px] px-3 py-1.5 rounded-lg"
                  >
                    Reset Dashboard
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryFilteredPrompts.map(prompt => {
                    const isFav = favorites.includes(prompt.id);
                    const isSelected = selectedPrompt?.id === prompt.id;
                    return (
                      <div 
                        key={prompt.id}
                        onClick={() => selectAndFocusPrompt(prompt)}
                        className={`bg-slate-900 rounded-2xl border p-5 flex flex-col justify-between transition-all hover:scale-[1.01] cursor-pointer group ${
                          isSelected 
                            ? 'border-indigo-500 shadow-xl shadow-indigo-500/5 ring-1 ring-indigo-500/20' 
                            : 'border-slate-850 hover:border-slate-800'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-3">
                            {/* Category Badge */}
                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                              prompt.isPremium 
                                ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' 
                                : prompt.category === 'real-estate' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                  prompt.category === 'hr' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' :
                                  'bg-pink-500/10 text-pink-400 border-pink-500/20'
                            }`}>
                              {prompt.isPremium ? 'Premium locked' : prompt.category.replace('-', ' ')}
                            </span>

                            {/* Fav icon */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(prompt.id);
                              }}
                              className={`text-slate-500 hover:text-pink-500 p-1 rounded-lg transition-colors ${
                                isFav ? 'text-pink-500' : ''
                              }`}
                            >
                              <svg className="w-4 h-4" fill={isFav ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </button>
                          </div>

                          <h4 className="font-bold text-white text-sm sm:text-base leading-snug group-hover:text-emerald-400 transition-colors">
                            {prompt.title}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-3">
                            {prompt.description}
                          </p>
                        </div>

                        {/* Action parameters */}
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-800/60">
                          {prompt.isPremium && !isUnlocked ? (
                            <span className="text-[10px] text-amber-400 font-extrabold flex items-center gap-1.5 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                              Unlock Access
                            </span>
                          ) : (
                            <span className="text-[10px] text-slate-500 font-bold">
                              {parsePlaceholders(prompt.template).length} variables
                            </span>
                          )}

                          <span className="text-xs font-black text-indigo-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                            Customize &gt;                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

            </div>

            {/* MONETIZATION & LEAD CAPTURE WIDGET (Crucial for building lists/revenue) */}
            {activeTab === 'favorites' && favorites.length > 0 && !leadCaptured && (
              <div id="lead-generation-anchor" className="bg-gradient-to-tr from-slate-900 to-indigo-950/40 p-6 rounded-3xl border border-indigo-500/25 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-indigo-600/20 text-indigo-400 p-2 rounded-xl border border-indigo-500/20">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 19v-8.93a2 2 0 01.89-1.664l8-4a2 2 0 011.66 0l8 4A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-wider">Unlock Free Playbook Export</h4>
                    <p className="text-xs text-slate-450 leading-relaxed mt-1">
                      Join our newsletter to compile and export all your favorited/bookmarked prompt recipes into a beautifully formatted Markdown e-book bundle.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleLeadCapture} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    value={emailForUnlock}
                    onChange={(e) => setEmailForUnlock(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-grow p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500 placeholder-slate-500"
                  />
                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all"
                  >
                    Unlock Download
                  </button>
                </form>
              </div>
            )}

            {/* MONETIZATION STRATEROADMAP EDUCATIONAL WIDGET */}
            {activeTab === 'home' && (
              <div className="bg-gradient-to-tr from-indigo-900/40 to-slate-900 border border-indigo-500/20 p-6 rounded-3xl space-y-4">
                <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  How to generate $300/Mo with this Platform
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-emerald-400 font-extrabold block">1. Build your Newsletter</span>
                    <p className="text-slate-450">Encourage visitors to bookmark prompts, then download the custom curation MD playbook by inputting their emails.</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-amber-400 font-extrabold block">2. Stripe/Gumroad Paywall</span>
                    <p className="text-slate-450">Set up a simple payment link for $19 and tie it to the "荘 Premium unlocked" state using your Studio dashboard config.</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-indigo-400 font-extrabold block">3. Track Affiliate Sales</span>
                    <p className="text-slate-450">Drive traffic to top AI applications listed on the Tools directory using custom referral URLs with your affiliate tags.</p>
                  </div>
                </div>
              </div>
            )}

            {/* AI PLAYGROUND/SANDBOX WORKSPACE VIEW */}
            {activeTab === 'sandbox' && (
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
                <div>
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    Prompt Quality Lab
                  </h3>
                  <p className="text-slate-450 text-xs mt-1">
                    Stress-test customized prompts locally for buyer clarity, output quality, constraints, and premium readiness.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">System Instructions / Expert Role</label>
                    <textarea
                      rows={2}
                      value={systemInstructions}
                      onChange={(e) => setSystemInstructions(e.target.value)}
                      placeholder="You are an expert AI assistant..."
                      className="w-full text-xs font-mono bg-slate-950 p-2.5 border border-slate-800 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:outline-none text-slate-300"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Prompt Blueprint Text</label>
                    <textarea
                      rows={6}
                      value={sandboxPromptInput}
                      onChange={(e) => setSandboxPromptInput(e.target.value)}
                      placeholder="Compile or customize your prompt text..."
                      className="w-full text-xs font-mono bg-slate-950 p-3.5 border border-slate-855 rounded-xl focus:ring-1 focus:ring-indigo-500 focus:outline-none text-slate-100"
                    ></textarea>
                  </div>

                  {/* Playground trigger */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => testPromptWithGemini(sandboxPromptInput)}
                      disabled={isAiLoading}
                      className="flex-grow bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 text-slate-950 font-black py-3 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                    >
                      {isAiLoading ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Auditing prompt...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Run Quality Audit
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => handleCopyText(sandboxPromptInput, "Prompt blueprint copied!")}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-4 rounded-xl transition-all"
                    >
                      Copy Draft
                    </button>
                  </div>
                </div>

                {/* API Output view */}
                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Prompt Quality Report</span>
                  
                  {aiErrorMessage && (
                    <div className="bg-red-950/20 text-red-400 border border-red-550/20 p-3.5 rounded-xl text-xs font-mono">
                      {aiErrorMessage}
                    </div>
                  )}

                  <div className="bg-slate-950 p-5 rounded-2xl min-h-[200px] max-h-[400px] overflow-y-auto text-xs sm:text-sm font-sans leading-relaxed text-slate-300 border border-slate-900 relative">
                    {isAiLoading && (
                      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center">
                        <span className="text-emerald-400 text-xs tracking-wider font-extrabold uppercase animate-pulse">Running Playground Pipeline...</span>
                      </div>
                    )}
                    {!aiOutput && !aiErrorMessage ? (
                      <span className="text-slate-600 italic">Playground response will output here...</span>
                    ) : (
                      <div className="whitespace-pre-wrap text-left">{aiOutput}</div>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* ARCHITECT WIZARD STEP ENGINE */}
            {activeTab === 'builder' && (
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-black text-white">Advanced Prompt Engineering Engine</h3>
                    <p className="text-slate-450 text-xs mt-0.5">Generate flawless prompts aligned with structural role parameters.</p>
                  </div>
                  <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-400/20 font-black text-[10px] px-2.5 py-1 rounded-full uppercase">
                    Step {wizardStep} / 4
                  </span>
                </div>

                {/* Progress slide bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full transition-all duration-300" style={{ width: `${(wizardStep / 4) * 105}%` }}></div>
                </div>

                {wizardStep === 1 && (
                  <div className="space-y-4">
                    <div className="bg-indigo-500/5 p-4 rounded-2xl border border-indigo-500/10 text-xs">
                      <span className="font-extrabold text-white uppercase block mb-1">Step 1: Assign Explicit Role</span>
                      Instructing the AI to adopt a targeted persona instantly constraints the vocabulary and industry blueprints to focus on relevant outcomes.
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Expert Persona / Role Profile</label>
                      <input
                        type="text"
                        value={wizardRole}
                        onChange={(e) => setWizardRole(e.target.value)}
                        placeholder="e.g. Senior Conversion Copywriter, Real Estate Lead Specialist"
                        className="w-full p-3 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none focus:border-indigo-500 text-slate-200 text-xs"
                      />
                    </div>
                    <div className="flex justify-end pt-2">
                      <button 
                        onClick={() => setWizardStep(2)} 
                        disabled={!wizardRole.trim()}
                        className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all"
                      >
                        Proceed to Step 2
                      </button>
                    </div>
                  </div>
                )}

                {wizardStep === 2 && (
                  <div className="space-y-4">
                    <div className="bg-indigo-500/5 p-4 rounded-2xl border border-indigo-500/10 text-xs">
                      <span className="font-extrabold text-white uppercase block mb-1">Step 2: Core Task &amp; Context</span>
                      What background parameters or specific niche details should the assistant use to ground its reasoning capabilities?
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Background Context / Niche Details</label>
                        <input
                          type="text"
                          value={wizardContext}
                          onChange={(e) => setWizardContext(e.target.value)}
                          placeholder="e.g. High-end property listing in Seattle with smart-home features"
                          className="w-full p-3 bg-slate-950 border border-slate-850 rounded-xl focus:outline-none text-slate-200 text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Core Task (What is the goal?)</label>
                        <textarea
                          rows={3}
                          value={wizardTask}
                          onChange={(e) => setWizardTask(e.target.value)}
                          placeholder="e.g. Write a 5-part follow up email list sequence to convert prospects"
                          className="w-full p-3 bg-slate-950 border border-slate-855 text-slate-200 text-xs"
                        ></textarea>
                      </div>
                    </div>
                    <div className="flex justify-between pt-2">
                      <button onClick={() => setWizardStep(1)} className="text-xs text-slate-400 hover:text-white">Back</button>
                      <button 
                        onClick={() => setWizardStep(3)} 
                        disabled={!wizardTask.trim()}
                        className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all"
                      >
                        Proceed to Step 3
                      </button>
                    </div>
                  </div>
                )}

                {wizardStep === 3 && (
                  <div className="space-y-4">
                    <div className="bg-indigo-500/5 p-4 rounded-2xl border border-indigo-500/10 text-xs">
                      <span className="font-extrabold text-white uppercase block mb-1">Step 3: Define Layout Format &amp; Constraints</span>
                      Setting strong architectural guardrails avoids bland summaries and structures outputs exactly the way you need.
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Required Output Format</label>
                        <select
                          value={wizardFormat}
                          onChange={(e) => setWizardFormat(e.target.value)}
                          className="w-full p-3 bg-slate-950 border border-slate-850 rounded-xl text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                        >
                          <option value="bulleted core playbook sections">Structured Playbook Sections</option>
                          <option value="high conversion direct-response copy layout">Direct Response Ad Layout</option>
                          <option value="markdown pillars map blueprint table">Markdown Mapping Matrix</option>
                          <option value="JSON schema variables map">Strict JSON Schema</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Strict Constraints / Exclusions</label>
                        <input
                          type="text"
                          value={wizardConstraints}
                          onChange={(e) => setWizardConstraints(e.target.value)}
                          placeholder="e.g. Under 150 words, do not use buzzwords like 'game changer'"
                          className="w-full p-3 bg-slate-950 border border-slate-850 rounded-xl text-xs text-slate-205"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between pt-2">
                      <button onClick={() => setWizardStep(2)} className="text-xs text-slate-400 hover:text-white">Back</button>
                      <button 
                        onClick={generateWizardPrompt} 
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl transition-all uppercase tracking-wider"
                      >
                        Compile Prompt Recipe
                      </button>
                    </div>
                  </div>
                )}

                {wizardStep === 4 && (
                  <div className="space-y-4">
                    <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20 text-xs text-emerald-400 flex items-start gap-2">
                      <span className="text-base">笨ｨ</span>
                      <div>
                        <span className="font-extrabold block text-white uppercase">Prompt Engineered Successfully!</span>
                        Your custom template has been structured following professional directives. Run sandbox or copy to use.
                      </div>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-850 text-xs font-mono text-slate-100 whitespace-pre-wrap leading-relaxed max-h-[180px] overflow-y-auto">
                      {wizardGeneratedPrompt}
                    </div>

                    <div className="flex flex-wrap justify-between gap-2 pt-2">
                      <button onClick={() => setWizardStep(3)} className="text-xs text-slate-400 hover:text-white">Back & Edit</button>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={handleSaveWizardPrompt}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-3 py-2 rounded-xl"
                        >
                          Save in Library
                        </button>
                        <button 
                          onClick={() => handleCopyText(wizardGeneratedPrompt)}
                          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3 py-2 rounded-xl"
                        >
                          Copy Prompt
                        </button>
                        <button 
                          onClick={() => testPromptWithGemini(wizardGeneratedPrompt)}
                          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black px-4 py-2 rounded-xl uppercase tracking-wider"
                        >
                          Run Playbook
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* AI SYSTEM DIRECTORY & REVENUE LINK WIDGETS */}
            {activeTab === 'tools' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-white">Recommended AI Tool &amp; Software Directory</h3>
                  <p className="text-slate-450 text-xs mt-1">Recommended platforms to execute optimized prompt workflows. Links include your configured referral tag for affiliate revenue.</p>
                </div>

                {!isUnlocked && renderSponsorSlot('Tools directory sponsor')}

                <div className="grid grid-cols-1 gap-4">
                  {CURATED_TOOLS.map((tool, idx) => (
                    <div key={idx} className="bg-slate-900 p-5 rounded-2xl border border-slate-855 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-800 transition-all">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-white text-sm">{tool.name}</h4>
                          <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-400/25 text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                            {tool.badge}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-extrabold uppercase block">{tool.category}</span>
                        <p className="text-xs text-slate-400 leading-relaxed max-w-lg">{tool.description}</p>
                      </div>

                      <a
                        href={buildAffiliateUrl(tool.link)}
                        target="_blank"
                        rel="sponsored noopener noreferrer"
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs px-4 py-2.5 rounded-xl text-center uppercase tracking-wide shrink-0"
                      >
                        Get Access &gt;
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONTACT PAGE VIEW */}
            {activeTab === 'contact' && (
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-850 space-y-6">
                <div>
                  <h3 className="text-xl font-black text-white">Inquire &amp; Suggest Categories</h3>
                  <p className="text-slate-450 text-xs mt-1">Suggest prompt domains, request custom premium bundles, or request sponsor features.</p>
                </div>

                {contactStatus === 'success' ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-6 rounded-2xl text-center space-y-3">
                    <span className="text-3xl block">Sent</span>
                    <h4 className="font-extrabold text-white">Message Dispatched Successfully!</h4>
                    <p className="text-xs text-slate-450 max-w-md mx-auto">We review category suggestion feedback daily to ensure standard compliance.</p>
                    <button onClick={() => setContactStatus('')} className="bg-slate-850 text-white text-xs px-4 py-1.5 rounded-xl">Send Another Message</button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] text-slate-400 font-extrabold uppercase mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full bg-slate-950 p-3 rounded-xl border border-slate-850 text-xs focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 font-extrabold uppercase mb-1">Your Email</label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="john@example.com"
                          className="w-full bg-slate-950 p-3 rounded-xl border border-slate-850 text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 font-extrabold uppercase mb-1">Your Message</label>
                      <textarea
                        rows={4}
                        required
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Share your prompt request recommendations or custom bundle inquiries here..."
                        className="w-full bg-slate-950 p-3 rounded-xl border border-slate-855 text-xs focus:outline-none"
                      ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-xl text-xs uppercase tracking-widest">
                      Send Feedback
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* PRIVACY POLICY PAGE */}
            {activeTab === 'privacy' && (
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 text-xs text-slate-400 leading-relaxed">
                <h3 className="text-lg font-black text-white">Privacy Policy &amp; Cookie Consent</h3>
                <p>
                  Niche AI Prompt Library operates on clean privacy protocols. We gather zero invasive telemetry metrics. If you contact our team, we safely delete communications within 30 days of resolution.
                </p>
                <p>
                  All curated favorites and wizard custom templates are cached solely inside your device's browser Sandbox Local Storage environment.
                </p>
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-white">Freemium Monetization</h3>
                  <p className="text-slate-450 text-xs mt-1">Free users see sponsor placements and affiliate recommendations. Pro users unlock premium formulas and remove sponsor slots.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Free</span>
                    <div>
                      <h4 className="text-2xl font-black text-white">$0</h4>
                      <p className="text-xs text-slate-400 mt-1">Best for trying the niche launch workflow.</p>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li>✓ Free prompt workflows</li>
                      <li>✓ Prompt quality lab</li>
                      <li>✓ Smart variable fill</li>
                      <li>✓ Affiliate-supported tool directory</li>
                      <li>• Includes sponsor placements</li>
                    </ul>
                  </div>

                  <div className="bg-slate-900 border border-amber-400/35 rounded-3xl p-6 space-y-4 shadow-xl shadow-amber-500/5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">Pro</span>
                    <div>
                      <h4 className="text-2xl font-black text-white">${simPremiumPrice}</h4>
                      <p className="text-xs text-slate-400 mt-1">For builders who want the complete launch kit.</p>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li>✓ Removes sponsor placements</li>
                      <li>✓ Unlocks premium formulas</li>
                      <li>✓ Unlocks premium validated micro-niche kits</li>
                      <li>✓ Full launch pack exports</li>
                      <li>✓ Premium funnel, SEO, HR, and agency blueprints</li>
                      <li>✓ Better for selling client-ready AI workflow kits</li>
                    </ul>
                    <a href={gumroadLink} target="_blank" rel="sponsored noopener noreferrer" className="block text-center bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-widest py-3 rounded-xl">
                      Upgrade to Pro
                    </a>
                  </div>

                  <div className="bg-slate-900 border border-emerald-500/25 rounded-3xl p-6 space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Sponsor</span>
                    <div>
                      <h4 className="text-2xl font-black text-white">Ads + affiliates</h4>
                      <p className="text-xs text-slate-400 mt-1">For monetizing free traffic without blocking value.</p>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li>✓ Native sponsor banner</li>
                      <li>✓ Homepage sponsor card</li>
                      <li>✓ Tools directory affiliate links</li>
                      <li>✓ Configurable referral tag</li>
                      <li>✓ Contact route for sponsor requests</li>
                    </ul>
                    <button onClick={() => setShowAdminPanel(true)} className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-widest py-3 rounded-xl">
                      Open creator dashboard
                    </button>
                  </div>
                </div>

                {!isUnlocked && renderSponsorSlot('Pricing page sponsor')}
              </div>
            )}

          </div>

          {/* RIGHT PANEL (5 Columns): Interactive Customize workspace & live compiler */}
          <div id="interactive-editor-workspace" className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            <div className="bg-slate-900 rounded-3xl border border-slate-850 overflow-hidden shadow-2xl">
              
              {/* Header */}
              <div className="bg-slate-950 p-5 border-b border-slate-855 text-left space-y-2">
                <div className="flex justify-between items-center">
                  <span className="bg-emerald-400/10 text-emerald-400 border border-emerald-400/25 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                    Formula Customizer Workspace
                  </span>
                  
                  <button 
                    onClick={() => toggleFavorite(selectedPrompt?.id)}
                    className="text-slate-400 hover:text-pink-500 transition-colors"
                  >
                    <svg className="w-[18px] h-[18px]" fill={favorites.includes(selectedPrompt?.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                <h4 className="font-extrabold text-white text-base leading-tight mt-2">{selectedPrompt?.title}</h4>
                <p className="text-[11px] text-slate-450 line-clamp-2 leading-relaxed">{selectedPrompt?.description}</p>
              </div>

              {/* Dynamic Inputs Panel */}
              <div className="p-5 space-y-4 text-left">
                <div className="bg-slate-950 border border-slate-850 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Commercial Readiness</span>
                      <strong className={`text-lg font-black ${
                        promptReadiness.color === 'emerald' ? 'text-emerald-400' :
                        promptReadiness.color === 'amber' ? 'text-amber-400' :
                        'text-rose-400'
                      }`}>
                        {promptReadiness.score}/100
                      </strong>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                      promptReadiness.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' :
                      promptReadiness.color === 'amber' ? 'bg-amber-500/10 text-amber-400 border-amber-500/25' :
                      'bg-rose-500/10 text-rose-400 border-rose-500/25'
                    }`}>
                      {promptReadiness.label}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {promptReadiness.checks.map(check => (
                      <div key={check.label} className="flex items-center gap-2 text-[10px] text-slate-400">
                        <span className={`w-2 h-2 rounded-full ${check.pass ? 'bg-emerald-400' : 'bg-slate-700'}`}></span>
                        {check.label}
                      </div>
                    ))}
                  </div>
                  {promptReadiness.unresolved.length > 0 && (
                    <p className="text-[10px] text-amber-300 leading-relaxed">
                      Fill {promptReadiness.unresolved.length} more variable{promptReadiness.unresolved.length === 1 ? '' : 's'} to make this prompt buyer-ready.
                    </p>
                  )}
                </div>
                
                {activePlaceholderList.length > 0 ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <span>Fill Template Variables</span>
                      <div className="flex items-center gap-3">
                        <button onClick={fillSmartExamples} className="hover:text-emerald-300 underline">
                          Smart fill
                        </button>
                        <button 
                          onClick={() => {
                            const resetVals: Record<string, string> = {};
                            activePlaceholderList.forEach(p => resetVals[p] = '');
                            setEditorValues(resetVals);
                          }}
                          className="hover:text-white underline"
                        >
                          Clear
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 max-h-[180px] overflow-y-auto pr-1">
                      {activePlaceholderList.map(placeholder => (
                        <div key={placeholder} className="space-y-1">
                          <label className="block text-[10px] font-bold text-slate-400 capitalize">
                            {placeholder.replace(/[^a-zA-Z0-9\s]/g, ' ')}
                          </label>
                          <input
                            type="text"
                            placeholder={`Specify ${placeholder}...`}
                            value={editorValues[placeholder] || ''}
                            onChange={(e) => {
                              setEditorValues({
                                ...editorValues,
                                [placeholder]: e.target.value
                              });
                            }}
                            className="w-full text-xs bg-slate-950 p-2.5 rounded-xl border border-slate-855 text-slate-200 focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-950 p-4 rounded-xl text-center text-slate-500 text-xs">
                    This template utilizes static optimized constraints. Use "Copy Compiled" to use immediately.
                  </div>
                )}

                {/* Live Compilation View */}
                <div className="space-y-1.5 pt-2 border-t border-slate-850/50">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Live Compilation Output</span>
                  <div className="bg-slate-950 p-4 rounded-xl font-mono text-xs text-slate-250 leading-relaxed whitespace-pre-wrap max-h-[140px] overflow-y-auto select-all border border-slate-900 shadow-inner">
                    {customizedPromptText}
                  </div>
                </div>

                {/* Call Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                  <button
                    onClick={() => handleCopyText(customizedPromptRaw, "Customized template compiled & copied!")}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-2.5 px-4 rounded-xl text-[10px] tracking-widest uppercase transition-all flex items-center justify-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy Compiled
                  </button>

                  <button
                    onClick={() => testPromptWithGemini(customizedPromptRaw)}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold py-2.5 px-4 rounded-xl text-[10px] tracking-widest uppercase transition-all flex items-center justify-center gap-1"
                  >
                    Test Sandbox
                  </button>

                  <button
                    onClick={handleExportLaunchPack}
                    className="bg-slate-800 hover:bg-slate-700 text-white font-extrabold py-2.5 px-4 rounded-xl text-[10px] tracking-widest uppercase transition-all flex items-center justify-center gap-1"
                  >
                    Launch Pack
                  </button>
                </div>

              </div>

            </div>

            {/* Custom formula manual contribution */}
            <div className="bg-slate-900 border border-slate-850 p-5 rounded-3xl space-y-4 text-left">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-400/20">
                  <span className="text-sm font-bold">+</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs leading-none">Contribute Custom Preset Formula</h4>
                  <p className="text-[10px] text-slate-500 mt-1 leading-none">Add optimized templates directly into local catalog.</p>
                </div>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  value={customFormulaTitle}
                  onChange={(e) => setCustomFormulaTitle(e.target.value)}
                  placeholder="Formula Title (e.g. SEO Strategic Outline)"
                  className="w-full text-xs bg-slate-950 p-2.5 rounded-lg focus:outline-none border border-slate-850 text-slate-250"
                />
                <textarea
                  rows={3}
                  value={customFormulaBody}
                  onChange={(e) => setCustomFormulaBody(e.target.value)}
                  placeholder="Paste prompt instruction body. Wrap placeholder variables inside brackets like [your variable]."
                  className="w-full text-xs bg-slate-950 p-2.5 rounded-lg focus:outline-none border border-slate-850 text-slate-250"
                ></textarea>
                <button
                  onClick={() => {
                    const title = customFormulaTitle.trim();
                    const body = customFormulaBody.trim();
                    if (title && body) {
                      const newObj = {
                        id: `custom-${Date.now()}`,
                        category: 'custom',
                        title,
                        isPremium: false,
                        description: 'Custom playbook preset formula.',
                        template: body
                      };
                      setCustomPrompts([newObj, ...customPrompts]);
                      setSelectedPrompt(newObj);
                      setCustomFormulaTitle('');
                      setCustomFormulaBody('');
                      showToast("Successfully saved custom prompt to library catalog!");
                    } else {
                      showToast("Please verify both formula title & prompt body before saving.");
                    }
                  }}
                  className="w-full bg-slate-800 hover:bg-slate-750 text-white font-bold text-xs py-2 rounded-xl transition-all"
                >
                  Save Custom Playbook Formula
                </button>
              </div>
            </div>

            {!isUnlocked && renderSponsorSlot('Customizer sidebar sponsor')}

          </div>

        </div>

      </main>

      {/* ============================================================================
          荘 PAYWALL / PRO UPGRADE MODAL (Gumroad / Stripe Simulator)
          ============================================================================ */}
      {showPaywallModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-amber-400/35 max-w-md w-full rounded-3xl p-6 relative shadow-2xl space-y-6">
            
            <button 
              onClick={() => setShowPaywallModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-extrabold text-sm"
            >
              X
            </button>

            <div className="text-center space-y-2">
              <span className="text-4xl block animate-bounce">PRO</span>
              <h3 className="text-xl font-black text-white">Unlock Niche Prompts PRO</h3>
              <p className="text-xs text-slate-450 leading-relaxed max-w-xs mx-auto">
                Unlock premium launch assets, remove sponsor placements, and export more complete playbooks for client-ready AI workflow offers.
              </p>
            </div>

            <div className="space-y-3 text-xs bg-slate-950 p-4 rounded-2xl border border-slate-850 text-left">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-extrabold">✓</span>
                <span>Unlocks <strong>premium launch and funnel blueprints</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-extrabold">✓</span>
                <span>Removes <strong>sponsor placements</strong> from the workspace</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-extrabold">✓</span>
                <span>Includes <strong>high-ticket agency sales copy formulas</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-extrabold">✓</span>
                <span>Unlimited launch pack exports and quality audits</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 text-center">
              <a
                href={gumroadLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  // Simulate automatic premium unlock on local session callback
                  setTimeout(() => {
                    setIsUnlocked(true);
                    setShowPaywallModal(false);
                    showToast('Premium features successfully unlocked.');
                  }, 1500);
                }}
                className="block w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black py-3 rounded-xl text-xs uppercase tracking-wider"
              >
                Buy Lifetime Pass - Only ${simPremiumPrice}
              </a>
              <span className="text-[10px] text-slate-500 italic block">Secured checkout via Gumroad / Stripe</span>
            </div>

            <div className="text-center">
              <button 
                onClick={() => {
                  setIsUnlocked(true);
                  setShowPaywallModal(false);
                  showToast('Temporary admin override unlock active.');
                }}
                className="text-[10px] text-slate-400 hover:text-white underline font-medium"
              >
                Simulate successful checkout unlock
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================================
          FOOTER COMPONENT
          ============================================================================ */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="space-y-4 md:col-span-2">
              <span className="text-emerald-400 font-extrabold uppercase tracking-widest text-[10px]">Curation Hub</span>
              <h4 className="font-extrabold text-base text-white">Niche AI Prompt Library</h4>
              <p className="text-slate-400 leading-relaxed max-w-sm">
                Empowering agents, HR specialists, and agency strategists through parameter-engineered template workflows. Optimize outputs, save valuable hours weekly.
              </p>
            </div>

            <div className="space-y-3">
              <h5 className="font-bold text-[10px] uppercase tracking-wider text-slate-300">Quick Links</h5>
              <ul className="space-y-2">
                <li><button onClick={() => { setActiveTab('home'); setSearchQuery(''); }} className="hover:text-emerald-400 transition-colors">Home Hub</button></li>
                <li><button onClick={() => { setActiveTab('real-estate'); }} className="hover:text-emerald-400 transition-colors">Real Estate Playbook</button></li>
                <li><button onClick={() => { setActiveTab('hr'); }} className="hover:text-emerald-400 transition-colors">HR Specialization</button></li>
                <li><button onClick={() => { setActiveTab('marketing'); }} className="hover:text-emerald-400 transition-colors">Marketing Copy</button></li>
                <li><button onClick={() => { setActiveTab('tools'); }} className="hover:text-emerald-400 transition-colors">AI Directory</button></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h5 className="font-bold text-[10px] uppercase tracking-wider text-slate-300">Privacy &amp; contact</h5>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveTab('privacy')} className="hover:text-emerald-400 transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => setActiveTab('contact')} className="hover:text-emerald-400 transition-colors">Feedback &amp; Category Requests</button></li>
                <li className="text-slate-500 pt-2 font-normal">Copyright 2026 Niche AI Prompt Library.<br />All rights reserved.</li>
              </ul>
            </div>

          </div>
        </div>
      </footer>

    </div>
  );
}
