"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type LeaderboardEntry = {
  userId: string;
  name: string;
  email: string;
  score: number;
  accuracy: number;
  timeTaken: number;
};

export function LeaderboardTable({ data }: { data: LeaderboardEntry[] }) {
  return (
    <div className="border rounded-xl overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Accuracy</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((entry, index) => (
            <TableRow key={entry.userId}>
              <TableCell className="font-bold">
                {index === 0 && "🥇"}
                {index === 1 && "🥈"}
                {index === 2 && "🥉"}
                {index > 2 && index + 1}
              </TableCell>

              <TableCell className="font-medium">
                {entry.name}
                <div className="text-xs text-muted-foreground">
                  {entry.email}
                </div>
              </TableCell>

              <TableCell>
                <Badge variant="secondary">{entry.score}</Badge>
              </TableCell>

              <TableCell>{entry.accuracy}%</TableCell>

              <TableCell>{entry.timeTaken}s</TableCell>
            </TableRow>
          ))}

          {data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground"
              >
                No attempts yet
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
