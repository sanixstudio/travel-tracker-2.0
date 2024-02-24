import Layout from "./components/layout";
import Main from "./components/main";

function App() {
  return (
    <Layout>
      <div className="w-full dark:bg-slate-800 h-[calc(100vh-128px)]">
        <Main />
      </div>
    </Layout>
  );
}

export default App;
