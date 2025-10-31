import { db } from "@/utils/firebaseClient";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";

export const _AddTodo = async (formData) => {
    if (!formData?.title) throw new Error("Title is required");
    const ref = await addDoc(collection(db, "todos"), {
        title: formData.title,
        description: formData.description || "",
        done: false,
        createdat: serverTimestamp(),
    });
    // Return data in the same array shape as before
    return [
        {
            id: ref.id,
            title: formData.title,
            description: formData.description || "",
            done: false,
            createdat: new Date().toISOString(),
        },
    ];
};

export const _getAllTodoItems = async () => {
    const q = query(collection(db, "todos"), orderBy("createdat", "asc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
        const data = d.data();
        const created = data.createdat?.toDate
            ? data.createdat.toDate().toISOString()
            : data.createdat || null;
        return { id: d.id, ...data, createdat: created };
    });
};

export const _removeTdoItem = async (itemId) => {
    if (!itemId) throw new Error("itemId is missing");
    await deleteDoc(doc(db, "todos", itemId));
    return { id: itemId };
};

export const _updateTodoItem = async (formData) => {
    if (!formData?.id) throw new Error("formData is missing");
    const { id, title, description, done } = formData;

    // Only include fields that are explicitly provided to avoid
    // sending undefined values (Firestore rejects undefined fields).
    const payload = {};
    if (typeof title !== "undefined") payload.title = title;
    if (typeof description !== "undefined") payload.description = description;
    if (typeof done !== "undefined") payload.done = done;

    await updateDoc(doc(db, "todos", id), payload);
    return { id, ...payload };
};

export const _changeTodoItemStatus = async (itemId, status) => {
    if (!itemId || typeof status !== "boolean")
        throw new Error("itemId or status is missing or invalid");
    await updateDoc(doc(db, "todos", itemId), { done: status });
    return { id: itemId, done: status };
};
