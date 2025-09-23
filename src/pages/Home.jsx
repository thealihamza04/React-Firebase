import React from "react";
import { cn } from "@/utils/cn.js";
import Heading from "@/components/ui/Heading";
import CreateTodo from "../components/CreateTodo";
import AllTodos from "../components/AllTodos";

const Home = () => {
    return (
        <div
            className={cn(
                "bg-[var(--color-background)] min-h-screen",
                "px-4 py-6", // default for small devices
                "sm:px-8 sm:py-10", // small screens and up
                "md:px-16 md:py-14", // medium screens
                "lg:px-24 lg:py-18" // large screens
            )}
        >
            <Heading
                size='xl'
                className='text-center'
            >
                Todos with React ⚡ Supabase
            </Heading>

            <AllTodos className='mt-8 sm:mt-12' />

            <CreateTodo />
        </div>
    );
};

export default Home;
