import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Github],
  callbacks: {
    async signIn({ user, profile }) {
      try {
        if (!profile || !user) return false;

        const { id, login, bio } = profile;
        const { name, email, image } = user;

        // Check for existing user using GitHub ID
        const existingUser = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });

        if (!existingUser) {
          // Create new author with GitHub ID as Sanity _id
          await writeClient.create({
            _type: "author",
            id,
            name,
            username: login,
            email,
            image,
            bio: bio || "",
          });
        }

        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        // Fetch user using GitHub ID as Sanity document ID
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile?.id });

        token.id = user?._id; // Use Sanity document ID
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      Object.assign(session, { id: token.id }); // Add Sanity document ID to session
      return session;
    },
  },
});
