

// type Props = {}

import NowPlayingMoviesLists from "./NowPlayingMoviesLists"

const HomeMoviesLists = () => {
  return (
    <div className="hide-scrollbar mb-[1.125rem] w-full">
        <p className="text-[#E1E1E1] text-2xl mb-[35px]">Now playing movies</p>
        <div className="hide-scrollbar">
            <NowPlayingMoviesLists />
        </div>
    </div>
  )
}

export default HomeMoviesLists