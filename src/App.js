import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import View from "./view";
import { state } from "./state";
import { client } from "./client";

function App() {
  const groupBy = (data, field) => {
    return data.reduce(function (rv, x) {
      (rv[x[field].split("T")[0]] = rv[x[field].split("T")[0]] || []).push(x);
      return rv;
    }, {});
  };

  client
    .query({
      query: gql`
        query allTransactions {
          allTransactions {
            id
            type
            status
            createdAt
            img
            name
          }
        }
      `,
      variables: {},
    })
    .then((result) => {
      state.todos = groupBy(result?.data?.allTransactions, "createdAt");
      return state?.todos;
    });
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <View />
      </div>
    </ApolloProvider>
  );
}

export default App;
