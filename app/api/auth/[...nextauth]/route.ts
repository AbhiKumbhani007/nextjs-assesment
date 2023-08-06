// Import required modules
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

// Set up the authentication provider and configuration
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "723641447928-2t96ci75c603mal831pfpnq9c51q22an.apps.googleusercontent.com", // Google client ID for authentication
      clientSecret: "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", // Google client secret for authentication
    }),
  ],
  secret: "9c2f6f50e05a0514b5e624f2d4e5a49b", // Secret used to encrypt and sign cookies and tokens
});

// Export the NextAuth handler for both GET and POST requests
export { handler as GET, handler as POST };
