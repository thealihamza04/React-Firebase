import React, { useState } from "react";
import { EllipsisVertical, Trash, CircleCheck, PenLine } from "lucide-react";
import { Loader } from "@/components/ui/animate-ui/icons/loader.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useTodoStore from "@/store/todo_store.js";
import { formatDate } from "../../utils/formatDate";
import TodoUpdateModal from "./TodoUpdateModal";

const TodoItem = ({ id, title, description, createdAt, isDone }) => {
    const { deleteTodo, updateStatus } = useTodoStore();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await deleteTodo(id);
        } catch (error) {
            console.error("Failed to delete todo:", error);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleUpdateStatus = async () => {
        try {
            setIsUpdating(true);
            await updateStatus(id, !isDone);
        } catch (error) {
            console.error("Failed to update status:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className='flex relative flex-col justify-start w-full items-start bg-[var(--color-secondary)] rounded-[var(--radius-lg)] p-4'>
            <div className='gap-3 flex items-center'>
                <label className='font-semibold text-lg'>{title}</label>
            </div>
            <div className='ml-2 mt-2 p-2 w-[98%] px-4 rounded-[var(--radius)] bg-sidebar text-sidebar-foreground border text-sm'>
                {description ? (
                    <p>{description}</p>
                ) : (
                    <p>No description found</p>
                )}
            </div>
            <div className='flex justify-end items-end w-[98%] pt-2 text-xs text-[var(--color-muted-foreground)]'>
                <p className='text-right'>{formatDate(createdAt)}</p>
            </div>
            <div className='absolute right-7'>
                <DropdownMenu>
                    <DropdownMenuTrigger className='focus:outline-none focus:ring-0'>
                        <EllipsisVertical
                            className='text-[var(--color-muted-foreground)]'
                            size={15}
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        {/* Update Status */}
                        <DropdownMenuItem
                            onClick={handleUpdateStatus}
                            onSelect={(e) => e.preventDefault()}
                        >
                            {isUpdating ? (
                                <Loader animateOnView />
                            ) : (
                                <CircleCheck size={15} />
                            )}
                            {isDone
                                ? "Mark as incomplete"
                                : "Mark as completed"}
                        </DropdownMenuItem>

                        {/* Update */}
                        <DropdownMenuItem
                            onClick={() => setIsUpdateModalOpen(true)}
                        >
                            <PenLine size={15} />
                            Update
                        </DropdownMenuItem>

                        {/* Delete (destructive) */}
                        <DropdownMenuItem
                            className='text-destructive focus:text-destructive'
                            onClick={() => setIsConfirmOpen(true)}
                            onSelect={(e) => e.preventDefault()}
                        >
                            {isDeleting ? (
                                <Loader animateOnView />
                            ) : (
                                <Trash className='text-destructive' />
                            )}
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Confirm Delete Dialog */}
            <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-left">Delete this todo?</DialogTitle>
                        <DialogDescription className="text-left">
                            This action cannot be undone. This will permanently delete
                            the todo "{title}".
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant='outline'
                            onClick={() => setIsConfirmOpen(false)}
                            disabled={isDeleting}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant='destructive'
                            onClick={async () => {
                                await handleDelete();
                                setIsConfirmOpen(false);
                            }}
                            disabled={isDeleting}
                        >
                            {isDeleting ? <Loader animateOnView /> : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal */}
            <TodoUpdateModal
                open={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                todo={{ id, title, description }}
            />
        </div>
    );
};

export default TodoItem;

