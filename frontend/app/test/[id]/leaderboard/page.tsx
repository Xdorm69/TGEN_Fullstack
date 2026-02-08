import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import { FetchHandler } from "@/utils/fetch";
import { LeaderboardTable } from "./_components/Leaderboard-table";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function LeaderboardPage({ params }: Props) {
  const id = (await params).id;

  const res = await FetchHandler.get(
    `${process.env.NEXT_PUBLIC_API_URL}/test/${id}/leaderboard`,
  );

  if (!res.success) {
    console.log(res);
    return <div>Failed to load leaderboard</div>;
  }

  const leaderboard = res.data[0];

  return (
    <MaxWidthWrapper>
      <div className="space-y-6">
        <h1 className="heading text-center">🏆 Leaderboard</h1>
        <LeaderboardTable data={leaderboard} />
      </div>
    </MaxWidthWrapper>
  );
}
