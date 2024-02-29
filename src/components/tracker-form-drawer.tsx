import React, { Dispatch, SetStateAction } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import SaveTrackerForm from "./save-tracker-form";

interface SaveTrackerDrawerProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SaveTrackerDrawer: React.FC<SaveTrackerDrawerProps> = ({
  open,
  setOpen,
}) => {
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="data[state]-open]:bg-red-500" asChild />
      <DrawerContent>
        <SaveTrackerForm setOpen={setOpen} />
      </DrawerContent>
    </Drawer>
  );
};

export default SaveTrackerDrawer;
