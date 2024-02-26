import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Eye, Menu } from "lucide-react";
import logo from "@/assets/site_logo.png";
import { ModeToggle } from "./mode-toggle";
import { useSearchQuery } from "@/context/searchQueryContext";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import MapboxAutocomplete from "react-mapbox-autocomplete";
import { useTheme } from "@/theme/theme-provider";

const Header = () => {
  const { theme } = useTheme();
  const { setSearchQuery } = useSearchQuery();
  const [inputValue, setInputValue] = useState("");
  const [selectedSuggestion] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedValue = inputValue.trim() || selectedSuggestion.trim();
    if (trimmedValue) {
      setSearchQuery(trimmedValue);
      setInputValue("");
    }
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  console.log(inputValue);

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-lg fixed w-full z-10">
      <div className="max-w-screen-xl flex flex-wrap items-center gap-10 mx-auto p-4 ">
        <div>
          <p className="flex items-center gap-4">
            <img src={logo} alt="logo" className="size-8 lg:size-10" />
            <span className="text-slate-700 dark:text-[#fff] text-xl lg:text-3xl font-bold">
              Travel Tracker
            </span>
          </p>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="absolute w-full left-0 sm:left-auto top-20 md:top-4 md:flex max-w-[400px] mx-2">
            {/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search size={18} color="silver" />
              <span className="sr-only">Search icon</span>
            </div> */}
            <form onSubmit={handleSubmit} className="w-full">
              <MapboxAutocomplete
                publicKey={import.meta.env.VITE_EXTRA_KEY}
                inputClass={`form-control search  ${
                  theme === "dark"
                    ? "dark-react-mapbox-ac-menu react-mapbox-ac-input-dark"
                    : ""
                }`}
                onSuggestionSelect={handleInputChange}
                country="us"
                resetSearch={true}
                placeholder="Search Address..."
              />
            </form>
          </div>
        </div>
        <div
          className="items-center justify-between hidden w-full lg:flex lg:w-auto"
          id="navbar-search"
        >
          <ul className="flex items-center flex-col p-4 lg:p-0 mt-4 font-medium border border-gray-100 rounded-lg  lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 dark:bg-gray-800lg:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 lg:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </a>
            </li>
            <li>
              <Button>
                <Eye size={22} />
              </Button>
            </li>
          </ul>
        </div>
        <ModeToggle />
        <Button size={"sm"}>Login</Button>
        <Button
          variant={"outline"}
          className="border-none shadow-lg shadow-black/30 absolute z-10 right-2 top-[90px] bg-[#0EAB61] dark:bg-[#0EAB61] px-1 lg:hidden"
          data-collapse-toggle="navbar-search"
          type="button"
          aria-controls="navbar-search"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <Menu className="size-8 text-[#] text-white" />
        </Button>
      </div>
    </nav>
  );
};

export default Header;
