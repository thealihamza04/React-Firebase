import { useState } from 'react'
import ChatBox from './components/ChatBox'
import UsernameModal from './components/UsernameModal'
import { useSupabaseMessages } from '@/hooks/useSupabase'

export default function Index() {
    const [username, setUsername] = useState(localStorage.getItem('username') || '')
    const { messages, loading, sending, sendMessage } = useSupabaseMessages()

    function handleSetUsername(name) {
        localStorage.setItem('username', name)
        setUsername(name)
    }

    if (!username) return <UsernameModal onSetUsername={handleSetUsername} />


    return <ChatBox messages={messages} username={username}
        onSend={c => sendMessage(username, c)} loading={loading} sending={sending} />
}
