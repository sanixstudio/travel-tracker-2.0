import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/theme/theme-provider";
import { Toggle } from "@radix-ui/react-toggle";
import { useEffect, useState } from "react";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [rotation, setRotation] = useState(0);

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    // Calculate the new rotation angle based on the theme change
    const newRotation = theme === "dark" ? -90 : -45;
    // Update the rotation state
    setRotation(newRotation);
  }, [theme]);

  return (
    <Toggle pressed={theme === "dark"} onPressedChange={toggleDarkMode}>
      <div
        className="relative w-6 h-6 transition-transform"
        style={{
          transform: `rotate(${rotation}deg)`,
          transitionDuration: "0.3s", // Adjust transition duration as needed
          transitionTimingFunction: "ease-in-out", // Adjust transition timing function as needed
        }}
      >
        {theme === "dark" ? (
          <>
            <Moon className="absolute inset-0 m-auto h-6 w-6" />
            <Sun className="absolute inset-0 m-auto h-0 w-0 opacity-0" />
          </>
        ) : (
          <>
            <Moon className="absolute inset-0 m-auto h-0 w-0 opacity-0" />
            <Sun className="absolute inset-0 m-auto h-6 w-6" />
          </>
        )}
      </div>
    </Toggle>
  );
}
