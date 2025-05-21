import { useState } from "react";
import LaggyChatRoom from "./LaggyChatRoom"; // 👈 use the broken one

export default function Task1() {
  const [messages, setMessages] = useState<{ id: number; text: string }[]>([]);

  const handleSendMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: Date.now(), text }]);
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Task 1: The Laggy Chat</h1>
      <p className="mb-4 text-sm text-gray-600">
        This is the original, unoptimized implementation. Try typing fast to see the lag.
      </p>
      <LaggyChatRoom messages={messages} onSendMessage={handleSendMessage} />
    </div>
  );
}
