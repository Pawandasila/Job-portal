import React from "react";

const Location = ({ profile, setLocationModal }) => {
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
  );
};

export default Location;
