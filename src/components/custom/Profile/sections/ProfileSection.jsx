import React from "react";
import { motion } from "framer-motion";
import ProfileInfo from "./ProfileInfo";
import WorkExperience from "./WorkExperience";
import Education from "./Education";
import Skills from "./Skills";
import Location from "./Location";
import PreferedLocation from "./PreferedLocation";

const ProfileSection = ({
  profile,
  setEducationModal,
  setExperienceModal,
  resumeUrl,
  setBasicInfoModal,
  setProfileDetailsModal,
  photoUrl,
  setSelectedExperience,
  formatDate,
  setSelectedEducation,
  setLanguagesModal,
  setSkillsModal,
  setLocationModal,
  setPreferencesModal,
  progressTracker,

}) => {
  return (
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
                    Upload your <strong>resume</strong> so employers can review
                    your full qualifications.
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
  );
};

export default ProfileSection;
