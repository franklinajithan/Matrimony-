import React, { useEffect, useState, useContext } from "react";
import { getFirestore, collection, addDoc, getDocs, updateDoc, query, where, doc, deleteDoc } from "firebase/firestore";

import { db } from "../services/firebase";
import { UserContext } from "../context/UserContext";

import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../services/firebase";


const FriendsRequestPage: React.FC = () => {
 // const { user } = useContext(UserContext); // Get logged-in user


  const [requests, setRequests] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([]);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      debugger
      setUser(currentUser);
      setLoading(false);
      fetchRequests(currentUser);
      fetchFriends(currentUser);
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  // Fetch friend requests
  const fetchRequests = async (currentUser:any) => {
    const q = query(collection(db, "friendRequests"), where("toUser", "==", currentUser.email));
    const snapshot = await getDocs(q);
    setRequests(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  // Fetch accepted friends
  const fetchFriends = async (currentUser:any) => {
    const q = query(collection(db, "friends"), where("user1", "==", currentUser.email));
    const snapshot = await getDocs(q);
    setFriends(snapshot.docs.map(doc => doc.data()));
  };

  const handleAction = async (requestId: string, action: "accept" | "reject" | "block") => {
    const requestRef = doc(db, "friendRequests", requestId);

    if (action === "accept") {
      const request = requests.find(r => r.id === requestId);
      await addDoc(collection(db, "friends"), { user1: request.fromUser, user2: request.toUser });
    }

    if (action === "block" || action === "reject") {
      await deleteDoc(requestRef); // Remove request
    } else {
      await updateDoc(requestRef, { status: action });
    }

    fetchRequests(user);
    fetchFriends(user);
  };

  useEffect(() => {
   
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Friend Requests</h1>
      <div>
        {requests.map(request => (
          <div key={request.id} className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
            <span>{request.fromUser}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleAction(request.id, "accept")}
                className="px-4 py-1 bg-green-500 text-white rounded"
              >
                Accept
              </button>
              <button
                onClick={() => handleAction(request.id, "reject")}
                className="px-4 py-1 bg-yellow-500 text-white rounded"
              >
                Reject
              </button>
              <button
                onClick={() => handleAction(request.id, "block")}
                className="px-4 py-1 bg-red-500 text-white rounded"
              >
                Block
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mt-6 mb-4">Your Friends</h2>
      <ul>
        {friends.map(friend => (
          <li key={friend.id} className="bg-gray-200 p-2 rounded mb-2">
            {friend.user2}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsRequestPage;
