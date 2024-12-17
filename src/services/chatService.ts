
import { collection, addDoc, doc, updateDoc, getDoc, arrayUnion, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";
// Function to create a new chat room
// export const createChatRoom = async (user1Id: string, user2Id: string) => {
//     const chatsRef = collection(db, "chats");

//     try {
//         const chatDoc = await addDoc(chatsRef, {
//             users: [user1Id, user2Id], // IDs of the two users in the chat
//             createdAt: new Date(),
//         });

//         console.log("Chat room created with ID:", chatDoc.id);
//         return chatDoc.id;
//     } catch (error) {
//         console.error("Error creating chat room:", error);
//     }
// };

// Function to create a new chat room
export const createChatRoom = async (user1Id: string, user2Id: string) => {
    try {
        debugger;
        const chatsRef = collection(db, "chats");

        // Check if chat room already exists
        const q = query(chatsRef, where("users", "in", [[user1Id, user2Id], [user2Id, user1Id]]));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            console.log("Chat room already exists.");
            return querySnapshot.docs[0].id; // Return existing chat ID
        }

        // Create a new chat room
        const chatDoc = await addDoc(chatsRef, {
            users: [user1Id, user2Id],
            createdAt: new Date(),
        });

        console.log("Chat room created with ID:", chatDoc.id);
        return chatDoc.id;
    } catch (error) {
        console.error("Error creating chat room:", error);
    }
};

// Function to send a message to a chat room
export const sendMessage = async (chatId: string, senderId: string, message: string) => {
    try {
        const chatRef = doc(db, "chats", chatId);
        const chatDoc = await getDoc(chatRef);

        if (chatDoc.exists()) {
            await updateDoc(chatRef, {
                messages: arrayUnion({
                    senderId,
                    message,
                    createdAt: new Date(),
                }),
            });
            console.log("Message sent!");
        } else {
            console.error("Chat room does not exist.");
        }
    } catch (error) {
        console.error("Error sending message:", error);
    }
};
