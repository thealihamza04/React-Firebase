import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

export function useSupabaseMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        fetchMessages();

        const channel = supabase
            .channel("public:messages")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "messages" },
                (payload) => {
                    setMessages((prev) => [...prev, payload.new]);
                }
            )
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, []);

    async function fetchMessages() {
        setLoading(true);
        const { data } = await supabase
            .from("messages")
            .select("*")
            .order("created_at", { ascending: true });
        setMessages(data);
        setLoading(false);
    }

    async function sendMessage(username, content) {
        const trimmed = content.trim();
        if (!trimmed) return;

        try {
            setSending(true);
            await supabase
                .from("messages")
                .insert([{ username, content: trimmed }]);
        } finally {
            setSending(false);
        }
    }

    return { messages, loading, sending, sendMessage };
}
