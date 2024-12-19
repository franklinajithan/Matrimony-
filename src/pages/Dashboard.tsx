import React, { useState } from "react";
import { useUser } from "../context/UserContext";

const Dashboard: React.FC = () => {
  const { user } = useUser();

  const [friends] = useState([
    { name: "Rachel Green", location: "London", img: "https://via.placeholder.com/100" },
    { name: "Monica Geller", location: "Manchester", img: "https://via.placeholder.com/100" },
  ]);

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

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-purple-50 to-purple-200">
    {/* Sidebar */}
    <aside className="w-full md:w-1/4 p-4 md:p-6 bg-purple-100">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold text-purple-900 mb-4 md:mb-6">Friends</h2>
        <ul className="space-y-4">
          {friends.map((friend, index) => (
            <li key={index} className="flex items-center">
              <img
                src={friend.img}
                alt={friend.name}
                className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full mr-4"
              />
              <div>
                <h3 className="text-sm font-bold text-gray-800">{friend.name}</h3>
                <p className="text-xs text-gray-600">{friend.location}</p>
              </div>
            </li>
          ))}
        </ul>
        {/* Friend Requests */}
        <h2 className="text-lg font-bold text-purple-900 my-4 md:my-6">Friend Requests</h2>
        <ul className="space-y-4">
          {friendRequests.map((request, index) => (
            <li key={index} className="flex items-center">
              <img
                src={request.img}
                alt={request.name}
                className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full mr-4"
              />
              <div>
                <h3 className="text-sm font-bold text-gray-800">{request.name}</h3>
                <p className="text-xs text-gray-600">{request.location}</p>
              </div>
              <button className="ml-auto text-xs md:text-sm text-purple-700 font-bold">
                Accept
              </button>
            </li>
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
        <h2 className="text-sm md:text-lg font-bold text-gray-800">
          {user ? `Welcome, ${user.displayName || user.email}` : "No user is logged in."}
        </h2>
      </section>
      {/* Featured Profiles */}
      <section id="featured" className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
        <h2 className="text-lg md:text-xl font-bold text-purple-900 mb-4">Featured Profiles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {matches.map((match, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center"
            >
              <img
                src={match.img}
                alt={match.name}
                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full mb-4"
              />
              <h3 className="text-sm md:text-lg font-bold text-gray-800">{match.name}</h3>
              <p className="text-xs md:text-sm text-gray-600">{match.age} years old</p>
              <p className="text-xs md:text-sm text-gray-600">{match.location}</p>
              <p className="text-xs md:text-sm text-purple-700 font-semibold mt-2">
                Compatibility: {match.compatibility}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/* Other Sections */}
      {[{ id: "favorites", title: "Your Favorites", data: favorites }, { id: "visitors", title: "Recent Visitors", data: recentVisitors }, { id: "recommendations", title: "Recommendations", data: recommendations }].map(({ id, title, data }) => (
        <section key={id} id={id} className="bg-white p-4 md:p-6 rounded-lg shadow-lg">
          <h2 className="text-lg md:text-xl font-bold text-purple-900 mb-4">{title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {data.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full mb-4"
                />
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
