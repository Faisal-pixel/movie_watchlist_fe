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
    id?: string;
    watchlist_name: string;
    description: string;
    user_id?: number;
    created_at?: Date;
    movies?: TWatchlistMovie[]
}

export type TWatchlistContext = {
    watchlists: TWatchlist[];
    setWatchlists: React.Dispatch<React.SetStateAction<TWatchlist[]>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    reloadWatchlist: () => void;
    deleteWatchlist: (watchlist_id: string) => Promise<unknown>;
}

export type TMovie = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

// export type TMovieDetails = {
//     adult: boolean;
//     backdrop_path: string;
//     belongs_to_collection: null;
//     budget: number;
//     genres: { id: number; name: string }[];
//     homepage: string;
//     id: number;
//     imdb_id: string;
//     original_language: string;
//     original_title: string;
//     overview: string;
//     popularity: number;
//     poster_path: string;
//     production_companies: { id: number; logo_path: string; name: string; origin_country: string }[];
//     production_countries: { iso_3166_1: string; name: string }[];
//     release_date: string;
//     revenue: number;
//     runtime: number;
//     spoken_languages: { english_name: string; iso_639_1: string }[];
//     status: string;
//     tagline: string;
//     title: string;
//     video: boolean;
//     vote_average: number;
//     vote_count: number;
// }

export type TConfigurationDetails = {
    images?: {
        base_url: string;
        secure_base_url: string;
        backdrop_sizes: string[];
        logo_sizes: string[];
        poster_sizes: string[];
        profile_sizes: string[];
        still_sizes: string[];
    };
    change_keys?: string[];
}
  

export type TApiResponse = {
    success: boolean;
    message?: string;
    data?: unknown;
}



export type TWatchlistMovie = {
    tmdb_movie_id: number,
    added_at: Date
}