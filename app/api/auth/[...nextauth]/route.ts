// Import required modules
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

// Set up the authentication provider and configuration
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string, // Google client ID for authentication
      clientSecret: process.env.NEXT_PUBLIC_GOOLE_CLIENT_SECRET as string, // Google client secret for authentication
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET as string, // Secret used to encrypt and sign cookies and tokens
});

// Export the NextAuth handler for both GET and POST requests
export { handler as GET, handler as POST };
