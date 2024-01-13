import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

console.log();

const client = new ApolloClient({
  link: new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_CONTENTFUL_BASE_URL}${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_AUTH}`,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
