import axios from "axios";
import { cookies } from "next/headers";

export async function getServerSideToken() {
    console.log("getting token serverside auth...")
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;
    return token as string;
}

export async function getAxiosRequestConfig(url: string) {
    const token = await getServerSideToken();
    const response = await axios.get(
        url,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    )

    return response;
}