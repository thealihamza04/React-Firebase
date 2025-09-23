import { useEffect } from "react";
import useTodoStore from "@/store/todo_store";
import TodoItem from "./TodoItem";
import { cn } from "@/utils/cn.js";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AllTodos({ className }) {
    const { todoItems, getTodos, loading, error } = useTodoStore();

    useEffect(() => {
        getTodos();
    }, [getTodos]);

    if (loading.fetch)
        return (
            <div className='h-[400px] flex items-center justify-center'>
                <p>Loading todos...</p>
            </div>
        );
    if (error) return <p>Error: {error.message}</p>;

    const pendingTodos = todoItems.filter((todo) => !todo.done);
    const completedTodos = todoItems.filter((todo) => todo.done);

    return (
        <Tabs
            defaultValue='pending'
            className='w-full'
        >
            <TabsList>
                <TabsTrigger value='pending'>Pending</TabsTrigger>
                <TabsTrigger value='completed'>Completed</TabsTrigger>
            </TabsList>

            {/* Pending Todos */}
            <TabsContent value='pending'>
                <ul
                    className={cn(
                        "min-h-[400px] flex flex-col space-y-4",
                        className
                    )}
                >
                    {pendingTodos.length ? (
                        pendingTodos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                id={todo.id}
                                title={todo.title}
                                description={todo?.description}
                                createdAt={todo?.createdat}
                                isDone={todo.done}
                            />
                        ))
                    ) : (
                        <li className='text-muted-foreground'>
                            No pending todos 🎉
                        </li>
                    )}
                </ul>
            </TabsContent>

            {/* Completed Todos */}
            <TabsContent value='completed'>
                <ul
                    className={cn(
                        "min-h-[400px] flex flex-col space-y-4",
                        className
                    )}
                >
                    {completedTodos.length ? (
                        completedTodos.map((todo) => (
                            <TodoItem
                                key={todo.id}
                                id={todo.id}
                                title={todo.title}
                                description={todo?.description}
                                createdAt={todo?.createdat}
                                isDone={todo.done}
                            />
                        ))
                    ) : (
                        <li className='text-muted-foreground'>
                            No completed todos yet ✅
                        </li>
                    )}
                </ul>
            </TabsContent>
        </Tabs>
    );
}
