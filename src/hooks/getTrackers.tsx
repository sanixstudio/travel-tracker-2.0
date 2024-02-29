import { Tracker } from "@/typings";
import getTrackers from "@/utils/getTrackers";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

const useGetTrackers = () => {
  const [savedTrackers, setSavedTrackers] = useState<Tracker[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = user?.id;
        if (userId) {
          const trackers = await getTrackers(userId);
          setSavedTrackers(trackers as Tracker[]);
        }
      } catch (error) {
        console.error("Error fetching trackers:", error);
      }
    };

    fetchData();
  }, [user, savedTrackers]);
  return { savedTrackers };
};

export default useGetTrackers;
