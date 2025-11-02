import { useState } from 'react'
import ChatBox from './components/ChatBox'
import UsernameModal from './components/UsernameModal'
import { Button } from '@/components/animate-ui/components/buttons/button.tsx'
import { useFirebaseMessages } from '@/hooks/useFirebase'

export default function Index() {
    const [username, setUsername] = useState(localStorage.getItem('username') || '')
    const [modalOpen, setModalOpen] = useState(() => !localStorage.getItem('username'))
    const [dismissed, setDismissed] = useState(false)
    const { messages, loading, sending, sendMessage } = useFirebaseMessages()

    function handleSetUsername(name) {
        localStorage.setItem('username', name)
        setUsername(name)
        setDismissed(false)
        setModalOpen(false)
    }

    if (!username) {
        if (dismissed) {
            return (
                <div className="flex h-[calc(100vh-6rem)] items-center justify-center p-6">
                    <div className="max-w-md text-center space-y-4">
                        <h2 className="text-xl font-semibold">A name is required to join the chat</h2>
                        <p className="text-muted-foreground">Please enter a display name to continue.</p>
                        <div className="flex items-center justify-center gap-2">
                            <Button onClick={() => { setModalOpen(true); setDismissed(false) }}>Enter name</Button>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <UsernameModal
                onSetUsername={handleSetUsername}
                open={modalOpen}
                onOpenChange={(open) => {
                    setModalOpen(open)
                    if (!open && !username) setDismissed(true)
                }}
            />
        )
    }


    return <ChatBox messages={messages} username={username}
        onSend={c => sendMessage(username, c)} loading={loading} sending={sending} />
}
