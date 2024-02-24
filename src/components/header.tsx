import logo from "@/assets/site_logo.png";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Eye, Menu, Search } from "lucide-react";

const Header = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div>
          {/* <SiteLogo /> */}
          <p className="flex items-center gap-4">
            <img src={logo} alt="logo" className="size-8 lg:size-10" />
            <span className="text-slate-700 dark:text-[#fff] text-xl lg:text-3xl font-bold">
              Travel Tracker
            </span>
          </p>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            className="lg:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
          >
            <Search />
            <span className="sr-only">Search</span>
          </button>
          <div className="relative hidden lg:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search size={18} />
              <span className="sr-only">Search icon</span>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
        </div>
        {/* Navbar */}
        <div
          className="items-center justify-between hidden w-full lg:flex lg:w-auto"
          id="navbar-search"
        >
          <div className="relative mt-3 lg:hidden">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search size={18} />
            </div>
            <input
              type="text"
              id="search-navbar"
              className="flex-1 block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            />
          </div>
          <ul className="flex items-center flex-col p-4 lg:p-0 mt-4 font-medium border border-gray-100 rounded-lg  lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 dark:bg-gray-800lg:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <a
                href="#"
                className="block py-2 px-3 text-white bg-blue-700 rounded lg:bg-transparent lg:text-blue-700 lg:p-0 lg:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
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
        <div className="">
          <ModeToggle />
        </div>
        <div className="">
          <Button>Login</Button>
        </div>
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
