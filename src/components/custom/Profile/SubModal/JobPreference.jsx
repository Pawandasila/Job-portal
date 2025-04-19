import React, { useState } from "react";

export default function JobPreferencesForm({
  currentPreferences = {
    job_type: "",
    availability_status: "",
    expected_salary: { min: 0, max: 0, currency: "USD" }
  },
  onSubmit,
  onCancel,
  loading
}) {
  const [formData, setFormData] = useState({
    job_type: currentPreferences?.job_type || "",
    availability_status: currentPreferences?.availability_status || "",
    expected_salary: {
      min: currentPreferences?.expected_salary?.min || "",
      max: currentPreferences?.expected_salary?.max || "",
      currency: currentPreferences?.expected_salary?.currency || "USD"
    }
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSalaryChange = (e) => {
    const { name, value } = e.target;
    const numValue = value === "" ? "" : Number(value);

    setFormData(prev => ({
      ...prev,
      expected_salary: {
        ...prev.expected_salary,
        [name]: numValue
      }
    }));

    // Clear error when field is edited
    if (errors[`expected_salary.${name}`]) {
      setErrors(prev => ({ ...prev, [`expected_salary.${name}`]: "" }));
    }
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    // At least one job preference should be selected
    if (!formData.job_type && !formData.availability_status && !formData.expected_salary.min && !formData.expected_salary.max) {
      tempErrors.general = "Please select at least one job preference";
      isValid = false;
    }

    // Validate salary
    if (
      (formData.expected_salary.min && formData.expected_salary.max) &&
      (Number(formData.expected_salary.min) > Number(formData.expected_salary.max))
    ) {
      tempErrors["expected_salary.max"] = "Maximum salary cannot be less than minimum salary";
      isValid = false;
    }

    // If min/max is provided, ensure it's a valid number
    if (formData.expected_salary.min && (isNaN(formData.expected_salary.min) || formData.expected_salary.min < 0)) {
      tempErrors["expected_salary.min"] = "Please enter a valid minimum salary";
      isValid = false;
    }

    if (formData.expected_salary.max && (isNaN(formData.expected_salary.max) || formData.expected_salary.max < 0)) {
      tempErrors["expected_salary.max"] = "Please enter a valid maximum salary";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Convert salary values to numbers if they exist
      const dataToSubmit = {
        ...formData,
        expected_salary: {
          ...formData.expected_salary,
          min: formData.expected_salary.min === "" ? undefined : Number(formData.expected_salary.min),
          max: formData.expected_salary.max === "" ? undefined : Number(formData.expected_salary.max)
        }
      };

      onSubmit(dataToSubmit);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-md p-3 text-sm">
            {errors.general}
          </div>
        )}

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Job Preferences</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="job_type" className="block text-sm font-medium text-gray-700 mb-1">
                Job Type
              </label>
              <select
                id="job_type"
                name="job_type"
                value={formData.job_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                <option value="">Select Job Type</option>
                <option value="full_time">Full Time</option>
                <option value="part_time">Part Time</option>
                <option value="internship">Internship</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>

            <div>
              <label htmlFor="availability_status" className="block text-sm font-medium text-gray-700 mb-1">
                Availability Status
              </label>
              <select
                id="availability_status"
                name="availability_status"
                value={formData.availability_status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                <option value="">Select Availability</option>
                <option value="immediately">Immediately</option>
                <option value="within_a_month">Within a Month</option>
                <option value="3_months">Within 3 Months</option>
                <option value="not_available">Not Available</option>
              </select>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Expected Salary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="min" className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Salary
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">
                    {formData.expected_salary.currency}
                  </span>
                </div>
                <input
                  type="number"
                  id="min"
                  name="min"
                  value={formData.expected_salary.min}
                  onChange={handleSalaryChange}
                  className={`w-full pl-14 pr-3 py-2 border ${errors["expected_salary.min"] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Min"
                  min="0"
                  disabled={loading}
                />
              </div>
              {errors["expected_salary.min"] && (
                <p className="mt-1 text-xs text-red-500">{errors["expected_salary.min"]}</p>
              )}
            </div>

            <div>
              <label htmlFor="max" className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Salary
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">
                    {formData.expected_salary.currency}
                  </span>
                </div>
                <input
                  type="number"
                  id="max"
                  name="max"
                  value={formData.expected_salary.max}
                  onChange={handleSalaryChange}
                  className={`w-full pl-14 pr-3 py-2 border ${errors["expected_salary.max"] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Max"
                  min="0"
                  disabled={loading}
                />
              </div>
              {errors["expected_salary.max"] && (
                <p className="mt-1 text-xs text-red-500">{errors["expected_salary.max"]}</p>
              )}
            </div>

            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                value={formData.expected_salary.currency}
                onChange={(e) => {
                  const { value } = e.target;
                  setFormData(prev => ({
                    ...prev,
                    expected_salary: {
                      ...prev.expected_salary,
                      currency: value
                    }
                  }));
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
                <option value="CAD">CAD (C$)</option>
                <option value="AUD">AUD (A$)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>
          </div>
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
            "Save Job Preferences"
          )}
        </button>
      </div>
    </form>
  );
}
