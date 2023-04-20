import NextAuth, { User } from "next-auth";
import { AuthOptions } from "next-auth";
import { JWT_MAX_AGE } from "@/constants/time";
import Credentials from "next-auth/providers/credentials";
import { decode } from "next-auth/jwt";
import { login } from "@/services/auth";
import { API } from "@/types/api";

const secret = process.env.NEXTAUTH_SECRET;

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "minh" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        let user: any = null;

        if (!credentials) return user;

        try {
          const { username, password } = credentials;
          const payload = { username, password };
          const response = await login(payload);

          if (response.success) user = response.data;

          return user;
        } catch (error: any) {
          const err: string = JSON.stringify(error.response.data);

          // "throw new Error" is necessary to override SignInResponse.error
          throw new Error(err);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: JWT_MAX_AGE,
  },
  secret,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // signIn: async ({ user, account, profile, email, credentials }) => {
    //   return true;
    // },
    jwt: async ({ token, user, account }) => {
      // jwt decoding happens here
      // whenever signIn() or getSession() gets called
      console.log("user ", user);

      if (user) token.user = user;
      return token;
    },
    session: async ({ session, user, token }) => {
      session.user!.name = token.user.name;
      session.user!.email = token.user.email;
      session.user!.age = token.user.age;
      session.user!.id = token.user.id;

      // console.log(
      //   await decode({
      //     token:
      //       "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..2geB3k7_LD5wSskE.XBrVVqFLhWih4Z2z_0hg5ZvY7IOy9QbA4R-AweyIzcFTiVzQu_XZMhDnwvFXZTy5mK7vKsr4crtxq-3EB_PGyVZ74g3nfEMwzABz4JQVP6661f9aKCH_2L9zJgcfLH_VDSagR9XUKF5CdSnnhU3SU-dnAglWgJOzyMPLSQbmmHf8cErej95EPbP4BNxNEvCk_o_Am9NxV9YY7tVv1mrG4gmRw1Ss5ntI1JL8XDSMzii09lazp6VBQft36gE-WjGVxnKkCI1ZhYy6SCqEVvOLWTpSgrRGQm4MwSzhCp0LJC1G1YJg8wLA4fQ.SUwjhzDjbdARFotiaLbOkg",
      //     secret: process.env.NEXTAUTH_SECRET as string,
      //   })
      // );
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
