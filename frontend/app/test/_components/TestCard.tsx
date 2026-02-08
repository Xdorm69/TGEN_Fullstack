"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

const TestCard = ({
  _id,
  name,
  description,
  admin,
  questionsCount,
  author,
  dateCreated,
}: {
  _id: string;
  name: string;
  description: string;
  admin?: boolean;
  questionsCount: number;
  author: string;
  dateCreated: string;
}) => {
  const router = useRouter();

  return (
    <Card
      onClick={() =>
        admin
          ? router.push(`/admin/update-test/${_id}`)
          : router.push(`/test/${_id}`)
      }
      className="
        cursor-pointer
        transition-all
        duration-200
        hover:shadow-lg
        hover:-translate-y-1
        group
      "
    >
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
          {name}
        </CardTitle>

        <CardDescription className="line-clamp-2 text-sm">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex items-center justify-between text-sm">
        <span className="rounded-full bg-muted px-3 py-1">
          📘 {questionsCount} Questions
        </span>

        <span className="text-muted-foreground">✍️ {author}</span>
      </CardContent>

      <CardFooter className="justify-end">
        <p className="text-xs text-muted-foreground">
          Created on {dateCreated}
        </p>
      </CardFooter>
    </Card>
  );
};

export default TestCard;
