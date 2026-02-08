
import { redirect, useRouter } from "next/navigation";
import { responseType } from "./fetch";

export function handleApiResponse(res: responseType): any {
  if (res.success) return res.data;

  switch (res.status) {
    case 401:
      redirect("/login");

    case 403:
      redirect("/forbidden");

    case 404:
      throw new Error("Resource not found");

    default:
      throw new Error(res.message || "Something went wrong");
  }
}
