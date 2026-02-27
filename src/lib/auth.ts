import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Телефон та Пароль",
      credentials: {
        phone: { label: "Телефон", type: "text", placeholder: "+380..." },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password) {
          throw new Error("Необхідно ввести телефон та пароль");
        }

        const phone = credentials.phone as string;
        const password = credentials.password as string;

        // Шукаємо користувача в базі
        const user = await prisma.user.findUnique({
          where: { phone },
        });

        if (!user || (!user.password && user.phone)) {
          throw new Error("Користувача не знайдено");
        }

        // Перевіряємо пароль
        const isPasswordValid = await bcrypt.compare(password, user.password as string);

        if (!isPasswordValid) {
          throw new Error("Невірний пароль");
        }

        return {
          id: user.id,
          phone: user.phone,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.phone = (user as any).phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).phone = token.phone as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
