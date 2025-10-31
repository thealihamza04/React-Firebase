import { useEffect } from "react";
import useTodoStore from "@/store/todo_store";
import TodoItem from "./TodoItem";
import { cn } from "@/utils/cn.js";
import { Tabs, TabsList, TabsTab, TabsPanels, TabsPanel } from "@/components/animate-ui/components/base/tabs.tsx";
import EmptyTodos from "./EmptyTodos";
import { Shimmer } from "@/components/ui/ai-elements/shimmer.tsx"


export default function AllTodos({ className }) {
    const { todoItems, getTodos, loading, error } = useTodoStore();

    useEffect(() => {
        getTodos();
    }, [getTodos]);

    if (loading.fetch)
        return (
            <div className='h-[400px] flex items-center justify-center'>
                <Shimmer>Loading Your Tasks</Shimmer>
            </div>
        );
    if (error) return <p>Error: {error.message}</p>;

    const pendingTodos = todoItems.filter((todo) => !todo.done);
    const completedTodos = todoItems.filter((todo) => todo.done);

    return (
        <Tabs
            defaultValue='pending'
            className={cn("w-full", className)}
        >
            <TabsList>
                <TabsTab value='pending'>Pending</TabsTab>
                <TabsTab value='completed'>Completed</TabsTab>
            </TabsList>

            <TabsPanels>

                {/* Pending Todos */}
                <TabsPanel value='pending'>
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
                        ) : todoItems.length > 0 ? (
                            <EmptyTodos type='noPending' />
                        ) : (
                            <EmptyTodos type='noTodos' />
                        )}
                    </ul>
                </TabsPanel>

                {/* Completed Todos */}
                <TabsPanel value='completed'>
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
                            <EmptyTodos type={"noCompleted"} />
                        )}
                    </ul>
                </TabsPanel >

            </TabsPanels>
        </Tabs>
    );
}

