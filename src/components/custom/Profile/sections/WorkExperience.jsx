import React from "react";

import { motion, AnimatePresence } from "framer-motion";

const timelineVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const WorkExperience = ({
  profile,
  setSelectedExperience,
  setExperienceModal,
  formatDate,
}) => {
  return (
    <section className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all">
      <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0 border-b border-gray-100">
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
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.03 }}
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
        </motion.button>
      </div>

      <div className="p-4 sm:p-6">
        <motion.div
          key="timeline"
          className="relative"
          initial="hidden"
          animate="show"
          variants={timelineVariants}
        >
          {profile?.work_experience && profile.work_experience.length > 0 ? (
            <div className="relative">
              {/* Timeline line - hidden on mobile, visible on larger screens */}
              <div className="hidden md:block absolute left-5 top-6 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-200"></div>

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
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-4 sm:p-5 hover:shadow-md transition-shadow duration-300">
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
                            {exp.current ? "Present" : formatDate(exp.end_date)}
                          </div>
                        </div>

                        <motion.button
                          whileTap={{ scale: 0.98 }}
                          whileHover={{ scale: 1.03 }}
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
                        </motion.button>
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
                Add your professional experience to make your profile stand out
              </p>
              <motion.button
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.03 }}
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
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default WorkExperience;
