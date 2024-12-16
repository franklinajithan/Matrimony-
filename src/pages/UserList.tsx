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
  const usersPerPage = 9;

  // Fetch logged-in user's ID
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUserId(user.email); // Save the logged-in user's UID
      } else {
        setLoggedInUserId(null);
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
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
        debugger;
        // Filter out the logged-in user
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

  const filteredUsers = users.filter((user) => Object.keys(filters).every((key) => !filters[key as keyof typeof filters] || user[key as keyof typeof user] === filters[key as keyof typeof filters]));

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const displayedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex min-h-screen p-6 bg-gray-100">
      {/* Filters */}
      <aside className="w-1/4 p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        {Object.keys(filters).map((filterKey) => (
          <div className="mb-4" key={filterKey}>
            <label className="block text-sm font-semibold mb-1 capitalize">{filterKey.replace(/([A-Z])/g, " $1")}</label>
            <select name={filterKey} value={filters[filterKey as keyof typeof filters]} onChange={handleFilterChange} className="w-full p-2 border rounded-md">
              <option value="">All</option>
              {[...new Set(users.map((user) => user[filterKey as keyof typeof user]))].filter(Boolean).map((option) => (
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
        <div className="grid grid-cols-3 gap-6">
          {displayedUsers.map((user) => (
            <Link
              key={user.id}
              to={`/user/${user.id}`} // Redirect to a route with the user ID
              className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition flex items-center space-x-4"
            >
              {/* Left: Image */}
              <div>
                <img src={user.profilePicture || `https://via.placeholder.com/150?text=${user.name}`} alt={user.name} className="w-24 h-24 rounded-full object-cover" />
              </div>
              {/* Right: Details */}
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
                <p className="text-gray-600"><strong>Age:</strong> {user.age} </p>
                <p className="text-gray-600"><strong>City:</strong> {user.city}  </p>
                <p className="text-gray-600"><strong>Occupation:</strong> {user.occupation}   </p>
                <p className="text-gray-600"><strong>Marital Status:</strong> {user.status}</p>
                <p className="text-gray-600"><strong>Education:</strong> {user.education}</p>
                <p className="text-gray-600"><strong>Living In:</strong> {user.livingIn}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => handlePageChange(i + 1)} className={`px-4 py-2 mx-1 rounded-md ${currentPage === i + 1 ? "bg-indigo-600 text-white" : "bg-gray-300"}`}>
              {i + 1}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserList;
