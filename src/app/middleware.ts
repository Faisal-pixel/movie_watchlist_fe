import { NextResponse } from "next/server"; // Allows me to respond to requests
import {NextRequest} from "next/server"; // Represents the incoming requets, including details like url, cookies and headers.

// The protect routes array are a list of routes that requires a user to be logged in

const protectedRoutes = ["/dashboard"];

// The function below will run for every request to my app.

export function middleware(req: NextRequest) {
    // 1. We first check for the Authentication token from the cookies which I will be storing in the future.
    const token = req.cookies.get("authToken")?.value; // We are basically looking for a token in the cookie and ?.value ensures we get the value 
    // of the token if it exists. The token is proof that the user is logged in. If there is no token, the user isn't authenticated.

    // 2. I then clone the URL the user is trying to access.
    const url = req.nextUrl.clone();

    // 3. Then I am checking if the user requested routes starts with any of the protected routes i defined above.
    // The some() method tests whether at least one element in the array passes the test implemented by the provided function.
    // In this case, we are checking if the url.pathname starts with any of the protected routes. and if there is no token
    if(protectedRoutes.some(route => url.pathname.startsWith(route)) && !token) {
        url.pathname = "/login";
        return NextResponse.redirect(url);
    }

    // 4. Then I am checking if the user is logged in

    if(url.pathname.startsWith("/login") || url.pathname.startsWith('/signup')) {
        if(token) {
            url.pathname = "/dashboard";
            return NextResponse.redirect(url);
        }
    }
    // 5. If there is no need for redirects, the below lets the request continue to the page the user was trying to visit
    return NextResponse.next();
}