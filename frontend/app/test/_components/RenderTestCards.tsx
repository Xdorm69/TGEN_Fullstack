"use client"

import { handleApiResponse } from "@/utils/api"
import { FetchHandler } from "@/utils/fetch"
import { useQuery } from "@tanstack/react-query"
import TestCard from "./TestCard"
import { TestSchema } from "@/types/test"

const RenderTestCards = () => {
    const {data, error, isLoading} = useQuery({
        queryKey: ["all-tests"],
        queryFn: async () => {
            const res = await FetchHandler.get("/api/v1/tests/all")
            return handleApiResponse(res);
        }
    })

    if (isLoading) {
        return <>
            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                    <div className="h-52 bg-gray-700 rounded-lg relative">
                        <div className="h-4 bg-gray-600 rounded w-3/4 bottom-12 left-2 absolute"></div>
                        <div className="h-4 bg-gray-600 rounded w-3/4 bottom-4 left-2 absolute"></div>
                    </div>
                </div>
            ))}
        </>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

  return (
    <>
    { data && data.length > 0 ? (
            data.map((test: TestSchema) => (
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
    </>
  )
}

export default RenderTestCards