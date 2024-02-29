import { useUser } from "@clerk/clerk-react";
import { dbReference } from "@/lib/firebase";
import { set } from "firebase/database";
import { Tracker } from "@/typings";

const useSaveTracker = (tracker: Tracker) => {
  const { user } = useUser();

  const saveTrackerToFirebase = async () => {
    try {
      if (user) {
        set(dbReference, tracker);
      } else {
        console.error("User not logged in.");
      }
    } catch (error) {
      console.error("Error saving tracker:", error);
    }
  };

  console.log(tracker);
  saveTrackerToFirebase();
};

export default useSaveTracker;
