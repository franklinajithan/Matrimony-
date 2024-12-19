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
  // const [currentUser, setCurrentUser] = useState<any | null>(null);

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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        setCurrentUserId(user.uid);
        fetchFriends(user);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch user profiles
  const fetchFriends = async (user: any) => {
    try {
      // Queries to find friends where the user is either user1 or user2
      const q1 = query(collection(db, "friends"), where("user1", "==", user?.uid));
      const q2 = query(collection(db, "friends"), where("user2", "==", user?.uid));

      // Get snapshots of the queries
      const [snapshot1, snapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);

      // Extract friend IDs from both queries
      const friendIds = [...snapshot1.docs.map((doc) => doc.data().user2), ...snapshot2.docs.map((doc) => doc.data().user1)];

      // Remove duplicates and fetch profiles from the `profiles` collection
      const uniqueFriendIds = Array.from(new Set(friendIds));
      const userPromises = uniqueFriendIds.map((id) => getDocs(query(collection(db, "profiles"), where("__name__", "==", id))));

      // Resolve all user profile queries
      const userSnapshots = await Promise.all(userPromises);

      // Map data to the User interface and include the document ID
      const friends: any = userSnapshots
        .map((snap, index) => {
          const doc = snap.docs[0];
          if (doc) {
            return {
              id: doc.id, // Bind the document ID
              ...doc.data(),
            } as User;
          }
          return null;
        })
        .filter(Boolean); // Filter out null values

      setUsers(friends);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  // Real-time listener for messages
  useEffect(() => {
    if (!selectedUser || !currentUserId) return;

    const messagesRef = collection(db, "messages");

    const q = query(messagesRef, where("fromUserId", "in", [currentUserId, selectedUser.id]), where("toUserId", "in", [currentUserId, selectedUser.id]), orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesList: Message[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Message),
      }));

      // Check for new messages and trigger notifications
      const latestMessage = snapshot.docChanges().find((change) => change.type === "added");
      if (latestMessage) {
        const newMessage = latestMessage.doc.data() as Message;
        if (newMessage.fromUserId !== currentUserId) {
          triggerNotification(newMessage.text);
        }
      }

      setMessages(messagesList);
      scrollToBottom(); // Auto-scroll to bottom
    });

    return () => unsubscribe();
  }, [selectedUser, currentUserId]);

  // Send message
  const sendMessage = async () => {
    if (!messageText.trim() || !selectedUser || !currentUserId) return;

    const messagesRef = collection(db, "messages");
    await addDoc(messagesRef, {
      text: messageText,
      fromUserId: currentUserId,
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
    if (!currentUserId) return;

    try {
      const messagesRef = collection(db, "messages");
      const q = query(messagesRef, where("fromUserId", "in", [currentUserId, userId]), where("toUserId", "in", [currentUserId, userId]));

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
<main className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 flex flex-col p-2 sm:p-4">
  <div className="flex flex-col md:flex-row w-full bg-white">
    {/* Sidebar for users */}
    <div className="w-full md:w-1/3 bg-gray-50 border-b md:border-r md:border-b-0 border-gray-200 overflow-y-auto">
      <h2 className="text-lg sm:text-xl font-semibold p-4 text-gray-700 border-b">Chats</h2>
      {users.map((user: any) => (
        <div
          key={user.id}
          className={`p-4 flex items-center justify-between cursor-pointer transition-colors duration-200 ${
            selectedUser?.id === user.id ? "bg-blue-100" : "hover:bg-gray-100"
          }`}
          onClick={() => setSelectedUser(user)}
        >
          {/* User Info */}
          <div className="flex items-center">
            <img
              src={user.profilePicture}
              alt={user.fullName}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-300 mr-4"
            />
            <span className="text-sm sm:text-base text-gray-700 font-medium">{user.fullName}</span>
          </div>

          {/* Delete Button */}
          <div
            onClick={(e) => {
              e.stopPropagation(); // Prevent selecting the user when deleting
              deleteChatHistory(user.id);
            }}
            className="text-gray-500 hover:text-red-500 transition-colors duration-200"
            title="Delete Chat History"
          >
            <FaTrash size={16} />
          </div>
        </div>
      ))}
    </div>

    {/* Chat window */}
    <div className="w-full md:w-2/3 flex flex-col">
      {selectedUser ? (
        <>
          {/* Chat Header */}
          <div className="p-4 bg-blue-500 text-white flex items-center border-b">
            <img
              src={selectedUser.profilePicture}
              alt={selectedUser.fullName}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-4 border border-white"
            />
            <span className="text-sm sm:text-lg font-semibold">{selectedUser.fullName}</span>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.fromUserId === currentUserId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-xl shadow-md max-w-xs ${
                    msg.fromUserId === currentUserId
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white flex items-center">
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
              className="flex-1 p-2 sm:p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base"
            />
            <button
              onClick={sendMessage}
              className="ml-3 bg-blue-500 text-white px-3 py-2 sm:px-5 sm:py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-200 text-sm sm:text-base"
            >
              Send
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-50">
          <span className="text-gray-500 text-sm sm:text-lg">
            Select a user to chat with
          </span>
        </div>
      )}
    </div>
  </div>
</main>

  );
};

export default Chat;
