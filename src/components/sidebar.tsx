import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";

import logo from "@/assets/site_logo.png";
import { Switch } from "@radix-ui/react-switch";
import { Label } from "@radix-ui/react-dropdown-menu";

const Sidebar = () => {
  return (
    <div className="border-r border-slate-200 mt-[73px] dark:border-slate-700 shadow-xl z-10 w-full max-w-[70px] hidden lg:block h-[calc(100vh-70px)] bg-white dark:bg-slate-800">
      <div className="flex justify-center">
        <Button variant={"ghost"} className="p-2 mt-3 dark:hover:bg-slate-700">
          <Sheet>
            <SheetTrigger asChild>
              <Menu size={28} className="text-slate-400 dark:text-slate-400" />
            </SheetTrigger>
            <SheetContent side={"left"} className="flex flex-col">
              <SheetHeader>
                <div>
                  {/* <SiteLogo /> */}
                  <p className="flex items-center gap-4">
                    <img src={logo} alt="logo" className="size-8 lg:size-10" />
                    <span className="text-slate-700 dark:text-[#fff] text-xl lg:text-3xl font-bold">
                      Travel Tracker
                    </span>
                  </p>
                </div>
                <div className="border flex items-center space-x-2">
                  <Switch id="airplane-mode" />
                  <Label>Airplane Mode</Label>
                </div>
              </SheetHeader>
              <div className="flex-1">Content</div>
              <SheetFooter>&copy;SanixStudio (2024)</SheetFooter>
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
