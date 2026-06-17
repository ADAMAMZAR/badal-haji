import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

async function incrementLoginFailure(name: string): Promise<void> {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return;
  try {
    const { kv } = await import("@vercel/kv");
    const key = `login:fail:${name.slice(0, 50)}`;
    const count = await kv.incr(key);
    if (count === 1) await kv.expire(key, 900);
  } catch { /* fail open */ }
}

async function clearLoginFailures(name: string): Promise<void> {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return;
  try {
    const { kv } = await import("@vercel/kv");
    await kv.del(`login:fail:${name.slice(0, 50)}`);
  } catch { /* ignore */ }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.name || !credentials?.password) return null;

        if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
          try {
            const { kv } = await import("@vercel/kv");
            const failures = (await kv.get<number>(`login:fail:${credentials.name.slice(0, 50)}`)) ?? 0;
            if (failures >= 10) return null;
          } catch { /* fail open */ }
        }

        const adminName = process.env.ADMIN_NAME;
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!adminName || !adminPasswordHash) return null;

        if (credentials.name !== adminName) {
          await incrementLoginFailure(credentials.name);
          return null;
        }

        const valid = await bcrypt.compare(credentials.password, adminPasswordHash);
        if (!valid) {
          await incrementLoginFailure(credentials.name);
          return null;
        }

        await clearLoginFailures(credentials.name);
        return { id: "1", name: adminName };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};
