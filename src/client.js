import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:5000/",
  cache: new InMemoryCache(),
});

export const groupBy = (data, field) => {
  return data.reduce(function (rv, x) {
    (rv[x[field].split("T")[0]] = rv[x[field].split("T")[0]] || []).push(x);
    return rv;
  }, {});
};
