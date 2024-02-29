import { Bookmark, MoreVertical, Share2, XCircle } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import logo from "@/assets/site_logo.png";
import { ScrollArea } from "./ui/scroll-area";
import useGetTrackers from "@/hooks/getTrackers";

interface DropdownMenuControlsProps {
  TriggerIcon: JSX.Element;
}

const DropdownMenuControls: React.FC<DropdownMenuControlsProps> = ({
  TriggerIcon,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{TriggerIcon}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2 text-slate-500 dark:text-slate-400 cursor-pointer">
          <Share2 className="size-5" />
          Share Pin
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 text-slate-500 dark:text-slate-400 cursor-pointer">
          <XCircle className="size-5" />
          Delete Pin
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const SavedTrackers = () => {
  const { savedTrackers } = useGetTrackers();

  return (
    <div className="flex-1 mt-24 size-10 absolute top-[70px] md:top-12 left-2 md:left-4 z-20 flex justify-center items-center">
      <Sheet>
        <SheetTrigger asChild className="cursor-pointer">
          <Bookmark
            size={32}
            className="border bg-primary text-white p-1 border-none rounded-full"
          />
        </SheetTrigger>
        <SheetContent side={"left"} className="flex flex-col">
          <SheetHeader>
            <div className="border-b pb-4">
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
          </SheetHeader>
          <div className="flex flex-col flex-grow mt-4 max-h-[calc(100vh-240px)]">
            <ScrollArea className="scrollable-area  overflow-y-auto">
              <div className="flex flex-col">
                {savedTrackers.map((tracker) => (
                  <div
                    key={tracker.longitude}
                    className="w-full flex justify-between items-center gap-2 py-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl px-2"
                  >
                    <img
                      src={tracker.image}
                      alt="place"
                      className="size-10 md:size-12 rounded-xl"
                    />
                    <span className="flex-1 text-sm md:text-base">
                      {tracker.title}
                    </span>
                    <DropdownMenuControls TriggerIcon={<MoreVertical />} />
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <SheetFooter className="border-t pt-6 block text-center text-gray-400 dark:text-slate-500 max-h-20">
            &copy;SanixStudio (2024)
          </SheetFooter>
        </SheetContent>
        <SheetClose asChild>{/* Adjust button type if necessary */}</SheetClose>
      </Sheet>
    </div>
  );
};

export default SavedTrackers;
