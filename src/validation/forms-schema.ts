import * as z from 'zod';

export const SignupValidationSchema = z.object({
    firstname: z.string().min(2, { message: "First name is required" }),
    lastname: z.string().min(2, { message: "Last name is required" }),
    username: z.string().min(3, { message: "Username is required" }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export const SigninValidationSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export const CreateWatchlistValidationSchema = z.object({
    watchlist_name: z.string().min(2, { message: "Name is required" }),
    description: z.string().min(2, { message: "Description is required" }),
});
export const EditWatchlistValidationSchema = z.object({
    watchlist_name: z.string(),
    description: z.string()
});
