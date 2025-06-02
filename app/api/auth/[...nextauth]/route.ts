import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare, hash } from "bcryptjs"

// This is a simple in-memory user store for demo purposes
// In production, you would use a database
const users = new Map()

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        
        // For signup flow
        if (credentials.isSignUp === "true") {
          if (users.has(credentials.email)) {
            throw new Error("User already exists")
          }

          const hashedPassword = await hash(credentials.password, 10)
          const user = {
            id: Date.now().toString(),
            email: credentials.email,
            name: credentials.name || credentials.email.split("@")[0],
          }

          users.set(credentials.email, {
            ...user,
            password: hashedPassword,
          })

          return user
        }

        // For login flow
        const user = users.get(credentials.email)
        if (!user) {
          throw new Error("No user found with this email")
        }

        const isPasswordValid = await compare(credentials.password, user.password)
        if (!isPasswordValid) {
          throw new Error("Invalid password")
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signUp: "/signup",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
