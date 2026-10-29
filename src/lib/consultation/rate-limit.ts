/**
 * Best-effort, in-process rate limiting for consultation submissions.
 *
 * This is NOT a global limiter: each Node/serverless instance keeps its own
 * memory, counts reset on cold starts, and concurrent instances do not share
 * state. Replace with platform or edge rate limiting (CDN, WAF, KV/Redis) in
 * production.
 */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_SUBMISSIONS_PER_IP = 5;
const MAX_SUBMISSIONS_PER_EMAIL = 3;

type Bucket = {
  count: number;
  windowStartedAt: number;
};

const ipBuckets = new Map<string, Bucket>();
const emailBuckets = new Map<string, Bucket>();

function consumeBucket(
  buckets: Map<string, Bucket>,
  key: string,
  maxInWindow: number,
): boolean {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now - existing.windowStartedAt > WINDOW_MS) {
    buckets.set(key, { count: 1, windowStartedAt: now });
    return true;
  }

  if (existing.count >= maxInWindow) {
    return false;
  }

  existing.count += 1;
  return true;
}

export function allowConsultationSubmission(
  clientIp: string,
  normalizedEmail: string,
): boolean {
  const ipAllowed = consumeBucket(
    ipBuckets,
    clientIp || "unknown",
    MAX_SUBMISSIONS_PER_IP,
  );

  if (!ipAllowed) {
    return false;
  }

  return consumeBucket(
    emailBuckets,
    normalizedEmail || "unknown",
    MAX_SUBMISSIONS_PER_EMAIL,
  );
}
