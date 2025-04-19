import React, { useState, useEffect } from "react";
import useAxios from "@/hooks/useAxios";
import Modal from "@/components/custom/Profile/Modal";
import { motion  } from "framer-motion";
import BasicInfoForm from "@/components/custom/Profile/SubModal/BasicInfoFor";
import ProfileDetailsForm from "@/components/custom/Profile/SubModal/ProfileDetails";
import EducationForm from "@/components/custom/Profile/SubModal/EducationForm";
import ExperienceForm from "@/components/custom/Profile/SubModal/Experience";
import SkillsForm from "@/components/custom/Profile/SubModal/SkillsForm";
import LanguagesForm from "@/components/custom/Profile/SubModal/LanguageForm";
import LocationForm from "@/components/custom/Profile/SubModal/Location";
import JobPreferencesForm from "@/components/custom/Profile/SubModal/JobPreference";
import ProfileInfo from "@/components/custom/Profile/sections/ProfileInfo";
import WorkExperience from "@/components/custom/Profile/sections/WorkExperience";
import Education from "@/components/custom/Profile/sections/Education";
import Skills from "@/components/custom/Profile/sections/Skills";
import Location from "@/components/custom/Profile/sections/Location";
import PreferedLocation from "@/components/custom/Profile/sections/PreferedLocation";

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

  const updateBasicInfo = async (data) => {
    try {
      setSubmitting(true);
      await axios.patch("/user/update", data);
      setProfile((prev) => ({
        ...prev,
        user_id: {
          ...prev.user_id,
          ...data,
        },
      }));

      setBasicInfoModal(false);
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

      const response = await axios.patch(
        `/job-seeker/update/${profile._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

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

      if (response && response.data) {
        setProfile(response.data.updatedJobSeeker);
        setProgressTracker(
          response.data.profileStatus.overallCompletionPercentage
        );
      }

      setExperienceModal(false);
      setSelectedExperience(null);
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

  // Dynamic progress status
  const getProgressStatus = () => {
    if (progressTracker >= 100) return "complete";
    if (progressTracker >= 75) return "high";
    if (progressTracker >= 50) return "medium";
    if (progressTracker >= 25) return "low";
    return "veryLow";
  };

  const progressStatus = getProgressStatus();

  // Progress status color mapping
  const progressColors = {
    complete: {
      bg: "from-emerald-500 to-green-400", // More balanced green gradient
      text: "text-emerald-50",
      progressBg: "bg-emerald-800/20",
      progressFill: "bg-white",
      message: "Profile Complete! Your profile looks great and is ready for recruiters.",
    },
    high: {
      bg: "from-blue-500 to-sky-400", 
      text: "text-blue-50",
      progressBg: "bg-blue-800/20",
      progressFill: "bg-white",
      message: "Almost there! Just a few more details to complete.",
    },
    medium: {
      bg: "from-indigo-500 to-violet-400",
      text: "text-indigo-50",
      progressBg: "bg-indigo-800/20",
      progressFill: "bg-white",
      message: "Good progress! Continue adding relevant details to stand out.",
    },
    low: {
      bg: "from-amber-500 to-yellow-400",
      text: "text-amber-50",
      progressBg: "bg-amber-800/20",
      progressFill: "bg-white",
      message: "Let's improve your profile! Add more details to increase visibility.",
    },
    veryLow: {
      bg: "from-red-500 to-rose-400",
      text: "text-red-50",
      progressBg: "bg-red-800/20",
      progressFill: "bg-white",
      message: "Get started by completing your profile to attract potential employers.",
    },
  };

  const currentProgressColors = progressColors[progressStatus];

  const backendBaseUrl = "http://localhost:4000";
  const resumeUrl = profile?.resume ? `${backendBaseUrl}${profile.resume}` : "";
  const photoUrl = profile?.photo
    ? profile.photo.startsWith("/uploads/")
      ? `${backendBaseUrl}${profile.photo}`
      : profile.photo
    : "";

  // Loading state
  if (loading && !profile) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !profile) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center shadow-sm">
            <div className="mb-4 flex justify-center">
              <svg
                className="w-12 h-12 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h2 className="text-red-600 text-xl font-semibold mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-700 mb-4">{error}</p>
            <button
              onClick={fetchProfile}
              className="px-5 py-2.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Dynamic header based on progress status */}
      <div
        className={`bg-gradient-to-r ${currentProgressColors.bg} shadow-lg transition-colors duration-500 rounded-3xl`}
      >
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Profile completion status */}
            <div className="flex items-center mb-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full inline-block">
              <div
                className={`w-2 h-2 rounded-full ${
                  progressStatus === "complete" ? "bg-emerald-400" : "bg-white"
                } mr-2`}
              ></div>
              <span
                className={`text-sm font-medium ${currentProgressColors.text}`}
              >
                {progressStatus === "complete"
                  ? "Profile Complete"
                  : "Profile in Progress"}
              </span>
            </div>

            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-3 ${currentProgressColors.text} tracking-tight`}
            >
              {progressStatus === "complete"
                ? "Your Professional Profile"
                : "Build Your Professional Presence"}
            </h1>

            <p
              className={`${currentProgressColors.text} text-sm sm:text-base mb-8 max-w-2xl opacity-90 leading-relaxed`}
            >
              {currentProgressColors.message}
            </p>

            {/* Progress bar with dynamic color */}
            <div className="relative">
              <div
                className={`${currentProgressColors.progressBg} h-3 rounded-full overflow-hidden`}
              >
                <motion.div
                  className={`h-full ${currentProgressColors.progressFill} rounded-full shadow-sm`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progressTracker}%` }}
                  transition={{ duration: 0.8, type: "spring", damping: 20 }}
                ></motion.div>
              </div>

              <div className="mt-3 flex justify-between items-center">
                <span
                  className={`text-sm font-medium ${currentProgressColors.text}`}
                >
                  Profile Strength
                </span>
                <motion.span
                  className={`text-lg font-bold ${currentProgressColors.text} flex items-center`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {progressTracker}%
                  {progressStatus === "complete" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile sections group */}
      <div className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6 sm:gap-8">
          {/* Profile information card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <ProfileInfo
              profile={profile}
              resumeUrl={resumeUrl}
              setBasicInfoModal={setBasicInfoModal}
              setProfileDetailsModal={setProfileDetailsModal}
              photoUrl={photoUrl}
            />
          </motion.div>

          {/* Work experience card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <WorkExperience
              profile={profile}
              setExperienceModal={setExperienceModal}
              setSelectedExperience={setSelectedExperience}
              formatDate={formatDate}
            />
          </motion.div>

          {/* Education card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Education
              formatDate={formatDate}
              profile={profile}
              setEducationModal={setEducationModal}
              setSelectedEducation={setSelectedEducation}
            />
          </motion.div>

          {/* Skills & Languages card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Skills
              profile={profile}
              setLanguagesModal={setLanguagesModal}
              setSkillsModal={setSkillsModal}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Location profile={profile} setLocationModal={setLocationModal} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <PreferedLocation
                profile={profile}
                setPreferencesModal={setPreferencesModal}
              />
            </motion.div>
          </div>

          {progressTracker < 100 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow p-6 border border-blue-100 mt-2"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-blue-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                Improve Your Profile
              </h3>
              <div className="text-gray-700 space-y-2">
                {(!profile?.education || profile.education.length === 0) && (
                  <div className="flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-500 mr-2 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    </span>
                    <span>
                      Add your <strong>education history</strong> to help
                      employers understand your qualifications.
                    </span>
                  </div>
                )}
                {(!profile?.work_experience ||
                  profile.work_experience.length === 0) && (
                  <div className="flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-500 mr-2 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
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
                    </span>
                    <span>
                      Include your <strong>work experience</strong> to showcase
                      your professional history.
                    </span>
                  </div>
                )}
                {(!profile?.skills || profile.skills.length === 0) && (
                  <div className="flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-500 mr-2 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </span>
                    <span>
                      Add <strong>skills</strong> to help employers find you for
                      relevant opportunities.
                    </span>
                  </div>
                )}
                {!profile?.resume && (
                  <div className="flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-500 mr-2 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                    <span>
                      Upload your <strong>resume</strong> so employers can
                      review your full qualifications.
                    </span>
                  </div>
                )}
                {!profile?.photo && (
                  <div className="flex items-center">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-500 mr-2 flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
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
                    </span>
                    <span>
                      Add a <strong>profile photo</strong> to personalize your
                      profile.
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

    
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

      <Modal
        isOpen={profileDetailsModal}
        onClose={() => setProfileDetailsModal(false)}
        title="Edit Profile Details"
        size="lg"
      >
        <ProfileDetailsForm
          profileData={profile || {}}
          onSubmit={updateProfileDetails}
          onCancel={() => setProfileDetailsModal(false)}
          loading={submitting}
        />
      </Modal>

      {/* All your other modals here */}
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
