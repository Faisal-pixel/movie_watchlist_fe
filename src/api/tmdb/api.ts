import { TConfigurationDetails, TMovie } from "@/types";
import axios from "axios";

export const getNowPlayingAllOverTheWorld = async () => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_TMDB_API_BASE_URL + "/3/movie/now_playing", {
            params: {
                api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
                page: 1,
            }
        })
        
        if(!response) {
            throw new Error("Failed to fetch data from the API");
        }

        return response.data.results as TMovie[];

    } catch (error) {
        console.error(error);
    }
};

export const getConfigurationDetails = async () => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_TMDB_API_BASE_URL + "/3/configuration", {
            params: {
                api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
            }
        })
        
        if(!response) {
            throw new Error("Failed to fetch data from the API");
        }

        return response.data as TConfigurationDetails;

    } catch (error) {
        console.error(error);
    }
}