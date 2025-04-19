import React from "react";

const PreferedLocation = ({ profile, setPreferencesModal }) => {
  return (
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
            <h3 className="text-sm font-medium text-gray-500 mb-1">Job Type</h3>
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
            (profile.expected_salary.min || profile.expected_salary.max) ? (
              <p className="text-gray-900">
                {profile.expected_salary.min && profile.expected_salary.max
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
  );
};

export default PreferedLocation;
