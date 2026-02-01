"use client";

import { useState, useEffect } from "react";
import {
  MessageCircle,
  ArrowLeft,
  ChevronRight,
  ArrowLeftCircle,
  FileDown,
  Printer,
  BookOpen,
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  PenLine,
  Save,
  Lightbulb,
} from "lucide-react";
import { HelpButton } from "@/components/help/help-button";

interface Scenario {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  framework: string;
  context: string;
  scriptTemplate: string[];
  dos: string[];
  donts: string[];
  prepChecklist: string[];
  followUp: string[];
}

const SCENARIOS: Scenario[] = [
  {
    id: "performance",
    title: "Poor Performance",
    category: "Performance",
    icon: "chart-down",
    description: "An employee is consistently underperforming. Quality of work has declined, deadlines are being missed, or standards aren't being met.",
    framework: "SBI (Situation-Behavior-Impact)",
    context: "Use when you've noticed a pattern of underperformance over 2+ weeks. Don't wait for a formal review — address it now while it's still correctable.",
    scriptTemplate: [
      "[Name], I want to talk about something I've noticed recently. This isn't a formal write-up — I care about your success here and want to address this early.",
      "SITUATION: Over the past [timeframe], I've noticed [specific examples — be factual, not emotional].",
      "BEHAVIOR: Specifically, [describe the behavior you observed, not your interpretation of it].",
      "IMPACT: The impact of this is [how it affects the team, students, business]. I know this isn't your best work.",
      "What's going on? Is there something I should know about? [PAUSE — let them talk. Listen more than you speak.]",
      "Here's what I need going forward: [specific, measurable expectations with a timeline].",
      "I believe in you. Let's check in on [date] to see how things are going. What support do you need from me?",
    ],
    dos: [
      "Be specific with examples — dates, tasks, outcomes",
      "Focus on behavior, not character",
      "Ask open-ended questions and listen",
      "Set clear expectations with a timeline",
      "Express confidence in their ability to improve",
      "Document the conversation afterward",
    ],
    donts: [
      "Don't use words like 'always' or 'never'",
      "Don't compare them to other employees",
      "Don't have this conversation in public",
      "Don't let emotions drive the conversation",
      "Don't skip the follow-up check-in",
      "Don't pile on multiple issues at once — pick the top 1-2",
    ],
    prepChecklist: [
      "Gather 3+ specific examples with dates",
      "Write down the impact on the team/business",
      "Define what 'good' looks like (measurable)",
      "Set a follow-up date (7-14 days out)",
      "Choose a private, comfortable location",
      "Block 30 minutes (don't rush this)",
    ],
    followUp: [
      "Send a brief summary email: 'Per our conversation today...'",
      "Check in casually within 2-3 days",
      "Formal follow-up at the agreed date",
      "Log in Manager's Log app",
    ],
  },
  {
    id: "attendance",
    title: "Attendance Issues",
    category: "Attendance",
    icon: "clock",
    description: "An employee is frequently late, calling out excessively, or leaving early without approval. The pattern is affecting the team.",
    framework: "DESC (Describe-Express-Specify-Consequences)",
    context: "Use after 3+ instances of attendance issues within 30 days. Check your attendance records first — facts matter.",
    scriptTemplate: [
      "[Name], I need to talk with you about your attendance. I want to be upfront and fair about this.",
      "DESCRIBE: In the past [timeframe], you've been [late/absent] on [specific dates]. Let me share what I have: [list dates and specifics].",
      "EXPRESS: I'm concerned because when you're not here [or late], [explain the specific impact — coverage gaps, extra burden on team, student experience].",
      "SPECIFY: Going forward, I need [specific attendance expectations — on time means 10 minutes early, call-outs require X notice, etc.].",
      "CONSEQUENCES: If attendance doesn't improve by [date], we'll need to [next step in your progressive discipline — written warning, schedule change, etc.].",
      "I want you to succeed here. Is there anything going on that's making it hard to get here on time? [LISTEN — there may be legitimate issues you can help solve.]",
    ],
    dos: [
      "Have exact dates and times documented",
      "Check if there's a personal issue (health, family, transportation)",
      "Offer solutions when possible (schedule adjustment, carpool)",
      "Be consistent — same rules for everyone",
      "Follow your progressive discipline policy",
      "Document everything",
    ],
    donts: [
      "Don't assume you know the reason",
      "Don't excuse the behavior even if the reason is sympathetic",
      "Don't skip documentation thinking it'll fix itself",
      "Don't wait until it's a crisis — address it at the pattern stage",
      "Don't publicly call them out for being late",
      "Don't make threats you won't follow through on",
    ],
    prepChecklist: [
      "Pull attendance records with exact dates/times",
      "Calculate the impact (hours missed, shifts affected)",
      "Review your attendance policy",
      "Check if other employees have similar issues (consistency)",
      "Prepare what accommodations you can offer",
      "Know your next disciplinary step if it continues",
    ],
    followUp: [
      "Track attendance daily for the next 30 days",
      "Acknowledge improvement when you see it",
      "If no improvement, proceed to next disciplinary step",
      "Log everything in Manager's Log",
    ],
  },
  {
    id: "attitude",
    title: "Negative Attitude",
    category: "Culture",
    icon: "frown",
    description: "An employee's attitude is affecting team morale — complaining, eye-rolling, passive-aggressive behavior, or undermining management.",
    framework: "SBI (Situation-Behavior-Impact)",
    context: "This is one of the hardest conversations because attitude is subjective. The key: focus on observable behaviors, not personality.",
    scriptTemplate: [
      "[Name], I want to talk about something that's been on my mind. I value you as part of this team, and that's exactly why I'm bringing this up.",
      "SITUATION: During [specific meeting/interaction/time], I observed [specific behavior].",
      "BEHAVIOR: What I saw was [describe the exact behavior — 'you rolled your eyes when I announced the schedule change' NOT 'you have a bad attitude'].",
      "IMPACT: When that happens, [explain impact — 'it makes newer team members afraid to speak up' or 'it undermines the direction we're trying to go'].",
      "I'm not asking you to fake enthusiasm. What I am asking is that if you disagree with something, you bring it to me privately rather than expressing it in front of the team. Can we agree on that?",
      "What's driving this? Is there something you're frustrated about that we should address? [LISTEN — often attitude issues have a root cause.]",
    ],
    dos: [
      "Focus on specific, observable behaviors only",
      "Acknowledge their feelings are valid",
      "Create a safe channel for their concerns (1-on-1s)",
      "Ask what they need to feel more engaged",
      "Give them ownership of a solution",
      "Follow up with positive reinforcement",
    ],
    donts: [
      "Don't say 'you have a bad attitude' — too vague",
      "Don't dismiss their concerns even if delivery was poor",
      "Don't have this conversation when you're frustrated",
      "Don't gossip about it with other employees",
      "Don't retaliate with bad shifts or assignments",
      "Don't ignore it hoping it goes away — negativity spreads",
    ],
    prepChecklist: [
      "Document 3+ specific behavior examples",
      "Separate fact from feeling",
      "Identify if there's a legitimate underlying concern",
      "Consider: am I part of the problem?",
      "Plan a solution you can offer (more input, 1-on-1 time)",
      "Choose a calm moment — not right after an incident",
    ],
    followUp: [
      "Schedule regular 1-on-1 check-ins (weekly for 30 days)",
      "Catch them doing something positive — acknowledge it",
      "Address any legitimate concerns they raised",
      "If behavior continues, escalate to formal written feedback",
    ],
  },
  {
    id: "termination",
    title: "Termination",
    category: "Separation",
    icon: "door",
    description: "You've decided to let someone go. This conversation must be handled with dignity, clarity, and legal awareness.",
    framework: "Direct & Compassionate",
    context: "Only have this conversation after HR/legal review and when your decision is final. This is not a discussion — it's a notification delivered with respect.",
    scriptTemplate: [
      "[Name], thank you for coming in. I need to share a difficult decision with you.",
      "After careful consideration, we've decided to end your employment with [company], effective [date].",
      "[PAUSE — give them a moment to process. Don't rush.]",
      "This decision is based on [brief, factual reason — performance, restructuring, policy violation]. We've previously discussed [reference prior conversations if applicable].",
      "Here's what happens next: [explain final paycheck, benefits continuation, returning property, reference policy].",
      "I want you to know that this doesn't diminish the contributions you've made. I wish you the best going forward.",
      "[If applicable:] Would you like a few minutes, or would you prefer to gather your things now?",
    ],
    dos: [
      "Have a witness present (HR or another manager)",
      "Do it in private, early in the day, early in the week",
      "Be direct — don't bury the message in small talk",
      "Have all paperwork ready (final check, COBRA, etc.)",
      "Allow them dignity — don't escort them like a criminal",
      "Keep it brief — 10-15 minutes max",
    ],
    donts: [
      "Don't apologize excessively — it undermines the decision",
      "Don't argue or debate — the decision is made",
      "Don't do it on a Friday (they can't take action over the weekend)",
      "Don't share the reason with other employees (privacy)",
      "Don't get drawn into 'what if I...' negotiations",
      "Don't do it over phone/text/email unless legally required",
    ],
    prepChecklist: [
      "Confirm decision with HR/legal/owner",
      "Prepare final paycheck and severance (if applicable)",
      "Have COBRA/benefits information ready",
      "Plan for coverage of their responsibilities",
      "Prepare a brief statement for the team (without details)",
      "Have their personal items boxed if possible",
      "Arrange a witness to be present",
      "Collect keys, passwords, and access credentials",
    ],
    followUp: [
      "Notify the team (briefly, without details)",
      "Redistribute workload immediately",
      "Update access credentials and accounts",
      "Process all final paperwork within legal timeframes",
      "Document everything thoroughly",
    ],
  },
  {
    id: "conflict",
    title: "Team Conflict",
    category: "Team",
    icon: "users-conflict",
    description: "Two team members are in conflict and it's affecting the work environment. You need to mediate and find resolution.",
    framework: "LARA (Listen-Affirm-Respond-Add)",
    context: "Meet with each person individually first, then bring them together. Your role is mediator, not judge.",
    scriptTemplate: [
      "[Individual meeting first:] I've noticed some tension between you and [Name]. I want to understand your perspective. Tell me what's happening from your point of view.",
      "LISTEN: [Let them speak fully without interrupting. Take notes.]",
      "AFFIRM: I hear you. It sounds like you're feeling [reflect their emotion]. That makes sense given what you described.",
      "[Then bring both together:] I asked to meet with both of you because I value you both, and I believe we can find a path forward together.",
      "RESPOND: Here's what I'm asking: [Name 1], share your perspective briefly. [Name 2], I want you to listen without interrupting. Then we'll switch.",
      "ADD: What I'm hearing from both of you is [common ground]. Here's what I propose: [specific resolution with accountability for both parties].",
      "Can we agree to [specific commitment]? I'll check in with both of you individually in [timeframe] to see how things are going.",
    ],
    dos: [
      "Meet individually before bringing them together",
      "Remain neutral — don't take sides",
      "Focus on behaviors and impact, not personality",
      "Find common ground and shared goals",
      "Set clear expectations for professional behavior",
      "Follow up individually with each person",
    ],
    donts: [
      "Don't ignore it — it won't resolve itself",
      "Don't assume you know who's 'right'",
      "Don't reveal what one person said in confidence",
      "Don't allow personal attacks during mediation",
      "Don't force them to be friends — professional respect is enough",
      "Don't let it drag on — set a resolution timeline",
    ],
    prepChecklist: [
      "Document the conflict's impact on operations",
      "Schedule individual meetings first (same day if possible)",
      "Prepare neutral language — no loaded words",
      "Identify what 'resolved' looks like for each person",
      "Have a backup plan if mediation fails",
      "Choose a neutral meeting space",
    ],
    followUp: [
      "Individual check-ins at 3 days and 2 weeks",
      "Watch for improvement or deterioration",
      "Acknowledge positive changes publicly",
      "If unresolved, consider role changes or escalation",
    ],
  },
  {
    id: "pay",
    title: "Pay / Raise Request",
    category: "Compensation",
    icon: "dollar",
    description: "An employee asks for a raise and you either can't or aren't ready to give one. How to handle it honestly without losing them.",
    framework: "Acknowledge-Explain-Path Forward",
    context: "Never dismiss a raise request. Even if the answer is no, how you handle it determines whether they stay or start job hunting.",
    scriptTemplate: [
      "Thank you for bringing this up, [Name]. I respect that you advocate for yourself, and I want to give this the attention it deserves.",
      "ACKNOWLEDGE: I hear you. You're asking about [specific request — raise amount, title change, etc.]. Let me be honest with you about where things stand.",
      "EXPLAIN: [Choose your situation:] 'Right now, our budget for this quarter is set, and I can't make that change immediately.' OR 'Based on [specific metrics], here's where I see opportunity for growth.'",
      "PATH FORWARD: Here's what I CAN do — let's set specific goals that, when met, will position you for [the raise/promotion]. Specifically: [list 2-3 measurable targets with a timeline].",
      "Can we revisit this in [30/60/90 days] after you've had a chance to hit these targets? I want to get to yes.",
      "Is there anything else that would make your experience here better in the meantime? [LISTEN — sometimes it's not just about money.]",
    ],
    dos: [
      "Thank them for asking — it takes courage",
      "Be honest about why (budget, performance, timing)",
      "Give a clear path to the answer they want",
      "Set specific, measurable milestones",
      "Follow through on your commitment to revisit",
      "Ask what else matters to them (flexibility, title, training)",
    ],
    donts: [
      "Don't laugh it off or dismiss the request",
      "Don't make promises you can't keep",
      "Don't say 'we'll see' — that's the same as no",
      "Don't compare them to other employees' pay",
      "Don't punish them for asking",
      "Don't forget to follow up at the agreed date",
    ],
    prepChecklist: [
      "Know your budget constraints",
      "Review their performance data",
      "Research market rates for their role",
      "Prepare 2-3 specific growth milestones",
      "Know what non-monetary benefits you can offer",
      "Have a timeline ready for the revisit conversation",
    ],
    followUp: [
      "Put the agreement in writing (email summary)",
      "Track their progress on milestones",
      "Check in monthly on their development",
      "HONOR THE REVISIT DATE — this is critical",
    ],
  },
  {
    id: "customer-escalation",
    title: "Customer Escalation",
    category: "Customer",
    icon: "megaphone",
    description: "A customer or parent is upset, demanding, or threatening to leave/go public. You need to de-escalate and find resolution.",
    framework: "HEAT (Hear-Empathize-Apologize-Take Action)",
    context: "The customer doesn't care whose fault it is. They want to feel heard and get a solution. Speed matters — address within 24 hours.",
    scriptTemplate: [
      "Thank you for bringing this to my attention, [Name]. I take this seriously and I want to make this right.",
      "HEAR: Help me understand exactly what happened. [Let them tell the full story without interrupting.]",
      "EMPATHIZE: I completely understand why you're frustrated. If I were in your position, I'd feel the same way.",
      "APOLOGIZE: I'm sorry this happened. Regardless of the circumstances, your experience should have been better.",
      "TAKE ACTION: Here's what I'm going to do right now: [specific, immediate action]. And here's what I'll do to make sure this doesn't happen again: [systemic fix].",
      "Is there anything else I can do for you? I value your family being part of our community, and I want to earn back your trust.",
    ],
    dos: [
      "Respond within 24 hours (sooner is better)",
      "Let them vent fully before responding",
      "Take ownership even if it wasn't your fault directly",
      "Offer a specific solution, not vague promises",
      "Follow up within 48 hours to confirm satisfaction",
      "Thank them for giving you the chance to fix it",
    ],
    donts: [
      "Don't get defensive or argue facts",
      "Don't pass blame to an employee in front of the customer",
      "Don't minimize their feelings",
      "Don't make excuses",
      "Don't let it go unresolved thinking they'll forget",
      "Don't take it personally — separate emotion from problem",
    ],
    prepChecklist: [
      "Gather all facts before the conversation",
      "Talk to involved staff members first",
      "Know what resolution options you have (refund, credit, etc.)",
      "Choose the right medium (phone > email for serious issues)",
      "Have the authority to make it right on the spot",
      "Prepare your emotional state — be calm and empathetic",
    ],
    followUp: [
      "Follow up within 48 hours",
      "Address any systemic issues that caused the problem",
      "Coach involved staff members (privately)",
      "Document the issue and resolution",
      "Check in again at 2 weeks",
    ],
  },
];

const FRAMEWORKS: { name: string; acronym: string; steps: string[]; bestFor: string }[] = [
  { name: "Situation-Behavior-Impact", acronym: "SBI", steps: ["Describe the SITUATION (when/where)", "Describe the BEHAVIOR (what you observed)", "Describe the IMPACT (effect on team/business)"], bestFor: "Performance and attitude conversations" },
  { name: "Describe-Express-Specify-Consequences", acronym: "DESC", steps: ["DESCRIBE the situation factually", "EXPRESS how it affects you/the team", "SPECIFY what change you need", "CONSEQUENCES if it continues (or improves)"], bestFor: "Attendance and policy violations" },
  { name: "Listen-Affirm-Respond-Add", acronym: "LARA", steps: ["LISTEN fully without interrupting", "AFFIRM their feelings and perspective", "RESPOND with your view", "ADD solutions and next steps"], bestFor: "Conflict mediation and emotional situations" },
  { name: "Hear-Empathize-Apologize-Take Action", acronym: "HEAT", steps: ["HEAR the full story", "EMPATHIZE with their experience", "APOLOGIZE sincerely", "TAKE immediate ACTION"], bestFor: "Customer complaints and escalations" },
];

const STORAGE_KEY = "dcc-notes";

export default function DifficultConversationsPage() {
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [showFrameworks, setShowFrameworks] = useState(false);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { setNotes(JSON.parse(saved)); } catch { /* ignore */ }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes, loaded]);

  const exportScenario = (s: Scenario) => {
    const myNotes = notes[s.id] || "";
    const lines = [
      `CONVERSATION PREP: ${s.title}`,
      `Framework: ${s.framework}`,
      `Category: ${s.category}`,
      "",
      `CONTEXT:`,
      s.context,
      "",
      "SCRIPT TEMPLATE:",
      ...s.scriptTemplate.map((l, i) => `  ${i + 1}. ${l}`),
      "",
      "DO's:",
      ...s.dos.map((d) => `  ✓ ${d}`),
      "",
      "DON'Ts:",
      ...s.donts.map((d) => `  ✗ ${d}`),
      "",
      "PREPARATION CHECKLIST:",
      ...s.prepChecklist.map((p) => `  □ ${p}`),
      "",
      "FOLLOW-UP:",
      ...s.followUp.map((f) => `  - ${f}`),
      "",
      "MY NOTES:",
      myNotes || "(none)",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Conversation-Prep-${s.title.replace(/\s+/g, "-")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const categoryColors: Record<string, string> = {
    Performance: "bg-amber-100 text-amber-700",
    Attendance: "bg-blue-100 text-blue-700",
    Culture: "bg-purple-100 text-purple-700",
    Separation: "bg-red-100 text-red-700",
    Team: "bg-green-100 text-green-700",
    Compensation: "bg-emerald-100 text-emerald-700",
    Customer: "bg-orange-100 text-orange-700",
  };

  const categoryGradients: Record<string, string> = {
    Performance: "from-amber-500 to-orange-600",
    Attendance: "from-blue-500 to-indigo-600",
    Culture: "from-purple-500 to-violet-600",
    Separation: "from-red-500 to-rose-600",
    Team: "from-green-500 to-emerald-600",
    Compensation: "from-emerald-500 to-teal-600",
    Customer: "from-orange-500 to-amber-600",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-rose-50/30">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-200">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Difficult Conversations Coach</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Say the hard thing, the right way</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowFrameworks(!showFrameworks)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${showFrameworks ? "bg-rose-100 text-rose-700" : "text-gray-600 hover:bg-gray-100"}`}>
              <BookOpen className="inline w-4 h-4 mr-1" />Frameworks
            </button>
            <HelpButton />
            <a href="https://masters-edge-portal.vercel.app" className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
              <ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline">Portal</span>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Frameworks Panel */}
        {showFrameworks && (
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FRAMEWORKS.map((fw) => (
              <div key={fw.acronym} className="rounded-xl border border-gray-200 bg-white p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-rose-600">{fw.acronym}</span>
                  <span className="text-sm text-gray-500">— {fw.name}</span>
                </div>
                <div className="space-y-1.5 mb-3">
                  {fw.steps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-rose-500 font-bold shrink-0">{i + 1}.</span>
                      <span className="text-gray-700">{step}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 flex items-center gap-1"><Lightbulb className="w-3 h-3" /> Best for: {fw.bestFor}</p>
              </div>
            ))}
          </div>
        )}

        {!activeScenario ? (
          /* Scenario Grid */
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Scenario</h2>
              <p className="text-gray-500 max-w-lg mx-auto">Select the type of conversation you need to have. Each scenario includes a framework, script template, preparation checklist, and do&apos;s/don&apos;ts.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SCENARIOS.map((s) => (
                <button key={s.id} onClick={() => setActiveScenario(s)} className="group text-left p-5 rounded-2xl border border-gray-200 bg-white hover:shadow-lg hover:border-rose-300 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryGradients[s.category] || "from-rose-500 to-pink-600"} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mb-2 ${categoryColors[s.category] || "bg-gray-100 text-gray-600"}`}>{s.category}</span>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-rose-700 transition-colors">{s.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{s.description}</p>
                  <div className="mt-3 flex items-center gap-1 text-sm text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    View script <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Scenario Detail */
          <div>
            <button onClick={() => setActiveScenario(null)} className="flex items-center gap-2 text-sm text-gray-600 hover:text-rose-700 mb-6 cursor-pointer no-print">
              <ArrowLeftCircle className="w-4 h-4" /> Back to all scenarios
            </button>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              {/* Header */}
              <div className={`bg-gradient-to-r ${categoryGradients[activeScenario.category] || "from-rose-500 to-pink-600"} p-6 text-white`}>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-sm font-medium mb-2">{activeScenario.framework}</span>
                    <h2 className="text-2xl font-bold">{activeScenario.title}</h2>
                    <p className="text-white/80 mt-1">{activeScenario.description}</p>
                  </div>
                  <div className="flex items-center gap-2 no-print">
                    <button onClick={() => exportScenario(activeScenario)} className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"><FileDown className="w-5 h-5" /></button>
                    <button onClick={() => window.print()} className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors cursor-pointer"><Printer className="w-5 h-5" /></button>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-8">
                {/* Context */}
                <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                  <h3 className="font-semibold text-amber-900 flex items-center gap-2 mb-2"><Lightbulb className="w-4 h-4" /> When to Use This</h3>
                  <p className="text-sm text-amber-800">{activeScenario.context}</p>
                </div>

                {/* Script Template */}
                <div>
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-4"><PenLine className="w-4 h-4 text-rose-500" /> Script Template</h3>
                  <div className="space-y-3">
                    {activeScenario.scriptTemplate.map((line, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                        <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                        <p className="text-sm text-gray-700 leading-relaxed">{line}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Do's and Don'ts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-green-200 bg-green-50/50 p-4">
                    <h3 className="font-semibold text-green-800 flex items-center gap-2 mb-3"><CheckCircle2 className="w-4 h-4" /> Do&apos;s</h3>
                    <div className="space-y-2">
                      {activeScenario.dos.map((d, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-green-800"><CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />{d}</div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-red-200 bg-red-50/50 p-4">
                    <h3 className="font-semibold text-red-800 flex items-center gap-2 mb-3"><XCircle className="w-4 h-4" /> Don&apos;ts</h3>
                    <div className="space-y-2">
                      {activeScenario.donts.map((d, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-red-800"><XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />{d}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Prep Checklist */}
                <div>
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-3"><Shield className="w-4 h-4 text-rose-500" /> Preparation Checklist</h3>
                  <div className="space-y-2">
                    {activeScenario.prepChecklist.map((p, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm">
                        <div className="w-5 h-5 rounded border-2 border-gray-300 shrink-0 mt-0.5" />
                        <span className="text-gray-700">{p}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Follow Up */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">After the Conversation</h3>
                  <div className="space-y-2">
                    {activeScenario.followUp.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-700"><ChevronRight className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />{f}</div>
                    ))}
                  </div>
                </div>

                {/* Personal Notes */}
                <div className="no-print">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-3"><Save className="w-4 h-4 text-rose-500" /> My Notes</h3>
                  <textarea
                    value={notes[activeScenario.id] || ""}
                    onChange={(e) => setNotes({ ...notes, [activeScenario.id]: e.target.value })}
                    placeholder="Jot down specifics for your situation — names, dates, examples, what you want to say..."
                    rows={4}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-1">Auto-saved to your browser. Included when you export.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t bg-white/60 backdrop-blur-sm mt-auto no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 text-center text-xs text-gray-400">
          The Master&apos;s Edge Business Program &bull; Total Success AI
        </div>
      </footer>
    </div>
  );
}
