import { toast } from "@/components/ui/use-toast";
import { db } from "@/lib/firebase";
import { Tracker } from "@/typings";
import { ref, push } from "firebase/database";

const saveTracker = async (userId: string, tracker: Tracker) => {
  try {
    if (userId) {
      const trackerRef = ref(db, `trackers`);
      await push(trackerRef, tracker); // Use push to add a new record with a unique key
      toast({
        variant: "default",
        className: "bg-green-500 md:text-lg border-none outline-none shadow-[10px] shadow-black/50",
        title: "Tracker saved successfully",
      });
    } else {
      console.log("User is not logged in");
      toast({
        variant: "destructive",
        title: "Cannot save tracker",
        description: "You must be logged in to save a tracker",
      });
    }
  } catch (error) {
    console.log("Something went wrong: ", error);
  }
};

export default saveTracker;
