import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/animate-ui/components/buttons/button.tsx";

const TOUR_STORAGE_KEY = "onboarding-tour-complete";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const useViewport = () => {
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return viewport;
};

const OnboardingTour = () => {
  const steps = useMemo(
    () => [
      {
        id: "tabs",
        target: "[data-tour='todo-tabs']",
        title: "Review your tasks",
        description: "Switch between pending and completed tasks using these tabs.",
      },
      {
        id: "add",
        target: "[data-tour='add-todo']",
        title: "Add a new task",
        description: "Tap Add anytime to create a new todo with a title and description.",
      },
      {
        id: "nav",
        target: "[data-tour='nav-toggle']",
        title: "Jump to chat",
        description: "Use this shortcut to switch between the todo list and chat view.",
      },
    ],
    [],
  );
  const [isOpen, setIsOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState(null);
  const viewport = useViewport();

  useEffect(() => {
    const dismissed = window.localStorage.getItem(TOUR_STORAGE_KEY);
    if (!dismissed) {
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const updateRect = () => {
      const target = document.querySelector(steps[stepIndex]?.target);
      if (!target) {
        setTargetRect(null);
        return;
      }
      const rect = target.getBoundingClientRect();
      setTargetRect(rect);
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    updateRect();
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, true);

    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
    };
  }, [isOpen, stepIndex, steps]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        handleComplete();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const handleComplete = () => {
    window.localStorage.setItem(TOUR_STORAGE_KEY, "true");
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  const currentStep = steps[stepIndex];
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === steps.length - 1;

  const cardWidth = 320;
  const cardHeight = 200;
  const padding = 16;

  const cardPosition = targetRect
    ? {
        top: clamp(
          targetRect.bottom + 12,
          padding,
          viewport.height - cardHeight - padding,
        ),
        left: clamp(
          targetRect.left,
          padding,
          viewport.width - cardWidth - padding,
        ),
      }
    : {
        top: clamp(
          viewport.height / 2 - cardHeight / 2,
          padding,
          viewport.height - cardHeight - padding,
        ),
        left: clamp(
          viewport.width / 2 - cardWidth / 2,
          padding,
          viewport.width - cardWidth - padding,
        ),
      };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" />
      {targetRect && (
        <div
          className="absolute pointer-events-none rounded-xl border-2 border-primary shadow-[0_0_0_1px_rgba(255,255,255,0.3)]"
          style={{
            top: targetRect.top - 8,
            left: targetRect.left - 8,
            width: targetRect.width + 16,
            height: targetRect.height + 16,
          }}
        />
      )}
      <div
        className="absolute w-80 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-xl"
        style={cardPosition}
      >
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          Step {stepIndex + 1} of {steps.length}
        </p>
        <h3 className="text-base font-semibold text-foreground">{currentStep.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{currentStep.description}</p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleComplete}
          >
            Skip
          </Button>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setStepIndex((index) => Math.max(index - 1, 0))}
              disabled={isFirst}
            >
              Back
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => {
                if (isLast) {
                  handleComplete();
                } else {
                  setStepIndex((index) => Math.min(index + 1, steps.length - 1));
                }
              }}
            >
              {isLast ? "Done" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTour;
