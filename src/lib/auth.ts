import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

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

        const adminName = process.env.ADMIN_NAME;
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

        if (!adminName || !adminPasswordHash) return null;
        if (credentials.name !== adminName) return null;

        const valid = await bcrypt.compare(credentials.password, adminPasswordHash);
        if (!valid) return null;

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
