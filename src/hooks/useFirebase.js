import { useEffect, useState } from 'react'
import { db } from '@/utils/firebaseClient'
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  getDocs,
} from 'firebase/firestore'

export function useFirebaseMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    const messagesRef = collection(db, 'messages')
    const q = query(messagesRef, orderBy('created_at', 'asc'))

    const unsub = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((d) => {
        const data = d.data()
        const created = data.created_at?.toDate
          ? data.created_at.toDate().toISOString()
          : data.created_at || null
        return { id: d.id, ...data, created_at: created }
      })
      setMessages(docs)
      setLoading(false)
    })

    return () => unsub()
  }, [])

  async function fetchMessagesOnce() {
    const snapshot = await getDocs(query(collection(db, 'messages'), orderBy('created_at', 'asc')))
    return snapshot.docs.map((d) => {
      const data = d.data()
      const created = data.created_at?.toDate
        ? data.created_at.toDate().toISOString()
        : data.created_at || null
      return { id: d.id, ...data, created_at: created }
    })
  }

  async function sendMessage(username, content) {
    const trimmed = content.trim()
    if (!trimmed) return

    try {
      setSending(true)
      await addDoc(collection(db, 'messages'), {
        username,
        content: trimmed,
        created_at: serverTimestamp(),
      })
    } finally {
      setSending(false)
    }
  }

  return { messages, loading, sending, sendMessage, fetchMessagesOnce }
}

