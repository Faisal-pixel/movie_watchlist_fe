"use client";
import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import { getNowPlayingAllOverTheWorld } from "@/api/tmdb/api";
import { TMovie } from "@/types";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const NowPlayingMoviesLists = () => {
  const [movies, setMovies] = useState<TMovie[]>([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const result = await getNowPlayingAllOverTheWorld();
      if (result) {
        setMovies(result);
      }
    };
    fetchMovies();
  }, []);

  return (
    <>
      <p className="text-[#E1E1E1] text-2xl mb-[35px]">Now playing movies</p>
    <div className="hide-scrollbar">
      <Carousel className="w-full max-w-[69.265625rem]">
        <CarouselContent className="gap-x-8 ml-4">
          {movies.map((movie) => (
            <CarouselItem key={movie.id} className="basis-[9.375rem] pl-0">
              <Movie movie={movie} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
    </>
  );
};

export default NowPlayingMoviesLists;
