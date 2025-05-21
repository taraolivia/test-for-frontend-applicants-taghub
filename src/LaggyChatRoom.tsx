import { useState } from "react";
import { useLog } from "./hooks/useLog";


function Message({
  message,
}: {
  message: { id: number; text: string };
}) {
  console.log(`🔁 Rendering message: ${message.text}`);
  return <div>{message.text}</div>;
}



export default function LaggyChatRoom({
  messages,
  onSendMessage,
}: {
  messages: { id: number; text: string }[];
  onSendMessage: (text: string) => void;
}) {
  const [text, setText] = useState("");
  const { logs, log } = useLog();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onSend = () => {
    onSendMessage(text);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Laggy Chat</h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: 8,
          height: 200,
          overflowY: "auto",
        }}
      >
        {messages.map((message) => (
          <Message key={message.id} message={message} onRender={log} />
        ))}
      </div>
      <input
        value={text}
        onChange={onChange}
        placeholder="Type something..."
        style={{ width: "100%", margin: "8px 0", padding: 8 }}
      />
      <button onClick={onSend}>Send</button>

      <div
        style={{
          background: "#111",
          color: "#0f0",
          fontFamily: "monospace",
          fontSize: "0.8rem",
          padding: 8,
          marginTop: 16,
          height: 200,
          overflowY: "auto",
        }}
      >
        <strong>Render Log:</strong>
        <ul style={{ marginTop: 8 }}>
          {logs.map((l, i) => (
            <li key={i}>{l}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
