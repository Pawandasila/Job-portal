import React, { useState, useEffect, useContext, useCallback, useRef } from "react";
import useAxios from "@/hooks/useAxios";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Plus } from "lucide-react";
import { AuthContext } from "@/context/authContext";
import {
  CompanyFormModal,
  DeleteConfirmationDialog,
} from "./companyComponent/Model";
import CompanyGrid from "./companyComponent/CompanyGrid";

const RecruiterCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const axios = useAxios();
  const isMounted = useRef(true);

  // Use separate state variables for each modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);

  // Fetch companies with a cleanup function
  const fetchCompanies = useCallback(async () => {
    if (!isMounted.current) return;

    setLoading(true);
    setError(null);
    try {
      let response = await axios.get(`/company/recruiter/${user?.id}`);
      console.log("Recruiter Companies:", response.data);

      if (!response.data.success || !response.data.companies) {
        response = await axios.get("/companies");
        console.log("Fallback to all companies:", response.data);
      }

      if (isMounted.current) {
        if (response.data.success && response.data.companies) {
          setCompanies(response.data.companies);
        } else {
          setError("No companies found.");
        }
      }
    } catch (err) {
      console.error("Error fetching companies:", err);
      if (isMounted.current) {
        setError("Something went wrong while loading companies.");
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [user, axios]);

  // Initialize component and clean up when unmounting
  useEffect(() => {
    isMounted.current = true;

    if (user?.id) {
      fetchCompanies();
    }

    return () => {
      isMounted.current = false;
    };
  }, [user, fetchCompanies]);

  // Modal handlers with proper cleanup and state management
  const openAddModal = useCallback(() => {
    if (!isMounted.current) return;
    setIsAddModalOpen(true);
  }, []);

  const closeAddModal = useCallback(() => {
    if (!isMounted.current) return;
    setIsAddModalOpen(false);
  }, []);

  const openEditModal = useCallback((company) => {
    if (!isMounted.current) return;
    console.log("Opening edit modal for:", company);
    // Create a new object to avoid reference issues
    setCurrentCompany({...company});
    // Use a small delay to ensure state is properly updated
    setTimeout(() => {
      if (isMounted.current) {
        setIsEditModalOpen(true);
      }
    }, 10);
  }, []);

  const closeEditModal = useCallback(() => {
    if (!isMounted.current) return;
    console.log("Closing edit modal");
    setIsEditModalOpen(false);
    // Clear the current company after a small delay
    setTimeout(() => {
      if (isMounted.current) {
        setCurrentCompany(null);
      }
    }, 100);
  }, []);

  const openDeleteModal = useCallback((company) => {
    if (!isMounted.current) return;
    // Create a new object to avoid reference issues
    setCurrentCompany({...company});
    // Use a small delay to ensure state is properly updated
    setTimeout(() => {
      if (isMounted.current) {
        setIsDeleteModalOpen(true);
      }
    }, 10);
  }, []);

  const closeDeleteModal = useCallback(() => {
    if (!isMounted.current) return;
    setIsDeleteModalOpen(false);
    
    setTimeout(() => {
      if (isMounted.current) {
        setCurrentCompany(null);
      }
      window.location.reload();
    }, 100);
  }, []);

  // CRUD operations with proper cleanup
  const handleAddCompany = useCallback(async (data) => {
    if (!isMounted.current) return;

    try {
      const response = await axios.post("/company/create", data);
      if (response.data.success) {
        closeAddModal();
        setTimeout(() => {
          if (isMounted.current) {
            fetchCompanies();
          }
        }, 300);
      }
    } catch (error) {
      console.error("Add company failed:", error);
    }
  }, [axios, closeAddModal, fetchCompanies]);

  const handleUpdateCompany = useCallback(async (data) => {
    if (!isMounted.current || !currentCompany || !currentCompany._id) {
      console.error("No company selected for update");
      return;
    }

    try {
      const response = await axios.put(`/company/${currentCompany._id}`, data);
      if (response.data.success) {
        closeEditModal();
        setTimeout(() => {
          if (isMounted.current) {
            fetchCompanies();
          }
          window.location.reload();
        }, 300);
      }
    } catch (error) {
      console.error("Update company failed:", error);
    }
  }, [axios, currentCompany, closeEditModal, fetchCompanies]);

  const handleDeleteCompany = useCallback(async () => {
    if (!isMounted.current || !currentCompany || !currentCompany._id) {
      console.error("No company selected for deletion");
      return;
    }

    try {
      const response = await axios.post(
        `/company/${currentCompany._id}/delete`
      );
      if (response.data.success) {
        closeDeleteModal();
        setTimeout(() => {
          if (isMounted.current) {
            fetchCompanies();
          }
          window.location.reload();
        }, 300);
      }
    } catch (error) {
      console.error("Delete company failed:", error);
    }
  }, [axios, currentCompany, closeDeleteModal, fetchCompanies]);

  // Filter companies by status
  const activeCompanies = companies.filter(
    (company) => company.status === "active"
  );
  const inactiveCompanies = companies.filter(
    (company) => company.status === "inactive"
  );

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Companies</h1>
        <Button className="flex items-center gap-2" onClick={openAddModal}>
          <Plus size={16} /> Add Company
        </Button>
      </div>

      {error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">Loading companies...</p>
        </div>
      ) : (
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="active">
              Active ({activeCompanies.length})
            </TabsTrigger>
            <TabsTrigger value="inactive">
              Inactive ({inactiveCompanies.length})
            </TabsTrigger>
            <TabsTrigger value="all">All ({companies.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <CompanyGrid
              companies={activeCompanies}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
            />
          </TabsContent>

          <TabsContent value="inactive">
            <CompanyGrid
              companies={inactiveCompanies}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
            />
          </TabsContent>

          <TabsContent value="all">
            <CompanyGrid
              companies={companies}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
            />
          </TabsContent>
        </Tabs>
      )}

      {/* Add modal - no need for currentCompany check */}
      <CompanyFormModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onSubmit={handleAddCompany}
        title="Add Company"
      />

      {/* Edit modal - only render when there's a currentCompany */}
      {currentCompany && isEditModalOpen && (
        <CompanyFormModal
          key={`edit-${currentCompany._id}`}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSubmit={handleUpdateCompany}
          initialData={currentCompany}
          title="Edit Company"
        />
      )}

      {/* Delete modal - only render when there's a currentCompany */}
      {currentCompany && isDeleteModalOpen && (
        <DeleteConfirmationDialog
          key={`delete-${currentCompany._id}`}
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteCompany}
          companyName={currentCompany.name}
        />
      )}
    </div>
  );
};

export default RecruiterCompany;
