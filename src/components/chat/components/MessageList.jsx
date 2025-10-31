import { useEffect, useRef } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/utils/cn'
import Message from './Message'
import DateDivider from './DateDivider'
import { isSameDay, parseISO } from 'date-fns'

export default function MessageList({ messages, className, username }) {
    const scrollRef = useRef(null)

    useEffect(() => {
        const viewport = scrollRef.current?.querySelector('[data-radix-scroll-area-viewport]')
        if (viewport) {
            // Scroll to the bottom on new messages
            viewport.scrollTo({ top: viewport.scrollHeight, behavior: 'smooth' })
        }
    }, [messages])

    // Sort messages by creation date (handle null/undefined timestamps)
    const sorted = [...messages].sort((a, b) => {
        const at = a?.created_at ? new Date(a.created_at).getTime() : 0
        const bt = b?.created_at ? new Date(b.created_at).getTime() : 0
        return at - bt
    })

    return (
        <div className="relative flex-1">
            <ScrollArea
                ref={scrollRef}
                className={cn('flex-1 p-4 bg-background', className)}
            >
                <div className="flex flex-col gap-3 w-full pb-10">
                    {sorted.map((msg, i) => {
                        const currentDate = msg.created_at ? parseISO(msg.created_at) : null
                        const prevCreated = i > 0 ? sorted[i - 1].created_at : null
                        const previousDate = prevCreated ? parseISO(prevCreated) : null
                        const showDivider = !!currentDate && (!previousDate || !isSameDay(currentDate, previousDate))

                        return (
                            <div key={msg.id}>
                                {showDivider && <DateDivider date={currentDate} />}
                                <Message
                                    username={msg.username}
                                    content={msg.content}
                                    created_at={msg.created_at}
                                    isOwn={msg.username === username}
                                />
                            </div>
                        )
                    })}
                </div>
            </ScrollArea>

            {/* Bottom Shadow Overlay */}
            <div
                className="pointer-events-none absolute bottom-12 left-0 w-[99%] h-16
                 bg-gradient-to-t from-background via-background/85 to-transparent" // CHANGE: Use color variables
            />

            {/* Top Shadow Overlay */}
            <div
                className="pointer-events-none absolute top-0 left-0 w-[99%] h-16
                 bg-gradient-to-b from-background via-background/80 to-transparent" // CHANGE: Use color variables
                style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent)' }}
            />
        </div>
    )
}
