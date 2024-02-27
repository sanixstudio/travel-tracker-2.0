import { Menu } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";

import logo from "@/assets/site_logo.png";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Switch } from "./ui/switch";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-200 mt-[73px] dark:border-slate-700 shadow-xl z-10 w-full max-w-[70px] hidden lg:block h-[calc(100vh-70px)] bg-white dark:bg-slate-800">
      <div className="flex justify-center">
        <div className="p-2 mt-3 dark:hover:bg-slate-700">
          <Sheet>
            <SheetTrigger asChild className="cursor-pointer born">
              <Menu
                size={28}
                className="border text-slate-500 dark:text-slate-400"
              />
            </SheetTrigger>
            <SheetContent side={"left"} className="flex flex-col">
              <SheetHeader>
                <div className="border-b pb-6">
                  {/* <SiteLogo /> */}
                  <p className="flex items-center gap-4">
                    <img src={logo} alt="logo" className="size-8 lg:size-10" />
                    <span className="text-slate-700 dark:text-[#fff] text-xl lg:text-3xl font-bold">
                      Travel Tracker
                    </span>
                  </p>
                </div>
                <div className="flex items-center space-x-2 justify-between py-4">
                  <Label>Show Trackers</Label>
                  <Switch defaultChecked={true} id="airplane-mode" />
                </div>
              </SheetHeader>
              <div className="flex-1">Content</div>
              <SheetFooter className="border-t pt-6 block text-center text-gray-400 dark:text-slate-500">
                &copy;SanixStudio (2024)
              </SheetFooter>
            </SheetContent>
            <SheetClose asChild>
              {/* Adjust button type if necessary */}
            </SheetClose>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
