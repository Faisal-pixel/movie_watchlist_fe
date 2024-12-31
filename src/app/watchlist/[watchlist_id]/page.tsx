import { getAxiosRequestConfig } from "@/app/auth/auth-server";
import base_url from "@/constants/base-url";
import React from "react";
import EditWatchlistIcon from "@/assets/icons/EditWatchlistName.svg";
import { TMovie, TWatchlist, TWatchlistMovie } from "@/types";
import RedBorderedBoxes from "@/app/components/RedBorderedBoxes";
import { fetchMoviesDetails } from "@/api/tmdb/api";

interface IWatchlistDetailsProps {
  params: {
    watchlist_id: string;
  };
}

export async function generateMetadata({ params }: IWatchlistDetailsProps) {
  const { watchlist_id } = params;
  const getWatchlistUrl = `${base_url}/watchlist/get-watchlist/${watchlist_id}`;
  const response = await getAxiosRequestConfig(getWatchlistUrl);
  const data = response.data.data;
  const { watchlist_name, description } = data;

  return {
    title: `${watchlist_name}`,
    description: `${description}`,
  };
}

const page = async ({ params }: IWatchlistDetailsProps) => {
  const { watchlist_id } = params;
  const response = await getAxiosRequestConfig(
    `${base_url}/watchlist/get-watchlist/${watchlist_id}`
  );
  const data = response.data.data;
  const { watchlist_name, description, movies } = data as TWatchlist;
  let moviesDetails: TMovie[] = [];
  try {
    moviesDetails = await fetchMoviesDetails(movies as TWatchlistMovie[]);
  } catch (error) {
    console.error("Failed to fetch all movie details:", error);
  }

  console.log(moviesDetails);

  console.log(data);
  return (
    <div className="p-[1.9rem] h-full bg-[#060505e8] text-text-default">
      <div className="min-w-[50%] mb-[4.375rem]">
        <div className="flex mb-[26px]">
          <h1 className="mr-[50px] font-bold text-4xl">{watchlist_name}</h1>
          <span>
            <EditWatchlistIcon />
          </span>
        </div>
        <p className="text-xl font-bold mb-[10px]">About this watchlist</p>
        <p>{description}</p>
      </div>

      <div>
        <RedBorderedBoxes
          title="ITEMS ON LIST"
          body={moviesDetails?.length.toString() as string}
        />
      </div>
    </div>
  );
};

export default page;
