import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard"



const JobListing = () => {
  const { isSearched, searchFilter, setSearchFilter ,jobs} = useContext(AppContext);
 
const [ showFilter,setShowFilter] = useState(true)
const[currrentPage,setCurrentPage] =  useState(1)
const [selectedCategories, setSelectedCategories] = useState([])
const [selectedLocations, setSelectedLocations] = useState([])

const [filteredJobs, setFilteredJobs] = useState(jobs)

const handleCategoryChange = (category) => {
  setSelectedCategories(
    prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
  ) 
}
const handleLocationChange = (location) => {
  setSelectedLocations(
    prev => prev.includes(location) ? prev.filter(c => c !== location) : [...prev, location]
  ) 
}

 useEffect(() => {
  
    const matchCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category)

    const matchLocation = job => selectedLocations.length === 0 || selectedLocations.includes(job.location)

    const matchTitle =    job => searchFilter.title === '' || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())

    const matchesSearchLocation = job => searchFilter.location === '' || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())
    
    const newfilteredJobs = jobs.slice().reverse().filter(
      job => matchCategory(job) && matchLocation(job) && matchTitle(job) && matchesSearchLocation(job)
    )
    setFilteredJobs(newfilteredJobs)

    setCurrentPage(1)

 },[jobs, selectedCategories, selectedLocations, searchFilter])

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8 ">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4 bg-white px-4 ">
        {/* Filter by Hero Section */}
        {isSearched && (searchFilter.title || searchFilter.location) && (
          <>
            <h3 className="font-medium text-lg mb-4">Current Filters</h3>
            <div className="mb-4 text-gray-600 ">
              {searchFilter.title && (
                <span className="inline-flex items-center gap-3 bg-blue-50 border-blue-200 px-4 py-1.5 rounded">
                  {searchFilter.title}
                  <img
                    onClick={() =>
                      setSearchFilter((prev) => ({ ...prev, title: "" }))
                    }
                    className="cursor-pointer"
                    src={assets.cross_icon}
                    alt=""
                  />
                </span>
              )}

              {searchFilter.location && (
                <span className=" ml-2 inline-flex items-center gap-3  bg-red-50 border-red-200 px-4 py-1.5 rounded">
                  {searchFilter.location}
                  <img
                    onClick={() =>
                      setSearchFilter((prev) => ({ ...prev, location: "" }))
                    }
                    className="cursor-pointer"
                    src={assets.cross_icon}
                    alt=" "
                  />
                </span>
              )}
            </div>
          </>
        )}
        <button onClick={()=>setShowFilter(prev =>!prev)} className="px-6 py-1.5 rounded border-gray-400 lg:hidden">
          {showFilter ? 'Close' : 'Filter'}
          </button>

        {/* SEARCH BY CATEGORIES*/ }

        <div className={showFilter ? '':'max-lg:hidden'}>
          <h4 className="font-medium text-lg py-4">Search by Categories </h4>
          <ul className="space-y-4 text-gray-600">
            {JobCategories.map((category, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input className="scale-125"
                 type="checkbox"
                onChange={() => handleCategoryChange(category)}
                checked={selectedCategories.includes(category)}
                />
                {category}
              </li>
            ))}
          </ul>
        </div>

              {/* SEARCH BY LOCATION*/ }
            
        <div className={showFilter ? '':'max-lg:hidden'}>
          <h4 className="font-medium text-lg py-4 pt-14"> Search by Locations </h4>
          <ul className="space-y-4 text-gray-600">
            {JobLocations.map((location, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input className="scale-125"
                 type="checkbox" 
                 onChange={() => handleLocationChange(location)}
                 checked={selectedLocations.includes(location)}
                 />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>

            {/** JOB LISTING */}
               <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
              <h3 className="font-medium text-3xl py-2" id ='job-list' >Latest job</h3>
              <p className="mb-8"> Get your desire job </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
             
              {filteredJobs.slice((currrentPage -1)*6,currrentPage*6).map((job,index) => (
                <JobCard key=  {index} job = {job} />
              ))}
              </div>

              {/*pagination  */}

              {filteredJobs.length > 0 && (
                <div className='flex items-center justify-center space-x-2 mt-10'>
                  <a href="#job-list">
                    <img onClick={( )=>setCurrentPage(Math.max(currrentPage-1),1)} src={assets.left_arrow_icon} alt="" />
                  </a>

                  {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                    <a  key = {index} href="#job-list">

                      <button onClick={() =>setCurrentPage(index+1)} className={`w-10 h-10 flex items-center justify-center border-gray-300 rounded ${currrentPage === index +1 ? 'bg-blue-100 text-blue-500 ' :'text-gray-500'}`}>{index + 1}</button>
                    </a>
                  ))}

                  <a href="#job-list">
                    <img onClick={( )=>setCurrentPage(Math.min(currrentPage+1),Math.ceil(filteredJobs.length / 6))} src={assets.right_arrow_icon} alt="" />
                  </a>
                </div>
              )}

          </section>

    </div>
  );
};

export default JobListing;
