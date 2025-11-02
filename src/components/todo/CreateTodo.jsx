import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useForm } from "react-hook-form";
import { Button } from "@/components/animate-ui/components/buttons/button.tsx";
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
                            <Button className={"fixed bottom-8 right-4  md:right-12 "} size="sm" >
                                Add
                            </Button>
                        </AnimateIcon>
                    </DialogTrigger>
                    <DialogContent className="bg-card text-card-foreground border border-accent ">
                        <DialogHeader>
                            <DialogTitle>Enter Your Todo.</DialogTitle>
                            <DialogDescription asChild>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <fieldset disabled={loading.add}>
                                        <div className='space-y-4 pt-4'>
                                            <div className='space-y-1'>
                                                <Label htmlFor="create-title">Title</Label>
                                                <Input
                                                    id="create-title"
                                                    placeholder={"Enter Todo"}
                                                    {...register("title", {
                                                        required: true,
                                                    })}
                                                />
                                            </div>
                                            <div className='space-y-1'>
                                                <Label htmlFor="create-description">Description</Label>
                                                <Textarea
                                                    id="create-description"
                                                    placeholder={"Enter details"}
                                                    className={"resize-none"}
                                                    {...register("description")}
                                                />
                                            </div>
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

