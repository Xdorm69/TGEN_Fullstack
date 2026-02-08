import MaxWidthWrapper from "@/components/wrappers/MaxWidthWrapper";
import RenderTestCards from "./_components/RenderTestCards";

const page = async () => {
  return (
    <MaxWidthWrapper>
      <div className="min-h-screen">
        <h2 className="heading">Available Tests</h2>
        <p className="description max-w-2xl">
          Below are some of the available tests
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <RenderTestCards/>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
