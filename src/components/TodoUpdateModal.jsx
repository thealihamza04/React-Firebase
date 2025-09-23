import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useTodoStore from "@/store/todo_store";

export default function TodoUpdateModal({ open, onClose, todo }) {
    const { updateTodoItem, loading } = useTodoStore();
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            id: todo?.id || null,
            title: todo?.title || "",
            description: todo?.description || "",
        },
    });

    useEffect(() => {
        if (todo) {
            reset({
                id: todo.id,
                title: todo.title,
                description: todo.description || "",
            });
        }
    }, [todo, reset]);

    const onSubmit = async (data) => {
        await updateTodoItem(data);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Todo</DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='space-y-4 pt-4'
                >
                    <Input
                        {...register("title", { required: true })}
                        placeholder='Title'
                    />
                    <Textarea
                        {...register("description")}
                        placeholder='Description'
                        className='resize-none'
                    />
                    <Button
                        type='submit'
                        disabled={loading.update}
                        className='float-end'
                    >
                        {loading.update ? "Updating..." : "Update"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
