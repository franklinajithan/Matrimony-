import React, { useEffect, useState } from "react";
import { getFirestore, collection, addDoc, getDocs, updateDoc, query, where, doc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { useUser } from "../context/UserContext";
import { debug } from "util";
const Dashboard: React.FC = () => {
  const { user } = useUser();
  const [requests, setRequests] = useState<any[]>([]);
  const [friends, setFriends] = useState<any[]>([]);
  // const [friends] = useState([
  //   { name: "Rachel Green", location: "London", img: "https://via.placeholder.com/100" },
  //   { name: "Monica Geller", location: "Manchester", img: "https://via.placeholder.com/100" },
  // ]);

  useEffect(() => {
    if (user) {
      fetchRequests();
      fetchFriends();
    }
  }, [user]);

  const [friendRequests] = useState([
    { name: "Chandler Bing", location: "New York", img: "https://via.placeholder.com/100" },
    { name: "Ross Geller", location: "London", img: "https://via.placeholder.com/100" },
  ]);

  const [matches] = useState([
    { name: "John Doe", age: 28, location: "London", compatibility: "95%", img: "https://via.placeholder.com/100" },
    { name: "Jane Smith", age: 26, location: "Manchester", compatibility: "90%", img: "https://via.placeholder.com/100" },
  ]);

  const [favorites] = useState([
    { name: "Michael Brown", age: 32, location: "London", img: "https://via.placeholder.com/100" },
    { name: "Sarah Wilson", age: 27, location: "Liverpool", img: "https://via.placeholder.com/100" },
  ]);

  const [messages] = useState([
    { from: "John Doe", text: "Hi! How are you?", time: "2 hours ago" },
    { from: "Jane Smith", text: "Looking forward to chatting!", time: "1 day ago" },
  ]);

  const [recentVisitors] = useState([
    { name: "Michael Scott", age: 40, location: "Scranton", img: "https://via.placeholder.com/100" },
    { name: "Pam Beesly", age: 35, location: "Scranton", img: "https://via.placeholder.com/100" },
  ]);

  const [events] = useState([
    { title: "Virtual Matchmaking Event", date: "December 20, 2024", description: "Join us online for a matchmaking event." },
    { title: "Horoscope Compatibility Webinar", date: "January 15, 2025", description: "Learn about horoscope-based compatibility." },
  ]);

  const [recommendations] = useState([
    { name: "Robert Johnson", age: 29, location: "Leeds", compatibility: "92%", img: "https://via.placeholder.com/100" },
    { name: "Sophia Martinez", age: 25, location: "Bristol", compatibility: "89%", img: "https://via.placeholder.com/100" },
  ]);

  const horoscope = "Today is a great day for making connections and exploring new opportunities in your relationships.";
  const [friendshipStatus, setFriendshipStatus] = useState<{
    [email: string]: "none" | "sent" | "friends";
  }>({});

  const fetchFriends = async () => {
    const q1 = query(collection(db, "friends"), where("user1", "==", user?.uid));
    const q2 = query(collection(db, "friends"), where("user2", "==", user?.uid));

    const [snapshot1, snapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);

    const friendsList = [...snapshot1.docs.map((doc) => doc.data().user2), ...snapshot2.docs.map((doc) => doc.data().user1)];
    const userPromises = friendsList.map((id) => getDocs(query(collection(db, "profiles"), where("__name__", "==", id))));
    const userSnapshots = await Promise.all(userPromises);

    const friends: any = userSnapshots
      .map((snap, index) => {
        const doc = snap.docs[0];
        if (doc) {
          return {
            id: doc.id, // Bind the document ID
            ...doc.data(),
          } as any;
        }
        return null;
      })
      .filter(Boolean); // Filter out null values
    setFriends(friends);

    updateFriendshipStatus(friends, user);
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

  const handleAction = async (requestId: string, action: "accept" | "reject" | "block") => {
    debugger;
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

  const fetchRequests = async () => {
    // const friendRequestsCollection = query(collection(db, "friendRequests"), where("toUser", "==", user?.uid), where("status", "==", "pending"));
    // const profilesCollection = collection(db, "profiles");

    // try {
    //   // Step 1: Get all friend requests
    //   const friendRequestsSnapshot = await getDocs(friendRequestsCollection);

    //   // Step 2: Extract `toUser` IDs from friend requests
    //   const toUserIds = friendRequestsSnapshot.docs.map((doc) => doc.data().fromUser);

    //   // Step 3: Query profiles where ID is in `toUserIds`
    //   const profilesQuery = query(profilesCollection, where("__name__", "in", toUserIds));
    //   const profilesSnapshot = await getDocs(profilesQuery);

    //   // Step 4: Map profile data
    //   const profiles = profilesSnapshot.docs.map((doc) => {
    //     debugger;
    //     return { id: doc.id, ...doc.data() };
    //   });
    //   debugger;
    //   setRequests(profiles);

    //   // Optionally, you can merge friend requests with profiles for a detailed response
    //   const friendRequestsWithProfiles = friendRequestsSnapshot.docs.map((doc) => {
    //     const friendRequest = doc.data();
    //     const profile = profiles.find((profile) => profile.id === friendRequest.toUser);
    //     return { ...friendRequest, profile };
    //   });

    //   console.log("Friend Requests with Profiles:", friendRequestsWithProfiles);

    //   return friendRequestsWithProfiles;
    // } catch (error) {
    //   console.error("Error fetching friend requests or profiles:", error);
    // }

    try {
      // Fetch friendRequests
      const friendRequestsCollection = query(collection(db, "friendRequests"), where("toUser", "==", user?.uid), where("status", "==", "pending"));

      const friendRequestsSnapshot = await getDocs(friendRequestsCollection);

      const friendRequestsData = friendRequestsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<any, "id">),
      }));

      // Extract unique `fromUser` and `toUser` IDs
      const userIds = Array.from(new Set([...friendRequestsData.map((req: any) => req.fromUser), ...friendRequestsData.map((req:any) => req.toUser)]));
debugger;
      // Fetch profiles for `fromUser` and `toUser`
      const profilesPromises = userIds.map((id) => getDocs(query(collection(db, "profiles"), where("__name__", "==", id))));
      const profilesSnapshots = await Promise.all(profilesPromises);

      // Map profiles by ID
      const profilesMap: Record<string, any> = {};
      profilesSnapshots.forEach((snapshot) => {
        if (!snapshot.empty) {
          const doc = snapshot.docs[0]; // Each ID should have one profile
          profilesMap[doc.id] = {
            id: doc.id,
            ...(doc.data() as any),
          };
        }
      });

      // Combine friendRequests with profiles
      const combinedData = friendRequestsData.map((req: any) => ({
        ...req,
        fromUserProfile: profilesMap[req.fromUser] || null,
        toUserProfile: profilesMap[req.toUser] || null,
      }));
      debugger;
      setRequests(combinedData);
    } catch (error) {
      console.error("Error fetching friend requests and profiles:", error);
    } finally {
      //setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-purple-50 to-purple-200">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 p-4 md:p-6 bg-purple-100">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-bold text-purple-900 mb-4 md:mb-6">Friends</h2>
          <ul className="space-y-4">
            {friends.map((friend, index) => (
              <li key={index} className="flex items-center">
                <img src={friend.profilePicture} alt={friend.fullName} className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full mr-4" />
                <div>
                  <h3 className="text-sm font-bold text-gray-800">{friend.fullName}</h3>
                  <p className="text-xs text-gray-600">{friend.location}</p>
                </div>
              </li>
            ))}

            {/* {friends.map((friend: any, index) => (
              <li key={index} className="bg-gray-200 p-2 rounded mb-2">
                {friend.fullName}
              </li>
            ))} */}
          </ul>
          {/* Friend Requests */}
          <h2 className="text-lg font-bold text-purple-900 my-4 md:my-6">Friend Requests</h2>
          <ul className="space-y-4">
            {/* {friendRequests.map((request, index) => (
              <li key={index} className="flex items-center">
                <img src={request.img} alt={request.name} className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full mr-4" />
                <div>
                  <h3 className="text-sm font-bold text-gray-800">{request.name}</h3>
                  <p className="text-xs text-gray-600">{request.location}</p>
                </div>
                <button className="ml-auto text-xs md:text-sm text-purple-700 font-bold">Accept</button>
              </li>
            ))} */}

            {requests.map((request) => (
              <div key={request.id} className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2">
                <span>{request.fromUserProfile.fullName}</span>
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
          </ul>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 space-y-4 md:space-y-8">
        {/* Header */}
        <header className="p-4 bg-gradient-to-r from-violet-800 to-violet-700 text-white rounded-lg">
          <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
        </header>
        {/* Welcome Section */}
        <section className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
          <h2 className="text-sm md:text-lg font-bold text-gray-800">{user ? `Welcome, ${user.displayName || user.email}` : "No user is logged in."}</h2>
        </section>
        {/* Featured Profiles */}
        <section id="featured" className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
          <h2 className="text-lg md:text-xl font-bold text-purple-900 mb-4">Featured Profiles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {matches.map((match, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center">
                <img src={match.img} alt={match.name} className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full mb-4" />
                <h3 className="text-sm md:text-lg font-bold text-gray-800">{match.name}</h3>
                <p className="text-xs md:text-sm text-gray-600">{match.age} years old</p>
                <p className="text-xs md:text-sm text-gray-600">{match.location}</p>
                <p className="text-xs md:text-sm text-purple-700 font-semibold mt-2">Compatibility: {match.compatibility}</p>
              </div>
            ))}
          </div>
        </section>
        {/* Other Sections */}
        {[
          { id: "favorites", title: "Your Favorites", data: favorites },
          { id: "visitors", title: "Recent Visitors", data: recentVisitors },
          { id: "recommendations", title: "Recommendations", data: recommendations },
        ].map(({ id, title, data }) => (
          <section key={id} id={id} className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
            <h2 className="text-lg md:text-xl font-bold text-purple-900 mb-4">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {data.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
                  <img src={item.img} alt={item.name} className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full mb-4" />
                  <h3 className="text-sm md:text-lg font-bold text-gray-800">{item.name}</h3>
                  <p className="text-xs md:text-sm text-gray-600">{item.age} years old</p>
                  <p className="text-xs md:text-sm text-gray-600">{item.location}</p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default Dashboard;
