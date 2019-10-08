import React from "react";
import { ApolloProvider } from "react-apollo";
import { Query } from "react-apollo";
import client from "./client";
import { SEARCH_REPOSITRIES } from "./graphql";

const DEFAULT_STATE = {
  after: null,
  before: null,
  first: 5,
  last: null,
  query: "フロントエンドエンジニア"
};

function App() {
  const [variables, setValroables] = React.useState(DEFAULT_STATE);
  const { after, before, first, last, query } = variables;

  const handleChange = event => {
    setValroables({
      ...DEFAULT_STATE,
      query: event.target.value
    });
  };
  const handleSubmit = event => {
    event.preventDefault();
  }
  console.log({ query });
  return (
    <ApolloProvider client={client}>
      <form onSubmit={e => handleSubmit(e)}>
        <input value={query} onChange={e => handleChange(e)} />
      </form>
      <Query
        query={SEARCH_REPOSITRIES}
        variables={{ after, before, first, last, query }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          console.log({ data });
          return <div></div>;
        }}
      </Query>
    </ApolloProvider>
  );
}

export default App;
