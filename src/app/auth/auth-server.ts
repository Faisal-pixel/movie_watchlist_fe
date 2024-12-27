import { cookies } from "next/headers";

export async function getServerSideToken() {
    console.log("getting token serverside auth...")
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")?.value;
    return token as string;
}