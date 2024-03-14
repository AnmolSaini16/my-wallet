import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      id: string;
      username: string;
      createdAt: string;
      lastLogin: Date | null;
    };
    exp: number;
    iat: number;
    jti: string;
    token: string;
  }
}
