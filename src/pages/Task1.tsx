import { useState } from "react";
import LaggyChatRoom from "../components/LaggyChatRoom";
import Navbar from "../components/Navbar";

export default function Task1() {
  const [messages, setMessages] = useState<{ id: number; text: string }[]>([]);

  const handleSendMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: Date.now(), text }]);
  };

  return (
    <div className="min-h-screen p-8 w-full bg-gradient-to-br from-[#00091a] via-[#013c9b] to-[#c9a5f3] text-text-50">
      <Navbar />
      <LaggyChatRoom messages={messages} onSendMessage={handleSendMessage} />
    </div>
  );
}
