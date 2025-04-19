import React from 'react'

const ProfileInfo = ({setBasicInfoModal , setProfileDetailsModal , profile , resumeUrl ,photoUrl }) => {
  return (
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
  )
}

export default ProfileInfo