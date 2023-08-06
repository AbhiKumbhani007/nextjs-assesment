import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "723641447928-2t96ci75c603mal831pfpnq9c51q22an.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
});

export { handler as GET, handler as POST };
