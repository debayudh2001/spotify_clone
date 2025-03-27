import { useEffect, useContext } from "react";
import CategoriesC from "./CategoriesC";
import { SpotifyContext } from "./SpotifyContext";
import Loader from "./Loader";
import './loader.css'
const Browse = () => {
  const { categories, getBrowseCategories } = useContext(SpotifyContext);
  // useEffect(() => {
  //     getBrowseCategories()
  // }, [])
  return (
    <>
      <div className="w-[75%] h-[70vh] bg-[#121212] p-6 ml-4 rounded-xl flex flex-col gap-3">
        {categories.length !== 0 ? (
          <>
            <span className="text-white font-bold text-2xl mb-2">
              Browse All
            </span>
            <div className="w-[100%] h-[90%] flex flex-wrap justify-evenly gap-3 overflow-auto">
              {categories.map((val, ind) => (
                <CategoriesC key={ind} data={val} />
              ))}
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default Browse;
