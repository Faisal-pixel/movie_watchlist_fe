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

export type TNewUser = {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export type TAuthContext = {
    user: TUser;
    isLoading: boolean;
    isAuthenticated: boolean;
    setUser: React.Dispatch<React.SetStateAction<TUser>>;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    checkAuthUser: () => Promise<boolean>;
    logOut: () => void;
}

export type TNavLink = {
    imgURL: string;
    route: string;
    label: string;
  };

export type TWatchlist = {
    id: number;
    watchlist_name: string;
    description: string;
    user_id: number;
    created_at: string;
}

export type TWatchlistContext = {
    watchlists: TWatchlist[];
    setWatchlists: React.Dispatch<React.SetStateAction<TWatchlist[]>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
  