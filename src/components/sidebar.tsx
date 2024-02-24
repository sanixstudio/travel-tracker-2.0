import { Menu } from "lucide-react";
import { Button } from "./ui/button";

const Sidebar = () => {
  return (
    <div className=" border-r border-slate-200 mt-[73px] dark:border-slate-700 shadow-xl z-10 w-full max-w-[70px] hidden lg:block h-[calc(100vh-70px)] bg-white dark:bg-slate-800">
      <div className="flex justify-center">
        <Button variant={"ghost"} className="p-2 mt-3 dark:hover:bg-slate-700">
          <Menu size={28} className="text-slate-500 dark:text-slate-400" />
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
