"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TestStatsPage } from "./TestStats";
import { WrongAnswer } from "@/types/test";
import { FetchHandler } from "@/utils/fetch";
import { toast } from "sonner";

type Option = {
  _id: string;
  title: string;
};

type Question = {
  _id: string;
  title: string;
  options: Option[];
};

type Props = {
  test: {
    _id: string;
    name: string;
    subject: { name: string; color: string };
    description: string;
    questions: Question[];
  };
  startTime: Date;
};

type Result = {
  score: number;
  accuracy: number;
  wrongAnswers: WrongAnswer[];
};

export default function TakeTestClient({ test, startTime }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Result | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const currentQuestion = test.questions[currentIndex];

  /* ---------- Option select ---------- */
  const handleOptionClick = (optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion._id]: optionId,
    }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if submitting
      if (submitting) return;

      /* ---------- Option select: 1-4 ---------- */
      if (["1", "2", "3", "4"].includes(e.key)) {
        const index = Number(e.key) - 1;
        const option = currentQuestion.options[index];

        if (option) {
          handleOptionClick(option._id);
        }
      }

      /* ---------- Enter = next / submit ---------- */
      if (e.key === "Enter") {
        if (answers[currentQuestion._id]) {
          nextQuestion();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentQuestion, answers, submitting]);

  /* ---------- Submit test ---------- */
  const submitTest = async () => {
    try {
      setSubmitting(true);

      const timeTaken = (Date.now() - startTime.getTime()) / 1000;

      const res = await FetchHandler.post(
        `/api/v1/tests/${test._id}/submit`,
        {
          answers,
          timeTaken,
          testId: test._id,
          test,
        }
      );

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      setResult({
        score: res.data[0].score,
        accuracy: res.data[0].accuracy,
        wrongAnswers: res.data[0].wrongAnswers,
      });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while submitting the test");
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------- Next / Finish ---------- */
  const nextQuestion = async () => {
    if (currentIndex === test.questions.length - 1) {
      await submitTest();
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  /* ---------- Result screen ---------- */
  if (result) {
    return (
      <TestStatsPage
        score={result.score}
        accuracy={result.accuracy}
        timeTaken={(Date.now() - startTime.getTime()) / 1000}
        wrongAnswers={result.wrongAnswers}
      />
    );
  }

  /* ---------- Question screen ---------- */
  return (
    <div className="space-y-6 relative">
      <div
        style={{
          width: (currentIndex / test.questions.length) * 100 + "%",
          height: "2px",
          backgroundColor: test.subject.color || "#008000",
          display: "block",
          position: "absolute",
          top: -20,
          left: 0,
        }}
      />
      {/* MUTED LINE  */}
      <div
        style={{
          width: "100%",
          height: "2px",
          backgroundColor: "#ccc",
          display: "block",
          position: "absolute",
          top: -20,
          left: 0,
          zIndex: -1,
        }}
      />
      <h1 className="heading">{test.name}</h1>

      <div>
        <p className="text-sm text-muted-foreground">
          Question {currentIndex + 1} / {test.questions.length}
        </p>
        <h2 className="text-xl font-semibold">{currentQuestion.title}</h2>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentQuestion.options.map((opt) => {
          const selected = answers[currentQuestion._id] === opt._id;

          return (
            <button
              key={opt._id}
              onClick={() => handleOptionClick(opt._id)}
              className={`border rounded-lg p-4 text-left transition
                ${
                  selected
                    ? "border-primary bg-primary/10"
                    : "hover:border-primary/50"
                }
              `}
            >
              {opt.title}
            </button>
          );
        })}
      </div>
      <div className="">
        <p className="hidden md:block font-mono text-muted-foreground text-xs">
          Tip: On dekstop systems you can press enter to submit an option.
        </p>
        <Button
          onClick={nextQuestion}
          disabled={!answers[currentQuestion._id] || submitting}
          className="md:w-fit w-full relative top-10 md:top-0 mt-0 md:mt-4"
        >
          {currentIndex === test.questions.length - 1
            ? submitting
              ? "Submitting..."
              : "Finish Test"
            : "Next Question"}
        </Button>
      </div>
    </div>
  );
}
