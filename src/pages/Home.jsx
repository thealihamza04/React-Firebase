import React from "react";
import { cn } from "@/utils/cn.js";
import Heading from "@/components/ui/Heading";
import CreateTodo from "../components/todo/CreateTodo";
import AllTodos from "../components/todo/AllTodos";
import { Firebase } from "@/components/ui/icons/firebase.jsx"
import { ReactIcon } from "@/components/ui/icons/react.jsx"


const Home = () => {
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
            <Heading
                size='sm'
                className='text-center flex flex-row'
            >
                Todos with {" "}
                React
                {/* <ReactIcon className="h-8 w-4 text-black animate-[spin_15s_linear_infinite] " /> */}
                {" "}
                and {" "}
                Firebase
                {/* <Firebase className="h-8 w-6 mx-2" /> */}
            </Heading>
            <AllTodos className='pt-8' />
            <CreateTodo />
        </div>
    );
};

export default Home;



