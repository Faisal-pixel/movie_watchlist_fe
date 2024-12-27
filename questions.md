# QUESTION: 
Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at https://localhost:3000/auth/login. (Reason: CORS request did not succeed). Status code: (null)

Why am I getting the above error

# ANSWER:
This error occurs when the server is blocking the request from a different origin. This is a security feature implemented by browsers to prevent malicious websites from making requests to other websites on behalf of the user.

In your case, you’re making a Cross-Origin Request to https://localhost:3000/auth/login from a different origin (likely http://localhost:4000 or similar). The browser blocks this request because the server at https://localhost:3000 hasn’t explicitly allowed your origin to access its resources.

<strong>Common Causes of This Error:</strong>
    1. CORS not configured on the backend: Your backend (https://localhost:3000) isn’t set up to allow cross-origin requests.
    2. Mismatch in protocols or ports: Browsers consider differences in protocols (http vs https) and ports (3000 vs 4000) as different origins.
    3. Server isn’t responding correctly: If the backend server doesn’t respond to the preflight OPTIONS request (sent automatically by the browser for certain types of requests), the request fails.
    4. Self-signed certificates: If you're using HTTPS on localhost with a self-signed certificate, the browser might block the request for security reasons.

<strong>SOLUTION</strong>
To resolve this issue, you need to configure CORS (Cross-Origin Resource Sharing) on your backend. Here’s how to do it in Express.js with TypeScript:

1. Install the `cors` package:
```bash
npm install cors
```

# QUESTION: How do I dynamically send only the fields that are updated in a PATCH request?

# ANSWER:
CODE EXAMPLE:
```ts
export const updateWatchlist = async (id: string, data: { watchlist_name?: string; description?: string }) => {
    try {
        // Filter out undefined values from the data object
        const filteredData = Object.fromEntries(
            Object.entries(data).filter(([_, value]) => value !== undefined)
        );

        const result = await axiosInstance.patch(`/watchlist/edit/${id}`, filteredData);

        if (!result) {
            throw new Error("Watchlist not updated");
        }

        return result.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return error.response.data;
        } else {
            throw new Error(error instanceof Error ? error.message : "Unknown error occurred");
        }
    }
};

```
1. Object.entries(data): This basically converts the data into an array of key-value pairs. For example, if data = { watchlist_name: "New Name", description: "New Description" }, Object.entries(data) will return [["watchlist_name", "New Name"], ["description", "New Description"]].

2. Object.entries(data).filter(([_, value]) => value !== undefined): This filters out the key-value pairs where the value is undefined. This way, we only keep the fields that are updated.

So basically we filter the array, that is we go through each element which is also an array of key and values, then we deconstruct the array into [_, value] where _ is the key and value is the value. We then check if the value is not undefined and only keep those key-value pairs.

So now we have only arrays of key-value pairs where the value is not undefined.

3. Object.fromEntries(): This converts the array of key-value pairs back into an object. This is the reverse operation of Object.entries().