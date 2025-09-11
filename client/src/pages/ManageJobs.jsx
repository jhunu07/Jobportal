import React, { useContext, useEffect, useState } from 'react';
import { assets, manageJobsData } from '../assets/assets';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';





const ManageJobs = () => {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState(false);
  const { backendUrl, companyToken } = useContext(AppContext)

  // Function to fetch job application 

  const fetchCompanyJobs = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/list-jobs',
        { headers: { token: companyToken } }
      )

      if (data.success) {

        setJobs(data.jobsData.reverse());
        console.log(data.jobsData);


      } else {

        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);

    }

  }
  // Fun to change job visiblity
  const changeJobVisibility = async (id) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/company/change-visiblity',
        { id },
        { headers: { token: companyToken } }
      );

      if (data.success) {
        toast.success(data.message);
        fetchCompanyJobs(); // Refresh the job list

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };



  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobs();
    }
  }
    , [companyToken]);
  return jobs ? jobs.length  === 0 ?
  (
  <div className='flex item-center justify-center h-[70vh]' > 
  <p className='text-xl sm:text-2xl' >No Job Posted</p> 
   </div>
   ) :  (
    <div className='container p-4 max-w-5xl mx-auto'>
      <div className='overflow-x-auto'>
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b text-left">#</th>
              <th className="p-3 border-b text-left">JOB TITLE</th>
              <th className="p-3 border-b text-left">DATE</th>
              <th className="p-3 border-b text-left">LOCATION</th>
              <th className="p-3 border-b text-left">APPLICANT</th>
              <th className="p-3 border-b text-left">VISIBLE</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{job.title}</td>
                <td className="p-3">{moment(job.date).format('ll')}</td>
                <td className="p-3">{job.location}</td>
                <td className="p-3">{job.applicants}</td>
                <td className="p-3">
                  <input onChange={() => changeJobVisibility(job._id)} type="checkbox" checked={job.visible} className="h-4 w-4 accent-blue-600" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4  justify-end'>
        <button onClick={() => navigate('/dashboard/add-job')}
          className='bg-blue-500 rounded text-white p-2'> ADD NEW JOB</button>
      </div>
    </div>
  ) : <Loading />
};

export default ManageJobs;
