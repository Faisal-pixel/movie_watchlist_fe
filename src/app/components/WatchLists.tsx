import React, { useContext, useState } from "react";
import { WatchListsContext } from "../context/WatchListsContext";

type Props = {
  watchlist_name: string;
};

const SingleWatchList = ({watchlist_name}: Props) => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="text-text-default mt-[1.25rem] px-3 py-2 hover:bg-[#1F1F1F] cursor-pointer rounded-sm">
        <span className="h-[1.3125rem] w-[1.369375rem] inline-flex items-center justify-center text-center bg-[#D9D9D9] text-xl text-black rounded-lg">
          {
            watchlist_name.split("")[0]
          }
        </span>
        <span className="inline-flex ml-[1.005625rem]">
            {watchlist_name}
        </span>
      </div>
    </div>
  );
};

const WatchLists = () => {
  const { watchlists } = useContext(WatchListsContext);
  return watchlists.map((watchlist) => (
    <SingleWatchList
      key={watchlist.id}
      watchlist_name={watchlist.watchlist_name}
    />
  ));
};

export default WatchLists;
