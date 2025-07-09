import Axios from "@/lib/axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        const { email, password } = credentials;
        const user = await Axios.post("authentication/password-login", {
          email,
          password,
          currentDate: new Date().toISOString(),
        });
        if (user.data.result) {
          return user.data.result;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.type === "oauth") {
        console.log("Callback URL:", account.callbackUrl); // Access it here if passed
        const { family_name, given_name, email } = profile;
        try {
          const response = await Axios.post(`/authentication/oauth-login`, {
            first_name: given_name,
            last_name: family_name,
            email,
            provider: account.provider,
            currentDate: new Date().toISOString(),
          });
          profile.dbUser = response.data.result;
          const dbUser = response.data.result;
          if (dbUser) {
            user.id = dbUser.id;
            user.first_name = dbUser.first_name;
            user.last_name = dbUser.last_name;
            user.accessToken = dbUser.accessToken;
            user.image = dbUser.image;
            user.expiredAt = dbUser.expiredAt;
          }
        } catch (error) {
          console.log({ error });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.image = user.image;
        token.accessToken = user.accessToken;
        token.expiredAt = user.expiredAt;
      }

      return token;
    },
    session: ({ session, token, user }) => {
      session.user = token;

      return session;
    },
  },
};

export default NextAuth(authOptions);
