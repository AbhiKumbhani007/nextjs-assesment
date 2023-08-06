const contentful = require("contentful");

export const contentfulClient = contentful.createClient({
  space: "ja8ng0lo05sn",
  environment: "master", // defaults to 'master' if not set
  accessToken: "F79fajYcmIJxuqMY1BBgM1bZi5P9HwjtfIT1y275G68",
});