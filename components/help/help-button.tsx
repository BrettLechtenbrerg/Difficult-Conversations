"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  HelpCircle,
  MessageCircle,
  BookOpen,
  PenLine,
  Shield,
  Lightbulb,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    icon: BookOpen,
    color: "from-rose-500 to-pink-600",
    title: "Step 1: Choose a Scenario",
    subtitle: "Pick the conversation you need to have",
    description:
      "Browse pre-built scenarios covering common tough conversations: performance issues, attendance, attitude, conflict resolution, pay discussions, and more. Each includes context and a recommended framework.",
    tip: "Don't avoid the conversation — the longer you wait, the harder it gets. Pick the scenario and prepare.",
  },
  {
    icon: PenLine,
    color: "from-pink-500 to-rose-600",
    title: "Step 2: Prepare Your Script",
    subtitle: "Use proven frameworks to structure your approach",
    description:
      "Each scenario includes a fill-in-the-blank script template using proven frameworks like SBI (Situation-Behavior-Impact) and DESC (Describe-Express-Specify-Consequences). Customize it for your specific situation.",
    tip: "Write out what you'll say AND what you'll do if they get emotional. Preparation is your superpower.",
  },
  {
    icon: Shield,
    color: "from-red-500 to-rose-600",
    title: "Step 3: Review Do's & Don'ts",
    subtitle: "Go in with confidence",
    description:
      "Every scenario has specific do's and don'ts to keep the conversation productive. Review the preparation checklist before you walk in. Save your notes for follow-up documentation.",
    tip: "Always end with a clear next step. 'What will you do differently starting tomorrow?' is a powerful close.",
  },
];

export function HelpButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="gap-2"
        onClick={() => setOpen(true)}
      >
        <HelpCircle className="h-4 w-4" />
        <span className="hidden sm:inline">Help</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-600 to-pink-600 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              Difficult Conversations Guide
            </DialogTitle>
            <DialogDescription>
              Say the hard thing, the right way.
            </DialogDescription>
          </DialogHeader>

          <div className="overflow-y-auto flex-1 -mx-6 px-6 space-y-4 py-4">
            <div className="rounded-lg bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/40 dark:to-pink-950/40 border border-rose-200 dark:border-rose-800 p-5 space-y-3">
              <h3 className="font-semibold text-rose-900 dark:text-rose-100 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Courage + Compassion
              </h3>
              <p className="text-sm text-rose-800 dark:text-rose-200">
                Great leaders don&apos;t avoid hard conversations — they handle
                them with clarity and care. This tool gives you the frameworks,
                scripts, and confidence to address any situation professionally.
              </p>
            </div>

            {steps.map((step, index) => (
              <div key={index} className="rounded-lg border p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center shrink-0`}
                  >
                    <step.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {step.subtitle}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
                <div className="flex items-start gap-2 rounded-md bg-rose-50 p-3">
                  <Lightbulb className="h-4 w-4 text-rose-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-rose-800">{step.tip}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <Button
              onClick={() => setOpen(false)}
              className="w-full bg-rose-600 hover:bg-rose-700"
            >
              Got it!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
