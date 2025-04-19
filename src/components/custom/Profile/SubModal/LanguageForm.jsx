import React, { useState } from "react";

export default function LanguagesForm({ initialLanguages = [], onSubmit, onCancel, loading }) {
  const [languages, setLanguages] = useState(initialLanguages);
  const [newLanguage, setNewLanguage] = useState("");
  const [errors, setErrors] = useState({});

  const handleAddLanguage = () => {
    if (!newLanguage.trim()) {
      setErrors({ language: "Language cannot be empty" });
      return;
    }

    if (languages.includes(newLanguage.trim())) {
      setErrors({ language: "This language already exists" });
      return;
    }

    setLanguages([...languages, newLanguage.trim()]);
    setNewLanguage("");
    setErrors({});
  };

  const handleRemoveLanguage = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    setLanguages(updatedLanguages);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddLanguage();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(languages);
  };

  // Some common languages as suggestions
  const commonLanguages = [
    "English", "Spanish", "French", "German", "Chinese", "Japanese",
    "Hindi", "Arabic", "Russian", "Portuguese", "Italian"
  ];

  // Filter out languages already added
  const suggestions = commonLanguages.filter(
    lang => !languages.includes(lang) &&
    lang.toLowerCase().includes(newLanguage.toLowerCase()) &&
    lang.toLowerCase() !== newLanguage.toLowerCase()
  ).slice(0, 5);

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
            Add Languages
          </label>
          <div className="flex">
            <input
              type="text"
              id="language"
              value={newLanguage}
              onChange={(e) => {
                setNewLanguage(e.target.value);
                if (errors.language) setErrors({});
              }}
              onKeyDown={handleKeyDown}
              className={`flex-1 px-3 py-2 border ${errors.language ? 'border-red-500' : 'border-gray-300'} rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="e.g. English, Spanish, Chinese"
              disabled={loading}
            />
            <button
              type="button"
              onClick={handleAddLanguage}
              className="px-4 py-2 bg-teal-600 text-white rounded-r-md text-sm font-medium hover:bg-teal-700 focus:outline-none transition"
              disabled={loading}
            >
              Add
            </button>
          </div>
          {errors.language && (
            <p className="mt-1 text-xs text-red-500">{errors.language}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">Press Enter to add a language</p>

          {/* Language suggestions */}
          {newLanguage && suggestions.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setNewLanguage("");
                    setLanguages(prev => [...prev, suggestion]);
                  }}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-teal-50 text-teal-800 hover:bg-teal-100 transition-colors"
                  disabled={loading}
                >
                  + {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Languages
          </label>
          {languages.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {languages.map((language, index) => (
                <div
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-800"
                >
                  {language}
                  <button
                    type="button"
                    onClick={() => handleRemoveLanguage(index)}
                    className="ml-1 text-teal-600 hover:text-teal-900 focus:outline-none"
                    disabled={loading}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-sm">No languages added yet</div>
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
          className="px-4 py-2 bg-teal-600 text-white rounded-md text-sm font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 flex items-center"
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
            "Save Languages"
          )}
        </button>
      </div>
    </form>
  );
}
