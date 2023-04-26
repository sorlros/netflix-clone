import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prismadb from "@/lib/prismadb";

export const authOptions: AuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID || "",
			clientSecret: process.env.GITHUB_SECRET || "",
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID || "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
		}),
		Credentials({
			id: "Credentials",
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "text",
				},
				password: {
					label: "Password",
					type: "password",
				},
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("이메일 혹은 비밀번호가 틀렸습니다.");
				}

				const user = await prismadb.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!user || !user.hashedPassword) {
					throw new Error("이메일이 존재하지 않습니다.");
				}

				const isCorrectPassword = await compare(credentials.password, user.hashedPassword);

				if (!isCorrectPassword) {
					throw new Error("비밀번호가 틀렸습니다.");
				}

				return user;
			},
		}),
	],
	pages: {
		signIn: "/auth",
	},
	debug: process.env.NODE_ENV === "development",
	adapter: PrismaAdapter(prismadb),
	session: {
		strategy: "jwt",
	},
	jwt: {
		secret: process.env.NEXTAUTH_JWT_SECRET,
	},
	secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
