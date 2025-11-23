import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser,useAuth } from "@clerk/clerk-react";



//   using Clerk, import these hooks


export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { user } = useUser();   //  Clerk hook
  const { getToken } = useAuth(); //  Clerk hook

  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [companyToken, setCompanyToken] = useState(null);
  const [companyData, setCompanyData] = useState(null);

  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplications] = useState([]);

  //  fetch jobs
  const fetchJobs = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/jobs");

      if (data.success) {
        setJobs(data.jobsData || data.jobs || []); //  handles both keys
        console.log("Jobs fetched:", data.jobsData || data.jobs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl]);

  //  fetch company data
  const fetchCompanyData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/company/company",
        { headers: { token: companyToken } }
      );

      if (data.success) {
        setCompanyData(data.company);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl, companyToken]);

  //  fetch user data
  const fetchUserData = useCallback(async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get(backendUrl + '/api/users/user',
        { headers: { Authorization: `Bearer ${token}` } } );

      if (data.success) {
        setUserData(data.user);
       
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [backendUrl, getToken]);


  // Function to fetch use applied data

  const fetchUserApplications = useCallback(async () => {
     try {
      const token = await getToken();
      const {data} = await axios.get(backendUrl +'/api/users/applications',
      {headers: {Authorization: `Bearer ${token}`}})

      if(data.success){
        setUserApplications(data.applications)
      }else{
        toast.error(data.message)
      }


     } catch (error) {
      toast.error(error.message)
     }
       }, [backendUrl, getToken]);

  //  Run fetchJobs on mount
  useEffect(() => {
    fetchJobs();
    const storedToken = localStorage.getItem("companyToken");
    if (storedToken) setCompanyToken(storedToken);
  }, [fetchJobs]);

  //  Fetch company data when companyToken exists
  useEffect(() => {
    if (companyToken) {
      fetchCompanyData();
    }
  }, [companyToken, fetchCompanyData]);



  // Fetch user data if logged in
  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchUserApplications();
    }
  }, [user, fetchUserData, fetchUserApplications]);



  
  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,
    companyToken,
    setCompanyToken,
    companyData,
    setCompanyData,
    userData,
    setUserData,
    userApplications,
    setUserApplications,
    backendUrl,
    fetchUserData,
    fetchUserApplications,
   
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
