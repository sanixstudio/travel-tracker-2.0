import { useState } from "react";
import street from "../assets/street.png";
import satellite from "../assets/satellite.png";
import { satelliteMapStyle, streetMapStyle } from "@/utils/constants";
import { Layers } from "lucide-react";

const StyleChangeButton = ({
  setMapStyle,
}: {
  setMapStyle: (style: string) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="size-[50px] rounded-[10px] absolute hover:w-[180px] bottom-[30px] left-[100px] flex items-center cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="size-[57px] relative rounded-[10px]">
        <Layers
          color="white"
          onClick={() => setMapStyle(streetMapStyle)}
          className="absolute z-10 rounded-[10px] p-2 top-0 left-0 bg-teal-500 cursor-pointer size-14 ring-4 ring-gray-400"
        />
        <div
          onClick={() => setMapStyle(streetMapStyle)}
          className={`size-[52px] absolute top-0 right-0 shadow-md cursor-pointer ${
            isHovered ? "left-[69px]" : "left-0 top-0"
          } transition-all duration-300`}
        >
          <img
            src={street}
            alt="map style"
            className="rounded-[10px] w-[300px] ring-4 ring-gray-400 hover:ring-primary/70"
          />
        </div>
        <div
          onClick={() => setMapStyle(satelliteMapStyle)}
          className={`size-[50px] absolute top-0 right-0 shadow-md cursor-pointer ${
            isHovered ? "left-[135px]" : "left-0 top-0"
          } transition-all duration-300`}
        >
          <img
            src={satellite}
            alt="map style"
            className="rounded-[10px] w-[300px] ring-4 ring-gray-400 hover:ring-primary/70"
          />
        </div>
      </div>
    </div>
  );
};

export default StyleChangeButton;
