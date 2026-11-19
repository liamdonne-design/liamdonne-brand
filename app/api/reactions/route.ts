import { getProject } from "@/content/projects";

/**
 * Reaction counts for the project pages (🔥 💛 👍), shared by every visitor.
 *
 * Stored in a Redis hash per project (`reactions:<slug>`) through the Upstash
 * REST API: set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN (or the
 * KV_REST_API_URL + KV_REST_API_TOKEN pair Vercel's Upstash integration adds).
 * Without them (local dev) the counts live in memory and reset on restart.
 */
const KINDS =["fire", "heart", "thumbs"] as const;
type Kind = (typeof KINDS)[number];
type Counts = Record<Kind, number>;

const URL_ = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

const memory = new Map<string, Counts>();
const empty = (): Counts => ({ fire: 0, heart: 0, thumbs: 0 });

async function redis(command: (string | number)[]) {
  const res = await fetch(URL_!, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`redis ${res.status}`);
  return (await res.json()).result;
}

async function read(slug: string): Promise<Counts> {
  if (!URL_ || !TOKEN) return { ...(memory.get(slug) ?? empty()) };
  const flat: string[] = (await redis(["HGETALL", `reactions:${slug}`])) ?? [];
  const counts = empty();
  for (let i = 0; i < flat.length; i += 2) {
    const k = flat[i] as Kind;
    if (KINDS.includes(k)) counts[k] = Math.max(0, Number(flat[i + 1]) || 0);
  }
  return counts;
}

async function bump(slug: string, kind: Kind, delta: 1 | -1): Promise<Counts> {
  if (!URL_ || !TOKEN) {
    const c = memory.get(slug) ?? empty();
    c[kind] = Math.max(0, c[kind] + delta);
    memory.set(slug, c);
    return { ...c };
  }
  const n = Number(await redis(["HINCRBY", `reactions:${slug}`, kind, delta]));
  if (n < 0) await redis(["HSET", `reactions:${slug}`, kind, 0]);
  return read(slug);
}

const validSlug = (s: unknown): s is string => typeof s === "string" && !!getProject(s);

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug");
  if (!validSlug(slug)) return Response.json({ error: "unknown project" }, { status: 404 });
  try {
    return Response.json(await read(slug), { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ error: "unavailable" }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const { slug, kind, delta } = body ?? {};
  if (!validSlug(slug) || !KINDS.includes(kind) || (delta !== 1 && delta !== -1)) {
    return Response.json({ error: "bad request" }, { status: 400 });
  }
  try {
    return Response.json(await bump(slug, kind, delta));
  } catch {
    return Response.json({ error: "unavailable" }, { status: 503 });
  }
}
