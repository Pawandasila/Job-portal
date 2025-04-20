import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Building2,
  Calendar,
  MapPin,
  Globe,
  Mail,
  Phone,
  User,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CompanyCard = ({ company, onEdit, onDelete }) => {
  // Key fix: Use straightforward event handlers that prevent default and stop propagation
  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Use a small timeout to ensure the dropdown closes first
    setTimeout(() => {
      onEdit(company);
    }, 10);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Use a small timeout to ensure the dropdown closes first
    setTimeout(() => {
      onDelete(company);
    }, 10);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            {company.logo && (
              <div className="h-12 w-12 rounded-md overflow-hidden">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/48";
                  }}
                />
              </div>
            )}
            <div>
              <CardTitle className="mb-1">{company.name}</CardTitle>
              <CardDescription>{company.industry}</CardDescription>
            </div>
          </div>

          <div className="flex items-center">
            <Badge
              variant={company.status === "active" ? "default" : "secondary"}
            >
              {company.status === "active" ? "Active" : "Inactive"}
            </Badge>
            <span className="inline-block ml-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={handleEdit}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Pencil size={14} /> Edit
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={handleDelete}
                    className="flex items-center gap-2 text-red-600 cursor-pointer"
                  >
                    <Trash2 size={14} /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 mb-4">{company.description}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <User size={14} className="text-gray-500" />
            <span className="font-medium">Founder:</span> {company.founder}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar size={14} className="text-gray-500" />
            <span className="font-medium">Founded:</span>{" "}
            {new Date(company.founded).toLocaleDateString()}
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MapPin size={14} className="text-gray-500" />
            <span className="font-medium">Location:</span> {company.location}
          </div>

          <div className="flex gap-2 text-sm">
            <Building2 size={14} className="text-gray-500 mt-1" />
            <div>
              <span className="font-medium">Headquarters:</span>
              <div className="ml-0">
                {company.headquarter.map((hq, index) => (
                  <div key={index}>{hq}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4 flex flex-col items-stretch gap-2">
        <div className="flex items-center gap-2 text-sm">
          <Mail size={14} className="text-gray-500" />
          <a
            href={`mailto:${company.contact_email}`}
            className="text-blue-600 hover:underline"
          >
            {company.contact_email}
          </a>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Phone size={14} className="text-gray-500" />
          <a
            href={`tel:${company.contact_phone}`}
            className="text-blue-600 hover:underline"
          >
            {company.contact_phone}
          </a>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Globe size={14} className="text-gray-500" />
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Visit Website
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CompanyCard;
