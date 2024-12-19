import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebase";
import { useUser } from "../context/UserContext";

const UserDetailPage: React.FC = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [friendshipStatus, setFriendshipStatus] = useState<string>("none"); // "none", "sent", "friends"

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userDocRef = doc(db, "profiles", id as string);
        const docSnapshot = await getDoc(userDocRef);
        debugger;
        if (docSnapshot.exists()) {
          setUserData(docSnapshot.data());
        } else {
          setError("User not found!");
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const checkFriendshipStatus = async () => {
      debugger;
      let test = userData;
      if (user?.uid && id) {
        try {
          debugger;
          const q = query(collection(db, "friendRequests"), where("fromUser", "in", [user.uid, id]), where("toUser", "in", [user.uid, id]));

          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const request = querySnapshot.docs[0].data();
            if (request.status === "accepted") {
              setFriendshipStatus("friends");
            } else if (request.status === "pending") {
              setFriendshipStatus("sent");
            }
          }
        } catch (err) {
          console.error("Error checking friendship status:", err);
        }
      }
    };

    fetchUserData();
    checkFriendshipStatus();
  }, [user?.uid, id]);

  const sendFriendRequest = async () => {
    if (!user || !id) return;
    debugger;
    try {
      await addDoc(collection(db, "friendRequests"), {
        fromUser: user.uid,
        toUser: id,
        status: "pending",
      });
      setFriendshipStatus("sent");
      alert("Friend request sent successfully!");
    } catch (err) {
      console.error("Error sending friend request:", err);
      alert("Failed to send friend request. Try again later.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-lg font-medium">Loading user details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg font-medium">{error}</p>
      </div>
    );
  }
  const renderSection = (title: string, data: any) => (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(data).map(([key, value]: any) => (
          <p key={key} className="text-gray-600">
            <strong className="capitalize">{key.replace(/([A-Z])/g, " $1")}:</strong> {value}
          </p>
        ))}
      </div>
    </div>
  );
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="relative">
          <img src={userData?.coverPhoto || "https://via.placeholder.com/1200x400?text=Cover+Image"} alt="Cover" className="w-full h-56 object-cover" />
          <div className="absolute bottom-0 left-6 transform translate-y-1/2">
            <img src={userData?.profilePicture || "https://via.placeholder.com/150?text=Profile+Image"} alt="Profile" className="w-36 h-36 rounded-full border-4 border-white shadow-md" />
          </div>
        </div>

        {/* User Content */}
        <div className="p-6 mt-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{userData?.fullName || "Name Not Provided"}</h1>
          <p className="text-gray-600 mb-6">{userData?.occupation || "Occupation Not Provided"}</p>

          <>
            {friendshipStatus === "none" && (
              <button onClick={sendFriendRequest} className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white">
                Send Friend Request
              </button>
            )}
            {friendshipStatus === "sent" && (
              <button disabled className="px-4 py-2 rounded bg-gray-400 text-white cursor-not-allowed">
                Request Sent
              </button>
            )}
            {friendshipStatus === "friends" && (
              <button disabled className="px-4 py-2 rounded bg-green-500 text-white cursor-not-allowed">
                Friends
              </button>
            )}
          </>

          {/* Basic Information */}
          {renderSection("Personal Information", {
            gender: userData?.gender,
            age: userData?.dateOfBirth,
            city: userData?.city,
            state: userData?.state,
            country: userData?.country,
            height: userData?.height,
            weight: userData?.weight,
            bloodGroup: userData?.bloodGroup,
            complexion: userData?.complexion,
            phone: userData?.phone,
            email: userData?.email,
          })}

          {/* Family Information */}
          {renderSection("Family Details", {
            familyType: userData?.familyType,
            familyStatus: userData?.familyStatus,
            fatherOccupation: userData?.fatherOccupation,
            motherOccupation: userData?.motherOccupation,
            siblings: userData?.siblings,
          })}

          {/* Preferences */}
          {renderSection("Preferences", {
            foodPreference: userData?.foodPreference,
            drinking: userData?.drinking,
            smoking: userData?.smoking,
            manglik: userData?.manglik,
            expectations: userData?.expectations,
          })}

          {/* Horoscope */}
          {renderSection("Horoscope", {
            horoscope: userData?.horoscope,
            star: userData?.star,
            rashi: userData?.rashi,
            gothra: userData?.gothra,
          })}

          {/* Hobbies */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Hobbies</h3>
            <p className="text-gray-600">{userData?.hobbies || "Not provided"}</p>
          </div>

          {/* Additional Images */}
          {userData?.additionalImages && userData.additionalImages.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Additional Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {userData.additionalImages.map((img: string, index: number) => (
                  <img key={index} src={img} alt={`Additional Image ${index + 1}`} className="w-full h-40 object-cover rounded-lg shadow-sm" />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailPage;
