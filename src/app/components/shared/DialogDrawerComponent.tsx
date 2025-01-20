import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addMovieToAllSelectedWatchlists } from "@/api/watchlist/api";
import { WatchListsContext } from "@/app/context/WatchListsContext";
import { TApiResponse, TWatchlist } from "@/types";
import { useToast } from "@/hooks/use-toast";

type Props = {
  children: React.ReactNode;
  dialogDescription?: string;
  dialogTitle?: string;
  className?: string;
  movieId?: number;
};

const DialogDrawerComponent = ({
  children,
  dialogDescription,
  dialogTitle,
  movieId
}: Props) => {
  const {toast} = useToast();
  const isDesktop = useMediaQuery("(min-width: 768px)"); // Returns true if larger than 768px
  const { watchlists } = useContext(WatchListsContext);
  console.log("watchlists", watchlists);

  const [selectedWatchlists, setSelectedWatchlists] = useState<TWatchlist[]>(
    []
  );
  console.log("Dialog running... ");

  const handleSaveSelection = async () => {
    try {
      const result = await addMovieToAllSelectedWatchlists(movieId as number, selectedWatchlists);
      const errors = result.filter((response: TApiResponse) => !response.success);
      if(errors.length > 0) {
        console.log("Some watchlists could not be updated", errors);
        return toast({
          title: "Some watchlists could not be updated",
        });
      } else {
        toast({
          title: "Movie added to selected watchlists",
        });
      }
      console.log("result from saving selection", result);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleToggleWatchlist = (watchlist_id: string) => {
    setSelectedWatchlists((prev) => {
      const isSelected = prev.some((w) => w.id === watchlist_id);
      if (isSelected) {
        return prev.filter((w) => w.id !== watchlist_id);
      } else {
        const watchlistToAdd = watchlists.find((w) => w.id === watchlist_id);
        return watchlistToAdd ? [...prev, watchlistToAdd] : prev;
      }
    });
  };

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="bg-mainBackground text-text-default">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          {watchlists.length === 0 ? (
            <div className="flex justify-center items-center h-[200px]">
              <p className="text-[#E1E1E1]">No watchlists found</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {watchlists.map((watchlist) => (
                <div
                  key={watchlist.id}
                  onClick={() => handleToggleWatchlist(watchlist.id as string)}
                  className={`flex py-3 px-2 rounded-sm border-t-2 border-t-[#1F1F1F] cursor-pointer transition hover:bg-[rgba(255,255,255,0.1)]
                    ${
                      selectedWatchlists.some((w) => w.id === watchlist.id) &&
                      "bg-[#2979FF]"
                    }`}
                >
                  {watchlist.watchlist_name}
                  {selectedWatchlists.some((w) => w.id === watchlist.id) && (
                    <span className="ml-auto">
                      <CircleCheck />
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
          <Button className="
          bg-[#F33F3F] text-[#141414] font-bold text-[16px] text-center py-[11px] px-[56px] cursor-pointer
          hover:text-text-default"
          onClick={handleSaveSelection}
          >
            Save
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className="bg-mainBackground text-text-default pb-5">
        <DrawerHeader>
          <DrawerTitle>{dialogTitle}</DrawerTitle>
          <DrawerDescription>{dialogDescription}</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col">
          <div className="flex py-3 px-2 rounded-sm border-t-2 border-t-[#1F1F1F] cursor-pointer transition hover:bg-[rgba(255,255,255,0.1)] active:bg-[#2979FF]">
            Watchlist 1
            <span className="ml-auto">
              <CircleCheck />
            </span>
          </div>
        </div>
        <DrawerFooter>
          <Button>
            <DrawerClose>Save</DrawerClose>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DialogDrawerComponent;
