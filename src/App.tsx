import Layout from "./components/layout";
import Main from "./components/main";
import SearchQueryProvider from "./context/searchQueryContext";

function App() {
  return (
    <SearchQueryProvider>
      <Layout>
        <Main />
      </Layout>
    </SearchQueryProvider>
  );
}

export default App;
