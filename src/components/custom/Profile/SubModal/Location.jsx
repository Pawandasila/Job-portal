import React, { useState } from "react";

export default function LocationForm({
  currentLocation = { city: "", state: "", country: "" },
  preferredLocations = [],
  onSubmit,
  onCancel,
  loading
}) {
  const [location, setLocation] = useState({
    city: currentLocation?.city || "",
    state: currentLocation?.state || "",
    country: currentLocation?.country || ""
  });

  const [preferred, setPreferred] = useState(
    preferredLocations.map(loc => ({
      _id: loc._id || null,
      city: loc.city || "",
      state: loc.state || "",
      country: loc.country || ""
    }))
  );

  const [errors, setErrors] = useState({
    location: {},
    preferred: []
  });

  const [newLocation, setNewLocation] = useState({
    city: "",
    state: "",
    country: ""
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocation(prev => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors.location[name]) {
      setErrors(prev => ({
        ...prev,
        location: { ...prev.location, [name]: "" }
      }));
    }
  };

  const handleNewLocationChange = (e) => {
    const { name, value } = e.target;
    setNewLocation(prev => ({ ...prev, [name]: value }));
  };

  const handlePreferredChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPreferred = [...preferred];
    updatedPreferred[index][name] = value;
    setPreferred(updatedPreferred);

    // Clear error when field is edited
    if (errors.preferred[index]?.[name]) {
      const updatedErrors = { ...errors };
      updatedErrors.preferred[index][name] = "";
      setErrors(updatedErrors);
    }
  };

  const addPreferredLocation = () => {
    const isValid = validateNewLocation();
    if (!isValid) return;

    setPreferred([...preferred, { ...newLocation }]);
    setNewLocation({ city: "", state: "", country: "" });
    setShowAddForm(false);
  };

  const removePreferredLocation = (index) => {
    const updatedPreferred = [...preferred];
    updatedPreferred.splice(index, 1);
    setPreferred(updatedPreferred);
  };

  const validateNewLocation = () => {
    const newErrors = {};
    let isValid = true;

    if (!newLocation.city.trim()) {
      newErrors.city = "City is required";
      isValid = false;
    }

    if (!newLocation.country.trim()) {
      newErrors.country = "Country is required";
      isValid = false;
    }

    if (!isValid) {
      setErrors(prev => ({
        ...prev,
        newLocation: newErrors
      }));
    }

    return isValid;
  };

  const validate = () => {
    const newErrors = {
      location: {},
      preferred: Array(preferred.length).fill({})
    };
    let isValid = true;

    // Validate current location
    if (location.city.trim() && !location.country.trim()) {
      newErrors.location.country = "Country is required if city is specified";
      isValid = false;
    }

    // Validate preferred locations
    preferred.forEach((loc, index) => {
      const locErrors = {};

      if (!loc.city.trim()) {
        locErrors.city = "City is required";
        isValid = false;
      }

      if (!loc.country.trim()) {
        locErrors.country = "Country is required";
        isValid = false;
      }

      newErrors.preferred[index] = locErrors;
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        location,
        preferred_locations: preferred
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Current Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={location.city}
                onChange={handleLocationChange}
                className={`w-full px-3 py-2 border ${errors.location.city ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="e.g. New York"
                disabled={loading}
              />
              {errors.location.city && (
                <p className="mt-1 text-xs text-red-500">{errors.location.city}</p>
              )}
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State/Province
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={location.state}
                onChange={handleLocationChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. NY"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={location.country}
                onChange={handleLocationChange}
                className={`w-full px-3 py-2 border ${errors.location.country ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="e.g. USA"
                disabled={loading}
              />
              {errors.location.country && (
                <p className="mt-1 text-xs text-red-500">{errors.location.country}</p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-medium text-gray-900">Preferred Locations</h3>
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none transition"
              disabled={loading || showAddForm}
            >
              Add Location
            </button>
          </div>

          {/* Add new preferred location form */}
          {showAddForm && (
            <div className="bg-blue-50 p-4 rounded-md mb-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Add Preferred Location</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <label htmlFor="new-city" className="block text-sm font-medium text-gray-700 mb-1">
                    City*
                  </label>
                  <input
                    type="text"
                    id="new-city"
                    name="city"
                    value={newLocation.city}
                    onChange={handleNewLocationChange}
                    className={`w-full px-3 py-2 border ${errors.newLocation?.city ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="e.g. San Francisco"
                    disabled={loading}
                  />
                  {errors.newLocation?.city && (
                    <p className="mt-1 text-xs text-red-500">{errors.newLocation.city}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="new-state" className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province
                  </label>
                  <input
                    type="text"
                    id="new-state"
                    name="state"
                    value={newLocation.state}
                    onChange={handleNewLocationChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. CA"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="new-country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country*
                  </label>
                  <input
                    type="text"
                    id="new-country"
                    name="country"
                    value={newLocation.country}
                    onChange={handleNewLocationChange}
                    className={`w-full px-3 py-2 border ${errors.newLocation?.country ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="e.g. USA"
                    disabled={loading}
                  />
                  {errors.newLocation?.country && (
                    <p className="mt-1 text-xs text-red-500">{errors.newLocation.country}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewLocation({ city: "", state: "", country: "" });
                    setErrors(prev => ({ ...prev, newLocation: {} }));
                  }}
                  className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={addPreferredLocation}
                  className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none"
                  disabled={loading}
                >
                  Add
                </button>
              </div>
            </div>
          )}

          {/* Preferred locations list */}
          {preferred.length > 0 ? (
            <div className="space-y-3">
              {preferred.map((loc, index) => (
                <div key={index} className="border border-gray-200 rounded-md p-3 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        City*
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={loc.city}
                        onChange={(e) => handlePreferredChange(index, e)}
                        className={`w-full px-3 py-2 border ${errors.preferred[index]?.city ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        disabled={loading}
                      />
                      {errors.preferred[index]?.city && (
                        <p className="mt-1 text-xs text-red-500">{errors.preferred[index].city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        State/Province
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={loc.state}
                        onChange={(e) => handlePreferredChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Country*
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          name="country"
                          value={loc.country}
                          onChange={(e) => handlePreferredChange(index, e)}
                          className={`flex-1 px-3 py-2 border ${errors.preferred[index]?.country ? 'border-red-500' : 'border-gray-300'} rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          disabled={loading}
                        />
                        <button
                          type="button"
                          onClick={() => removePreferredLocation(index)}
                          className="px-3 py-2 bg-red-50 border border-red-300 text-red-600 rounded-r-md hover:bg-red-100 focus:outline-none"
                          disabled={loading}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      {errors.preferred[index]?.country && (
                        <p className="mt-1 text-xs text-red-500">{errors.preferred[index].country}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-lg">
              <p className="text-gray-500">No preferred locations added</p>
              {!showAddForm && (
                <button
                  type="button"
                  onClick={() => setShowAddForm(true)}
                  className="mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200 focus:outline-none transition"
                  disabled={loading}
                >
                  Add Your First Preferred Location
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving...
            </>
          ) : (
            "Save Locations"
          )}
        </button>
      </div>
    </form>
  );
}
