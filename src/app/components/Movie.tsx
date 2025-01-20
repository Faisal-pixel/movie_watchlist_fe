"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import DummyPoster from "../../../public/public_assets/images/dummyPoster.png";
import { TMovie } from "@/types";
import { MovieContext } from "../context/MovieContext";
import { usePathname } from "next/navigation";
import RibbonSvg from "@/assets/icons/ribbon.svg";
import DialogDrawerComponent from "./shared/DialogDrawerComponent";

type Props = {
  movie: TMovie;
};

const Movie = ({ movie }: Props) => {
  const path = usePathname();
  const { configurationDetails } = useContext(MovieContext);
  const [imagePath, setImagePath] = useState<string>("");
  const [showAddMovieButton, setShowAddMovieButton] = useState<boolean>(false);
  useEffect(() => {
    if (configurationDetails.images && movie.poster_path) {
      setImagePath(
        `${configurationDetails.images.secure_base_url}${configurationDetails.images.poster_sizes[4]}${movie.poster_path}`
      );
    }
  }, [configurationDetails, movie.poster_path]);

  useEffect(() => {
    if (path === "/") {
      setShowAddMovieButton(true);
    }
  }, [path]);
  return (
    <div className="relative w-full cursor-pointer rounded-md bg-[#1F1F1F] pb-3 h-full">
      {showAddMovieButton && (
        <div className="absolute top-0 left-0 cursor-pointer">
          <DialogDrawerComponent
            dialogTitle="Add to Watchlist"
            dialogDescription="Select the watchlist you wish to add this movie to"
            movieId={movie.id}
          >
            <RibbonSvg />
          </DialogDrawerComponent>
        </div>
      )}
      <div className=" w-full">
        <Image
          src={imagePath || DummyPoster}
          alt="movie1"
          width={200}
          height={300}
          className="rounded-sm h-full w-full"
        />
      </div>
      <div className="mt-[5px] px-[0.625rem]">
        {/* RATINGS */}
        <div className="flex">
          <span className="ml-auto flex items-stretch text-[#E1E1E1]">
            <span className="text-base font-normal">
              {movie?.vote_average != null
                ? (movie.vote_average * 10).toFixed(0)
                : 83}
            </span>
            <span className="text-xs">/100</span>
          </span>
        </div>
        {/* RATINGS */}

        <p className="text-base text-[#E1E1E1]">
          {movie ? movie.title : "Top Gun: Maverick"}{" "}
          <span>
            {movie ? `(${movie.release_date.slice(0, 4)})` : "(2022)"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Movie;
