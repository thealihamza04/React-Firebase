import React from "react";
import { cn } from "@/utils/cn.js";
import Heading from "@/components/ui/Heading";
import CreateTodo from "../components/CreateTodo";
import AllTodos from "../components/AllTodos";

const Home = () => {
    return (
        <div
            className={cn(
                "bg-[var(--color-background)]",
                " min-h-screen ",
                "px-24 py-18"
            )}
        >
            <Heading
                size='xl'
                className='text-center'
            >
                {" "}
                Connecting React with supabse✨{" "}
            </Heading>
            <AllTodos className={"mt-12"} />
            <CreateTodo />
        </div>
    );
};

export default Home;
