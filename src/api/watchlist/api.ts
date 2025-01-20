import axiosInstance from "@/lib/axios/axios.instance";
import { TWatchlist } from "@/types";
import axios from "axios";

export const getWatchLists = async () => {
  try {
    const result = await axiosInstance.get("/watchlist/get-watchlists");
    if (!result) {
      throw new Error("Watchlists not found");
    }

    return result.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      throw new Error(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }
};

export const addWatchListToBackend = async (watchlist: TWatchlist) => {
  try {
    const result = await axiosInstance.post("/watchlist/create-watchlist", {
      watchlist_name: watchlist.watchlist_name,
      description: watchlist.description,
    });
    if (!result) {
      throw new Error("Watchlist not added");
    }
    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      throw new Error(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }
};

export const deleteWatchlistFromBackend = async (watchlist_id: string) => {
  try {
    const result = await axiosInstance.delete(
      `/watchlist/delete-watchlist/${watchlist_id}`
    );
    if (!result) {
      throw new Error("Watchlist not deleted");
    }
    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      throw new Error(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }
};

export const getSingleWatchlist = async (watchlist_id: string) => {
  try {
    const result = await axiosInstance.get(
      `/watchlist/get-watchlist/${watchlist_id}`
    );
    if (!result) {
      throw new Error("Watchlist not found");
    }
    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      throw new Error(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }
};

export const updateWatchlist = async (
  id: string,
  data: { watchlist_name?: string; description?: string }
) => {
  try {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== undefined)
    );
    const result = await axiosInstance.patch(
      `/watchlist/edit/${id}`,
      filteredData
    );
    if (!result) {
      throw new Error("Watchlist not updated");
    }
    return result.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      throw new Error(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
  }
};

export const addMovieToWatchlist = async (tmdb_movie_id: number, watchlist_id: string) => {
  try {
    const response = await axiosInstance.post(`/watchlist/add-movie-to-watchlist/${watchlist_id}`, {
      tmdb_movie_id,
    });
    if (!response) {
      throw new Error(`Failed to add movie to watchlist with ID ${watchlist_id}`);
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      throw new Error(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
    
  }
}

export const addMovieToAllSelectedWatchlists = async (tmdb_movie_id: number, watchlists: TWatchlist[]) => {
  try {
    const watchlistPromises = watchlists.map((w) =>
      addMovieToWatchlist(tmdb_movie_id, w.id as string)
    );
    const response = await Promise.all(watchlistPromises);
    if (!response) {
      throw new Error(`Failed to add movie to watchlists`);
    }
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    } else {
      throw new Error(
        error instanceof Error ? error.message : "Unknown error occurred"
      );
    }
    
  }
}
