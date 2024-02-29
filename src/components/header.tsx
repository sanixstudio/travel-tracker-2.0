import { Button } from "./ui/button";
import logo from "@/assets/site_logo.png";
import { ModeToggle } from "./mode-toggle";
import { useSearchQuery } from "@/context/searchQueryContext";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import MapboxAutocomplete from "react-mapbox-autocomplete";
import { useTheme } from "@/theme/theme-provider";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";

const Header = () => {
  const { theme } = useTheme();
  const { setSearchQuery } = useSearchQuery();

  const { isSignedIn } = useUser();

  const handleInputChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-lg fixed w-full z-10 h-[73px]">
      <div className="max-w-screen-xl flex flex-wrap sm:flex-row items-center gap-3 sm:gap-6 md:gap-10 mx-auto p-4">
        <div>
          <p className="flex items-center gap-2 sm:gap-4">
            <img
              src={logo}
              alt="logo"
              className="size-6 sm:size-8 lg:size-10"
            />
            <span className="text-slate-700 dark:text-[#fff] sm:text-xl lg:text-3xl font-bold">
              Travel Tracker
            </span>
          </p>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="absolute w-full left-0 sm:left-auto top-20 md:top-4 md:flex max-w-[400px] mx-2">
            <form className="w-full">
              <MapboxAutocomplete
                publicKey={import.meta.env.VITE_EXTRA_KEY}
                inputClass={`form-control search  ${
                  theme === "dark" ? "react-mapbox-ac-input-dark is-dark" : ""
                }`}
                onSuggestionSelect={handleInputChange}
                resetSearch={false}
                placeholder="Search Address..."
              ></MapboxAutocomplete>
            </form>
          </div>
        </div>
        <div
          className="items-center justify-between hidden w-full lg:flex lg:w-auto"
          id="navbar-search"
        ></div>
        <div className="flex items-center gap-8">
          <ModeToggle />
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <Button variant={"outline"}>Sign In</Button>
            </SignInButton>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
