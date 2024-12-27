import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import DummyPoster from "../../../public/public_assets/images/dummyPoster.png";
import { TMovie } from "@/types";
import { MovieContext } from "../context/MovieContext";

type Props = {
  movie: TMovie;
};

const Movie = ({ movie }: Props) => {
  const {configurationDetails} = useContext(MovieContext);
  const [imagePath, setImagePath] = useState<string>("");
  useEffect(() => {
    if(configurationDetails.images && movie.poster_path) {
      setImagePath(`${configurationDetails.images.secure_base_url}${configurationDetails.images.poster_sizes[4]}${movie.poster_path}`);
    }
  }, [configurationDetails, movie.poster_path]);
  return (
    <div className="w-full cursor-pointer">
      <div className="h-[14.0625rem] w-full">
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
