
"use client";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import { FetchHandler } from "@/utils/fetch";
import { LeaderboardTable } from "./_components/Leaderboard-table";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { useRouter } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default function LeaderboardPage({ params }: Props) {

  const id = use(params).id;
  
  const router = useRouter();
  const {data, isLoading, error} = useQuery({
    queryKey: ["leaderboard", id],
    queryFn: async () => {
      const res = await FetchHandler.get(
        `/api/v1/tests/${id}/leaderboard`,
      );

      if (res.status === 401) {
        router.push("/login");
      }
      if (!res.success) {
        throw new Error(res.message || "Something went wrong");
      }
      return res.data;
    },
  });

  if (isLoading) {
    return <MaxWidthWrapper>
      <div className="space-y-6">
        <h1 className="heading text-center">🏆 Leaderboard</h1>
        <div className="w-full h-[40vh] animate-pulse bg-gray-800 rounded-lg"></div>
      </div>
    </MaxWidthWrapper>;
  }

  if (error) {
    return <MaxWidthWrapper><div>Error: {error.message}</div></MaxWidthWrapper>;
  }

  if (!data || !data.length) {
    return <div>No data available</div>;
  }

  return (
    <MaxWidthWrapper>
      <div className="space-y-6">
        <h1 className="heading text-center">🏆 Leaderboard</h1>
        <LeaderboardTable data={data[0]} />
      </div>
    </MaxWidthWrapper>
  );
}
