import React, { useState } from "react";

const users = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  age: 20 + (i % 10),
  city: ["London", "New York", "Paris", "Tokyo", "Berlin"][i % 5],
  gender: i % 2 === 0 ? "Male" : "Female",
  occupation: ["Engineer", "Doctor", "Artist", "Teacher", "Designer"][i % 5],
  hobbies: ["Reading", "Sports", "Music", "Traveling", "Cooking"][i % 5],
  maritalStatus: ["Single", "Married", "Divorced"][i % 3],
  education: ["High School", "Bachelor's", "Master's", "PhD"][i % 4],
  income: ["<30K", "30K-50K", "50K-70K", "70K+"][i % 4],
  religion: ["Christianity", "Islam", "Hinduism", "Buddhism"][i % 4],
  height: ["5'0\"-5'5\"", "5'6\"-6'0\"", "6'1\"+"][i % 3],
  languages: ["English", "French", "Spanish", "German", "Japanese"][i % 5],
  interests: ["Tech", "Art", "Science", "Fitness"][i % 4],
  pets: ["Yes", "No"][i % 2],
  smoker: ["Yes", "No"][i % 2],
  drinker: ["Yes", "No"][i % 2],
}));

const UserList: React.FC = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedUsers.map((user) => (
            <div key={user.id} className="p-4 bg-white rounded-lg shadow-md text-center">
              <img src={`https://via.placeholder.com/150?text=${user.name}`} alt={user.name} className="w-20 h-20 mx-auto rounded-full mb-4" />
              <h3 className="text-lg font-bold">{user.name}</h3>
              <p className="text-gray-600">Age: {user.age}</p>
              <p className="text-gray-600">City: {user.city}</p>
              <p className="text-gray-600">Occupation: {user.occupation}</p>
            </div>
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
