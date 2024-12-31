import { TConfigurationDetails, TMovie, TWatchlistMovie } from "@/types";
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

export const fetchMovieDetails = async (movie_id: number) => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_TMDB_API_BASE_URL + `/3/movie/${movie_id}`, {
            params: {
                api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
            }
        })
        
        if(!response) {
            throw new Error("Failed to fetch data from the API");
        }

        return response.data as TMovie;

    } catch (error) {
        console.error(`Error fetching movie with ID ${movie_id}`, error);
        throw error;
    }
};

export const fetchMoviesDetails = async (movie_ids: TWatchlistMovie[]) => {
    try {
        // We are going to map through each id to fetch call and execute them in parallel
        const movieDetailsPromises = movie_ids.map((id) => fetchMovieDetails(id.tmdb_movie_id));

        // Then we wait for all promises to resolve. So basically, we dont get a result until every single id has been resolved
        // And if by any chance one fails, it will automaticaly reject all
        const moviesDetails = await Promise.all(movieDetailsPromises);

        return moviesDetails;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
};