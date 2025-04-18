import React from "react";
import { motion } from "framer-motion";
import JobDetailheader from "./Leftsub/JobDetailheader";
import JobDetailDescription from "./Leftsub/JobDetailDescription";
import JobDetailCompanyInfo from "./Leftsub/JobDetailCompanyInfo";

const Left = ({job , formatDate , formatSalary , getDaysUntilDeadline , hasApplied ,  applyLoading , applyJob , applyMessage , shareJob}) => {
  return (
    <div className="w-full md:w-2/3 space-y-6">
      
      <JobDetailheader formatDate={formatDate} formatSalary={formatSalary} hasApplied={hasApplied} job={job} applyMessage={applyMessage} shareJob={shareJob} applyJob={applyJob} applyLoading={applyLoading} getDaysUntilDeadline={getDaysUntilDeadline}/>

      
      <JobDetailDescription job={job} formatDate={formatDate} />

      
      {job.companyId && (
        <JobDetailCompanyInfo job={job} />
      )}
    </div>
  );
};

export default Left;
