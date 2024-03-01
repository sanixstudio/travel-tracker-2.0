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
    <div className="flex-1 mt-24 size-10 absolute top-8 md:top-0 left-2 md:left-4 z-20 flex justify-center items-center">
      <Sheet>
        <SheetTrigger asChild className="cursor-pointer">
          <Menu
            size={32}
            className="border bg-primary text-white p-1 border-none rounded-full"
          />
        </SheetTrigger>
        <SheetContent side={"left"} className="flex flex-col">
          <SheetHeader>
            <div>
              <p className="flex items-center gap-2 sm:gap-4">
                <img
                  src={logo}
                  alt="logo"
                  className="size-6 sm:size-8 lg:size-10"
                />
                <span className="text-slate-700 dark:text-[#fff] sm:text-xl lg:text-3xl font-bold">
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
          <SheetFooter className="border-t pt-6 block text-center text-gray-400 dark:text-slate-500 max-h-[200px] bg-red-300">
            &copy;SanixStudio (2024)
          </SheetFooter>
        </SheetContent>
        <SheetClose asChild>{/* Adjust button type if necessary */}</SheetClose>
      </Sheet>
    </div>
  );
};

export default Sidebar;
