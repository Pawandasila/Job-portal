import { AuthContext } from "@/context/authContext";
import useAxios from "@/hooks/useAxios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecruiterApplicantProfile = () => {
  const { id } = useParams();
  const axios = useAxios();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [jobSeeker, setJobSeeker] = useState(null);
  const [userData, setUserData] = useState(null);
  const [profileStatus, setProfileStatus] = useState(null);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState("submitted");
  
  const backendBaseUrl = import.meta.env.VITE_BASE_URL;
  
  const getFormattedImageUrl = (photoPath) => {
    if (!photoPath) return "";
    
    return photoPath.startsWith("/uploads/")
      ? `${backendBaseUrl}${photoPath}`
      : photoPath;
  };

  const fetchJobSeeker = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/job-seeker/${id}`);
      console.log(response.data);
      if (response.data) {
        // Fetch user details
        const userDetail = await axios.get(`/user/detail/${response.data.jobSeeker.user_id}`);
        console.log(userDetail);
        
        setJobSeeker(response.data.jobSeeker);
        setUserData(userDetail.data.data);
        setProfileStatus(response.data.profileStatus);
      }
    } catch (error) {
      console.error("Error fetching job seeker:", error);
      setError("Failed to load applicant profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchJobSeeker();
    }
  }, [axios, user, id]);

  const handleActionClick = (action) => {
    setActionType(action);
    setDialogOpen(true);
  };

  const confirmAction = async () => {
    setActionLoading(true);
    try {
      const status =
        actionType === "shortlist"
          ? "shortlist"
          : actionType === "hire"
          ? "hired"
          : "reject";
      
      const response = await axios.patch(
        `/application/jobSeeker/${id}`,
        {
          status,
        }
      );
      console.log(response);

      if (response.data) {
        // Update local state
        setApplicationStatus(status);
        // Fetch updated data
        fetchJobSeeker();
      }
    } catch (error) {
      console.error(`Error ${actionType} application:`, error);
      setError(`Failed to ${actionType} application. Please try again.`);
    } finally {
      setActionLoading(false);
      setDialogOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 mx-auto border-4 border-t-blue-500 border-r-blue-500 border-b-gray-200 border-l-gray-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={fetchJobSeeker}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!jobSeeker || !userData) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <p className="text-gray-600">No profile data available.</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "shortlist":
        return "text-green-600";
      case "hired":
        return "text-blue-600";
      case "reject":
        return "text-red-600";
      default:
        return "text-yellow-600";
    }
  };

  // Get the full name from user data
  const fullName = userData ? `${userData.firstName} ${userData.lastName}` : jobSeeker.name || "Job Seeker";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header with photo and basic info */}
        <div className="bg-blue-600 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="mb-4 sm:mb-0 sm:mr-6">
              {jobSeeker.photo ? (
                <img 
                  src={getFormattedImageUrl(jobSeeker.photo)} 
                  alt="Profile" 
                  className="h-24 w-24 rounded-full border-4 border-white object-cover"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-white">
                  <span className="text-2xl text-gray-500">{jobSeeker.gender === 'male' ? '♂' : '♀'}</span>
                </div>
              )}
            </div>
            <div className="text-center sm:text-left text-white">
              <h1 className="text-2xl font-bold">{fullName}</h1>
              <p className="text-blue-100">{userData?.email}</p>
              <p className="text-blue-100">{userData?.phonenumber}</p>
              <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-2">
                <span className="inline-block bg-blue-800 px-3 py-1 rounded-full text-sm">
                  {jobSeeker.years_of_experience} Years Experience
                </span>
                <span className="inline-block bg-blue-800 px-3 py-1 rounded-full text-sm">
                  {jobSeeker.job_type.replace('_', ' ')}
                </span>
                <span className="inline-block bg-blue-800 px-3 py-1 rounded-full text-sm">
                  {jobSeeker.availability_status.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile completion status */}
        {profileStatus && (
          <div className="bg-gray-50 px-6 py-4 border-b">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center mb-2 sm:mb-0">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-medium">{profileStatus.profileStatus} Profile</span>
              </div>
              <div className="w-full sm:w-auto">
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full" 
                      style={{ width: `${profileStatus.overallCompletionPercentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{profileStatus.overallCompletionPercentage}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="p-6">
          {/* Basic details */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Age:</p>
                <p>{calculateAge(jobSeeker.dob)} years</p>
              </div>
              <div>
                <p className="text-gray-600">Gender:</p>
                <p className="capitalize">{jobSeeker.gender}</p>
              </div>
              <div>
                <p className="text-gray-600">Languages:</p>
                <p>{jobSeeker.languages.join(', ')}</p>
              </div>
              <div>
                <p className="text-gray-600">Location:</p>
                <p>{jobSeeker.location.city}, {jobSeeker.location.state}, {jobSeeker.location.country}</p>
              </div>
              <div>
                <p className="text-gray-600">Expected Salary:</p>
                <p>{jobSeeker.expected_salary.currency} {jobSeeker.expected_salary.min.toLocaleString()} - {jobSeeker.expected_salary.max.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Preferred Location:</p>
                <p>{jobSeeker.preferred_locations.map(loc => `${loc.city}, ${loc.state}`).join('; ')}</p>
              </div>
              <div>
                <p className="text-gray-600">Contact:</p>
                <p>{userData?.email}</p>
                <p>{userData?.phonenumber}</p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {jobSeeker.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Work Experience</h2>
            {jobSeeker.work_experience.map((exp, index) => (
              <div key={index} className="mb-6 border-l-4 border-blue-500 pl-4">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <h3 className="font-semibold text-lg">{exp.role}</h3>
                  <span className="text-gray-500">
                    {formatDate(exp.start_date)} - {exp.current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>
                <p className="text-blue-600">{exp.company}</p>
                <p className="mt-2 text-gray-600">{exp.description}</p>
                <div className="mt-2">
                  <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs mr-2">
                    {exp.type}
                  </span>
                  <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                    {exp.level}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Education</h2>
            {jobSeeker.education && jobSeeker.education.length > 0 ? (
              jobSeeker.education.map((edu, index) => (
                <div key={index} className="mb-6 border-l-4 border-green-500 pl-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <h3 className="font-semibold text-lg">{edu.field_of_study}</h3>
                    <span className="text-gray-500">
                      {formatDate(edu.start_date)} - {edu.current ? "Present" : formatDate(edu.end_date)}
                    </span>
                  </div>
                  <p className="text-green-600">{edu.institution}</p>
                  <p className="mt-2">
                    <span className="capitalize">{edu.level}</span>
                    {edu.grade && <span className="ml-2">• Grade: {edu.grade}</span>}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No education information provided.</p>
            )}
          </div>

          {/* Certifications */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Certifications</h2>
            {jobSeeker.certifications && jobSeeker.certifications.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobSeeker.certifications.map((cert, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold">{cert.name}</h3>
                    <p className="text-gray-600">{cert.issuing_organization}</p>
                    <p className="text-sm text-gray-500">
                      Issued: {formatDate(cert.issue_date)} • 
                      {new Date(cert.expiry_date) < new Date() ? 
                        <span className="text-red-500"> Expired</span> : 
                        ` Valid until: ${formatDate(cert.expiry_date)}`
                      }
                    </p>
                    {cert.credential_url && (
                      <a 
                        href={cert.credential_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline text-sm mt-1 inline-block"
                      >
                        View Credential
                      </a>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No certifications provided.</p>
            )}
          </div>

          {/* Resume */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Resume</h2>
            {jobSeeker.resume ? (
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
                <a 
                  href={getFormattedImageUrl(jobSeeker.resume)}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-600 hover:underline"
                >
                  View Resume
                </a>
              </div>
            ) : (
              <p className="text-gray-500">No resume uploaded.</p>
            )}
          </div>

          {/* Application Actions */}
          <div className="border-t pt-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Application Status: 
              <span className={`capitalize ml-2 ${getStatusColor(applicationStatus)}`}>
                {applicationStatus}
              </span>
            </h2>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => handleActionClick("shortlist")}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition"
                disabled={applicationStatus === "shortlist"}
              >
                Shortlist Candidate
              </button>
              <button 
                onClick={() => handleActionClick("hire")}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
                disabled={applicationStatus === "hired"}
              >
                Hire Candidate
              </button>
              <button 
                onClick={() => handleActionClick("reject")}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition"
                disabled={applicationStatus === "reject"}
              >
                Reject Application
              </button>
            </div>
          </div>
        </div>
      </div>

      {dialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Confirm Action</h3>
            <p>
              {actionType === "shortlist" 
                ? "Are you sure you want to shortlist this candidate?" 
                : actionType === "hire" 
                ? "Are you sure you want to hire this candidate?" 
                : "Are you sure you want to reject this application?"}
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button 
                onClick={() => setDialogOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button 
                onClick={confirmAction}
                className={`px-4 py-2 text-white rounded-lg transition ${
                  actionType === "reject" 
                    ? "bg-red-600 hover:bg-red-700" 
                    : actionType === "shortlist"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={actionLoading}
              >
                {actionLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterApplicantProfile;