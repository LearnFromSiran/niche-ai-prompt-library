import React, { useEffect, useMemo, useState } from 'react';

const INDUSTRIES = [
  {
    id: 'health',
    label: 'Clinic or health office',
    risk: 26,
    coverage: 'Cyber liability, privacy breach response, ransomware, business interruption',
    buyer: 'clinic manager, practice owner, or office administrator'
  },
  {
    id: 'professional',
    label: 'Agency or consultant',
    risk: 18,
    coverage: 'Cyber liability, professional liability, funds transfer fraud, client data breach',
    buyer: 'owner, operations lead, or finance manager'
  },
  {
    id: 'retail',
    label: 'Retail or ecommerce',
    risk: 22,
    coverage: 'Cyber liability, payment fraud, data breach, business interruption',
    buyer: 'store owner, ecommerce operator, or bookkeeper'
  },
  {
    id: 'contractor',
    label: 'Contractor or local service',
    risk: 16,
    coverage: 'Cyber liability, invoice fraud, device loss, business email compromise',
    buyer: 'owner, dispatcher, or office manager'
  },
  {
    id: 'education',
    label: 'Tutoring or education center',
    risk: 24,
    coverage: 'Cyber liability, student record breach, ransomware, privacy response',
    buyer: 'center owner, director, or administrator'
  }
];

const CONTROLS = [
  { id: 'mfa', label: 'MFA on email and banking', weight: 15, task: 'Turn on MFA for email, banking, payroll, and admin logins.' },
  { id: 'backup', label: 'Tested cloud backup', weight: 12, task: 'Confirm backups run automatically and restore one file as a test.' },
  { id: 'training', label: 'Phishing training', weight: 10, task: 'Run a 10-minute phishing and invoice-fraud training for staff.' },
  { id: 'passwords', label: 'Password manager', weight: 10, task: 'Move shared passwords into a business password manager.' },
  { id: 'updates', label: 'Device updates', weight: 8, task: 'Update laptops, phones, browser, accounting tools, and security apps.' },
  { id: 'edr', label: 'Endpoint protection', weight: 10, task: 'Install or verify endpoint protection on every work device.' },
  { id: 'vendor', label: 'Vendor access list', weight: 8, task: 'List every vendor with access to customer, billing, or staff data.' },
  { id: 'incident', label: 'Incident response sheet', weight: 12, task: 'Write a one-page breach response contact sheet.' },
  { id: 'wire', label: 'Wire/payment approval rule', weight: 8, task: 'Require voice confirmation for bank, payroll, and invoice changes.' },
  { id: 'policy', label: 'Current cyber policy reviewed', weight: 7, task: 'Review current policy exclusions, retention, deductible, and claim contacts.' }
];

const AFFILIATE_TOOLS = [
  {
    title: 'Cyber insurance quote',
    category: 'High CPC insurance',
    reason: 'Best monetization target. Users comparing cyber liability coverage have strong commercial intent.',
    cta: 'Compare cyber quotes',
    url: 'https://www.google.com/search?q=small+business+cyber+insurance+quote'
  },
  {
    title: 'Business password manager',
    category: 'Security SaaS',
    reason: 'Recurring affiliate potential and directly tied to quote readiness.',
    cta: 'Review password tools',
    url: 'https://www.google.com/search?q=business+password+manager'
  },
  {
    title: 'Cloud backup for business',
    category: 'Backup software',
    reason: 'Backup and restore proof is commonly requested by insurers and brokers.',
    cta: 'Find backup tools',
    url: 'https://www.google.com/search?q=small+business+cloud+backup'
  },
  {
    title: 'Security awareness training',
    category: 'Training SaaS',
    reason: 'Repeat-use tool for staff onboarding, renewals, and phishing prevention.',
    cta: 'Find training options',
    url: 'https://www.google.com/search?q=small+business+security+awareness+training'
  }
];

const DEFAULT_TASKS = [
  { id: 'task-1', title: 'Export readiness report before requesting quotes', done: false },
  { id: 'task-2', title: 'Collect current policy, deductible, renewal date, and exclusions', done: false },
  { id: 'task-3', title: 'Send broker email and ask for cyber liability quote options', done: false }
];

const money = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  return `$${Math.round(value / 1000)}k`;
};

export default function App() {
  const [industry, setIndustry] = useState('professional');
  const [employees, setEmployees] = useState(8);
  const [revenue, setRevenue] = useState(350000);
  const [handlesPayments, setHandlesPayments] = useState(true);
  const [storesPII, setStoresPII] = useState(true);
  const [remoteWork, setRemoteWork] = useState(true);
  const [contractsRequireCoverage, setContractsRequireCoverage] = useState(false);
  const [renewalDate, setRenewalDate] = useState('');
  const [activeView, setActiveView] = useState('assessment');
  const [toast, setToast] = useState('');
  const [controls, setControls] = useState(() => {
    try {
      const saved = localStorage.getItem('cyber_controls');
      return saved ? JSON.parse(saved) : { mfa: true, backup: false, training: false, passwords: true };
    } catch {
      return { mfa: true, backup: false, training: false, passwords: true };
    }
  });
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('cyber_tasks');
      return saved ? JSON.parse(saved) : DEFAULT_TASKS;
    } catch {
      return DEFAULT_TASKS;
    }
  });
  const [customTask, setCustomTask] = useState('');

  useEffect(() => {
    localStorage.setItem('cyber_controls', JSON.stringify(controls));
  }, [controls]);

  useEffect(() => {
    localStorage.setItem('cyber_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const selectedIndustry = useMemo(() => {
    return INDUSTRIES.find(item => item.id === industry) || INDUSTRIES[1];
  }, [industry]);

  const readiness = useMemo(() => {
    const controlScore = CONTROLS.reduce((sum, item) => sum + (controls[item.id] ? item.weight : 0), 0);
    const exposure =
      selectedIndustry.risk +
      (employees > 20 ? 10 : employees > 10 ? 6 : 2) +
      (revenue > 1000000 ? 10 : revenue > 500000 ? 6 : 3) +
      (handlesPayments ? 8 : 0) +
      (storesPII ? 10 : 0) +
      (remoteWork ? 6 : 0) +
      (contractsRequireCoverage ? 7 : 0);
    const score = Math.max(0, Math.min(100, Math.round(74 + controlScore * 0.55 - exposure * 0.6)));
    const missing = CONTROLS.filter(item => !controls[item.id]);
    const grade = score >= 82 ? 'Quote-ready' : score >= 64 ? 'Needs cleanup' : 'High friction';
    const premiumIntent = contractsRequireCoverage || revenue > 500000 || storesPII ? 'High' : 'Moderate';
    return { score, exposure, missing, grade, premiumIntent };
  }, [controls, selectedIndustry, employees, revenue, handlesPayments, storesPII, remoteWork, contractsRequireCoverage]);

  const brokerEmail = useMemo(() => {
    return `Subject: Cyber insurance quote request for ${selectedIndustry.label}

Hi [Broker Name],

I am preparing cyber liability quote options for a ${selectedIndustry.label.toLowerCase()} with ${employees} employees and about ${money(revenue)} annual revenue.

Business profile:
- Handles online/card payments: ${handlesPayments ? 'Yes' : 'No'}
- Stores customer or staff personal data: ${storesPII ? 'Yes' : 'No'}
- Remote or hybrid work: ${remoteWork ? 'Yes' : 'No'}
- Contract requires coverage: ${contractsRequireCoverage ? 'Yes' : 'No'}
- Readiness score: ${readiness.score}/100 (${readiness.grade})

Controls already in place:
${CONTROLS.filter(item => controls[item.id]).map(item => `- ${item.label}`).join('\n') || '- None confirmed yet'}

Controls being fixed:
${readiness.missing.slice(0, 5).map(item => `- ${item.label}`).join('\n') || '- No major gaps listed'}

Can you send quote options for ${selectedIndustry.coverage}? Please include deductible, exclusions, ransomware terms, incident response support, and any required security controls.

Thank you.`;
  }, [selectedIndustry, employees, revenue, handlesPayments, storesPII, remoteWork, contractsRequireCoverage, readiness, controls]);

  const suggestedLimit = useMemo(() => {
    if (revenue > 1000000 || employees > 25 || storesPII) return '$1M-$2M';
    if (revenue > 400000 || handlesPayments) return '$500k-$1M';
    return '$250k-$500k';
  }, [revenue, employees, storesPII, handlesPayments]);

  const toggleControl = (id: string) => {
    setControls({ ...controls, [id]: !controls[id] });
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task));
  };

  const addTask = () => {
    if (!customTask.trim()) {
      setToast('Add a task first.');
      return;
    }
    setTasks([{ id: `task-${Date.now()}`, title: customTask.trim(), done: false }, ...tasks]);
    setCustomTask('');
    setToast('Task added.');
  };

  const addMissingControlsToTasks = () => {
    const existing = new Set(tasks.map(task => task.title));
    const newTasks = readiness.missing
      .map(item => ({ id: `task-${Date.now()}-${item.id}`, title: item.task, done: false }))
      .filter(task => !existing.has(task.title));
    setTasks([...newTasks, ...tasks]);
    setActiveView('tasks');
    setToast(`${newTasks.length} quote-readiness tasks added.`);
  };

  const copyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast(label);
    } catch {
      setToast('Copy failed. Select and copy manually.');
    }
  };

  const exportReport = () => {
    const report = `# Cyber Insurance Readiness Report

## Business
- Industry: ${selectedIndustry.label}
- Employees: ${employees}
- Revenue: ${money(revenue)}
- Renewal date: ${renewalDate || 'Not set'}

## Readiness
- Score: ${readiness.score}/100
- Grade: ${readiness.grade}
- Commercial intent: ${readiness.premiumIntent}
- Suggested coverage limit: ${suggestedLimit}
- Coverage to discuss: ${selectedIndustry.coverage}

## Confirmed Controls
${CONTROLS.filter(item => controls[item.id]).map(item => `- ${item.label}`).join('\n') || '- None confirmed'}

## Gaps To Fix
${readiness.missing.map(item => `- ${item.task}`).join('\n') || '- No major gaps listed'}

## Monthly Tasks
${tasks.map(task => `- [${task.done ? 'x' : ' '}] ${task.title}`).join('\n')}

## Broker Email
${brokerEmail}

This tool is for preparation only and is not insurance, legal, or cybersecurity advice.`;

    const element = document.createElement('a');
    const file = new Blob([report], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'cyber-insurance-readiness-report.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setToast('Report exported.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {toast && (
        <div className="fixed right-5 bottom-5 z-50 rounded-xl border border-emerald-400/30 bg-emerald-500 px-4 py-3 text-xs font-black text-slate-950 shadow-2xl">
          {toast}
        </div>
      )}

      <header className="border-b border-slate-800 bg-slate-950/95 sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <button onClick={() => setActiveView('assessment')} className="text-left">
            <div className="text-xl font-black tracking-tight text-white">CyberCover Prep</div>
            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-300">Small-business cyber insurance readiness</div>
          </button>
          <nav className="flex gap-2 overflow-x-auto">
            {[
              ['assessment', 'Assessment'],
              ['tasks', 'Monthly Tasks'],
              ['quote', 'Quote Pack'],
              ['tools', 'Tools']
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setActiveView(id)}
                className={`whitespace-nowrap rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider ${
                  activeView === id ? 'bg-emerald-400 text-slate-950' : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {activeView === 'assessment' && (
        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <div>
              <div className="inline-flex rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-300">
                High-value niche: cyber insurance prep
              </div>
              <h1 className="mt-4 text-4xl font-black leading-tight text-white md:text-6xl">
                Get quote-ready before your broker asks hard cyber questions.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400">
                A simple readiness dashboard for small businesses that need cyber insurance, client contract coverage, or safer renewal prep.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                ['Readiness', `${readiness.score}/100`],
                ['Suggested limit', suggestedLimit],
                ['Ad intent', readiness.premiumIntent]
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
                  <div className="text-xl font-black text-white">{value}</div>
                  <div className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="text-lg font-black text-white">Why users come back</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  ['Before quotes', 'Prepare broker answers and reduce quote friction.'],
                  ['Every month', 'Complete security tasks that improve readiness.'],
                  ['Before renewal', 'Export proof, gaps, and broker email again.']
                ].map(([title, body]) => (
                  <div key={title} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                    <h3 className="text-sm font-black text-white">{title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white">Readiness score</h2>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">Adjust the profile and mark the controls you already have.</p>
              </div>
              <div className={`rounded-2xl border px-5 py-4 text-center ${
                readiness.score >= 82 ? 'border-emerald-400/40 bg-emerald-400/10' : readiness.score >= 64 ? 'border-amber-400/40 bg-amber-400/10' : 'border-rose-400/40 bg-rose-400/10'
              }`}>
                <div className="text-4xl font-black text-white">{readiness.score}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{readiness.grade}</div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <label className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Business type</span>
                <select value={industry} onChange={event => setIndustry(event.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white outline-none focus:border-emerald-400">
                  {INDUSTRIES.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
                </select>
              </label>
              <label className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Renewal date</span>
                <input type="date" value={renewalDate} onChange={event => setRenewalDate(event.target.value)} className="w-full rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white outline-none focus:border-emerald-400" />
              </label>
              <label className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Employees: {employees}</span>
                <input type="range" min="1" max="80" value={employees} onChange={event => setEmployees(Number(event.target.value))} className="w-full accent-emerald-400" />
              </label>
              <label className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Revenue: {money(revenue)}</span>
                <input type="range" min="50000" max="3000000" step="50000" value={revenue} onChange={event => setRevenue(Number(event.target.value))} className="w-full accent-emerald-400" />
              </label>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {[
                ['handlesPayments', 'Accepts online/card payments', handlesPayments, setHandlesPayments],
                ['storesPII', 'Stores customer/staff personal data', storesPII, setStoresPII],
                ['remoteWork', 'Remote or hybrid staff', remoteWork, setRemoteWork],
                ['contractsRequireCoverage', 'Client contract requires cyber coverage', contractsRequireCoverage, setContractsRequireCoverage]
              ].map(([id, label, checked, setter]: any) => (
                <button key={id} onClick={() => setter(!checked)} className={`rounded-xl border p-3 text-left text-xs font-bold ${checked ? 'border-emerald-400/40 bg-emerald-400/10 text-white' : 'border-slate-800 bg-slate-950 text-slate-500'}`}>
                  {checked ? '[x]' : '[ ]'} {label}
                </button>
              ))}
            </div>

            <div className="mt-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-black text-white">Security controls</h3>
                <button onClick={addMissingControlsToTasks} className="text-[10px] font-black uppercase tracking-widest text-emerald-300 underline">Add gaps to tasks</button>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {CONTROLS.map(item => (
                  <button key={item.id} onClick={() => toggleControl(item.id)} className={`rounded-xl border p-3 text-left text-xs ${controls[item.id] ? 'border-emerald-400/30 bg-emerald-400/10 text-slate-100' : 'border-slate-800 bg-slate-950 text-slate-500'}`}>
                    <span className="font-black">{controls[item.id] ? '[x]' : '[ ]'} {item.label}</span>
                    <span className="mt-1 block text-[10px] text-slate-500">+{item.weight} readiness</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
        )}

        {activeView === 'tasks' && (
          <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-black text-white">Monthly readiness tasks</h2>
                <p className="mt-1 text-xs text-slate-500">This is the retention loop: return monthly, finish tasks, export proof before renewal.</p>
              </div>
              <div className="text-sm font-black text-emerald-300">{tasks.filter(task => task.done).length}/{tasks.length} done</div>
            </div>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <input value={customTask} onChange={event => setCustomTask(event.target.value)} placeholder="Add a custom renewal or security task" className="flex-1 rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-white outline-none focus:border-emerald-400" />
              <button onClick={addTask} className="rounded-xl bg-emerald-400 px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-950">Add task</button>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {tasks.map(task => (
                <button key={task.id} onClick={() => toggleTask(task.id)} className={`rounded-2xl border p-4 text-left text-sm ${task.done ? 'border-emerald-400/30 bg-emerald-400/10 text-slate-300' : 'border-slate-800 bg-slate-950 text-white'}`}>
                  <span className="font-black">{task.done ? '[x]' : '[ ]'} {task.title}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {activeView === 'quote' && (
          <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <h2 className="text-2xl font-black text-white">Quote prep pack</h2>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <p><strong className="text-white">Coverage to discuss:</strong> {selectedIndustry.coverage}</p>
                <p><strong className="text-white">Suggested limit:</strong> {suggestedLimit}</p>
                <p><strong className="text-white">Broker buyer:</strong> {selectedIndustry.buyer}</p>
                <p><strong className="text-white">Top gaps:</strong> {readiness.missing.slice(0, 3).map(item => item.label).join(', ') || 'No major gaps listed'}</p>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <button onClick={exportReport} className="rounded-xl bg-emerald-400 px-5 py-3 text-xs font-black uppercase tracking-widest text-slate-950">Export report</button>
                <button onClick={() => copyText(brokerEmail, 'Broker email copied.')} className="rounded-xl bg-indigo-600 px-5 py-3 text-xs font-black uppercase tracking-widest text-white">Copy broker email</button>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">Broker email</h3>
              <pre className="mt-4 max-h-[520px] overflow-auto whitespace-pre-wrap rounded-2xl border border-slate-800 bg-slate-950 p-4 text-xs leading-relaxed text-slate-300">{brokerEmail}</pre>
            </div>
          </section>
        )}

        {activeView === 'tools' && (
          <section className="mt-8 space-y-5">
            <div>
              <h2 className="text-2xl font-black text-white">Quote and security marketplace</h2>
              <p className="mt-1 text-xs text-slate-500">High-commercial-intent placements for insurance, security SaaS, backup, and training affiliates.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {AFFILIATE_TOOLS.map(tool => (
                <a key={tool.title} href={tool.url} target="_blank" rel="sponsored noopener noreferrer" className="rounded-3xl border border-slate-800 bg-slate-900 p-5 transition hover:border-emerald-400/40">
                  <div className="text-[10px] font-black uppercase tracking-widest text-amber-300">{tool.category}</div>
                  <h3 className="mt-2 text-lg font-black text-white">{tool.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">{tool.reason}</p>
                  <div className="mt-5 rounded-xl bg-emerald-400 px-4 py-3 text-center text-xs font-black uppercase tracking-widest text-slate-950">{tool.cta}</div>
                </a>
              ))}
            </div>
          </section>
        )}

        {activeView === 'assessment' && (
        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="text-lg font-black text-white">Ad strategy for $200/month</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              ['Search pages', 'Publish pages for cyber insurance quote checklist, renewal checklist, MFA for insurance, backup proof, and ransomware coverage questions.'],
              ['Affiliate clicks', 'Put quote comparison and security SaaS CTAs beside the readiness score, export report, and missing control tasks.'],
              ['Return loop', 'Monthly task completion and renewal-date prep make the app useful after the first visit.']
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <h3 className="text-sm font-black text-white">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{body}</p>
              </div>
            ))}
          </div>
        </section>
        )}

        <p className="mt-6 text-center text-[11px] text-slate-600">
          Preparation tool only. Not insurance, legal, compliance, or cybersecurity advice. Speak with a licensed broker and qualified security professional.
        </p>
      </main>
    </div>
  );
}
