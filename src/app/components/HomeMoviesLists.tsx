

// type Props = {}

import PopularMoviesLists from "./PopularMoviesLists"

const HomeMoviesLists = () => {
  return (
    <div className="hide-scrollbar mb-[1.125rem]">
        <p className="text-[#E1E1E1] text-2xl mb-[35px]">Popular movies right now</p>
        <div className="hide-scrollbar">
            <PopularMoviesLists />
        </div>
    </div>
  )
}

export default HomeMoviesLists