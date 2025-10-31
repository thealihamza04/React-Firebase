import { Card } from '@/components/ui/card'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import { Loader } from '@/components/ui/animate-ui/icons/loader.tsx'

export default function ChatBox({ messages, onSend, loading, sending, username }) {
    const isEmpty = !loading && messages.length === 0

    return (
        <Card className="w-full h-screen relative rounded-none mx-auto bg-background  flex flex-col border shadow-md">
            {loading ? (
                <div className="flex flex-1 items-center justify-center">
                    <Loader animateOnView />
                </div>
            ) : (
                <>
                    {
                        isEmpty ?
                            <div className="flex flex-1 flex-col items-center justify-center text-muted-foreground">
                                <p className="text-md opacity-90">No messages yet</p>
                                <p className="text-xs opacity-60 mt-0.5">Start the conversation </p>
                            </div>
                            :
                            <MessageList
                                messages={messages}
                                username={username}
                                className="absolute top-4 pb-12 w-full h-[85svh] !max-h-[85svh] px-4"
                            />
                    }
                    <MessageInput onSend={onSend} sending={sending} className="absolute bottom-0" />
                </>
            )}
        </Card>
    )
}

