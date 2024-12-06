'use client'
import { getCurrentUser } from "@/api/api";
import { TAuthContext, TUser } from "@/types";
import getCookie from "@/utils/get-cookies";
import { createContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import removeCookie from "@/utils/remove-cookies";

const INITIAL_USER = {
    id: 0,  // Usually 0 or null to represent an absent user.
    username: '',  // Empty string for a missing username.
    firstname: '',  // Empty string for the first name.
    lastname: '',  // Empty string for the last name.
    profile_picture: '',  // Empty string or a default profile picture URL.
    password_hash: '',  // Empty string or null (you don’t need this unless they’re logged in).
    email: '',  // Empty string or null.
    created_at: '',  // Empty string or a default value like '1970-01-01T00:00:00Z'.
    last_login: '',  // Empty string or null.
    bio: '',  // Empty string.
    notification_enabled: false,  // Default to false (notifications off).
}


// The below is the state when there is no user session or authenticated user
const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean, // means it will return false or a value as a boolean value
    logOut: () => {},
};

export const AuthContext = createContext<TAuthContext>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<TUser>(INITIAL_USER);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // I need to create a function that will check if the user is authenticated

    const checkAuthUser = async () => {
        try {
            setIsLoading(true);
            // I will define a function that get the user from the backend
            const currentAccount = await getCurrentUser();

            if(currentAccount) {
                setUser(currentAccount);
                setIsAuthenticated(true);
                return true;
            }

            return false;
        } catch (error) {
            console.error(error);
            return false;
        } finally {
            setIsLoading(false);
        }
    }

    const logOut = () => {
        setUser(INITIAL_USER);
        setIsAuthenticated(false);
        removeCookie("authToken");
        router.push("/");
    }

    useEffect(() => {
        if(!getCookie("authToken")) {
            pathname !== "/signup" && router.push("/login");
            return;
        }
        checkAuthUser();
    }, []);

    const value = {
        user,
        isLoading,
        isAuthenticated,
        setUser,
        setIsAuthenticated,
        checkAuthUser,
        logOut
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

export default AuthProvider;