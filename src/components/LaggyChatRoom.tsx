import { useState } from "react";

function Message({ message }: { message: { id: number; text: string } }) {
  return <div className="p-2 rounded bg-background-700 mb-1 text-text-50">{message.text}</div>;
}

export default function LaggyChatRoom({ messages, onSendMessage }: { messages: { id: number; text: string }[]; onSendMessage: (text: string) => void }) {
  const [text, setText] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onSend = () => {
    onSendMessage(text);
  };

  return (
    <div className="p-6 my-10 max-w-2xl mx-auto bg-background-900  rounded-xl shadow-md text-text-50">
      <h1 className="text-xl font-bold mb-4 text-accent-200">Task 1: The Laggy Chat</h1>

      <p className="mb-4 text-base text-text-50">This is the original, unoptimized implementation. Try typing fast and send many messages to see the lag.</p>

      <div className="space-y-3 mb-6 text-base leading-relaxed text-text-50 text-left">
        <h3 className="text-base font-semibold text-accent-300 text-center">Issues identified:</h3>

        <p>
          <strong>Issue 1:</strong> The <code>Message</code> component re-renders every time you type something, even when the messages themselves haven’t changed. This happens because it’s not memoized. As a result, typing starts to feel unresponsive, especially as the number of messages increases.
        </p>
        <p>
          <strong>Issue 2:</strong> The input field is managed within the same component as the message list. Every keystroke updates the input’s state, which causes the entire chat component to re-render including all message elements that should remain static.
        </p>
        <p>
          <strong>Issue 3:</strong> The message list is rendered directly inside the return block with no caching. This means React re-evaluates and re-renders the full list of messages every time the component updates even with minor changes.
        </p>
        <p className="mt-4">
          <strong>Why This Is a Problem:</strong> As the chat history grows, say to hundreds or thousands of messages, these re-renders become costly. The user may notice lag while typing, missed inputs, or UI freezes. On slower machines, the app can feel completely unresponsive.
        </p>
        <p>
          Beyond performance, there are also usability issues. For instance, users can’t press <kbd>Enter</kbd> to send a message which something nearly everyone expects in a chat interface.{" "}
        </p>
      </div>

      <div className="border border-background-600 rounded p-3 h-52 overflow-y-auto mb-6 bg-background-800">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>

      <input value={text} onChange={onChange} placeholder="Type something..." className="w-full p-2 rounded bg-background-700 border border-background-600 text-text-50 placeholder:text-text-300 mb-2" />

      <button onClick={onSend} className="px-4 py-2 bg-accent-200 hover:bg-accent-400 text-text-900 rounded transition">
        Send
      </button>

      <div className="mt-10 text-base leading-relaxed text-text-50 text-left space-y-3 border-t border-background-600 pt-6">
        <h3 className="text-base font-semibold text-accent-300 text-center">How I Would Improve It:</h3>
        <p>
          ⭐ Wrap the <code>Message</code> component in <code>React.memo()</code> so it only updates if the actual message changes. That saves a lot of work.
        </p>
        <p>⭐ Extract the message list into its own component, and memoize that too. It helps isolate it from changes like typing in the input box.</p>
        <p>
          ⭐ If the list of messages doesn't change on every render, use <code>useMemo()</code> so React doesn’t rebuild the list unless it needs to.
        </p>
        <p>⭐ Move the input handling logic out of the main chat component to reduce unnecessary updates. That way, typing stays smooth even with lots of messages.</p>
        <p>
          ⭐ Add support for sending with <kbd>Enter</kbd>.{" "}
        </p>
        <p>⭐ All of this would make the chat app feel much faster and easier to use. Even if there are tons of messages, typing would stay responsive, and the whole interface would just feel better.</p>
      </div>
    </div>
  );
}
