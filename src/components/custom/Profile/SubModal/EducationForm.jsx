import React, { useState } from "react";

export default function EducationForm({ education = null, onSubmit, onCancel, loading }) {
    
  const [formData, setFormData] = useState({
    level: education?.level || "bachelor",
    institution: education?.institution || "",
    field_of_study: education?.field_of_study || "",
    start_date: education?.start_date ? new Date(education.start_date).toISOString().split('T')[0] : "",
    end_date: education?.end_date ? new Date(education.end_date).toISOString().split('T')[0] : "",
    current: education?.current || false,
    grade: education?.grade || ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    // If current education checkbox is checked, clear end date
    if (name === 'current' && checked) {
      setFormData(prev => ({ ...prev, end_date: "" }));
    }
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.institution || formData.institution.trim() === "") {
      tempErrors.institution = "Institution name is required";
      isValid = false;
    }

    if (!formData.field_of_study || formData.field_of_study.trim() === "") {
      tempErrors.field_of_study = "Field of study is required";
      isValid = false;
    }

    if (!formData.start_date) {
      tempErrors.start_date = "Start date is required";
      isValid = false;
    }

    if (!formData.current && !formData.end_date) {
      tempErrors.end_date = "End date is required for completed courses";
      isValid = false;
    }

    if (formData.start_date && formData.end_date && new Date(formData.start_date) > new Date(formData.end_date)) {
      tempErrors.end_date = "End date cannot be earlier than start date";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const dataToSubmit = { ...formData };

      // Convert dates to ISO strings for API
      if (dataToSubmit.start_date) {
        dataToSubmit.start_date = new Date(dataToSubmit.start_date).toISOString();
      }

      if (dataToSubmit.end_date && !dataToSubmit.current) {
        dataToSubmit.end_date = new Date(dataToSubmit.end_date).toISOString();
      } else if (dataToSubmit.current) {
        dataToSubmit.end_date = undefined;
      }

      // Include ID if editing existing education
      if (education?._id) {
        dataToSubmit._id = education._id;
      }

      onSubmit(dataToSubmit);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
              Education Level
            </label>
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="high_school">High School</option>
              <option value="intermediate">Intermediate</option>
              <option value="diploma">Diploma</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="phd">PhD</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-1">
              Institution/School*
            </label>
            <input
              type="text"
              id="institution"
              name="institution"
              value={formData.institution}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.institution ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              disabled={loading}
            />
            {errors.institution && (
              <p className="mt-1 text-xs text-red-500">{errors.institution}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="field_of_study" className="block text-sm font-medium text-gray-700 mb-1">
            Field of Study*
          </label>
          <input
            type="text"
            id="field_of_study"
            name="field_of_study"
            value={formData.field_of_study}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.field_of_study ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            placeholder="e.g. Computer Science, Business Administration"
            disabled={loading}
          />
          {errors.field_of_study && (
            <p className="mt-1 text-xs text-red-500">{errors.field_of_study}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="start_date" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date*
            </label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.start_date ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              disabled={loading}
            />
            {errors.start_date && (
              <p className="mt-1 text-xs text-red-500">{errors.start_date}</p>
            )}
          </div>

          <div>
            <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-1">
              End Date{formData.current ? "" : "*"}
            </label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.end_date ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              disabled={loading || formData.current}
            />
            {errors.end_date && (
              <p className="mt-1 text-xs text-red-500">{errors.end_date}</p>
            )}

            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="current"
                  checked={formData.current}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  disabled={loading}
                />
                <span className="ml-2 text-sm text-gray-700">I am currently studying here</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-1">
            Grade/GPA (Optional)
          </label>
          <input
            type="text"
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. A, 3.8 GPA, First Class"
            disabled={loading}
          />
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
            education ? "Update Education" : "Add Education"
          )}
        </button>
      </div>
    </form>
  );
}
