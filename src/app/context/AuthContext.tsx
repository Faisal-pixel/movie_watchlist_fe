'use client'
import { TAuthContext, TUser } from "@/types";
import { createContext, useEffect, useState } from "react";

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
};

export const AuthContext = createContext<TAuthContext>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<TUser>(INITIAL_USER);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // I need to create a function that will check if the user is authenticated

    const checkAuthUser = async () => {
        try {
            setIsLoading(true);
            // I will define a function that get the user from the backend

            //But for now:
            const currentAccount = {
                id: 1,
                username: 'testuser',
                firstname: 'Test',
                lastname: 'User',
                profile_picture: 'https://randomuser.me/api/portraits',
                password_hash: 'password',
                email: 'adamsfaisal001@gmail.com',
                created_at: '2021-09-01T00:00:00Z',
                last_login: '2021-09-01T00:00:00Z',
                bio: 'This is a test user',
                notification_enabled: true,
            }

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

    useEffect(() => {
        checkAuthUser();
    }, []);

    const value = {
        user,
        isLoading,
        isAuthenticated,
        setUser,
        setIsAuthenticated,
        checkAuthUser,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

export default AuthProvider;