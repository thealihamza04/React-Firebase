import { Input } from "@/components/ui/input.tsx";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button.tsx";
import { Textarea } from "@/components/ui/textarea.tsx";
import { cn } from "@/utils/cn.js";
import useTodoStore from "@/store/todo_store.js";
import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const CreateTodo = () => {
    const { register, handleSubmit } = useForm();
    const { addTodo, loading, reset } = useTodoStore();
    const [isDialogOpen, setIsDialogOpen] = useState(0);

    const onSubmit = async (data) => {
        await addTodo(data);
        setIsDialogOpen(false);
        reset();
        console.log("Todo title:", data);
    };

    return (
        <div>
            <div className={cn("flex flex-row", "gap-2")}>
                <Dialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                >
                    <DialogTrigger asChild>
                        <Button className={"fixed bottom-8 right-24"}>
                            Add
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Enter Your Todo.</DialogTitle>
                            <DialogDescription asChild>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <fieldset disabled={loading.add}>
                                        <div className='space-y-2 pt-4'>
                                            <Input
                                                placeholder={"Enter Todo"}
                                                {...register("title", {
                                                    required: true,
                                                })}
                                                className='rounded-r-0'
                                            />
                                            <Textarea
                                                placeholder={"Enter details"}
                                                className={"resize-none"}
                                                {...register("description")}
                                            />
                                            <Button
                                                type={"submit"}
                                                className={"float-end"}
                                            >
                                                {loading.add
                                                    ? "Add ..."
                                                    : "Add"}
                                            </Button>
                                        </div>
                                    </fieldset>
                                </form>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default CreateTodo;
