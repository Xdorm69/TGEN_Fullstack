"use client";

import { WrongAnswer } from "@/types/test";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type Props = {
  score: number;
  accuracy: number;
  timeTaken: number;
  wrongAnswers: WrongAnswer[];
};

export function TestStatsPage({
  score,
  accuracy,
  timeTaken,
  wrongAnswers,
}: Props) {
  const tt: string = timeTaken > 60 ? (timeTaken / 60).toFixed(2) + "min" : timeTaken.toFixed(2) + "sec";
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Test Completed 🎉</h1>
        <p className="text-muted-foreground">Here’s how you performed</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{score}</p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className={`text-3xl font-bold ${
                accuracy >= 60 ? "text-green-600" : "text-red-500"
              }`}
            >
              {accuracy}%
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Time Taken
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{tt}</p>
          </CardContent>
        </Card>
      </div>

      {/* Wrong Answers */}
      {wrongAnswers.length > 0 && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">
              ❌ Wrong Answers ({wrongAnswers.length})
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 max-h-[400px] overflow-y-auto">
            {wrongAnswers.map((wa, index) => (
              <div
                key={`${wa.question}-${index}`}
                className="rounded-lg border border-red-200 bg-gray-100 p-4 text-black"
              >
                <p className="font-medium mb-3">
                  <span className="text-red-600">Q.</span> {wa.question}
                </p>

                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-semibold text-red-500">
                      Your Answer:
                    </span>{" "}
                    {wa.selectedOption || "Not Answered"}
                  </p>
                  <p>
                    <span className="font-semibold text-green-600">
                      Correct Answer:
                    </span>{" "}
                    {wa.correctOption}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-center gap-4">
        <Link href="/test">
          <Button variant="outline">Go Home</Button>
        </Link>

        <Link href="/test">
          <Button>Try Another Test</Button>
        </Link>
      </div>
    </div>
  );
}