import React, { useState, useEffect } from "react";
import { FaStar, FaEye, FaHeart, FaCommentDots, FaBell } from "react-icons/fa";


const Dashboard: React.FC = () => {
  const [matches] = useState([
    { name: "John Doe", age: 28, location: "London", compatibility: "95%", img: "https://via.placeholder.com/100" },
    { name: "Jane Smith", age: 26, location: "Manchester", compatibility: "90%", img: "https://via.placeholder.com/100" },
    { name: "Emily Davis", age: 30, location: "Birmingham", compatibility: "87%", img: "https://via.placeholder.com/100" },
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200">
      {/* Header */}
      <header className="p-2 mt-2 bg-gradient-to-r from-violet-800 to-violet-100 text-purple-100 flex justify-between items-center">
        <h1 className="text-2xl font-bold ml-5">Dashboard</h1>
      
      </header>
      

      {/* Main Content */}
      <main className="p-6 space-y-8">
        {/* Featured Profiles */}
        <section id="featured">
          <h2 className="text-xl font-bold text-purple-900 mb-4">Featured Profiles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
                <img src={match.img} alt={match.name} className="w-24 h-24 object-cover rounded-full mb-4" />
                <h3 className="text-lg font-bold text-gray-800">{match.name}</h3>
                <p className="text-sm text-gray-600">{match.age} years old</p>
                <p className="text-sm text-gray-600">{match.location}</p>
                <p className="text-sm text-purple-700 font-semibold mt-2">Compatibility: {match.compatibility}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Favorites */}
        <section id="favorites">
          <h2 className="text-xl font-bold text-purple-900 mb-4">Your Favorites</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((fav, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
                <img src={fav.img} alt={fav.name} className="w-24 h-24 object-cover rounded-full mb-4" />
                <h3 className="text-lg font-bold text-gray-800">{fav.name}</h3>
                <p className="text-sm text-gray-600">{fav.age} years old</p>
                <p className="text-sm text-gray-600">{fav.location}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Messages */}
        <section id="messages">
          <h2 className="text-xl font-bold text-purple-900 mb-4">Messages</h2>
          <ul className="space-y-4">
            {messages.map((message, index) => (
              <li key={index} className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{message.from}</h3>
                  <p className="text-sm text-gray-600">{message.text}</p>
                </div>
                <span className="text-sm text-gray-500">{message.time}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Recent Visitors */}
        <section id="visitors">
          <h2 className="text-xl font-bold text-purple-900 mb-4">Recent Visitors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentVisitors.map((visitor, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
                <img src={visitor.img} alt={visitor.name} className="w-24 h-24 object-cover rounded-full mb-4" />
                <h3 className="text-lg font-bold text-gray-800">{visitor.name}</h3>
                <p className="text-sm text-gray-600">{visitor.age} years old</p>
                <p className="text-sm text-gray-600">{visitor.location}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Events */}
        <section id="events">
          <h2 className="text-xl font-bold text-purple-900 mb-4">Upcoming Events</h2>
          <ul className="space-y-4">
            {events.map((event, index) => (
              <li key={index} className="bg-white p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold text-gray-800">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.date}</p>
                <p className="text-sm text-gray-600">{event.description}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Recommendations */}
        <section id="recommendations">
          <h2 className="text-xl font-bold text-purple-900 mb-4">Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center">
                <img src={rec.img} alt={rec.name} className="w-24 h-24 object-cover rounded-full mb-4" />
                <h3 className="text-lg font-bold text-gray-800">{rec.name}</h3>
                <p className="text-sm text-gray-600">{rec.age} years old</p>
                <p className="text-sm text-gray-600">{rec.location}</p>
                <p className="text-sm text-purple-700 font-semibold mt-2">Compatibility: {rec.compatibility}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Horoscope */}
        <section id="horoscope">
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
