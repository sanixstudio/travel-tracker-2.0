import React, { Dispatch, SetStateAction } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import SaveTrackerForm from "./save-tracker-form";

interface SaveTrackerDrawerProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onTrackerSaved: () => void; // Add the missing property
}

const SaveTrackerDrawer: React.FC<SaveTrackerDrawerProps> = ({
  open,
  setOpen,
  onTrackerSaved,
}) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="[data-state='open'] bg-red-500" asChild />
      <DrawerContent>
        {/* Pass the missing property to SaveTrackerForm */}
        <SaveTrackerForm setOpen={setOpen} onTrackerSaved={onTrackerSaved} />
      </DrawerContent>
    </Drawer>
  );
};

export default SaveTrackerDrawer;
