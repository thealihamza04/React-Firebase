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
import { Loader } from "@/components/ui/animate-ui/icons/loader.tsx";
import { PlusIcon } from "@/components/ui/animate-ui/icons/plus.tsx"
import { AnimateIcon } from "@/components/ui/animate-ui/icons/icon.tsx"

const CreateTodo = () => {
    const { register, handleSubmit, reset } = useForm();
    const { addTodo, loading } = useTodoStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const onSubmit = async (data) => {
        await addTodo(data);
        setIsDialogOpen(false);
        reset();
    };
    return (
        <div>
            <div className={cn("flex flex-row", "gap-2 ")}>
                <Dialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                >
                    <DialogTrigger asChild>
                        <AnimateIcon animateOnHover>
                            <Button className={"fixed bottom-8 right-12"}  >
                                <PlusIcon className="size-5" />
                            </Button>
                        </AnimateIcon>
                    </DialogTrigger>
                    <DialogContent >
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
                                                Add
                                                {loading.add && (<Loader animateOnView />)}
                                            </Button>
                                        </div>
                                    </fieldset>
                                </form>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog >
            </div >
        </div >
    );
};
export default CreateTodo;

