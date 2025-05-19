// src/pages/Task1.tsx
import { useState } from 'react'
import ChatRoom from './ChatRoom';

export default function Task1() {
  const [messages, setMessages] = useState<{ id: number; text: string }[]>([])

  const handleSendMessage = (text: string) => {
    setMessages(prev => [
      ...prev,
      { id: Date.now(), text }
    ])
  }

  return (
    <ChatRoom
      messages={messages}
      onSendMessage={handleSendMessage}
    />
  )
}
