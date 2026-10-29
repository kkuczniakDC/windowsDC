import { headers } from "next/headers";

export async function getConsultationClientIp(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");

  if (forwarded) {
    const firstHop = forwarded.split(",")[0]?.trim();

    if (firstHop) {
      return firstHop;
    }
  }

  const realIp = headerList.get("x-real-ip")?.trim();

  return realIp || "unknown";
}
