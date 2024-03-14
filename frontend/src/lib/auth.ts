import { NextAuthOptions, getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Login",
      id: "login",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: { label: "email", type: "password" },
      },
      async authorize(credentials) {
        const payload = {
          email: credentials?.email,
          password: credentials?.password,
        };

        const baseURL = process.env.BACKEND_URL || "http://localhost:5000";

        const res = await fetch(`${baseURL}/api/auth/login`, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const user = await res.json();

        if (res?.ok) {
          return user;
        } else if (!res?.ok) {
          throw new Error(user.message);
        }

        return null;
      },
    }),
    Credentials({
      name: "Register",
      id: "register",
      credentials: {
        email: {
          label: "email",
          type: "email",
        },
        password: { label: "password", type: "password" },
        username: { label: "username", type: "text" },
      },
      async authorize(credentials) {
        const payload = {
          username: credentials?.username,
          email: credentials?.email,
          password: credentials?.password,
        };

        const baseURL = process.env.BACKEND_URL || "http://localhost:5000";

        const res = await fetch(`${baseURL}/api/auth/register`, {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const user = await res.json();

        if (res?.ok) {
          return user;
        } else if (!res?.ok) {
          throw new Error(user.message);
        }

        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },

  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login",
  },

  callbacks: {
    async jwt({ token, trigger, user, session }) {
      if (trigger === "update") {
        //@ts-ignore
        token.user.lastLogin = session.user.lastLogin;
      }
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session = token as any;
      return session;
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
