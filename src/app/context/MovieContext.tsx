"use client";
import { getConfigurationDetails } from "@/api/tmdb/api";
import { TConfigurationDetails } from "@/types";
import { createContext, useEffect, useState } from "react";

interface MovieState {
    configurationDetails: TConfigurationDetails ;
}

const INITIAL_MOVIE_CONTEXT_STATE: MovieState = {
    configurationDetails: {},
}

export const MovieContext = createContext<MovieState>(INITIAL_MOVIE_CONTEXT_STATE);

export const MovieProvider = ({ children }: {children: React.ReactNode}) => {
    const [configurationDetails, setConfigurationDetails] = useState<TConfigurationDetails>({});

    useEffect(() => {
        const fetchConfigurationDetails = async () => {
            const response = await getConfigurationDetails();
            if(response) {
                setConfigurationDetails(response);
            }
        }
        fetchConfigurationDetails();
    }, []);

    return (
        <MovieContext.Provider value={{ configurationDetails }}>
            {children}
        </MovieContext.Provider>
    )
}