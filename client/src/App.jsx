import React, { useContext, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
const Home = lazy(() => import("./pages/Home"));
const Applications = lazy(() => import("./pages/Applications"));
const ApplyJob = lazy(() => import("./pages/ApplyJob"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
import { AppContext } from "./context/AppContext";
const RecruiterLogin = lazy(() => import("./components/RecruiterLogin"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const ManageJobs = lazy(() => import("./pages/ManageJobs"));
const AddJob = lazy(() => import("./pages/AddJob"));
const ViewApplications = lazy(() => import("./pages/ViewApplications"));
import { ToastContainer } from 'react-toastify';
import Loading from "./components/Loading";
import "quill/dist/quill.snow.css";

const App = () => {
  const { showRecruiterLogin,companyToken} = useContext(AppContext);
  return (
    <>
      <div>
        {showRecruiterLogin && <RecruiterLogin />}
        <ToastContainer  />
        <Suspense fallback={<Loading/>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apply-job/:id" element={<ApplyJob />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />

            <Route path="/dashboard" element={<Dashboard />} >

            {
            companyToken ?
             <>
              <Route path="manage-jobs" element={<ManageJobs />} />
              <Route path="add-job" element={<AddJob />} />
              <Route path="view-applications" element={<ViewApplications />} />
            </>:null
            }
             
            </Route>

          </Routes>
        </Suspense>
      </div>
    </> 
  );
};

export default App;
