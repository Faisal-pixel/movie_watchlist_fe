"use client";
import React, { useContext } from "react";
import { Ellipsis } from "lucide-react";
import DropdownMenuComponent from "./shared/DropdownMenuComponent";
import { useToast } from "@/hooks/use-toast";
import { WatchListsContext } from "../context/WatchListsContext";
import { TApiResponse } from "@/types";

type Props = {
  watchlist_name: string;
    watchlist_id: number;
};

const SingleWatchlistDropdown = ({ watchlist_name, watchlist_id }: Props) => {
  const { toast } = useToast();

  const {deleteWatchlist} = useContext(WatchListsContext);

  const onClickDeleteWatchlist = async () => {
    const result: TApiResponse = await deleteWatchlist(watchlist_id.toString()) as TApiResponse;

    const {success, message} = result;

    if(!success) {
        return toast({
            title: message,
        });
    }

    toast({
        title: message,
    });

    console.log(result);
  };

  const menuItems = [
    {
      label: "Edit Watchlist",
      className: "inline-block w-full",
      href: `/watchlist/edit/${watchlist_id}`,
    },
    {
      label: "Delete Watchlist",
      className: "inline-block w-full",
      onClick: onClickDeleteWatchlist,
    },
  ];

  return (
    <DropdownMenuComponent menuLabel={watchlist_name} menuItems={menuItems}>
      <Ellipsis className="text-text-default" />
    </DropdownMenuComponent>
  );
};

export default SingleWatchlistDropdown;
