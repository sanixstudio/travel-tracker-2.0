import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-200 mt-[73px] dark:border-slate-700 shadow-xl z-10 w-full max-w-[70px] hidden lg:block h-[calc(100vh-70px)] bg-white dark:bg-slate-800">
      <div className="flex justify-center">
        <Button variant={"ghost"} className="p-2 mt-3 dark:hover:bg-slate-700">
          <Sheet>
            <SheetTrigger asChild>
              <Menu size={28} className="text-slate-400 dark:text-slate-400" />
            </SheetTrigger>
            <SheetContent side={"left"}>
              {/* Content to display within the sheet */}
              {/* Example: <p>This is the sheet content.</p> */}
            </SheetContent>
            <SheetClose asChild>
              {/* Adjust button type if necessary */}
            </SheetClose>
          </Sheet>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
