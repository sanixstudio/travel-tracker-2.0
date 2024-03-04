import { useMemo } from "react";
import { Button } from "./ui/button";
import logo from "@/assets/site_logo.png";
import { ModeToggle } from "./mode-toggle";
import { SearchBox } from "@mapbox/search-js-react";
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import {
  useSearchQuery,
  useSetFlyToLocation,
  useSetPointerLocation,
  useSetSearchQuery,
} from "@/store/store";

const Header = () => {
  const { isSignedIn } = useUser();
  const setSearchQuery = useSetSearchQuery();
  const searchQuery = useSearchQuery();
  const setFlyToLocation = useSetFlyToLocation();

  const setPointerLocation = useSetPointerLocation();

  const searchBoxComponent = useMemo(
    () => (
      <>
        {/* @ts-expect-error Server Component */}
        <SearchBox
          marker={true}
          value={searchQuery}
          placeholder={"Search Address..."}
          accessToken={import.meta.env.VITE_EXTRA_KEY}
          onRetrieve={(e) => {
            setPointerLocation(
              e.features[0].geometry.coordinates[0],
              e.features[0].geometry.coordinates[1]
            );
            setFlyToLocation(
              e.features[0].geometry.coordinates[0],
              e.features[0].geometry.coordinates[1]
            );
          }}
        />
      </>
    ),
    [searchQuery, setFlyToLocation, setPointerLocation]
  );

  if (!setSearchQuery) {
    return null;
  }

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
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full relative"
            >
              {searchBoxComponent}
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
