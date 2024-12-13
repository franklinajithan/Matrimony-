import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../components/elements/InputField";
import { Loader2 } from "lucide-react";
import SelectField from "../components/elements/SelectField";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebase";
const profileSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  //gender: z.enum(["Male", "Female", "Other"], { required_error: "Gender is required" }),
  dateOfBirth: z.string().nonempty("Date of birth is required"),
  email: z.string().email("Invalid email address"),
  // phone: z.string().min(10, "Phone number must be at least 10 digits"),
  // religion: z.string().nonempty("Religion is required"),
  // caste: z.string().optional(),
  // subCaste: z.string().optional(),
  // // maritalStatus: z.enum(["Single", "Married", "Divorced", "Widowed"], { required_error: "Marital status is required" }),
  // maritalStatus: z.string().nonempty("Marital status is required"),
  // education: z.string().nonempty("Education is required"),
  // occupation: z.string().nonempty("Occupation is required"),
  // income: z.string().optional(),
  // address: z.string().optional(),
  // citizenship: z.string().nonempty("Citizenship is required"),
  // country: z.string().nonempty("Country is required"),
  // state: z.string().nonempty("State is required"),
  // city: z.string().nonempty("City is required"),
  // height: z.string().nonempty("Height is required"),
  // weight: z.string().optional(),
  // bloodGroup: z.string().optional(),
  // //complexion: z.enum(["Fair", "Wheatish", "Dark"], { required_error: "Complexion is required" }),
  // complexion: z.string().optional(),
  // //physicalStatus: z.enum(["Normal", "Physically Challenged"], { required_error: "Physical status is required" }),
  // physicalStatus: z.string().optional(),
  // //familyType: z.enum(["Nuclear", "Joint", "Extended"], { required_error: "Family type is required" }),
  // // familyStatus: z.enum(["Middle Class", "Upper Middle Class", "Rich"], { required_error: "Family status is required" }),
  // fatherOccupation: z.string().optional(),
  // motherOccupation: z.string().optional(),
  // siblings: z.string().optional(),
  // //foodPreference: z.enum(["Vegetarian", "Non-Vegetarian", "Eggetarian", "Vegan"], { required_error: "Food preference is required" }),
  // // drinking: z.enum(["Yes", "No", "Occasionally"], { required_error: "Drinking preference is required" }),
  // // smoking: z.enum(["Yes", "No", "Occasionally"], { required_error: "Smoking preference is required" }),
  // expectations: z.string().optional(),
  // horoscope: z.string().optional(),
  // // manglik: z.enum(["Yes", "No", "Doesn't Matter"], { required_error: "Manglik status is required" }),
  // star: z.string().optional(),
  // rashi: z.string().optional(),
  // gothra: z.string().optional(),
  // motherTongue: z.string().nonempty("Mother tongue is required"),
  // hobbies: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileDetails: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const options = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      //gender: "",
      dateOfBirth: "",
      email: "",
      phone: "",
      religion: "",
      caste: "",
      subCaste: "",
      maritalStatus: "",
      education: "",
      occupation: "",
      income: "",
      address: "",
      height: "",
      weight: "",
      bloodGroup: "",
      complexion: "",
      physicalStatus: "",
      familyType: "",
      familyStatus: "",
      fatherOccupation: "",
      motherOccupation: "",
      siblings: "",
      foodPreference: "",
      drinking: "",
      smoking: "",
      expectations: "",
      horoscope: "",
      manglik: "",
      star: "",
      rashi: "",
      gothra: "",
      motherTongue: "",
      hobbies: "",
      citizenship: "",
      country: "",
      state: "",
      city: "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setIsLoading(true);
    try {
      debugger;
      // Create a new document in the "profiles" collection with a unique ID
      const profileRef = doc(db, "profiles", data.email); // Use email as the document ID
      await setDoc(profileRef, data);
      debugger;
      console.log("Profile Data Submitted:", data);
      alert("Profile details saved successfully!");
    } catch (error) {
      console.error("Error saving profile details:", error);
      alert("Failed to save profile details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 flex p-4">
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full bg-white p-8 rounded-lg shadow-lg space-y-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">Profile Details</h1>

        {/* Personal Information */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-lg font-bold text-purple-700">Personal Information</legend>
          <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
            <InputField control={form.control} name="fullName" label="Full Name" type="text" placeholder="Enter your full name" />
            {/* <InputField control={form.control} name="gender" label="Gender" type="text" placeholder="Enter your gender" /> */}
            <SelectField control={form.control} name="gender" label="Gender" options={options} errorMessage="This field is required." />
            <InputField control={form.control} name="dateOfBirth" label="Date of Birth" type="date" placeholder="Select your date of birth" />
            <InputField control={form.control} name="email" label="Email" type="email" placeholder="Enter your email" />
            <InputField control={form.control} name="phone" label="Phone Number" type="tel" placeholder="Enter your phone number" />
            <InputField control={form.control} name="religion" label="Religion" type="text" placeholder="Enter your religion" />
            <InputField control={form.control} name="caste" label="Caste (Optional)" type="text" placeholder="Enter your caste (if applicable)" />
            <InputField control={form.control} name="maritalStatus" label="Marital Status" type="text" placeholder="Enter your marital status" />
          </div>
        </fieldset>

        {/* Education and Occupation */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-lg font-bold text-purple-700">Education and Occupation</legend>
          <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
            <InputField control={form.control} name="education" label="Education" type="text" placeholder="Enter your education" />
            <InputField control={form.control} name="occupation" label="Occupation" type="text" placeholder="Enter your occupation" />
            <InputField control={form.control} name="income" label="Income (Optional)" type="text" placeholder="Enter your income" />
          </div>
        </fieldset>

        {/* Address Details */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-lg font-bold text-purple-700">Address Details</legend>
          <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
            <InputField control={form.control} name="address" label="Address (Optional)" type="text" placeholder="Enter your address" />
            <InputField control={form.control} name="citizenship" label="Citizenship" type="text" placeholder="Enter your citizenship" />
            <InputField control={form.control} name="country" label="Country" type="text" placeholder="Enter your country" />
            <InputField control={form.control} name="state" label="State" type="text" placeholder="Enter your state" />
            <InputField control={form.control} name="city" label="City" type="text" placeholder="Enter your city" />
          </div>
        </fieldset>

        {/* Physical Attributes */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-lg font-bold text-purple-700">Physical Attributes</legend>
          <div className="grid grid-cols-4 md:grid-cols-4 gap-4">
            <InputField control={form.control} name="height" label="Height" type="text" placeholder="Enter your height" />
            <InputField control={form.control} name="weight" label="Weight (Optional)" type="text" placeholder="Enter your weight" />
            <InputField control={form.control} name="bloodGroup" label="Blood Group (Optional)" type="text" placeholder="Enter your blood group" />
            <InputField control={form.control} name="complexion" label="Complexion" type="text" placeholder="Enter your complexion" />
            <InputField control={form.control} name="physicalStatus" label="Physical Status" type="text" placeholder="Enter your physical status" />
          </div>
        </fieldset>

        {/* Add similar fieldsets for Family Details, Preferences, Horoscope Details, and Additional Information */}

        <button type="submit" disabled={isLoading} className="w-full bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800">
          {isLoading ? (
            <span className="flex items-center justify-center space-x-2">
              <Loader2 size={20} className="animate-spin" />
              <span>Saving...</span>
            </span>
          ) : (
            "Save Details"
          )}
        </button>
      </form>
    </main>
  );
};

export default ProfileDetails;
