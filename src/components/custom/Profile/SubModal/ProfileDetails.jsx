import React, { useState, useRef, useEffect } from "react";

export default function ProfileDetailsForm({
  profileData,
  onSubmit,
  onCancel,
  loading,
}) {
  const [formData, setFormData] = useState({
    gender: profileData?.gender || "",
    dob: profileData?.dob
      ? new Date(profileData.dob).toISOString().split("T")[0]
      : "",
    photo: null,
    resume: null,
    removePhoto: false,
    removeResume: false,
  });

  const backendBaseUrl = import.meta.env.VITE_BASE_URL;

  // Prefill previews for photo and resume
  const [photoPreview, setPhotoPreview] = useState(
    profileData?.photo
      ? profileData.photo.startsWith("/uploads/")
        ? backendBaseUrl + profileData.photo
        : profileData.photo
      : ""
  );
  const [resumeName, setResumeName] = useState(
    profileData?.resume ? profileData.resume.split("/").pop() : ""
  );

  // Sync whenever profileData changes:
  useEffect(() => {
    setFormData({
      gender: profileData?.gender || "",
      dob: profileData?.dob
        ? new Date(profileData.dob).toISOString().split("T")[0]
        : "",
      photo: null,
      resume: null,
      removePhoto: false,
      removeResume: false,
    });
    setPhotoPreview(
      profileData?.photo
        ? profileData.photo.startsWith("/uploads/")
          ? backendBaseUrl + profileData.photo
          : profileData.photo
        : ""
    );
    setResumeName(
      profileData?.resume ? profileData.resume.split("/").pop() : ""
    );
    // optionally reset file inputs too if needed
    if (photoInputRef.current) photoInputRef.current.value = "";
    if (resumeInputRef.current) resumeInputRef.current.value = "";
  }, [profileData]);

  const photoInputRef = useRef(null);
  const resumeInputRef = useRef(null);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0];

      if (file) {
        // Validate file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
          setErrors((prev) => ({
            ...prev,
            [name]: "File size must not exceed 10MB",
          }));
          return;
        }

        if (name === "photo") {
          // Preview the image
          const reader = new FileReader();
          reader.onloadend = () => {
            setPhotoPreview(reader.result);
          };
          reader.readAsDataURL(file);

          // Update form data
          setFormData((prev) => ({
            ...prev,
            photo: file,
            removePhoto: false,
          }));
        } else if (name === "resume") {
          setResumeName(file.name);
          setFormData((prev) => ({
            ...prev,
            resume: file,
            removeResume: false,
          }));
        }
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRemovePhoto = () => {
    setPhotoPreview("");
    setFormData((prev) => ({
      ...prev,
      photo: null,
      removePhoto: true,
    }));
    if (photoInputRef.current) {
      photoInputRef.current.value = "";
    }
  };

  const handleRemoveResume = () => {
    setResumeName("");
    setFormData((prev) => ({
      ...prev,
      resume: null,
      removeResume: true,
    }));
    if (resumeInputRef.current) {
      resumeInputRef.current.value = "";
    }
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (formData.dob && isNaN(new Date(formData.dob).getTime())) {
      tempErrors.dob = "Please enter a valid date";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Create FormData for file upload
      const formDataToSubmit = new FormData();

      if (formData.gender) {
        formDataToSubmit.append("gender", formData.gender);
      }

      if (formData.dob) {
        formDataToSubmit.append("dob", formData.dob);
      }

      // Handle file uploads
      if (formData.photo) {
        formDataToSubmit.append("photo", formData.photo);
      }

      if (formData.resume) {
        formDataToSubmit.append("resume", formData.resume);
      }

      // Handle file removals
      if (formData.removePhoto) {
        formDataToSubmit.append("removePhoto", "true");
      }

      if (formData.removeResume) {
        formDataToSubmit.append("removeResume", "true");
      }

      onSubmit({
        gender: formData.gender,
        dob: formData.dob,
        resume: formData.resume,
        photo: formData.photo,
        removeResume: formData.removeResume,
        removePhoto: formData.removePhoto,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {/* Profile Photo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Photo
          </label>
          <div className="flex items-center space-x-4">
            <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
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
            <div className="flex-1">
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/jpg,image/jpeg,image/png,image/gif"
                onChange={handleChange}
                className="hidden"
                ref={photoInputRef}
                disabled={loading}
              />
              <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
                <label
                  htmlFor="photo"
                  className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 cursor-pointer hover:bg-gray-50 inline-block text-center"
                >
                  Choose File
                </label>
                {photoPreview && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="px-3 py-1.5 bg-white border border-red-300 rounded-md text-sm text-red-600 hover:bg-red-50 inline-block text-center"
                    disabled={loading}
                  >
                    Remove Photo
                  </button>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                JPG, JPEG, PNG or GIF (max. 10MB)
              </p>
              {errors.photo && (
                <p className="mt-1 text-xs text-red-500">{errors.photo}</p>
              )}
            </div>
          </div>
        </div>

        {/* Resume Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resume
          </label>
          <div className="flex items-center space-x-4">
            <div className="h-14 w-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-400"
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
            </div>
            <div className="flex-1">
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,.docx,.txt"
                onChange={handleChange}
                className="hidden"
                ref={resumeInputRef}
                disabled={loading}
              />
              <div className="flex flex-col sm:flex-row sm:items-center mb-1">
                <label
                  htmlFor="resume"
                  className="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm text-gray-700 cursor-pointer hover:bg-gray-50 inline-block text-center mr-2"
                >
                  Choose File
                </label>
                <span className="text-gray-600 text-sm truncate mt-1 sm:mt-0">
                  {resumeName || "No file chosen"}
                </span>
              </div>
              <div className="flex space-x-2 mt-1">
                {resumeName && (
                  <button
                    type="button"
                    onClick={handleRemoveResume}
                    className="px-3 py-1 text-xs bg-white border border-red-300 rounded-md text-red-600 hover:bg-red-50"
                    disabled={loading}
                  >
                    Remove
                  </button>
                )}
                {profileData?.resume && (
                  <a
                    href={
                      profileData.resume.startsWith("/uploads/")
                        ? backendBaseUrl + profileData.resume
                        : profileData.resume
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 text-xs bg-white border border-blue-300 rounded-md text-blue-600 hover:bg-blue-50"
                  >
                    View Current
                  </a>
                )}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                PDF, DOCX or TXT (max. 10MB)
              </p>
              {errors.resume && (
                <p className="mt-1 text-xs text-red-500">{errors.resume}</p>
              )}
            </div>
          </div>
        </div>

        {/* Gender */}
        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div>
          <label
            htmlFor="dob"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Date of Birth
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.dob ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            disabled={loading}
          />
          {errors.dob && (
            <p className="mt-1 text-xs text-red-500">{errors.dob}</p>
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
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </form>
  );
}
