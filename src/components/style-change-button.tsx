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

  console.log(isHovered);

  return (
    <div
      className="size-[60px] z-20  border-4 border-black/20 rounded-[10px] absolute bottom-[10px] left-[100px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ backgroundImage: `url(${satellite})` }}
    >
      <div className="size-[60px] relative">
        <div
          onClick={() => setMapStyle(streetMapStyle)}
          className={`size-[60px] absolute top-0 right-0 shadow-md cursor-pointer ${
            isHovered ? "left-[60px]" : "left-0 top-0"
          } transition-all duration-300`}
        >
          <img
            src={street}
            alt="map style"
            className="rounded-[10px] w-[300px] ring-2 ring-transparent border-transparent hover:ring-primary/50"
          />
        </div>
        <div
          onClick={() => setMapStyle(satelliteMapStyle)}
          className={`size-[60px] absolute top-0 right-0 shadow-md cursor-pointer ${
            isHovered ? "left-[120px]" : "left-0 top-0"
          } transition-all duration-300`}
        >
          <img
            src={satellite}
            alt="map style"
            className="rounded-[10px] w-[300px] ring-2 ring-transparent border-transparent hover:ring-primary/50"
          />
        </div>
        <div className="absolute top-0 left-0">
          <Layers
            color="white"
            onClick={() => setMapStyle(streetMapStyle)}
            className="bg-white/10 rounded-[10px] p-2 cursor-pointer size-14"
          />
        </div>
      </div>
    </div>
  );
};

export default StyleChangeButton;
