import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext);
  const [applications, setApplications] = useState(false);

  // fetch company job application data
  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + '/api/company/applicants',
        { headers: { token: companyToken } }
      );
      if (data.success) {
        setApplications(data.applications.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //functiomn to update application status
  const changeJobApplicationStatus = async (id, status) => {
    try {
      const {data} = await axios.post(backendUrl +'/api/company/change-status', 
      {id, status},
      {headers: {token: companyToken}}
    )

         if (data.success) {
          fetchCompanyJobApplications();
          
         }else{
          toast.error(data.message);
         }
    } catch (error) {
      toast.error(error.message);
      
    }
  }
   

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications();
    }
  }, [companyToken]);

  // render
  return applications
    ? applications.length === 0
      ? (
        <div className="text-center p-6">No applications found.</div>
      ) : (
        <div className="container mx-auto p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-2 text-sm border-b">#</th>
                  <th className="text-left p-2 text-sm border-b">User Name</th>
                  <th className="text-left p-2 text-sm border-b">Job Title</th>
                  <th className="text-left p-2 text-sm border-b">Location</th>
                  <th className="text-left p-2 text-sm border-b">Resume</th>
                  <th className="text-left p-2 text-sm border-b">Application</th>
                </tr>
              </thead>
              <tbody>
                {applications
                  .filter(item => item.jobId && item.userId)
                  .map((application, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-2 text-sm">{index + 1}</td>
                      <td className="p-2 flex items-center gap-2 text-sm">
                        <img
                          src={application.userId?.image}
                          alt=""
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <span>{application.userId?.name}</span>
                      </td>
                      <td className="p-2 text-sm">{application.jobId?.title}</td>
                      <td className="p-2 text-sm">{application.jobId?.location}</td>

                      {/* Resume */}
                      <td className="p-2">
                        <a
                          href={application.userId?.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-100 text-blue-400 px-3 py-1 rounded inline-flex gap-2"
                        >
                          Resume
                          <img
                            src={assets.resume_download_icon}
                            alt=""
                            className="w-4 h-4"
                          />
                        </a>
                      </td>

                      {/* Accept/Reject */}
                      <td className="py-2 px-4 border-b relative">
                        <div className="relative inline-block text-left group">
                          <button className="text-gray-500 action-button">...</button>
                          <div className="z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border-gray-200 rounded shadow group-hover:block">
                            <button onClick={()=>changeJobApplicationStatus(changeJobApplicationStatus._id,'Accepted')} className="block w-full text-left px-4 py-2 text-green-500 hover:bg-gray-200">
                              Accept
                            </button>
                            <button onClick={()=>changeJobApplicationStatus(changeJobApplicationStatus._id,'Rejectd')} className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200">
                              Reject
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    : <Loading />;
};

export default ViewApplications;
