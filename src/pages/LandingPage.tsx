import React from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-16 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Matrimony
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Find your perfect match with our advanced matchmaking platform.
          </p>
          <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-md shadow-md hover:bg-gray-100 transition">
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <img
                src="https://via.placeholder.com/100"
                alt="Smart Matching"
                className="w-20 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-3">Smart Matching</h3>
              <p className="text-gray-600">
                Our advanced algorithm ensures the best match for you based on
                your preferences.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <img
                src="https://via.placeholder.com/100"
                alt="Secure & Private"
                className="w-20 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
              <p className="text-gray-600">
                Your data and conversations are safe and secure with us.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
              <img
                src="https://via.placeholder.com/100"
                alt="Global Community"
                className="w-20 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-3">Global Community</h3>
              <p className="text-gray-600">
                Connect with individuals from around the world and expand your
                horizons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 italic mb-4">
                "I found my soulmate through this platform. The experience was
                seamless, and I couldn't be happier!"
              </p>
              <h4 className="font-bold text-gray-800">- John Doe</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 italic mb-4">
                "The smart matching system worked wonders for me. Highly
                recommended!"
              </p>
              <h4 className="font-bold text-gray-800">- Jane Smith</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600 italic mb-4">
                "The global community feature allowed me to meet amazing people
                worldwide."
              </p>
              <h4 className="font-bold text-gray-800">- Sarah Johnson</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-blue-500 text-white py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Match?
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Join thousands of happy couples who found their partner through us.
          </p>
          <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-md shadow-md hover:bg-gray-100 transition">
            Sign Up Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
