import React, { useState } from "react";

const ProfileDetails: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dateOfBirth: "",
    height: "",
    weight: "",
    bloodGroup: "",
    religion: "",
    caste: "",
    subCaste: "",
    maritalStatus: "",
    motherTongue: "",
    education: "",
    occupation: "",
    income: "",
    companyName: "",
    workingCity: "",
    email: "",
    phone: "",
    address: "",
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    siblings: "",
    hobbies: "",
    interests: "",
    dietaryPreference: "",
    smoking: "",
    drinking: "",
    horoscope: "",
    preferredPartnerAge: "",
    preferredPartnerHeight: "",
    preferredPartnerEducation: "",
    preferredPartnerOccupation: "",
    preferredPartnerReligion: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Profile details saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 p-8">
      <h1 className="text-2xl font-bold text-purple-700 mb-6">Profile Details</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
        {/* Personal Information */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-lg font-bold text-purple-700">Personal Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block font-medium">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Height (in cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium">Weight (in kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium">Blood Group</label>
              <input
                type="text"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </fieldset>

        {/* Contact Information */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-lg font-bold text-purple-700">Contact Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                rows={3}
              ></textarea>
            </div>
          </div>
        </fieldset>

        {/* Professional Information */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-lg font-bold text-purple-700">Professional Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block font-medium">Education</label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium">Occupation</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium">Annual Income</label>
              <input
                type="text"
                name="income"
                value={formData.income}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </fieldset>

        {/* Preferences */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-lg font-bold text-purple-700">Partner Preferences</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block font-medium">Preferred Partner Age</label>
              <input
                type="text"
                name="preferredPartnerAge"
                value={formData.preferredPartnerAge}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium">Preferred Partner Height</label>
              <input
                type="text"
                name="preferredPartnerHeight"
                value={formData.preferredPartnerHeight}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </fieldset>

        <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800">
          Save Details
        </button>
      </form>
    </div>
  );
};

export default ProfileDetails;
