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