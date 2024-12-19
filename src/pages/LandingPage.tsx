import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import horoscopeImg from "../assets/images/horoscope.png";
import aiMatchingImg from "../assets/images/ai_matching.png";
import privacyImg from "../assets/images/privacy.png";
import globalReachImg from "../assets/images/global_reach.png";
import detailedProfilesImg from "../assets/images/detailed_profiles.png";
import realTimeChatImg from "../assets/images/real_time_chat.png";
import customPreferencesImg from "../assets/images/custom_preferences.png";
import verifiedProfilesImg from "../assets/images/verified_profiles.jpg";
import secureMessagingImg from "../assets/images/secure_messaging.png";
import languagePreferencesImg from "../assets/images/languagePreferencesImg.png";
import profileTemplateImg from "../assets/images/profileTemplateImg.webp";
import mobileAppImg from "../assets/images/mobileAppImg.png";
import welcome from "../assets/images/welcome.png";
const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-purple-600">
            <Link to="/">Matrimony</Link>
          </div>

          {/* Hamburger Menu */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white">
            <ul className="flex flex-col items-center space-y-4 py-4">
              <li>
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-purple-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-purple-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/features" onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-purple-600">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-gray-600 hover:text-purple-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                  <button className="bg-purple-600 text-white py-2 px-4 rounded-full hover:bg-purple-700 transition">Sign In</button>
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white mt-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-center md:text-left space-y-8 md:space-y-0">
          {/* Text Content */}
          <div className="md:w-2/3">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 sm:mb-6 mt-10">Welcome to Matrimony</h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8">Find your perfect match with our advanced matchmaking platform.</p>
            <Link to="/signup">
              <button className="bg-white text-pink-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition">Get Started</button>
            </Link>
          </div>

          {/* Welcome Image */}
          <div className="md:w-1/3 flex justify-center items-center">
            <img
              src={welcome} // Replace with the correct image path
              alt="Welcome"
              className="w-full max-w-xs sm:max-w-md rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-6 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-blue-900 mb-8">Why Choose Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Horoscope Matching", icon: horoscopeImg },
              { title: "Smart Matching", icon: aiMatchingImg },
              { title: "Privacy Guaranteed", icon: privacyImg },
              { title: "Global Reach", icon: globalReachImg },
              { title: "In-Depth Profiles", icon: detailedProfilesImg },
              { title: "Secure Messaging", icon: secureMessagingImg },
              { title: "Verified Profiles", icon: verifiedProfilesImg },
              { title: "Profile Template", icon: profileTemplateImg },
              // { title: "Cultural Preferences", icon: culturalPreferencesImg },
              //  { title: "Advanced Filters", icon: advancedFiltersImg },
              //  { title: "Event Invitations", icon: eventInvitationsImg },
              // { title: "Family Integration", icon: familyIntegrationImg },
              // { title: "Match Insights", icon: matchInsightsImg },
              { title: "Custom Preferences", icon: customPreferencesImg },
              // { title: "Personalized Notifications", icon: personalizedNotificationsImg },
              // { title: "Astrological Guidance", icon: astrologicalGuidanceImg },
              { title: "Real Time Chat", icon: realTimeChatImg },
              { title: "Language Preferences", icon: languagePreferencesImg },
              // { title: "Video Introductions", icon: videoIntroductionsImg },
              // { title: "AI-Driven Compatibility Tests", icon: aiCompatibilityImg },
              // { title: "Photo Verification", icon: photoVerificationImg },
              // { title: "Lifestyle Preferences", icon: lifestylePreferencesImg },
              // { title: "Hobby and Interest Matching", icon: hobbyMatchingImg },
              // { title: "Success Stories", icon: successStoriesImg },
              // { title: "Daily Match Suggestions", icon: dailySuggestionsImg },
              // { title: "Interactive Questionnaires", icon: questionnairesImg },
              //  { title: "Social Media Integration", icon: socialMediaIntegrationImg },
              //  { title: "Premium Membership Perks", icon: premiumMembershipImg },
              //  { title: "Block and Report Features", icon: blockReportImg },
              // { title: "Interest-Based Events", icon: interestEventsImg },
              // { title: "Profile Insights and Analytics", icon: profileInsightsImg },
              { title: "Mobile App Support", icon: mobileAppImg },
              // { title: "24/7 Customer Support", icon: customerSupportImg },
              // { title: "Success Planner", icon: successPlannerImg },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition">
                <img src={feature.icon} alt={feature.title} className="w-20 h-20 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">Explore this feature now.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Match?</h2>
          <p className="text-lg mb-8">Join thousands of happy couples who found their partner through us.</p>
          <Link to="/signup">
            <button className="bg-white text-purple-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition">Sign Up Now</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
