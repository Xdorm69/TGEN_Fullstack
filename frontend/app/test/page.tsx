import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import { TestSchema } from "@/types/test";
import { FetchHandler } from "@/utils/fetch";
import TestCard from "./_components/TestCard";

const page = async () => {
  const response = await FetchHandler.get(
    `${process.env.NEXT_PUBLIC_API_URL!}/api/v1/tests/all`,
  );
  const tests: TestSchema[] = response.data;

  if (!response.success) {
    return (
      <MaxWidthWrapper>
        <div className="min-h-screen">
          <h2 className="heading">Available Tests</h2>
          <p className="description max-w-2xl">Failed to load tests</p>
        </div>
      </MaxWidthWrapper>
    );
  }

  return (
    <MaxWidthWrapper>
      <div className="min-h-screen">
        <h2 className="heading">Available Tests</h2>
        <p className="description max-w-2xl">
          Below are some of the available tests
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {tests.length > 0 ? (
            tests.map((test) => (
              <TestCard
                key={test._id}
                {...test}
                questionsCount={test.questions.length}
                dateCreated={new Date(test.createdAt).toLocaleDateString()}
                author={test.author.name as string}
              />
            ))
          ) : (
            <p className="description">No tests available</p>
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
