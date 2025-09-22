import React from "react";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { EllipsisVertical, Trash, CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useTodoStore from "@/store/todo_store.js";

const TodoItem = ({ id, title, description, createdAt }) => {
    const { deleteTodo } = useTodoStore();

    const handleDelete = async () => {
        try {
            await deleteTodo(id);
        } catch (error) {
            console.error("Failed to delete todo:", error);
        }
    };

    return (
        <div className='flex relative flex-col justify-start w-full items-start  bg-[var(--color-card)] rounded-[var(--radius-lg)] p-4'>
            <div className='gap-3 flex  items-center '>
                <label className='font-medium'>{title}</label>
            </div>
            <div className='ml-2 mt-2 p-2 w-[98%] px-4 rounded-md bg-[var(--color-muted)] text-[var(--color-muted-foreground)] text-sm '>
                {description ? (
                    <p className=''>{description}</p>
                ) : (
                    <p>No description</p>
                )}
                {/* <p className='flex float-right w-full text-right'>
                    {createdAt}
                </p> */}
            </div>
            <div className='absolute right-7'>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <EllipsisVertical
                            className='text-[var(--color-muted-foreground)]'
                            size={18}
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <CircleCheck />
                            Mark as completed
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDelete}>
                            <Trash /> Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default TodoItem;
