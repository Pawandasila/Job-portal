import React, { useState, useEffect } from "react";
import useAxios from "@/hooks/useAxios";
import Modal from "@/components/custom/Profile/Modal";
import BasicInfoForm from "@/components/custom/Profile/SubModal/BasicInfoFor";
import ProfileDetailsForm from "@/components/custom/Profile/SubModal/ProfileDetails";
import EducationForm from "@/components/custom/Profile/SubModal/EducationForm";
import ExperienceForm from "@/components/custom/Profile/SubModal/Experience";
import SkillsForm from "@/components/custom/Profile/SubModal/SkillsForm";
import LanguagesForm from "@/components/custom/Profile/SubModal/LanguageForm";
import LocationForm from "@/components/custom/Profile/SubModal/Location";
import JobPreferencesForm from "@/components/custom/Profile/SubModal/JobPreference";

export default function ProfilePage() {
  const axios = useAxios();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progressTracker, setProgressTracker] = useState(0);
  
  const [basicInfoModal, setBasicInfoModal] = useState(false);
  const [profileDetailsModal, setProfileDetailsModal] = useState(false);
  const [educationModal, setEducationModal] = useState(false);
  const [experienceModal, setExperienceModal] = useState(false);
  const [skillsModal, setSkillsModal] = useState(false);
  const [languagesModal, setLanguagesModal] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const [preferencesModal, setPreferencesModal] = useState(false);

  // Selected item for edit
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);

  // Loading states for form submissions
  const [submitting, setSubmitting] = useState(false);

  // Fetch profile data
  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`/job-seeker/me`);
      console.log(response.data.jobSeeker);

      if (response && response.data) {
        setProfile(response.data.jobSeeker);
        setProgressTracker(
          response.data.profileStatus.overallCompletionPercentage
        );
      } else {
        setError("Unable to fetch profile data");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  // Update basic info (user data)
  const updateBasicInfo = async (data) => {
    try {
      setSubmitting(true);
      await axios.patch("/user/update", data);

      // Update the profile state with the new basic info
      setProfile((prev) => ({
        ...prev,
        user_id: {
          ...prev.user_id,
          ...data,
        },
      }));

      setBasicInfoModal(false);
      // Success toast or notification can be added here
    } catch (err) {
      console.error("Error updating basic info:", err);
      setError(err.response?.data?.message || "Failed to update basic info");
    } finally {
      setSubmitting(false);
    }
  };

  // Update profile details
  const updateProfileDetails = async (fields) => {
    console.log("Function arguments:");
    console.log("fields:", fields);
    try {
      setSubmitting(true);

      if (!profile._id) throw new Error("Profile ID not found");

      const formData = new FormData();

      // ---- Primitives
      if (fields.gender) formData.append("gender", fields.gender);
      if (fields.dob) formData.append("dob", fields.dob);

      // ---- Array/Object fields (MUST be stringified if using FormData!)
      if (fields.skills)
        formData.append("skills", JSON.stringify(fields.skills));
      if (fields.languages)
        formData.append("languages", JSON.stringify(fields.languages));
      if (fields.education)
        formData.append("education", JSON.stringify(fields.education));
      if (fields.work_experience)
        formData.append(
          "work_experience",
          JSON.stringify(fields.work_experience)
        );
      if (fields.location)
        formData.append("location", JSON.stringify(fields.location));
      if (fields.preferred_locations)
        formData.append(
          "preferred_locations",
          JSON.stringify(fields.preferred_locations)
        );
      if (fields.expected_salary)
        formData.append(
          "expected_salary",
          JSON.stringify(fields.expected_salary)
        );
      if (fields.years_of_experience !== undefined)
        formData.append("years_of_experience", fields.years_of_experience);

      // ---- File uploads
      if (fields.resume) formData.append("resume", fields.resume);
      if (fields.photo) formData.append("photo", fields.photo);

      // ---- Remove photo or resume
      // if (removeResume) formData.append('removeResume', 'true');
      // if (removePhoto) formData.append('removePhoto', 'true');

      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}:`, value.name, value.type, value.size);
        } else {
          console.log(`${key}:`, value);
        }
      }

      // Send FormData!
      const response = await axios.patch(
        `/job-seeker/update/${profile._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log(response);

      if (response && response.data) {
        setProfile(response.data.updatedJobSeeker);
        setProgressTracker(
          response.data.profileStatus.overallCompletionPercentage
        );
      }
      setProfileDetailsModal(false);
    } catch (err) {
      console.error("Error updating profile details:", err);
      setError(
        err.response?.data?.message || "Failed to update profile details"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Update education
  const updateEducation = async (educationData) => {
    try {
      setSubmitting(true);

      if (!profile._id) {
        throw new Error("Profile ID not found");
      }

      // Prepare the data to send
      let updatedEducation;

      if (selectedEducation) {
        // Editing existing education
        updatedEducation = profile.education.map((edu) =>
          edu._id === selectedEducation._id ? educationData : edu
        );
      } else {
        // Adding new education
        updatedEducation = [...(profile.education || []), educationData];
      }

      // Update the profile with the new education array
      const response = await axios.patch(`/job-seeker/update/${profile._id}`, {
        education: updatedEducation,
      });

      if (response && response.data) {
        setProfile(response.data.updatedJobSeeker);
        setProgressTracker(
          response.data.profileStatus.overallCompletionPercentage
        );
      }

      setEducationModal(false);
      setSelectedEducation(null);
      // Success toast or notification can be added here
    } catch (err) {
      console.error("Error updating education:", err);
      setError(err.response?.data?.message || "Failed to update education");
    } finally {
      setSubmitting(false);
    }
  };

  // Update work experience
  const updateExperience = async (experienceData) => {
    try {
      setSubmitting(true);

      if (!profile._id) {
        throw new Error("Profile ID not found");
      }

      // Prepare the data to send
      let updatedExperience;

      if (selectedExperience) {
        // Editing existing experience
        updatedExperience = profile.work_experience.map((exp) =>
          exp._id === selectedExperience._id ? experienceData : exp
        );
      } else {
        // Adding new experience
        updatedExperience = [
          ...(profile.work_experience || []),
          experienceData,
        ];
      }

      // Update the profile with the new experience array
      const response = await axios.patch(`/job-seeker/update/${profile._id}`, {
        work_experience: updatedExperience,
      });

      console.log(response);

      if (response && response.data) {
        setProfile(response.data.updatedJobSeeker);
        setProgressTracker(
          response.data.profileStatus.overallCompletionPercentage
        );
      }

      setExperienceModal(false);
      setSelectedExperience(null);
      // Success toast or notification can be added here
    } catch (err) {
      console.error("Error updating experience:", err);
      setError(err.response?.data?.message || "Failed to update experience");
    } finally {
      setSubmitting(false);
    }
  };

  // Update skills
  const updateSkills = async (skillsData) => {
    try {
      setSubmitting(true);

      if (!profile._id) {
        throw new Error("Profile ID not found");
      }

      // Update the profile with the new skills array
      const response = await axios.patch(`/job-seeker/update/${profile._id}`, {
        skills: skillsData,
      });

      if (response && response.data) {
        setProfile(response.data.updatedJobSeeker);
        setProgressTracker(
          response.data.profileStatus.overallCompletionPercentage
        );
      }

      setSkillsModal(false);
      // Success toast or notification can be added here
    } catch (err) {
      console.error("Error updating skills:", err);
      setError(err.response?.data?.message || "Failed to update skills");
    } finally {
      setSubmitting(false);
    }
  };

  // Update languages
  const updateLanguages = async (languagesData) => {
    try {
      setSubmitting(true);

      if (!profile._id) {
        throw new Error("Profile ID not found");
      }

      // Update the profile with the new languages array
      const response = await axios.patch(`/job-seeker/update/${profile._id}`, {
        languages: languagesData,
      });

      if (response && response.data) {
        setProfile(response.data.updatedJobSeeker);
        setProgressTracker(
          response.data.profileStatus.overallCompletionPercentage
        );
      }

      setLanguagesModal(false);
      // Success toast or notification can be added here
    } catch (err) {
      console.error("Error updating languages:", err);
      setError(err.response?.data?.message || "Failed to update languages");
    } finally {
      setSubmitting(false);
    }
  };

  // Update locations
  const updateLocations = async (locationsData) => {
    try {
      setSubmitting(true);

      if (!profile._id) {
        throw new Error("Profile ID not found");
      }

      // Update the profile with the new location and preferred_locations
      const response = await axios.patch(`/job-seeker/update/${profile._id}`, {
        location: locationsData.location,
        preferred_locations: locationsData.preferred_locations,
      });

      if (response && response.data) {
        setProfile(response.data.updatedJobSeeker);
        setProgressTracker(
          response.data.profileStatus.overallCompletionPercentage
        );
      }

      setLocationModal(false);
      // Success toast or notification can be added here
    } catch (err) {
      console.error("Error updating locations:", err);
      setError(err.response?.data?.message || "Failed to update locations");
    } finally {
      setSubmitting(false);
    }
  };

  // Update job preferences
  const updateJobPreferences = async (preferencesData) => {
    try {
      setSubmitting(true);

      if (!profile._id) {
        throw new Error("Profile ID not found");
      }

      // Update the profile with the new job preferences
      const response = await axios.patch(`/job-seeker/update/${profile._id}`, {
        job_type: preferencesData.job_type,
        availability_status: preferencesData.availability_status,
        expected_salary: preferencesData.expected_salary,
      });

      if (response && response.data) {
        setProfile(response.data.updatedJobSeeker);
        setProgressTracker(
          response.data.profileStatus.overallCompletionPercentage
        );
      }

      setPreferencesModal(false);
      // Success toast or notification can be added here
    } catch (err) {
      console.error("Error updating job preferences:", err);
      setError(
        err.response?.data?.message || "Failed to update job preferences"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfile();
  }, [axios]);

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const backendBaseUrl = "http://localhost:4000";
  const resumeUrl =
    profile && profile.resume ? backendBaseUrl + profile.resume : "";

  const photoUrl = profile?.photo
    ? profile.photo.startsWith("/uploads/")
      ? backendBaseUrl + profile.photo
      : profile.photo
    : "";

  // Loading state
  if (loading && !profile) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="h-64 bg-gray-200 rounded mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-48 bg-gray-200 rounded mb-6"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !profile) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-red-600 text-xl font-semibold mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-700">{error}</p>
            <button
              onClick={fetchProfile}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen pb-12">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 shadow-lg">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 text-white tracking-tight">
              Professional Profile
            </h1>
            <p className="text-blue-100 text-sm sm:text-base mb-4 max-w-2xl">
              Complete your profile to increase your chances of being discovered
              by recruiters and matching with the right opportunities.
            </p>
            <div className="bg-white/20 rounded-full p-1 backdrop-blur-sm">
              <div className="flex items-center">
                <div className="w-full h-2.5 bg-blue-200/40 rounded-full overflow-hidden flex-1">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressTracker}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium whitespace-nowrap ml-3 text-white">
                  {progressTracker}% Complete
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-6">
        <div className="max-w-4xl mx-auto space-y-5 sm:space-y-8">
          {/* Profile Info Section */}
          <section className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Profile Information
                </h2>
                <button
                  onClick={() => setBasicInfoModal(true)}
                  className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition flex items-center shadow-sm self-start sm:self-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Edit Basic Info
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                <div className="flex flex-col items-center md:items-start">
                  <div className="h-32 w-32 sm:h-36 sm:w-36 rounded-full overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 border border-gray-200 shadow-md mx-auto md:mx-0">
                    {profile?.photo ? (
                      <img
                        src={photoUrl}
                        alt={`${
                          profile.user_id?.firstName || "User"
                        }'s profile`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-blue-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-14 w-14 sm:h-16 sm:w-16"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => setProfileDetailsModal(true)}
                    className="mt-4 w-full max-w-[12rem] px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center shadow-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Update Photo
                  </button>
                </div>
                <div className="flex-grow mt-4 md:mt-0">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 sm:p-5 border border-blue-100/50 shadow-sm">
                    {profile?.user_id && (
                      <h3 className="text-xl sm:text-2xl font-bold text-blue-900 mb-3 text-center md:text-left">
                        {profile.user_id.firstName} {profile.user_id.lastName}
                      </h3>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5">
                      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                        <h4 className="text-xs font-medium text-gray-500 uppercase mb-1">
                          Email
                        </h4>
                        <p className="text-gray-900 break-all text-sm sm:text-base">
                          {profile?.user_id?.email || "Not provided"}
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                        <h4 className="text-xs font-medium text-gray-500 uppercase mb-1">
                          Phone
                        </h4>
                        <p className="text-gray-900 text-sm sm:text-base">
                          {profile?.user_id?.phonenumber || "Not provided"}
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                        <h4 className="text-xs font-medium text-gray-500 uppercase mb-1">
                          Gender
                        </h4>
                        <p className="text-gray-900 capitalize text-sm sm:text-base">
                          {profile?.gender || "Not specified"}
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                        <h4 className="text-xs font-medium text-gray-500 uppercase mb-1">
                          Date of Birth
                        </h4>
                        <p className="text-gray-900 text-sm sm:text-base">
                          {profile?.dob
                            ? new Date(profile.dob).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )
                            : "Not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                      <h4 className="text-xs font-medium text-gray-500 uppercase mb-1">
                        Resume
                      </h4>
                      {resumeUrl ? (
                        <a
                          href={resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          View Resume
                        </a>
                      ) : (
                        <p className="text-gray-500 italic">
                          No resume uploaded
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => setProfileDetailsModal(true)}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition shadow-sm"
                    >
                      Edit Profile Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Work Experience Section */}
          <section className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Work Experience
                </h2>
                <button
                  onClick={() => {
                    setSelectedExperience(null);
                    setExperienceModal(true);
                  }}
                  className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition flex items-center shadow-sm self-start sm:self-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Experience
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              {profile?.work_experience &&
              profile.work_experience.length > 0 ? (
                <div className="relative">
                  {/* Timeline line - hidden on mobile, visible on larger screens */}
                  <div className="hidden md:block absolute left-5 top-6 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-blue-100"></div>

                  <div className="space-y-6 md:space-y-10">
                    {profile.work_experience.map((exp, index) => (
                      <div key={exp._id} className="md:relative md:pl-14 pl-0">
                        {/* Timeline dot - hidden on mobile */}
                        <div className="hidden md:flex absolute left-0 top-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 items-center justify-center text-white shadow-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>

                        {/* Experience card */}
                        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow duration-300">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {exp.role}
                              </h3>
                              <p className="text-gray-700 font-medium">
                                {exp.company}
                              </p>
                              <div className="flex items-center mt-1 text-gray-500 text-sm">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                                {formatDate(exp.start_date)} -{" "}
                                {exp.current
                                  ? "Present"
                                  : formatDate(exp.end_date)}
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                setSelectedExperience(exp);
                                setExperienceModal(true);
                              }}
                              className="text-gray-400 hover:text-blue-500 transition-colors"
                              aria-label="Edit experience"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                              {exp.type?.replace("-", " ")}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                              {exp.level}
                            </span>
                          </div>

                          {exp.description && (
                            <>
                              <div className="w-full border-t border-gray-100 my-3"></div>
                              <p className="text-gray-600 text-sm">
                                {exp.description}
                              </p>
                            </>
                          )}
                        </div>

                        {/* Arrow connector for all but the last item - hidden on mobile */}
                        {index < profile.work_experience.length - 1 && (
                          <div className="hidden md:flex absolute left-5 top-10 h-10 items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-blue-300"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto text-gray-400 mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No work experience added
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Add your professional experience to make your profile stand
                    out
                  </p>
                  <button
                    onClick={() => {
                      setSelectedExperience(null);
                      setExperienceModal(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition inline-flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add Work Experience
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Education Section */}
          <section className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                  Education
                </h2>
                <button
                  onClick={() => {
                    setSelectedEducation(null);
                    setEducationModal(true);
                  }}
                  className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition flex items-center shadow-sm self-start sm:self-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Add Education
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              {profile?.education && profile.education.length > 0 ? (
                <div className="relative">
                  {/* Timeline line - hidden on mobile */}
                  <div className="hidden md:block absolute left-5 top-6 bottom-0 w-0.5 bg-gradient-to-b from-indigo-400 to-purple-100"></div>

                  <div className="space-y-6 md:space-y-10">
                    {profile.education.map((edu, index) => (
                      <div key={edu._id} className="md:relative md:pl-14 pl-0">
                        {/* Timeline dot - hidden on mobile */}
                        <div className="hidden md:flex absolute left-0 top-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 items-center justify-center text-white shadow-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                            />
                          </svg>
                        </div>

                        {/* Education card */}
                        <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-4 sm:p-5 hover:shadow-md transition-shadow duration-300">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">
                                {edu.field_of_study}
                              </h3>
                              <p className="text-gray-700 font-medium">
                                {edu.institution}
                              </p>
                              <div className="flex items-center mt-1 text-gray-500 text-sm">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-1"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                                {formatDate(edu.start_date)} -{" "}
                                {edu.current
                                  ? "Present"
                                  : formatDate(edu.end_date)}
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                setSelectedEducation(edu);
                                setEducationModal(true);
                              }}
                              className="text-gray-400 hover:text-indigo-500 transition-colors"
                              aria-label="Edit education"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </button>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 capitalize">
                              {edu.level.replace("_", " ")}
                            </span>
                            {edu.grade && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                Grade: {edu.grade}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Arrow connector for all but the last item - hidden on mobile */}
                        {index < profile.education.length - 1 && (
                          <div className="hidden md:flex absolute left-5 top-10 h-10 items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-indigo-300"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto text-gray-400 mb-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No education added
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Add your educational qualifications to improve your profile
                  </p>
                  <button
                    onClick={() => {
                      setSelectedEducation(null);
                      setEducationModal(true);
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition inline-flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add Education
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Skills and Languages in two-column layout on larger screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
            {/* Skills Section */}
            <section className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    Skills
                  </h2>
                  <button
                    onClick={() => setSkillsModal(true)}
                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition flex items-center shadow-sm self-start sm:self-auto"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                    Edit Skills
                  </button>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                {profile?.skills && profile.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 border border-indigo-200 shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto text-gray-400 mb-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No skills added
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Add your skills to showcase your abilities to employers
                    </p>
                    <button
                      onClick={() => setSkillsModal(true)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition inline-flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/200/svg"
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Add Skills
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Languages Section */}
            <section className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-teal-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                      />
                    </svg>
                    Languages
                  </h2>
                  <button
                    onClick={() => setLanguagesModal(true)}
                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition flex items-center shadow-sm self-start sm:self-auto"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                    Edit Languages
                  </button>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                {profile?.languages && profile.languages.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.languages.map((language, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-teal-100 text-teal-800 border border-teal-200 shadow-sm"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto text-gray-400 mb-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                      />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      No languages added
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Add languages you speak to enhance your profile
                    </p>
                    <button
                      onClick={() => setLanguagesModal(true)}
                      className="px-4 py-2 bg-teal-600 text-white rounded-md text-sm font-medium hover:bg-teal-700 transition inline-flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/200/svg"
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Add Languages
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* Location Section */}
          <section className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Locations
                </h2>
                <button
                  onClick={() => setLocationModal(true)}
                  className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition flex items-center shadow-sm self-start sm:self-auto"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Edit Locations
                </button>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Current Location */}
                <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-lg p-4 sm:p-5 border border-blue-100 shadow-sm">
                  <h3 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Current Location
                  </h3>
                  {profile?.location &&
                  (profile.location.city || profile.location.country) ? (
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100">
                      <p className="text-gray-800 flex items-start">
                        <span className="inline-block bg-blue-100 p-1 rounded mr-2 mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </span>
                        {[
                          profile.location.city,
                          profile.location.state,
                          profile.location.country,
                        ]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 text-gray-500 italic">
                      No current location specified
                    </div>
                  )}
                </div>

                {/* Preferred Locations */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 sm:p-5 border border-green-100 shadow-sm">
                  <h3 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                    Preferred Locations
                  </h3>
                  {profile?.preferred_locations &&
                  profile.preferred_locations.length > 0 ? (
                    <div className="space-y-2">
                      {profile.preferred_locations.map((loc, index) => (
                        <div
                          key={index}
                          className="bg-white p-3 rounded-lg shadow-sm border border-gray-100"
                        >
                          <p className="text-gray-800 flex items-start">
                            <span className="inline-block bg-green-100 p-1 rounded mr-2 mt-0.5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                />
                              </svg>
                            </span>
                            {[loc.city, loc.state, loc.country]
                              .filter(Boolean)
                              .join(", ")}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 text-gray-500 italic">
                      No preferred locations added
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => setLocationModal(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition shadow-sm"
              >
                {(profile?.location &&
                  (profile.location.city || profile.location.country)) ||
                (profile?.preferred_locations &&
                  profile.preferred_locations.length > 0)
                  ? "Update Locations"
                  : "Add Locations"}
              </button>
            </div>
          </section>

          {/* Job Preferences Section */}
          <section className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Job Preferences
                </h2>
                <button
                  onClick={() => setPreferencesModal(true)}
                  className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  Edit Preferences
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Job Type */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Job Type
                  </h3>
                  {profile?.job_type ? (
                    <p className="text-gray-900 capitalize">
                      {profile.job_type.replace("_", " ")}
                    </p>
                  ) : (
                    <p className="text-gray-500 italic">Not specified</p>
                  )}
                </div>

                {/* Availability */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Availability
                  </h3>
                  {profile?.availability_status ? (
                    <p className="text-gray-900 capitalize">
                      {profile.availability_status === "immediately"
                        ? "Immediately"
                        : profile.availability_status === "within_a_month"
                        ? "Within a month"
                        : profile.availability_status === "3_months"
                        ? "Within 3 months"
                        : profile.availability_status === "not_available"
                        ? "Not available"
                        : profile.availability_status.replace("_", " ")}
                    </p>
                  ) : (
                    <p className="text-gray-500 italic">Not specified</p>
                  )}
                </div>

                {/* Expected Salary */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    Expected Salary
                  </h3>
                  {profile?.expected_salary &&
                  (profile.expected_salary.min ||
                    profile.expected_salary.max) ? (
                    <p className="text-gray-900">
                      {profile.expected_salary.min &&
                      profile.expected_salary.max
                        ? `${
                            profile.expected_salary.currency
                          } ${profile.expected_salary.min.toLocaleString()} - ${profile.expected_salary.max.toLocaleString()}`
                        : profile.expected_salary.min
                        ? `${
                            profile.expected_salary.currency
                          } ${profile.expected_salary.min.toLocaleString()}+`
                        : `Up to ${
                            profile.expected_salary.currency
                          } ${profile.expected_salary.max.toLocaleString()}`}
                    </p>
                  ) : (
                    <p className="text-gray-500 italic">Not specified</p>
                  )}
                </div>
              </div>

              <button
                onClick={() => setPreferencesModal(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
              >
                {profile?.job_type ||
                profile?.availability_status ||
                (profile?.expected_salary &&
                  (profile.expected_salary.min || profile.expected_salary.max))
                  ? "Update Job Preferences"
                  : "Add Job Preferences"}
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Modals */}
      {/* Basic Info Modal */}
      <Modal
        isOpen={basicInfoModal}
        onClose={() => setBasicInfoModal(false)}
        title="Edit Basic Information"
        size="md"
      >
        <BasicInfoForm
          userData={profile?.user_id}
          onSubmit={updateBasicInfo}
          onCancel={() => setBasicInfoModal(false)}
          loading={submitting}
        />
      </Modal>

      {/* Profile Details Modal */}
      <Modal
        isOpen={profileDetailsModal}
        onClose={() => setProfileDetailsModal(false)}
        title="Edit Profile Details"
        size="lg"
      >
        <ProfileDetailsForm
          profileData={{
            gender: profile?.gender || "",
            dob: profile?.dob || "",
            photo: profile?.photo || "",
            resume: profile?.resume || "",
          }}
          onSubmit={updateProfileDetails}
          onCancel={() => setProfileDetailsModal(false)}
          loading={submitting}
        />
      </Modal>

      {/* Education Modal */}
      <Modal
        isOpen={educationModal}
        onClose={() => {
          setEducationModal(false);
          setSelectedEducation(null);
        }}
        title={selectedEducation ? "Edit Education" : "Add Education"}
        size="lg"
      >
        <EducationForm
          education={selectedEducation}
          onSubmit={updateEducation}
          onCancel={() => {
            setEducationModal(false);
            setSelectedEducation(null);
          }}
          loading={submitting}
        />
      </Modal>

      {/* Experience Modal */}
      <Modal
        isOpen={experienceModal}
        onClose={() => {
          setExperienceModal(false);
          setSelectedExperience(null);
        }}
        title={selectedExperience ? "Edit Experience" : "Add Experience"}
        size="lg"
      >
        <ExperienceForm
          experience={selectedExperience}
          onSubmit={updateExperience}
          onCancel={() => {
            setExperienceModal(false);
            setSelectedExperience(null);
          }}
          loading={submitting}
        />
      </Modal>

      {/* Skills Modal */}
      <Modal
        isOpen={skillsModal}
        onClose={() => setSkillsModal(false)}
        title="Edit Skills"
        size="md"
      >
        <SkillsForm
          initialSkills={profile?.skills || []}
          onSubmit={updateSkills}
          onCancel={() => setSkillsModal(false)}
          loading={submitting}
        />
      </Modal>

      {/* Languages Modal */}
      <Modal
        isOpen={languagesModal}
        onClose={() => setLanguagesModal(false)}
        title="Edit Languages"
        size="md"
      >
        <LanguagesForm
          initialLanguages={profile?.languages || []}
          onSubmit={updateLanguages}
          onCancel={() => setLanguagesModal(false)}
          loading={submitting}
        />
      </Modal>

      {/* Locations Modal */}
      <Modal
        isOpen={locationModal}
        onClose={() => setLocationModal(false)}
        title="Edit Locations"
        size="lg"
      >
        <LocationForm
          currentLocation={profile?.location}
          preferredLocations={profile?.preferred_locations || []}
          onSubmit={updateLocations}
          onCancel={() => setLocationModal(false)}
          loading={submitting}
        />
      </Modal>

      {/* Job Preferences Modal */}
      <Modal
        isOpen={preferencesModal}
        onClose={() => setPreferencesModal(false)}
        title="Edit Job Preferences"
        size="lg"
      >
        <JobPreferencesForm
          currentPreferences={{
            job_type: profile?.job_type || "",
            availability_status: profile?.availability_status || "",
            expected_salary: profile?.expected_salary || {
              min: "",
              max: "",
              currency: "USD",
            },
          }}
          onSubmit={updateJobPreferences}
          onCancel={() => setPreferencesModal(false)}
          loading={submitting}
        />
      </Modal>
    </div>
  );
}
