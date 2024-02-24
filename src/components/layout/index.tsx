// import Footer from "../footer";
import Header from "../header";
import Sidebar from "../sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
