import { create } from "zustand";
import * as todo_api from "@/api/service/todo_api"

const useTodoStore = create((set, get) => ({
    todoItems: [],
    loading: {
        add: false,
        fetch: false,
        update: false,
        updateStatus: false,
        delete: false
    },
    error: null,

    addTodo: async (formData) => {
        set({ loading: { ...get().loading, add: true }, error: null });
        try {
            const data = await todo_api._AddTodo(formData);
            set({ todoItems: [...get().todoItems, ...data] });
        } catch (error) {
            set({ error });
            throw error;
        } finally {
            set({ loading: { ...get().loading, add: false } });
        }
    },
    getTodos: async () => {
        set({ loading: { ...get().loading, fetch: true }, error: null });
        try {
            const data = await todo_api._getAllTodoItems();
            set({ todoItems: data });
        } catch (error) {
            set({ error });
        } finally {
            set({ loading: { ...get().loading, fetch: false } });
        }
    },
    deleteTodo: async (todoItemId) => {
        set({ loading: { ...get().loading, delete: true }, error: null });
        try {
            await todo_api._removeTdoItem(todoItemId);
            set({ todoItems: get().todoItems.filter(item => item.id !== todoItemId) });
        } catch (error) {
            set({ error });
            throw error;
        } finally {
            set({ loading: { ...get().loading, delete: false } });
        }
    },

    updateStatus: async (todoItemId, status) => {
        set({ loading: { ...get().loading, updateStatus: true }, error: null });
        try {
            await todo_api._changeTodoItemStatus(todoItemId, status);

            set({
                todoItems: get().todoItems.map((item) =>
                    item.id === todoItemId ? { ...item, done: status } : item
                ),
            });
        } catch (error) {
            set({ error });
            throw error;
        } finally {
            set({ loading: { ...get().loading, updateStatus: false } });
        }
    }


}));



export default useTodoStore;
