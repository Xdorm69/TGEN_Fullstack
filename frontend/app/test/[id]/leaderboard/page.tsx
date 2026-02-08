import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import { FetchHandler } from "@/utils/fetch";
import { LeaderboardTable } from "./_components/Leaderboard-table";
import { handleApiResponse } from "@/utils/api";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function LeaderboardPage({ params }: Props) {
  const id = (await params).id;

  const res = await FetchHandler.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tests/${id}/leaderboard`,
  );

  const data = handleApiResponse(res);

  return (
    <MaxWidthWrapper>
      <div className="space-y-6">
        <h1 className="heading text-center">🏆 Leaderboard</h1>
        <LeaderboardTable data={data[0]} />
      </div>
    </MaxWidthWrapper>
  );
}
