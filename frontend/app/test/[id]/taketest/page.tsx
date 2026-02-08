
"use client";
import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import TakeTestClient from "./_components/TakeTestClient";
import { FetchHandler } from "@/utils/fetch";
import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const TakeTestPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {

  const id = use(params).id;
  const router = useRouter();
  const {data, isLoading, error} = useQuery({
    queryKey: ["test", id],
    queryFn: async () => {
      const res = await FetchHandler.get(
      `/api/v1/tests/${id}/taketest`
    );

    if (res.status === 401) {
      router.push("/login");
    }

    if (!res.success) {
      throw new Error(res.message);
    }

    return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!data || !data.length) {
    return <div>No data available</div>
  }

  return (
    <MaxWidthWrapper>
      <TakeTestClient test={data[0]} startTime={new Date()} />
    </MaxWidthWrapper>
  );
};

export default TakeTestPage;
