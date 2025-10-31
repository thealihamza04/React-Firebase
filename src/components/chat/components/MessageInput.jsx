import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
// import Loader from '@/components/ui/loader'
import { cn } from '@/utils/cn'
import { ArrowUpRight } from "lucide-react"
import { AnimateIcon } from "@/components/ui/animate-ui/icons/icon.tsx"
import { Send } from "@/components/ui/animate-ui/icons/send.tsx"
import { Loader } from "@/components/ui/animate-ui/icons/loader.tsx"


export default function MessageInput({ onSend, sending, className }) {
    const [content, setContent] = useState('')

    function handleSend() {
        if (!content.trim() || sending) return
        onSend(content)
        setContent('')
    }

    return (
        <div className={cn("p-3 flex gap-2 fixed bottom-0 w-full left-0 ", className)}>
            <div className='w-[90%] mx-auto pl-6 shadow-[0px_0px_10px_#fafafa,-0px_-2px_10px_#fafafa] dark:shadow-[0px_0px_10px_#1f1f1f,-0px_-2px_10px_#1f1f1f]  flex flex-row p-2 bg-card border light:border-[#f0f0f0] rounded-full'
            >
                <input
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    placeholder="Type your message"
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    disabled={sending}
                    className="!border-none !bg-transparent w-full !shadow-none !outline-none"
                />
                <AnimateIcon animateOnHover>
                    <Button onClick={handleSend} disabled={sending} className="rounded-3xl h-10 w-10">
                        {
                            sending ?
                                <Loader animateOnView /> :
                                <Send />
                        }
                    </Button>
                </AnimateIcon>
            </div>
        </div>
    )
}

