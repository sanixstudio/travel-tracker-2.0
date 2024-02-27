import Header from "../header";
import Sidebar from "../sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export default Layout;
