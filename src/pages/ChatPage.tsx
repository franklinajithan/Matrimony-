import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { createChatRoom, sendMessage } from "../services/chatService";

const ChatPage: React.FC = () => {
  let { id } = useParams(); // User ID of the chat participant
  const [message, setMessage] = useState("");
  const [chatId, setChatId] = useState<string | null>(null);

  const currentUserId = "franklin.ajithan@gmail.com"; // Replace with current user's ID

  const handleStartChat = async () => {
    id="admin@test.com"
    const newChatId:any = await createChatRoom(currentUserId, id!);
    setChatId(newChatId);
  };

  const handleSendMessage = async () => {
    if (chatId && message.trim()) {
      await sendMessage(chatId, currentUserId, message);
      setMessage(""); // Clear input after sending
    }
  };

  return (
    <div className="p-4">
      <h1>Chat with User {"admin@test.com"}</h1>
      {!chatId ? (
        <button onClick={handleStartChat} className="bg-blue-600 text-white px-4 py-2 rounded">
          Start Chat
        </button>
      ) : (
        <div>
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="border p-2 w-full"
          />
          <button onClick={handleSendMessage} className="bg-green-600 text-white px-4 py-2 rounded mt-2">
            Send Message
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
