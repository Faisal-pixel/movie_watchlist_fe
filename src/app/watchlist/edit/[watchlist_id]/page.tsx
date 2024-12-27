import { getServerSideToken } from "@/app/auth/auth-server";
import EditWatchlistFormComponent from "@/app/components/EditWatchlistFormComponent";
import { Button } from "@/components/ui/button";
import base_url from "@/constants/base-url";
import { TWatchlist } from "@/types";
import axios from "axios";
import { Metadata } from "next";

interface IEditWatchlistPageProps {
  params: {
    watchlist_id: string;
  };
}

export async function generateMetadata({
  params,
}: IEditWatchlistPageProps): Promise<Metadata> {
  const { watchlist_id } =await params;
  const token = await getServerSideToken();
  const response = await axios.get(
    `${base_url}/watchlist/get-watchlist/${watchlist_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = response.data.data;
  const { watchlist_name, description } = data as TWatchlist;

  return {
    title: `Edit Watchlist ${watchlist_name}`,
    description: `Edit Watchlist ${description}`,
  };
}

export default async function WatchlistPage({
  params,
}: IEditWatchlistPageProps) {
  const { watchlist_id } = params;
  const token = await getServerSideToken();
  const response = await axios.get(
    `${base_url}/watchlist/get-watchlist/${watchlist_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = response.data.data;
  


  return (
    <div className="p-[1.9rem] h-full bg-[#060505e8]">
      <div className="flex justify-between mb-[3.125rem]">
        <h1 className="font-normal text-3xl text-text-default">Edit your Watchlist</h1>
        <Button variant={"link"} className="text-[#F33F3F] underline">
            Delete Watchlist
        </Button>
      </div>
      <EditWatchlistFormComponent data={data}/>
    </div>
  );
}
