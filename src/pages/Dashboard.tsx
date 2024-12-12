
import React from "react";

const Dashboard: React.FC = () => {
  const matches = [
    {
      id: 1,
      name: "Anjali Sharma",
      age: 28,
      location: "Mumbai, India",
      compatibility: "85%",
      img: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "Rahul Verma",
      age: 30,
      location: "Delhi, India",
      compatibility: "78%",
      img: "https://via.placeholder.com/100",
    },
    // Add more matches
  ];

  const messages = [
    { id: 1, from: "Priya", text: "Hi! I liked your profile.", time: "2 hours ago" },
    { id: 2, from: "Arjun", text: "Looking forward to chatting!", time: "1 day ago" },
    // Add more messages
  ];

  const horoscope = {
    sign: "Leo",
    today: "You may find joy and happiness in unexpected places today. A good day for romantic connections!",
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <aside className="w-64 bg-purple-700 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <nav>
          <ul>
            <li className="mb-2">
              <a href="#matches" className="block py-2 px-4 rounded-md hover:bg-purple-600">
                My Matches
              </a>
            </li>
            <li className="mb-2">
              <a href="#messages" className="block py-2 px-4 rounded-md hover:bg-purple-600">
                Messages
              </a>
            </li>
            <li className="mb-2">
              <a href="#horoscope" className="block py-2 px-4 rounded-md hover:bg-purple-600">
                Horoscope
              </a>
            </li>
            <li>
              <a href="#profile" className="block py-2 px-4 rounded-md hover:bg-purple-600">
                Improve Profile
              </a>
            </li>
          </ul>
        </nav>
      </aside> */}

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Welcome Back!</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">John Doe</span>
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Matches Section */}
        <section id="matches" className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Your Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((match) => (
              <div key={match.id} className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src={match.img}
                  alt={match.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <h3 className="text-lg font-bold text-gray-800 mt-2">{match.name}</h3>
                <p className="text-gray-600">{match.age} years old</p>
                <p className="text-gray-600">{match.location}</p>
                <p className="text-indigo-600 font-semibold mt-2">
                  Compatibility: {match.compatibility}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Messages Section */}
        <section id="messages" className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">New Messages</h2>
          <ul className="space-y-4">
            {messages.map((message) => (
              <li
                key={message.id}
                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-start"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{message.from}</h3>
                  <p className="text-gray-600">{message.text}</p>
                </div>
                <span className="text-gray-500 text-sm">{message.time}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Horoscope Section */}
        <section id="horoscope" className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Horoscope</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-purple-700">Sign: {horoscope.sign}</h3>
            <p className="text-gray-600 mt-2">{horoscope.today}</p>
          </div>
        </section>

        {/* Improve Profile Section */}
        <section id="profile">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Improve Your Profile</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-600">
              Add more details to your profile to increase visibility and attract better matches.
            </p>
            <button className="mt-4 bg-purple-700 text-white px-4 py-2 rounded-md hover:bg-purple-800">
              Edit Profile
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;

