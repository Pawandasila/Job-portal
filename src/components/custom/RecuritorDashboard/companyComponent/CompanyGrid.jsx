import React from "react";
import CompanyCard from "./CompanyCard";

const CompanyGrid = ({ companies, onEdit, onDelete }) => {
  if (companies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-500">No companies found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {companies.map((company) => (
        <CompanyCard
          key={company._id}
          company={company}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(CompanyGrid);
