import { headers } from "next/headers";

export async function isAllowedConsultationOrigin(): Promise<boolean> {
  const headerList = await headers();
  const origin = headerList.get("origin");

  if (!origin) {
    return true;
  }

  const host =
    headerList.get("x-forwarded-host")?.split(",")[0]?.trim() ??
    headerList.get("host");

  if (!host) {
    return false;
  }

  try {
    const originHost = new URL(origin).host;

    return originHost === host;
  } catch {
    return false;
  }
}
