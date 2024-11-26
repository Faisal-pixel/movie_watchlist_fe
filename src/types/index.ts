export type TUser = {
    id: number;
    username: string;
    firstname: string;
    lastname: string;
    profile_picture: string;
    password_hash: string;
    email: string;
    created_at: string;
    last_login: string;
    notification_enabled?: boolean;
}

export type TAuthContext = {
    user: TUser;
    isLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<TUser>>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
}