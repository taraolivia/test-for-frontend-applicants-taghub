import { useState, useCallback } from 'react';

export default function ChatRoom({
  messages,
  onSendMessage,
}: {
  messages: { id: number; text: string }[];
  onSendMessage: (text: string) => void;
}) {
  const [text, setText] = useState('');
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);
  const onSend = useCallback(() => {
    onSendMessage(text);
    setText('');
  }, [text, onSendMessage]);

  return (
    <div style={{ padding: 16 }}>
      <h2>Chat</h2>
      <div
        style={{
          border: '1px solid #ccc',
          padding: 8,
          height: 200,
          overflowY: 'auto',
        }}
      >
        {messages.map(m => (
          <div key={m.id}>{m.text}</div>
        ))}
      </div>
      <input
        value={text}
        onChange={onChange}
        placeholder="Type..."
        style={{ width: '100%', margin: '8px 0', padding: 8 }}
      />
      <button onClick={onSend}>Send</button>
    </div>
  );
}
