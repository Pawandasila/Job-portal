import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";

// Helper function
const formatDateForInput = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d instanceof Date && !isNaN(d) ? d.toISOString().split("T")[0] : "";
};

// Completely redesigned implementation
export const CompanyFormModal = React.memo(
  ({
    isOpen,
    onClose,
    onSubmit,
    initialData = {
      name: "",
      industry: "",
      description: "",
      founder: "",
      founded: new Date(),
      location: "",
      headquarter: [""],
      contact_email: "",
      contact_phone: "",
      website: "",
      status: "active",
    },
    title = "Add Company",
  }) => {
    // Initialize form immediately with initial data
    const form = useForm();
    const [headquarters, setHeadquarters] = useState([""]);

    // Reset the form whenever the modal opens or initialData changes
    useEffect(() => {
      if (isOpen) {
        const processedData = {
          ...initialData,
          founded: formatDateForInput(initialData.founded),
        };

        form.reset(processedData);
        setHeadquarters(initialData.headquarter?.length ? [...initialData.headquarter] : [""]);
      }
    }, [form, initialData, isOpen]);

    const handleAddHeadquarter = () => {
      setHeadquarters((prev) => [...prev, ""]);
    };

    const handleHeadquarterChange = (index, value) => {
      setHeadquarters((prev) => {
        const newHeadquarters = [...prev];
        newHeadquarters[index] = value;
        return newHeadquarters;
      });
    };

    const handleRemoveHeadquarter = (index) => {
      if (headquarters.length > 1) {
        setHeadquarters((prev) => prev.filter((_, i) => i !== index));
      }
    };

    const handleFormSubmit = (data) => {
      const submissionData = {
        ...data,
        headquarter: [...headquarters],
        founded: data.founded ? new Date(data.founded) : null,
      };

      onSubmit(submissionData);
    };

    // Important: We're NOT using onOpenChange from Dialog to prevent timing issues
    const handleCancelClick = () => {
      onClose();
      window.location.reload();
    };

    return (
      <Dialog open={isOpen} modal={true}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              {title === "Add Company"
                ? "Add a new company to your list."
                : "Update company information."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name & Industry */}
                <FormField
                  control={form.control}
                  name="name"
                  rules={{ required: "Company name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="industry"
                  rules={{ required: "Industry is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="resize-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Founder & Founded */}
                <FormField
                  control={form.control}
                  name="founder"
                  rules={{ required: "Founder name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Founder</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="founded"
                  rules={{ required: "Founded date is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Founded Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          max={formatDateForInput(new Date())}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                rules={{ required: "Location is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Headquarters */}
              <div>
                <FormLabel>Headquarters</FormLabel>
                {headquarters.map((hq, index) => (
                  <div key={index} className="flex items-center mt-2">
                    <Input
                      value={hq}
                      onChange={(e) =>
                        handleHeadquarterChange(index, e.target.value)
                      }
                      className="flex-1"
                    />
                    <div className="flex ml-2">
                      {headquarters.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleRemoveHeadquarter(index)}
                          className="mr-2"
                        >
                          -
                        </Button>
                      )}
                      {index === headquarters.length - 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={handleAddHeadquarter}
                        >
                          +
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Contact Email */}
                <FormField
                  control={form.control}
                  name="contact_email"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Contact Phone */}
                <FormField
                  control={form.control}
                  name="contact_phone"
                  rules={{ required: "Phone number is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Website */}
              <FormField
                control={form.control}
                name="website"
                rules={{
                  required: "Website is required",
                  pattern: {
                    value: /^https?:\/\/[^\s$.?#].[^\s]*$/,
                    message: "Invalid URL format",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between border p-4 rounded-lg">
                    <div>
                      <FormLabel className="text-base">Active Status</FormLabel>
                      <FormDescription>
                        Mark company as active or inactive
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value === "active"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "active" : "inactive")
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelClick}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {title === "Add Company" ? "Add Company" : "Update Company"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }
);

// Simplified Delete Confirmation Dialog
export const DeleteConfirmationDialog = React.memo(
  ({ isOpen, onClose, onConfirm, companyName }) => {
    const handleConfirmClick = () => {
      onConfirm();
    };

    const handleCancelClick = () => {
      onClose();
    };

    return (
      <AlertDialog open={isOpen} modal={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {companyName || "this company"}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelClick}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmClick}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);
