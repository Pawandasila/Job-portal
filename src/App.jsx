import React, { useContext } from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import JobBoard from "./pages/Joblisting";
import JobFilters from "./pages/JobFilters";
import About from "./components/About";
import JobDetails from "./pages/JobDetails";
import Profile from "./pages/Profile";
import { AuthContext } from "./context/authContext";
import NotFound from "./pages/NotFound";
import RecruiterLayout from "./components/custom/RecuritorDashboard/RecuritorLayout";
import RecuriterApplication from "./components/custom/RecuritorDashboard/RecuriterApplication";
import RecuriterJobs from "./components/custom/RecuritorDashboard/RecuriterJobs";
import RecruiterCompany from "./components/custom/RecuritorDashboard/RecruiterCompany";
import RecuriterApplicantProfile from "./components/custom/RecuritorDashboard/applicant/RecuriterApplicantProfile";

const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow ">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const RecruiterRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) return <div>Loading...</div>;

  return user?.role === "recruiter" ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

const JobSeekerRoute = ({ children }) => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) return <div>Loading...</div>;
  return user?.role === "jobseeker" ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

function App() {
  return (
    <Routes>
      
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/jobs" element={<JobBoard />} />
        <Route path="/job-filters" element={<JobFilters />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/jobDetails/:id" element={<JobDetails />} />

        <Route
          path="/profile"
          element={
            <JobSeekerRoute>
              <Profile />
            </JobSeekerRoute>
          }
        />

        <Route
          path="/recruiter-access"
          element={
            <RecruiterRoute>
              <RecruiterLayout />
            </RecruiterRoute>
          }
        >
          <Route index element={<RecuriterApplication />} />
          <Route path="jobs" element = {<RecuriterJobs />} />
          <Route path="applicant-profile/:id" element={<RecuriterApplicantProfile />} />
          <Route path="company" element = {<RecruiterCompany />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
