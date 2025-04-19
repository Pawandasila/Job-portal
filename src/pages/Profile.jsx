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
import Header from "@/components/custom/Profile/sections/Header";
import ProfileSection from "@/components/custom/Profile/sections/ProfileSection";

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

  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);

  
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

  useEffect(() => {
    fetchProfile();
  }, [axios]);

  const formatDate = (dateString) => {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const getProgressStatus = () => {
    if (progressTracker >= 100) return "complete";
    if (progressTracker >= 75) return "high";
    if (progressTracker >= 50) return "medium";
    if (progressTracker >= 25) return "low";
    return "veryLow";
  };

  const progressStatus = getProgressStatus();

  const progressColors = {
    complete: {
      bg: "from-emerald-500 to-green-400",
      text: "text-emerald-50",
      progressBg: "bg-emerald-800/20",
      progressFill: "bg-white",
      message:
        "Profile Complete! Your profile looks great and is ready for recruiters.",
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
      message:
        "Let's improve your profile! Add more details to increase visibility.",
    },
    veryLow: {
      bg: "from-red-500 to-rose-400",
      text: "text-red-50",
      progressBg: "bg-red-800/20",
      progressFill: "bg-white",
      message:
        "Get started by completing your profile to attract potential employers.",
    },
  };

  const currentProgressColors = progressColors[progressStatus];

  const backendBaseUrl = import.meta.env.VITE_BASE_URL;
  const resumeUrl = profile?.resume ? `${backendBaseUrl}${profile.resume}` : "";
  const photoUrl = profile?.photo
    ? profile.photo.startsWith("/uploads/")
      ? `${backendBaseUrl}${profile.photo}`
      : profile.photo
    : "";

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
      
      <Header
        currentProgressColors={currentProgressColors}
        progressStatus={progressStatus}
        progressTracker={progressTracker}
      />

      {/* Profile sections group */}
      <ProfileSection
        formatDate={formatDate}
        photoUrl={photoUrl}
        profile={profile}
        progressTracker={progressTracker}
        resumeUrl={resumeUrl}
        setBasicInfoModal={setBasicInfoModal}
        setEducationModal={setEducationModal}
        setExperienceModal={setExperienceModal}
        setLanguagesModal={setLanguagesModal}
        setLocationModal={setLocationModal}
        setPreferencesModal={setPreferencesModal}
        setProfileDetailsModal={setProfileDetailsModal}
        setSelectedEducation={setSelectedEducation}
        setSelectedExperience={setSelectedExperience}
        setSkillsModal={setSkillsModal}
      />

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
