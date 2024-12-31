import React, { useContext } from "react";
import { WatchListsContext } from "../context/WatchListsContext";
import SingleWatchlistDropdown from "./SingleWatchlistDropdown";
import Link from "next/link";

type Props = {
  watchlist_name: string;
  watchlist_id: string;
};

const SingleWatchList = ({ watchlist_name, watchlist_id }: Props) => {
  return (
    <Link href={`/watchlist/${watchlist_id}`}>
      <div className="flex items-center hover:bg-[#1F1F1F]">
        <div className="flex-1 text-text-default  px-3 py-2 cursor-pointer rounded-sm ">
          <span className="h-[1.3125rem] w-[1.369375rem] inline-flex items-center justify-center text-center bg-[#D9D9D9] text-xl text-black rounded-lg">
            {watchlist_name.split("")[0]}
          </span>
          <span className="inline-flex ml-[1.005625rem]">{watchlist_name}</span>
        </div>
        <span className="ml-auto">
          {/* <Ellipsis className="text-text-default" /> */}
          <SingleWatchlistDropdown
            watchlist_name={watchlist_name}
            watchlist_id={watchlist_id}
          />
        </span>
      </div>
    </Link>
  );
};

const WatchLists = () => {
  const { watchlists } = useContext(WatchListsContext);
  return watchlists.map((watchlist) => (
    <SingleWatchList
      key={watchlist.id}
      watchlist_name={watchlist.watchlist_name}
      watchlist_id={watchlist.id as string}
    />
  ));
};

export default WatchLists;
