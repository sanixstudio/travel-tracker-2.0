import React, { useState, useCallback, memo } from "react";
import { Bookmark, MoreVertical, Pin, Share2, XCircle } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
} from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "./ui/scroll-area";
import useGetTrackers from "@/hooks/getTrackers";
import { useFlyToLocationContext } from "@/context/flyToLocation";
import { usePinLocationContext } from "@/context/pinLocationContext";

const DropdownMenuControls = memo(
  ({ TriggerIcon }: { TriggerIcon: JSX.Element }) => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>{TriggerIcon}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="flex items-center gap-2 text-slate-700 dark:text-slate-400 cursor-pointer">
            <Pin className="size-5" />
            Show on Map
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center gap-2 text-slate-700 dark:text-slate-400 cursor-pointer">
            <Share2 className="size-5" />
            Share Pin
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 text-slate-700 dark:text-slate-400 cursor-pointer">
            <XCircle className="size-5" />
            Delete Pin
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
);

const SavedTrackers = () => {
  const [open, setIsOpen] = useState(false);
  const { savedTrackers } = useGetTrackers();
  const { setFlyToLocation } = useFlyToLocationContext();
  const { setPinLocation } = usePinLocationContext();

  const handleFlyToLocation = useCallback(
    ({ lat, lng }: { lat: number; lng: number }) => {
      setFlyToLocation({ lat, lng });
      setPinLocation({ lat, lng });
      setIsOpen(false);
    },
    [setFlyToLocation, setPinLocation]
  );

  return (
    <div className="flex-1 mt-24 size-10 absolute top-[70px] md:top-12 left-2 md:left-4 z-20 flex justify-center items-center">
      <Sheet open={open} onOpenChange={() => setIsOpen(!open)}>
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
                <Pin color="#EE3616" fill="#EE3616" />
                <span className="text-slate-700 dark:text-[#fff] sm:text-xl lg:text-2xl font-bold">
                  Saved Pins
                </span>
              </p>
            </div>
          </SheetHeader>
          <ScrollArea className="scrollable-area overflow-y-auto">
            <div className="flex flex-col">
              {savedTrackers.map((tracker, index) => (
                <div
                  onClick={() =>
                    handleFlyToLocation({
                      lat: tracker.latitude,
                      lng: tracker.longitude,
                    })
                  }
                  key={tracker.id || `tracker-${index}`} // Prefer a unique ID, fallback to index
                  className="w-full flex justify-between items-center gap-2 py-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl px-2"
                >
                  <img
                    src={tracker.image}
                    alt="pin-image"
                    className="size-10 md:size-12 rounded-xl object-contain"
                  />
                  <span className="flex-1 text-sm md:text-base">
                    {tracker.title}
                  </span>
                  <DropdownMenuControls TriggerIcon={<MoreVertical />} />
                </div>
              ))}
            </div>
          </ScrollArea>
          <SheetFooter className="border-t pt-6 block text-center text-gray-400 dark:text-slate-500 max-h-20">
            &copy;SanixStudio (2024)
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SavedTrackers;
