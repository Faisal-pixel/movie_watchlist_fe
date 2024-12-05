import axiosInstance from "@/lib/axios/axios.instance";
import { TNewUser } from "@/types";

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
        throw new Error(error instanceof Error ? error.message : "Unknown error occurred");
    }
}

export const loginUser = async (email: string, password: string) => {
    try {
        const result = await axiosInstance.post("/auth/login", {
            email,
            password,
        })

        if(result) {
            return result.data;
        }
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error occurred");
    }
}