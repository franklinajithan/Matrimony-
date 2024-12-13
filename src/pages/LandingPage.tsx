import React from "react";
import { Link } from "react-router-dom";
import horoscopeImg from "../assets/images/horoscope.png";
import aiMatchingImg from "../assets/images/ai_matching.png";
import privacyImg from "../assets/images/privacy.png";
import globalReachImg from "../assets/images/global_reach.png";
import detailedProfilesImg from "../assets/images/detailed_profiles.png";
import realTimeChatImg from "../assets/images/real_time_chat.png";
import customPreferencesImg from "../assets/images/custom_preferences.png";
import verifiedProfilesImg from "../assets/images/verified_profiles.jpg";
import secureMessagingImg from "../assets/images/secure_messaging.png";
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-purple-600">
            <Link to="/">Matrimony</Link>
          </div>
          <div className="space-x-6">
            <Link to="/" className="text-gray-600 hover:text-purple-600">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-purple-600">
              About Us
            </Link>
            <Link to="/features" className="text-gray-600 hover:text-purple-600">
              Features
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-purple-600">
              Contact
            </Link>
            <Link to="/login">
              <button className="bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 transition">Sign In</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white py-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">Welcome to Matrimony</h1>
          <p className="text-lg md:text-xl mb-8">Find your perfect match with our advanced matchmaking platform.</p>
          <Link to="/signup">
            <button className="bg-white text-pink-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition">Get Started</button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Horoscope Matching",
                description: "Advanced horoscope compatibility analysis to ensure your stars align perfectly.",
                color: "pink-500",
                icon: horoscopeImg,
              },
              {
                title: "Smart Matching",
                description: "AI-powered algorithms to connect you with compatible profiles.",
                color: "yellow-500",
                icon: aiMatchingImg,
              },
              {
                title: "Privacy Guaranteed",
                description: "Your data and conversations are fully encrypted and secure.",
                color: "green-500",
                icon: privacyImg,
              },
              {
                title: "Global Reach",
                description: "Connect with users worldwide to find the partner of your dreams.",
                color: "blue-500",
                icon: globalReachImg,
              },
              {
                title: "In-Depth Profiles",
                description: "Detailed profiles highlight personality, preferences, and values.",
                color: "purple-500",
                icon: detailedProfilesImg,
              },
              {
                title: "Real-Time Chat",
                description: "Secure messaging to connect and communicate with potential matches.",
                color: "red-500",
                icon: realTimeChatImg,
              },
              {
                title: "Custom Preferences",
                description: "Filter profiles based on education, location, profession, and more.",
                color: "yellow-600",
                icon: customPreferencesImg,
              },
              {
                title: "Verified Profiles",
                description: "Genuine users verified for trust and authenticity.",
                color: "green-600",
                icon: verifiedProfilesImg,
              },

              {
                title: "Secure Messaging",
                description: "Your messages are protected with the highest security standards.",
                color: "red-600",
                icon: secureMessagingImg,
              },
            ].map((feature, index) => (
              <div key={index} className={`bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 border-t-4 border-${feature.color}`}>
                <img src={feature.icon} alt={feature.title} className="w-[150px] mx-auto mb-4" />
                <h3 className={`text-xl font-semibold mb-3 text-${feature.color}`}>{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-fuchsia-50 via-fuchsia-100 to-fuchsia-200">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-yellow-800 mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 border-t-4 border-blue-500">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">1</h3>
              <h3 className="text-xl font-semibold mb-3">Create a Profile</h3>
              <p className="text-gray-600">Sign up and fill in your profile details to get started.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 border-t-4 border-purple-500">
              <h3 className="text-2xl font-bold text-purple-600 mb-4">2</h3>
              <h3 className="text-xl font-semibold mb-3">Search & Connect</h3>
              <p className="text-gray-600">Browse through potential matches and start meaningful conversations.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105 border-t-4 border-red-500">
              <h3 className="text-2xl font-bold text-red-600 mb-4">3</h3>
              <h3 className="text-xl font-semibold mb-3">Find Your Match</h3>
              <p className="text-gray-600">Build a connection and take the next step in your journey.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-pink-50 via-pink-100 to-pink-200">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-pink-800 mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <p className="text-gray-600 italic mb-4">"I found my soulmate through this platform. The experience was seamless, and I couldn't be happier!"</p>
              <h4 className="font-bold text-gray-800">- John Doe</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <p className="text-gray-600 italic mb-4">"The smart matching system worked wonders for me. Highly recommended!"</p>
              <h4 className="font-bold text-gray-800">- Jane Smith</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <p className="text-gray-600 italic mb-4">"The global community feature allowed me to meet amazing people worldwide."</p>
              <h4 className="font-bold text-gray-800">- Sarah Johnson</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white py-20 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Match?</h2>
          <p className="text-lg md:text-xl mb-8">Join thousands of happy couples who found their partner through us.</p>
          <Link to="/signup">
            <button className="bg-white text-purple-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition">Sign Up Now</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
