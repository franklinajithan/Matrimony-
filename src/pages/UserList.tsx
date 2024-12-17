import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    gender: "",
    city: "",
    occupation: "",
    hobbies: "",
    maritalStatus: "",
    education: "",
    income: "",
    religion: "",
    height: "",
    languages: "",
    interests: "",
    pets: "",
    smoker: "",
    drinker: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false); // Toggle filters on small screens
  const usersPerPage = 9;

  // Fetch logged-in user's ID
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUserId(user.email);
      } else {
        setLoggedInUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "profiles"));
        const profiles = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const filteredProfiles = profiles.filter((profile) => profile.id !== loggedInUserId);
        setUsers(filteredProfiles);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    };

    if (loggedInUserId !== null) {
      fetchProfiles();
    }
  }, [loggedInUserId]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredUsers = users.filter((user) =>
    Object.keys(filters).every(
      (key) => !filters[key as keyof typeof filters] || user[key as keyof typeof user] === filters[key as keyof typeof filters]
    )
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const displayedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  const handlePageChange = (newPage: number) => setCurrentPage(newPage);

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      {/* Toggle Filters Button (Mobile) */}
      <button
        className="block md:hidden p-2 bg-indigo-600 text-white rounded mb-4"
        onClick={() => setShowFilters((prev) => !prev)}
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      <div className="flex flex-col md:flex-row">
        {/* Filters */}
        <aside
          className={`md:block md:w-1/4 p-4 bg-white rounded-lg shadow-md mb-4 md:mb-0 ${
            showFilters ? "block" : "hidden"
          } md:block`}
        >
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          {Object.keys(filters).map((filterKey) => (
            <div className="mb-4" key={filterKey}>
              <label className="block text-sm font-semibold mb-1 capitalize">
                {filterKey.replace(/([A-Z])/g, " $1")}
              </label>
              <select
                name={filterKey}
                value={filters[filterKey as keyof typeof filters]}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">All</option>
                {[...new Set(users.map((user) => user[filterKey as keyof typeof user]))]
                  .filter(Boolean)
                  .map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            </div>
          ))}
        </aside>

        {/* User Cards */}
        <main className="flex-1 p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedUsers.map((user) => (
              <Link
                key={user.id}
                to={`/user/${user.id}`}
                className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition"
              >
                {/* Image */}
                <div className="flex items-center space-x-4">
                  <img
                    src={user.profilePicture || `https://via.placeholder.com/150?text=${user.name}`}
                    alt={user.name}
                    className="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover"
                  />
                  {/* Details */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-600">Age: {user.age}</p>
                    <p className="text-sm text-gray-600">City: {user.city}</p>
                    <p className="text-sm text-gray-600">Occupation: {user.occupation}</p>
                    <p className="text-sm text-gray-600">Education: {user.education}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 mx-1 rounded-md ${
                  currentPage === i + 1 ? "bg-indigo-600 text-white" : "bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserList;
