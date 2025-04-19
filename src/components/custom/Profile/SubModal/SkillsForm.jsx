import React, { useState } from "react";

export default function SkillsForm({ initialSkills = [], onSubmit, onCancel, loading }) {
  const [skills, setSkills] = useState(initialSkills);
  const [newSkill, setNewSkill] = useState("");
  const [errors, setErrors] = useState({});

  const handleAddSkill = () => {
    if (!newSkill.trim()) {
      setErrors({ skill: "Skill cannot be empty" });
      return;
    }

    if (skills.includes(newSkill.trim())) {
      setErrors({ skill: "This skill already exists" });
      return;
    }

    setSkills([...skills, newSkill.trim()]);
    setNewSkill("");
    setErrors({});
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(skills);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label htmlFor="skill" className="block text-sm font-medium text-gray-700 mb-1">
            Add Skills
          </label>
          <div className="flex">
            <input
              type="text"
              id="skill"
              value={newSkill}
              onChange={(e) => {
                setNewSkill(e.target.value);
                if (errors.skill) setErrors({});
              }}
              onKeyDown={handleKeyDown}
              className={`flex-1 px-3 py-2 border ${errors.skill ? 'border-red-500' : 'border-gray-300'} rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="e.g. JavaScript, React, Project Management"
              disabled={loading}
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 bg-blue-600 text-white rounded-r-md text-sm font-medium hover:bg-blue-700 focus:outline-none transition"
              disabled={loading}
            >
              Add
            </button>
          </div>
          {errors.skill && (
            <p className="mt-1 text-xs text-red-500">{errors.skill}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">Press Enter to add a skill</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Skills
          </label>
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(index)}
                    className="ml-1 text-indigo-600 hover:text-indigo-900 focus:outline-none"
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
            <div className="text-gray-500 text-sm">No skills added yet</div>
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
            "Save Skills"
          )}
        </button>
      </div>
    </form>
  );
}
