import React, { useEffect, useState, useRef } from "react";
import { collection, query, where, onSnapshot, addDoc, orderBy, serverTimestamp, getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { FaTrash } from "react-icons/fa";
import { onAuthStateChanged } from "firebase/auth";

interface User {
  id: string;
  fullName: string;
  profilePicture: string;
}

interface Message {
  id?: string;
  text: string;
  fromUserId: string;
  toUserId: string;
  timestamp?: any;
}

const Chat: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any | null>(null);


  // Request notification permission when the component mounts
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Scroll to bottom of messages when messages are updated
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user:any) => {
      if (user) {
        debugger
        setCurrentUser(user)
        setCurrentUserId(user.email); // Set current user ID when authenticated
      } else {
        setCurrentUserId(null); // Clear current user ID when not authenticated
      }
    });

    return () => unsubscribeAuth();
  }, [auth]);

  // Fetch user profiles
  useEffect(() => {
    const usersRef = collection(db, "profiles");
    const unsubscribe = onSnapshot(usersRef, (snapshot) => {
      const usersList: any = snapshot.docs.map((doc) => {
        const { id: _, ...userData } = doc.data(); // Exclude 'id' key if it exists
        return {
          id: doc.id, // Explicitly set Firestore document ID
          ...userData, // Spread remaining data
        };
      }).filter((user) => user.id !== currentUserId);;

      setUsers(usersList);
    });
    return () => unsubscribe();
  }, [currentUserId]);

  // Real-time listener for messages
  useEffect(() => {
    if (!selectedUser || !currentUser) return;

    const messagesRef = collection(db, "messages");

    const q = query(messagesRef, where("fromUserId", "in", [currentUser.email, selectedUser.id]), where("toUserId", "in", [currentUser.email, selectedUser.id]), orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesList: Message[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Message),
      }));

      // Check for new messages and trigger notifications
      const latestMessage = snapshot.docChanges().find((change) => change.type === "added");
      if (latestMessage) {
        const newMessage = latestMessage.doc.data() as Message;
        if (newMessage.fromUserId !== currentUser.email) {
          triggerNotification(newMessage.text);
        }
      }

      setMessages(messagesList);
      scrollToBottom(); // Auto-scroll to bottom
    });

    return () => unsubscribe();
  }, [selectedUser, currentUser]);

  // Send message
  const sendMessage = async () => {
    if (!messageText.trim() || !selectedUser || !currentUser) return;

    const messagesRef = collection(db, "messages");
    await addDoc(messagesRef, {
      text: messageText,
      fromUserId: currentUser.email,
      toUserId: selectedUser.id,
      timestamp: serverTimestamp(),
    });

    setMessageText("");
  };

  // Function to trigger browser notification
  const triggerNotification = (messageText: string) => {
    if (Notification.permission === "granted") {
      new Notification("New Message", {
        body: messageText,
        icon: "https://via.placeholder.com/40", // Replace with your app icon
      });
    }
  };

  // Function to delete chat history with a specific user
  const deleteChatHistory = async (userId: string) => {
    if (!currentUser) return;

    try {
      const messagesRef = collection(db, "messages");
      const q = query(messagesRef, where("fromUserId", "in", [currentUser.email, userId]), where("toUserId", "in", [currentUser.email, userId]));

      // Get all messages that match the query
      const snapshot = await getDocs(q);

      // Delete each message
      const deletePromises = snapshot.docs.map((docItem) => deleteDoc(doc(db, "messages", docItem.id)));
      await Promise.all(deletePromises);

      console.log("Chat history deleted successfully");
      setMessages([]); // Clear local state
      setSelectedUser(null); // Optionally unselect the user
    } catch (error) {
      console.error("Error deleting chat history:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar for users */}
      <div className="w-1/3 bg-gray-100 border-r overflow-y-auto">
        <h2 className="text-lg font-semibold p-4">Chats</h2>
        {users.map((user) => (
          <div
            key={user.id}
            className={`p-4 flex items-center justify-between cursor-pointer hover:bg-gray-200 ${selectedUser?.id === user.id ? "bg-gray-300" : ""}`}
            onClick={() => setSelectedUser(user)}
          >
            {/* User Info */}
            <div className="flex items-center">
              <img src={user.profilePicture || "https://via.placeholder.com/40"} alt={user.fullName} className="w-10 h-10 rounded-full mr-4" />
              <span className="text-gray-700">{user.fullName}</span>
            </div>

            {/* Delete Button */}
            <div
              onClick={(e) => {
                e.stopPropagation(); // Prevent selecting the user when deleting
                deleteChatHistory(user.id);
              }}
              className="text-red-500 hover:text-red-700"
              title="Delete Chat History"
            >
              <FaTrash size={15} />
            </div>
          </div>
        ))}
      </div>

      {/* Chat window */}
      <div className="w-2/3 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-gray-200 border-b flex items-center">
              <img src={selectedUser.profilePicture} alt={selectedUser.fullName} className="w-10 h-10 rounded-full mr-4" />
              <span className="text-lg font-semibold">{selectedUser.fullName}</span>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-white space-y-2">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.fromUserId === currentUser?.email ? "justify-end" : "justify-start"}`}>
                  <div className={`p-2 rounded-lg max-w-xs ${msg.fromUserId === currentUser?.email ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>{msg.text}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-gray-100 flex items-center">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-lg"
              />
              <button onClick={sendMessage} className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-500">Select a user to chat with</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
