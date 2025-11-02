import React, { useState } from "react";
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
        <div className='flex relative flex-col justify-start w-full items-start bg-secondary text-card-foreground border border-muted rounded-[var(--radius-lg)] p-4'>
            <div className='gap-3 flex items-center'>
                <label className='font-semibold text-lg'>{title}</label>
            </div>

            <TodoDescription description={description} />

            <div className='flex justify-end items-end w-[98%] pt-2 text-xs text-[var(--color-muted-foreground)]'>
                <p className='text-right'>{formatDate(createdAt)}</p>
            </div>

            <TodoActionsMenu
                isUpdating={isUpdating}
                isDeleting={isDeleting}
                isDone={isDone}
                onUpdateStatus={handleUpdateStatus}
                onOpenUpdateModal={() => setIsUpdateModalOpen(true)}
                onDeleteClick={() => setIsConfirmOpen(true)}
            />

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
