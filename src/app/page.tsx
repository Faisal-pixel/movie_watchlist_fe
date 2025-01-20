import SaveToWatchListIcon from "../assets/icons/SaveIconToWatchList.svg";
import CheckMark from "../assets/icons/Checkmark.svg";
import SearchIcon from "../assets/icons/search.svg";
import { Input } from "./components/ui/input";
import HomeMoviesLists from "./components/HomeMoviesLists";

export default function Home() {
  return (
    <>
      <div className="pt-[3.1rem] pl-[2.0rem] md:pl-[3.8rem] pr-[2.5rem] md:pr-[4.4rem] h-full bg-[#060505e8] hide-scrollbar overflow-y-auto">
        <div className="bg-[#D9D9D91A] rounded-sm border border-[#A41B1B] py-5 px-5 mb-[2.5rem]">
          <h2 className="text-[1.6rem] md:text-[2.6rem] text-[#E1E1E1] mb-[2.1875rem] ">
            Welcome to <span className="text-[#F33F3F]">MovieZone</span>
          </h2>
          <p className="text-[#E1E1E1] text-[0.9rem] md:text-[1.2rem]">
            Browse movies, add them to watchlists and share them with friends.{" "}
            <br />
            Just click the{" "}
            <span className="inline-block align-text-top">
              <SaveToWatchListIcon  />
            </span>{" "}
            to add a movie to a watchlist, the poster to see more details or{" "}
            <span className="inline-block align-text-top">
              <CheckMark />
            </span>{" "}
            to mark a movie as watched.
          </p>
        </div>

        <div className="relative w-full mb-[35px]">
          <SearchIcon className="absolute inset-y-2 left-3 flex items-center pointer-events-none" />
          <Input
            type="search"
            className="pl-12 placeholder:text-xl placeholder:text-[#D9D9D94D]"
            placeholder="Search"
          />
        </div>

        <div className="w-full">
        <HomeMoviesLists />
        </div>

      </div>
    </>
  );
}
