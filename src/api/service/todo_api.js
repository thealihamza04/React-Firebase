import { supabase } from "@/supabaseClient"

export const _AddTodo = async (formData) => {
    if (!formData?.title) throw new Error("Title is required");
    const { data, error } = await supabase.from("todos").insert([{ title: formData.title, description: formData.description, done: false }]).select();
    if (error) throw error;
    return data;
}

export const _getAllTodoItems = async () => {
    const { data, error } = await supabase.from("todos").select("*").order("id", { ascending: true });
    if (error) throw new Error(`Error getting todoItems: ${error.message}`);
    return data;
}

export const _removeTdoItem = async (itemId) => {
    if (!itemId) throw new Error("itemId is missing");
    const { data, error } = await supabase.from("todos").delete().eq("id", itemId);
    if (error) throw error;
    return data;
}

export const _updateTodoItem = async (formData) => {
    if (!formData) throw new Error("formData is missing");
    const { data, error } = await supabase.from("todos").update({ title: formData.title, done: formData.done }).eq("id", formData.id);
    if (error) throw error;
    return data;
}

export const _changeTodoItemStatus = async (itemId, status) => {
    if (!itemId || typeof status !== "boolean")
        throw new Error("itemId or status is missing or invalid");

    const { data, error } = await supabase
        .from("todos")
        .update({ done: status })
        .eq("id", itemId);

    if (error) throw error;
    return data;
};
