import React, { useEffect, useState } from "react";
import { cn } from "@/utils/cn.js";
import Heading from "@/components/ui/Heading";
import CreateTodo from "../components/todo/CreateTodo";
import AllTodos from "../components/todo/AllTodos";
import { Firebase } from "@/components/ui/icons/firebase.jsx"
import { ReactIcon } from "@/components/ui/icons/react.jsx"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"


const Home = () => {
    const INSTRUCTIONS_KEY = "todo-app-instructions-seen";
    const [showInstructions, setShowInstructions] = useState(false);

    useEffect(() => {
        const hasSeenInstructions = localStorage.getItem(INSTRUCTIONS_KEY);

        if (!hasSeenInstructions) {
            setShowInstructions(true);
        }
    }, []);

    const dismissInstructions = () => {
        localStorage.setItem(INSTRUCTIONS_KEY, "true");
        setShowInstructions(false);
    };

    return (
        <div
            className={cn(
                " bg-background min-h-screen",
                "px-4 py-6", // default for small devices
                "sm:px-8 sm:py-10", // small screens and up
                "md:px-16 md:py-14", // medium screens
                "lg:px-24 lg:py-18" // large screens
            )}
        >

            <Dialog open={showInstructions} onOpenChange={dismissInstructions}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Welcome to the Firebase Todo App</DialogTitle>
                        <DialogDescription>
                            Here&apos;s a quick guide to help you get started. We&apos;ll only
                            show this once.
                        </DialogDescription>
                    </DialogHeader>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li>
                            <strong>Add tasks:</strong> Use the input at the bottom to
                            write a todo and press Enter or click Add.
                        </li>
                        <li>
                            <strong>Organize your list:</strong> Check items to mark
                            them complete and use the filters to view what matters.
                        </li>
                        <li>
                            <strong>Stay synced:</strong> All your changes are saved in
                            Firebase so you can pick up where you left off.
                        </li>
                    </ul>
                    <DialogFooter>
                        <Button onClick={dismissInstructions}>Got it</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* <Heading
                size='sm'
                className='text-center flex flex-row'
            >
                Todos with {" "}
                React
                {" "}
                and {" "}
                Firebase
            </Heading> */}
            <AllTodos className='pt-8' />
            <CreateTodo />
        </div>
    );
};

export default Home;



