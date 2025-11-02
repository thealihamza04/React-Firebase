import React from "react";
import { EllipsisVertical, Trash, CircleCheck, PenLine } from "lucide-react";
import { Loader } from "@/components/ui/animate-ui/icons/loader.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TodoActionsMenu = ({
  isUpdating,
  isDeleting,
  isDone,
  onUpdateStatus,
  onOpenUpdateModal,
  onDeleteClick,
}) => {
  return (
    <div className='absolute right-7'>
      <DropdownMenu>
        <DropdownMenuTrigger className='focus:outline-none focus:ring-0'>
          <EllipsisVertical className='text-[var(--color-muted-foreground)]' size={15} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={onUpdateStatus} onSelect={(e) => e.preventDefault()}>
            {isUpdating ? <Loader animateOnView /> : <CircleCheck size={15} />}
            {isDone ? "Mark as incomplete" : "Mark as completed"}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={onOpenUpdateModal}>
            <PenLine size={15} />
            Update
          </DropdownMenuItem>

          <DropdownMenuItem
            className='text-destructive focus:text-destructive'
            onClick={onDeleteClick}
            onSelect={(e) => e.preventDefault()}
          >
            {isDeleting ? <Loader animateOnView /> : <Trash className='text-destructive' />}
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TodoActionsMenu;

