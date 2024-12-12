import axiosInstance from "@/lib/axios/axios.instance";
import { TNewUser, TWatchlist } from "@/types";
import setCookie from "@/utils/set-cookies";
import axios from "axios";

export const signUpUser = async (user: TNewUser) => {
    try {
        // Basicall fetch the user using axios
        // save the result in a variable
        // if the result isnt successful, throw an error
        // if it is successful, return the result
        // then catch the error and return the error
        const result = await axiosInstance.post("/auth/signup", {
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            password: user.password,
        })
        
        if(result) {
            return result.data;     
        }
        
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        } else {
            throw new Error(error instanceof Error ? error.message : "Unknown error occurred");
        }
    }
}

export const loginUser = async (email: string, password: string) => {
    try {
        const result = await axiosInstance.post("/auth/login", {
            email,
            password,
        })
        const {success, token} = result.data;

        if(success && token) {
            setCookie("authToken", token, 1);
            return true;
        }

        return false;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        } else {
            throw new Error(error instanceof Error ? error.message : "Unknown error occurred");
        }
    }
}

export const getCurrentUser = async () => {
    try {
        const result = await axiosInstance.get("/user/get-current-user");
        if(!result) {
            throw new Error("User not found");
        }

        return result.data.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        } else {
            throw new Error(error instanceof Error ? error.message : "Unknown error occurred");
        }
    }
}

export const getWatchLists = async () => {
    try {
        const result = await axiosInstance.get("/watchlist/get-watchlists");
        if(!result) {
            throw new Error("Watchlists not found");
        }

        return result.data.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        } else {
            throw new Error(error instanceof Error ? error.message : "Unknown error occurred");
        }
    }
}

export const addWatchListToBackend = async (watchlist: TWatchlist) => {
    try {
        const result = await axiosInstance.post("/watchlist/add-watchlist", {
            watchlist_name: watchlist.watchlist_name,
            description: watchlist.description,
        });
        if(!result) {
            throw new Error("Watchlist not added");
        }

        return result.data.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        } else {
            throw new Error(error instanceof Error ? error.message : "Unknown error occurred");
        }
    }
}