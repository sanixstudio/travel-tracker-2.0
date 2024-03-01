import { toast } from "@/components/ui/use-toast";
import { db } from "@/lib/firebase";
import { ref, onValue } from "firebase/database";

const getTrackers = async (userId: string | undefined) => {
  if (!userId) {
    console.log("no userId");
  }

  return new Promise((resolve, reject) => {
    try {
      const trackersRef = ref(db, `trackers`);
      onValue(trackersRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Convert object to array if necessary
          const dataArray = Object.values(data);
          resolve(dataArray); // Resolve with the fetched data array
        } else {
          resolve([]); // Resolve with an empty array if there's no data
        }
      });
    } catch (error) {
      console.log("Something went wrong: ", error);
      toast({
        variant: "destructive",
        title: "Error fetching trackers",
        description: "An error occurred while fetching trackers",
      });
      reject(error); // Reject with the error
    }
  });
};

export default getTrackers;
