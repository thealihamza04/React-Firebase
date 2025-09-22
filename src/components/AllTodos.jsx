import { useEffect } from "react";
import useTodoStore from "@/store/todo_store";
import TodoItem from "./TodoItem";
import { cn } from "@/utils/cn.js";

export default function AllTodos({ className }) {
    const { todoItems, getTodos, loading, error } = useTodoStore();

    useEffect(() => {
        getTodos();
    }, [getTodos]);

    if (loading.fetch) return <p>Loading todos...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <ul className={cn("min-h-[400px] flex flex-col space-y-2", className)}>
            {todoItems.length ? (
                todoItems.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        description={todo?.description}
                        createdAt={todo?.createdat}
                    />
                ))
            ) : (
                <li>No todos found</li>
            )}
        </ul>
    );
}
