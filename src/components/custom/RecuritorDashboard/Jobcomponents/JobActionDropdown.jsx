import React, { useState, useCallback } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { CheckCircle, Pencil, Trash2, XCircle } from 'lucide-react';

const JobActionDropdown = React.memo(({ job, onStatusChange, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleSelection = useCallback((action) => {
    setTimeout(() => {
      switch (action) {
        case 'close':
          onStatusChange(job._id, 'close');
          break;
        case 'reopen':
          onStatusChange(job._id, 'reopen');
          break;
        case 'edit':
          onEdit(job);
          break;
        case 'delete':
          onDelete(job._id);
          break;
        default:
          break;
      }
    }, 300); 
  }, [job, onStatusChange, onEdit, onDelete]);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" onClick={handleToggle}>
          Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Manage job</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {job.status === "open" ? (
          <DropdownMenuItem onClick={() => handleSelection('close')}>
            <XCircle className="mr-2 h-4 w-4" /> Close Job
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => handleSelection('reopen')}>
            <CheckCircle className="mr-2 h-4 w-4" /> Reopen Job
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => handleSelection('edit')}>
          <Pencil className="mr-2 h-4 w-4" /> Edit Details
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => handleSelection('delete')}>
          <Trash2 className="mr-2 h-4 w-4" /> Delete Job
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default JobActionDropdown;
