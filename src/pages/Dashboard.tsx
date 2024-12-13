import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../services/firebase"; // Import Firebase configuration
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [matches, setMatches] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [horoscope, setHoroscope] = useState<string>("");
  const navigate = useNavigate();

  // Monitor Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Fetch Firestore Data
  useEffect(() => {
    if (user) {
      const fetchMatches = async () => {
        try {
          const matchesCollection = collection(db, "matches");
          const matchesSnapshot = await getDocs(matchesCollection);
          setMatches(matchesSnapshot.docs.map((doc) => doc.data()));
        } catch (error) {
          console.error("Error fetching matches:", error);
        }
      };

      const fetchMessages = async () => {
        try {
          const messagesCollection = collection(db, "messages");
          const messagesSnapshot = await getDocs(messagesCollection);
          setMessages(messagesSnapshot.docs.map((doc) => doc.data()));
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      const fetchHoroscope = async () => {
        try {
          const horoscopeCollection = collection(db, "horoscope");
          const horoscopeSnapshot = await getDocs(horoscopeCollection);
          setHoroscope(
            horoscopeSnapshot.docs[0]?.data()?.today || "No horoscope available."
          );
        } catch (error) {
          console.error("Error fetching horoscope:", error);
        }
      };

      fetchMatches();
      fetchMessages();
      fetchHoroscope();
    }
  }, [user]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200">
      {/* Header */}


      {/* Main Content */}
      <main className="p-6">
        {/* Matches Section */}
        <section id="matches" className="mb-8">
          <h2 className="text-xl font-bold text-purple-900 mb-4">Your Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.length > 0 ? (
              matches.map((match: any, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center"
                >
                  <img
                    src={match.img || "https://via.placeholder.com/100"}
                    alt={match.name}
                    className="w-24 h-24 object-cover rounded-full mb-4"
                  />
                  <h3 className="text-lg font-bold text-gray-800">{match.name}</h3>
                  <p className="text-sm text-gray-600">{match.age} years old</p>
                  <p className="text-sm text-gray-600">{match.location}</p>
                  <p className="text-sm text-purple-700 font-semibold mt-2">
                    Compatibility: {match.compatibility}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No matches found.</p>
            )}
          </div>
        </section>

        {/* Messages Section */}
        <section id="messages" className="mb-8">
          <h2 className="text-xl font-bold text-purple-900 mb-4">Messages</h2>
          <ul className="space-y-4">
            {messages.length > 0 ? (
              messages.map((message: any, index) => (
                <li
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{message.from}</h3>
                    <p className="text-sm text-gray-600">{message.text}</p>
                  </div>
                  <span className="text-sm text-gray-500">{message.time}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No messages yet.</p>
            )}
          </ul>
        </section>

        {/* Horoscope Section */}
        <section id="horoscope" className="mb-8">
          <h2 className="text-xl font-bold text-purple-900 mb-4">Horoscope</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold text-purple-700">Today's Prediction</h3>
            <p className="text-gray-600 mt-2">{horoscope}</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
