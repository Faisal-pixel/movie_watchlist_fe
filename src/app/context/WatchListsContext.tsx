"use client";
import { addWatchListToBackend, getWatchLists } from "@/api/api";
import { TWatchlist, TWatchlistContext } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";

const INITIAL_WATCHLISTS: TWatchlist[] = [];

const INITIAL_STATE = {
    watchlists: INITIAL_WATCHLISTS,
    setWatchlists: () => {},
    isLoading: false,
    setIsLoading: () => {},
};

export const WatchListsContext = createContext<TWatchlistContext>(INITIAL_STATE);

const WatchListsProvider = ({ children }: { children: React.ReactNode }) => {
    const {isAuthenticated} = useContext(AuthContext);

    const [watchlists, setWatchlists] = useState<TWatchlist[]>(INITIAL_WATCHLISTS);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [reloadFlag, setReloadFlag] = useState<boolean>(false); // A flag to trigger reloading

    // create function that calls the getWatchlists function
    // set the result to the watchlists state
    // create an isLoading state also

    const loadWatchlists = async () => {
        try {
            setIsLoading(true);
            const result = await getWatchLists();
            if(result) {
                // console.log(result);
                setWatchlists(result);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if(isAuthenticated) {
            loadWatchlists();
        }
    }, [isAuthenticated, reloadFlag]);

    const addWatchlist = async (newWatchlist: TWatchlist) => {
        try {
            // Add new watchlist logic here (e.g., API call)
            const result = await addWatchListToBackend(newWatchlist);
            // Assuming you add successfully, trigger reload
            setReloadFlag((prev) => !prev); // Flip the flag to trigger reloading
        } catch (error) {
            console.error("Error adding watchlist:", error);
        }
    };

    const value = {
        watchlists,
        setWatchlists,
        isLoading,
        setIsLoading,
        addWatchlist
    }

    return (
        <WatchListsContext.Provider value={value}>
            {children}
        </WatchListsContext.Provider>
    )
}

export default WatchListsProvider;