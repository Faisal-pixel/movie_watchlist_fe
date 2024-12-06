import React from "react";
import Movie from "./Movie";


const PopularMoviesLists = () => {
  return (
    <div className="flex gap-x-[3.6875rem] overflow-x-scroll custom-scrollbar">
      <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie />
      <Movie />
    </div>
  );
};

export default PopularMoviesLists;
