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
    console.log("result from the api", result.data);
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
    console.log("filtered data", filteredData);
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
