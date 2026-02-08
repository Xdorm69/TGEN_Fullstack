import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import TakeTestClient from "./_components/TakeTestClient";
import { FetchHandler } from "@/utils/fetch";
import { handleApiResponse } from "@/utils/api";

const TakeTestPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const id = params.id;

  const res = await FetchHandler.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/tests/${id}/taketest`
  );

  const data = handleApiResponse(res);

  const test = data[0].test;

  return (
    <MaxWidthWrapper>
      <TakeTestClient test={test} startTime={new Date()} />
    </MaxWidthWrapper>
  );
};

export default TakeTestPage;
