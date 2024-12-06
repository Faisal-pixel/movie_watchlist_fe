import React from 'react';
import Image from 'next/image';
import DummyPoster from "../../../public/public_assets/images/dummyPoster.png";

// type Props = {
//     src: string;
//     alt: string;
//     rating: number;
//     movieName: string;
//     year: number;
// }

const Movie = () => {
  return (
    <div className="w-[9.375rem]">
        <div className="h-[14.0625rem] w-full">
          <Image
            src={DummyPoster}
            alt="movie1"
            objectFit="cover"
            className="rounded-sm"
          />
        </div>
        <div className="mt-[5px] px-[0.625rem]">
          {/* RATINGS */}
          <div className="flex">
            <span className="ml-auto flex items-stretch text-[#E1E1E1]">
              <span className="text-base font-normal">83</span>
              <span className="text-xs">/100</span>
            </span>
          </div>
          {/* RATINGS */}

          <p className="text-base text-[#E1E1E1]">
            Top Gun: Maverick
            <span>(2022)</span>
          </p>
        </div>
      </div>
  )
}

export default Movie