import React, { useEffect, useState } from "react";
import { getFirestore, doc, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "../services/firebase"; // Firebase Initialization

const db = getFirestore(app);
const auth = getAuth(app);

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: any;
}

const MessagingService: React.FC<{ chatId: string }> = ({ chatId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const currentUser = auth.currentUser; // Authenticated user

  // Fetch messages in real-time
  useEffect(() => {
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages: Message[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Message[];
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, [chatId]);

  // Send a new message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const messagesRef = collection(db, "chats", chatId, "messages");
      await addDoc(messagesRef, {
        senderId: currentUser?.uid,
        text: newMessage,
        timestamp: serverTimestamp(),
      });

      setNewMessage(""); // Clear input field
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto mt-10 border rounded-lg shadow-md">
      <div className="p-4 bg-gray-200 text-center font-bold">Chat Room</div>
      <div className="flex-1 p-4 overflow-y-auto h-64 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`my-2 p-2 rounded-md ${msg.senderId === currentUser?.uid ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 mr-auto"}`}
            style={{ maxWidth: "70%" }}
          >
            <p>{msg.text}</p>
            <small className="text-xs block text-right">
              {msg.timestamp?.toDate()?.toLocaleTimeString() || "Sending..."}
            </small>
          </div>
        ))}
      </div>
      <div className="p-4 flex items-center border-t">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-md mr-2"
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default MessagingService;
