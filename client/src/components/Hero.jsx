import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
  const { setSearchFilter, setIsSearched } = useContext(AppContext); // ✅ FIXED
  const titleRef = useRef(null);
  const locationRef = useRef(null);

  const onSearch = () => {
    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
    setIsSearched(true); 
    console.log({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });
  };

  return (
    <div className="container mx-auto my-10 px-4 sm:px-6 2xl:px-20">
      {/* ------------ Banner ------------ */}
      <div className="mx-2 rounded-xl bg-gradient-to-r from-purple-800 to-indigo-900 py-12 sm:py-14 lg:py-16 text-center text-white">
        <h1 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold">
          Over 10,000+ jobs to apply
        </h1>
        <p className="mb-8 text-xs sm:text-sm md:text-base text-gray-300">
          Your Next Big Career Move Starts Right Here. Explore The Best Job
          Opportunities<br className="hidden sm:block" />
          And Take The First Step Toward Your Future!
        </p>

        {/* ------------ Search bar ------------ */}
        <div className="mx-auto flex max-w-3xl flex-col md:flex-row items-center bg-white rounded">
          {/* title */}
          <div className="flex w-full md:w-1/2 items-center px-4 py-3">
            <img src={assets.search_icon} alt="" className="h-4 sm:h-5" />
            <input
              ref={titleRef}
              type="text"
              placeholder="Search for jobs"
              className="ml-2 w-full text-sm placeholder-gray-400 text-gray-700 outline-none"
            />
          </div>

          {/* location */}
          <div className=" mx-2 flex w-full md:w-1/2 items-center border-t md:border-t-0 md:border-l border-gray-200 px-4 py-3">
            <img src={assets.location_icon} alt="" className="h-4 sm:h-5" />
            <input
              ref={locationRef}
              type="text"
              placeholder="Location"
              className="  ml-2 w-full text-sm placeholder-gray-400 text-gray-700 outline-none"
            />
          </div>

          {/* button */}
          <button
            onClick={onSearch}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-3 md:rounded-r"
          >
            Search
          </button>
        </div>
      </div>

      {/* ------------ Top companies ------------ */}
      <div className="mx-2 mt-5 rounded-xl border border-gray-300 p-5 shadow-md">
        <div className="flex flex-wrap items-center gap-x-10 gap-y-4 lg:gap-x-20">
          <p className="text-xl sm:text-2xl font-bold">Top Companies</p>

          <div className="flex flex-wrap items-center gap-8 sm:gap-12">
            <img src={assets.microsoft_logo} alt="" className="h-5" />
            <img src={assets.walmart_logo} alt="" className="h-5" />
            <img src={assets.accenture_logo} alt="" className="h-5" />
            <img src={assets.samsung_logo} alt="" className="h-5" />
            <img src={assets.amazon_logo} alt="" className="h-5" />
            <img src={assets.adobe_logo} alt="" className="h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
