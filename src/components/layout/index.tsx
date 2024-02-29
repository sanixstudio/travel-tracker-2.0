import Header from "../header";
import SavedTrackers from "../saved-trackers";
import Sidebar from "../sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <SavedTrackers />
        {children}
      </div>
    </>
  );
};

export default Layout;
