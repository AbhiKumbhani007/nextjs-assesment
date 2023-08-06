const contentful = require("contentful");

// Create a Contentful client using the createClient function
export const contentfulClient = contentful.createClient({
  space: "ja8ng0lo05sn", // Contentful space ID where the content is stored
  environment: "master", // Contentful environment (defaults to 'master' if not set)
  accessToken: "F79fajYcmIJxuqMY1BBgM1bZi5P9HwjtfIT1y275G68", // Contentful access token for authentication
});
