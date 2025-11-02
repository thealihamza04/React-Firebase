import React, { useState } from "react";
import { CircleCheck, Circle } from "lucide-react";
import useTodoStore from "@/store/todo_store.js";
import { formatDate } from "../../utils/formatDate";
import TodoUpdateModal from "./TodoUpdateModal";
import TodoActionsMenu from "./TodoActionsMenu";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import TodoDescription from "./TodoDescription";

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
        <div className='group relative w-full overflow-hidden rounded-xl border border-muted bg-card p-4 text-card-foreground shadow-xs hover:shadow-md transition-shadow'>
            <div className={`absolute left-0 top-0 h-full w-1 ${isDone ? 'bg-primary' : 'bg-accent'}`} aria-hidden />

            <div className='flex items-start justify-between gap-3'>
                <div className='flex items-center gap-2'>
                    {isDone ? (
                        <CircleCheck className='text-primary' size={18} />
                    ) : (
                        <Circle className='text-muted-foreground' size={18} />
                    )}
                    <label className='font-semibold text-base md:text-lg'>{title}</label>
                </div>
                <div className='flex items-center gap-2'>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                        isDone
                            ? 'bg-primary/10 text-primary border-primary/20'
                            : 'bg-accent/40 text-accent-foreground border-accent/40'
                    }`}>
                        {isDone ? 'Completed' : 'Pending'}
                    </span>
                    <TodoActionsMenu
                        isUpdating={isUpdating}
                        isDeleting={isDeleting}
                        isDone={isDone}
                        onUpdateStatus={handleUpdateStatus}
                        onOpenUpdateModal={() => setIsUpdateModalOpen(true)}
                        onDeleteClick={() => setIsConfirmOpen(true)}
                    />
                </div>
            </div>

            <TodoDescription description={description} />

            <div className='mt-3 flex items-center justify-end text-xs text-muted-foreground'>
                <p className='text-right'>Created {formatDate(createdAt)}</p>
            </div>

            <ConfirmDeleteDialog
                open={isConfirmOpen}
                onOpenChange={setIsConfirmOpen}
                title={title}
                isDeleting={isDeleting}
                onCancel={() => setIsConfirmOpen(false)}
                onConfirm={async () => {
                    await handleDelete();
                    setIsConfirmOpen(false);
                }}
            />

            <TodoUpdateModal
                open={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                todo={{ id, title, description }}
            />
        </div>
    );
};

export default TodoItem;
