import React, { useEffect, useState } from "react";
import { getFirestore, collection, addDoc, getDocs, updateDoc, query, where, doc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { useUser } from "../context/UserContext";
const FriendsRequestPage: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([]);
  //  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useUser();

  const [friendshipStatus, setFriendshipStatus] = useState<{
    [email: string]: "none" | "sent" | "friends";
  }>({});

  useEffect(() => {
    let test = user;
   
    // const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //   setUser(currentUser);
    //   setLoading(false);
    //   if (currentUser) {
    if (user) {
     
      fetchRequests();
      fetchFriends();
    }

    //   }
    // });

    // return () => unsubscribe(); // Cleanup the listener
  }, [user]);

  const fetchRequests = async () => {
 
    const q = query(collection(db, "friendRequests"), where("toUser", "==", user?.uid), where("status", "==", "pending"));
    const snapshot = await getDocs(q);
    setRequests(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const fetchFriends = async () => {
    const q1 = query(collection(db, "friends"), where("user1", "==", user?.uid));
    const q2 = query(collection(db, "friends"), where("user2", "==", user?.uid));

    const [snapshot1, snapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);

    const friendsList = [...snapshot1.docs.map((doc) => doc.data().user2), ...snapshot2.docs.map((doc) => doc.data().user1)];

    setFriends(friendsList);
    updateFriendshipStatus(friendsList, user);
  };

  const updateFriendshipStatus = async (friendsList: string[], currentUser: any) => {
    const status: { [email: string]: "none" | "sent" | "friends" } = {};

    // Mark existing friends
    friendsList.forEach((friend) => {
      status[friend] = "friends";
    });

    // Check pending requests
    const q = query(collection(db, "friendRequests"), where("fromUser", "==", currentUser.uid));
    const snapshot = await getDocs(q);

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      if (data.toUser) {
        status[data.toUser] = "sent";
      }
    });

    setFriendshipStatus(status);
  };

  const sendFriendRequest = async (fromUser: string, toUser: string) => {
    if (friendshipStatus[toUser] === "sent") {
      alert("You have already sent a friend request to this user.");
      return;
    }
    if (friendshipStatus[toUser] === "friends") {
      alert("You are already friends with this user.");
      return;
    }

    await addDoc(collection(db, "friendRequests"), {
      fromUser,
      toUser,
      status: "pending",
      timestamp: new Date(),
    });

    alert("Friend request sent successfully!");
    setFriendshipStatus((prev) => ({ ...prev, [toUser]: "sent" }));
  };

  const handleAction = async (requestId: string, action: "accept" | "reject" | "block") => {
    const requestRef = doc(db, "friendRequests", requestId);

    if (action === "accept") {
      const request = requests.find((r) => r.id === requestId);

      // Add to friends list
      if (request && !friends.includes(request.fromUser)) {
        await addDoc(collection(db, "friends"), {
          user1: request.fromUser,
          user2: request.toUser,
        });
        await addDoc(collection(db, "friendRequests"), {
          fromUser: request.fromUser,
          toUser: request.toUser,
          status: "accepted",
        });
        setFriends((prev) => [...prev, request.fromUser]);
        setFriendshipStatus((prev) => ({
          ...prev,
          [request.fromUser]: "friends",
        }));
      }

      await deleteDoc(requestRef); // Remove request after acceptance
    }

    if (action === "block" || action === "reject") {
      await deleteDoc(requestRef); // Remove request
    }

    fetchRequests();
  };

  // const renderButton = (email: string) => {
  //   if (friendshipStatus[email] === "friends") {
  //     return (
  //       <button disabled className="px-4 py-1 bg-green-500 text-white rounded">
  //         Friends
  //       </button>
  //     );
  //   }
  //   if (friendshipStatus[email] === "sent") {
  //     return (
  //       <button disabled className="px-4 py-1 bg-gray-400 text-white rounded">
  //         Request Sent
  //       </button>
  //     );
  //   }
  //   return (
  //     <button onClick={() => sendFriendRequest(user.email, email)} className="px-4 py-1 bg-blue-500 text-white rounded">
  //       Send Friend Request
  //     </button>
  //   );
  // };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Friend Requests</h1>
      <div>
        {requests.map((request) => (
          <div key={request.id} className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
            <span>{request.fromUser}</span>
            <div className="space-x-2">
              <button onClick={() => handleAction(request.id, "accept")} className="px-4 py-1 bg-green-500 text-white rounded">
                Accept
              </button>
              <button onClick={() => handleAction(request.id, "reject")} className="px-4 py-1 bg-yellow-500 text-white rounded">
                Reject
              </button>
              <button onClick={() => handleAction(request.id, "block")} className="px-4 py-1 bg-red-500 text-white rounded">
                Block
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mt-6 mb-4">Your Friends</h2>
      <ul>
        {friends.map((friend, index) => (
          <li key={index} className="bg-gray-200 p-2 rounded mb-2">
            {friend}
          </li>
        ))}
      </ul>

      {/* <h2 className="text-xl font-bold mt-6 mb-4">Other Users</h2>
      <div>
        
        {["user1@example.com", "user2@example.com", "user3@example.com"].map((email) => (
          <div key={email} className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
            <span>{email}</span>
            {renderButton(email)}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default FriendsRequestPage;
