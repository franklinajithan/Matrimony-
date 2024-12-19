import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../components/elements/InputField";
import { Loader2 } from "lucide-react";
import SelectField from "../components/elements/SelectField";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../services/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { deleteObject } from "firebase/storage";

import { onAuthStateChanged } from "firebase/auth";

const profileSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
 profilePicture: z.any().optional(),
  additionalImages: z.array(z.any()).optional(),
  gender: z.string().nonempty("Gender is required"),
 // dateOfBirth: z.string().nonempty("Date of birth is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
 // religion: z.string().nonempty("Religion is required"),
 // caste: z.string().optional(),
 // subCaste: z.string().optional(),
 // maritalStatus: z.string().nonempty("Marital status is required"),
  education: z.string().nonempty("Education is required"),
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
 // complexion: z.string().nonempty("Complexion is required"),
 // physicalStatus: z.string().nonempty("Physical status is required"),
 // familyType: z.string().nonempty("Family type is required"),
 // familyStatus: z.string().nonempty("Family status is required"),
 // fatherOccupation: z.string().optional(),
 // motherOccupation: z.string().optional(),
 // siblings: z.string().optional(),
 // foodPreference: z.string().nonempty("Food preference is required"),
//  drinking: z.string().nonempty("Drinking preference is required"),
 // smoking: z.string().nonempty("Smoking preference is required"),
 // expectations: z.string().optional(),
 // horoscope: z.string().optional(),
 // manglik: z.string().nonempty("Manglik status is required"),
 // star: z.string().optional(),
 // rashi: z.string().optional(),
 // gothra: z.string().optional(),
 // motherTongue: z.string().nonempty("Mother tongue is required"),
//  hobbies: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileDetails: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<Record<string, any> | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null); // State for previewing images

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      gender: "",
      profilePicture: "",
      additionalImages: [],
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
      citizenship: "",
      country: "",
      state: "",
      city: "",
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
    },
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        setUserEmail(user.email);
        fetchProfile(user.uid);
        form.setValue("email", user?.email);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchProfile = async (uid: string) => {
    try {
      const profileRef = doc(db, "profiles", uid);
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
        const profileData = profileSnap.data() as ProfileFormValues;
        form.reset(profileData);
        setProfileData(profileData);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    debugger;
    setIsLoading(true);

    try {
      const user = auth.currentUser;
      if (!user?.uid || !user.email) throw new Error("User not authenticated");

      const uid = user.uid;

      // Step 1: Upload profile picture if it's a file
      let profilePictureURL = data.profilePicture;
      if (data.profilePicture instanceof File) {
        profilePictureURL = await uploadImage(data.profilePicture, `profiles/${uid}/profilePicture/${data.profilePicture.name}`);
      }

      // Step 2: Upload additional images
      const additionalFiles = (data.additionalImages || []) as File[];
      const additionalImageURLs = await uploadAdditionalImages(additionalFiles, uid);

      // Step 3: Prepare the final profile data
      const profileData = {
        ...data,
        profilePicture: profilePictureURL,
        additionalImages: additionalImageURLs,
      };

      // Step 4: Save the profile data to Firestore
      const profileRef = doc(db, "profiles", uid);
      await setDoc(profileRef, profileData);

      alert("Profile details saved successfully!");
    } catch (error) {
      console.error("Error saving profile details:", error);
      alert("Failed to save profile details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to upload a single image
  const uploadImage = async (file: File, path: string): Promise<string> => {
    try {
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };

  // Helper function to upload multiple images
  const uploadAdditionalImages = async (files: File[], uid: string): Promise<string[]> => {
    try {
      const urls = await Promise.all(files.map((file) => uploadImage(file, `profiles/${uid}/additionalImages/${file.name}`)));
      return urls;
    } catch (error) {
      console.error("Error uploading additional images:", error);
      return [];
    }
  };

  const handleDeleteImage = async (index: number) => {
    if (!userEmail || !profileData?.additionalImages) return;

    try {
      const imageUrl = profileData.additionalImages[index];
      const decodedPath = decodeURIComponent(new URL(imageUrl).pathname).replace(/^\/v0\/b\/[^/]+\/o\//, ""); // Extract the storage path
      const imageRef = ref(storage, decodedPath);
      const [previewImage, setPreviewImage] = useState<string | null>(null); // State for previewing images
      // Remove the image from Firebase Storage
      await deleteObject(imageRef);

      // Update the profile data locally and in Firestore
      const updatedImages = profileData.additionalImages.filter((_: any, i: any) => i !== index);
      setProfileData((prev) => ({ ...prev, additionalImages: updatedImages }));
      form.setValue("additionalImages", updatedImages);

      const profileRef = doc(db, "profiles", userEmail);
      await setDoc(profileRef, { additionalImages: updatedImages }, { merge: true });

      alert("Image deleted successfully!");
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Failed to delete the image. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 flex p-2 sm:p-4">
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full bg-white p-4 sm:p-8 rounded-lg shadow-lg space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Profile Details</h1>

        {/* Personal Information */}

        <fieldset className="border p-4 rounded-lg">
          <legend className="text-base sm:text-lg font-bold text-purple-700">Personal Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Profile Picture */}
            <div>
              <label className="block font-medium text-gray-800 mb-2">Profile Picture</label>
              <div className="flex items-center space-x-4">
                {profileData?.profilePicture ? (
                  <img src={typeof profileData.profilePicture === "string" ? profileData.profilePicture : URL.createObjectURL(profileData.profilePicture)} alt="Profile" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border shadow-sm cursor-pointer" />
                ) : (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 border shadow-sm">No Image</div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const newImage = e.target.files[0];
                      form.setValue("profilePicture", newImage);
                      setProfileData((prev) => ({
                        ...prev,
                        profilePicture: newImage,
                      }));
                    }
                  }}
                  className="text-sm text-gray-500 file:mr-2 file:py-1 file:px-2 file:rounded file:border file:border-gray-300 file:bg-gray-50 hover:file:bg-gray-100"
                />
              </div>
            </div>

            {/* Additional Images */}
            <div>
              <label className="block font-medium text-gray-800 mb-2">Additional Images</label>
              <div className="flex flex-wrap gap-2">
                {profileData?.additionalImages?.map((url: any, index: any) => (
                  <div key={index} className="relative group w-16 h-16 rounded-md overflow-hidden border border-gray-300 shadow-sm">
                    <img src={url} alt={`Additional ${index}`} className="object-cover w-full h-full" />
                    <button type="button" className="absolute top-0 right-0 bg-red-600 text-white text-xs p-1 rounded-full opacity-0 group-hover:opacity-100" onClick={() => handleDeleteImage(index)}>
                      ✕
                    </button>
                  </div>
                ))}
                <label className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center text-gray-500 border border-gray-300 cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={async (e) => {
                      const files = e.target.files ? Array.from(e.target.files) : [];
                      if (files.length) {
                        try {
                          const user = auth.currentUser;
                          if (!user?.uid) throw new Error("User not authenticated");

                          const uploadedUrls = await uploadAdditionalImages(files, user.uid);
                          form.setValue("additionalImages", [...(form.getValues("additionalImages") || []), ...uploadedUrls]);
                          setProfileData((prev) => ({
                            ...prev,
                            additionalImages: [...(prev?.additionalImages || []), ...uploadedUrls],
                          }));
                        } catch (error) {
                          console.error("Error uploading additional images:", error);
                          alert("Failed to upload additional images. Please try again.");
                        }
                      }
                    }}
                    className="hidden"
                  />
                  <span className="text-xs">+ Add</span>
                </label>
              </div>
            </div>

            {/* Text Fields */}
            <InputField control={form.control} name="fullName" label="Full Name" type="text" placeholder="Enter your full name" />
            <SelectField
              control={form.control}
              name="gender"
              label="Gender"
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
              ]}
            />
            <InputField control={form.control} name="email" label="Email" type="email" placeholder="Enter your email" />
            <InputField control={form.control} name="phone" label="Phone Number" type="tel" placeholder="Enter phone number" />
          </div>
        </fieldset>

        {/* Education and Occupation */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-base sm:text-lg font-bold text-purple-700">Education and Occupation</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField control={form.control} name="education" label="Education" type="text" placeholder={""} />
            <InputField control={form.control} name="occupation" label="Occupation" type="text" placeholder={""} />
            <InputField control={form.control} name="income" label="Income (Optional)" type="text" placeholder={""} />
          </div>
        </fieldset>

        {/* Address Details */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-base sm:text-lg font-bold text-purple-700">Address Details</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField control={form.control} name="address" label="Address (Optional)" type="text" placeholder={""} />
            <InputField control={form.control} name="citizenship" label="Citizenship" type="text" placeholder={""} />
            <InputField control={form.control} name="country" label="Country" type="text" placeholder={""} />
            <InputField control={form.control} name="state" label="State" type="text" placeholder={""} />
            <InputField control={form.control} name="city" label="City" type="text" placeholder={""} />
          </div>
        </fieldset>

        {/* Physical Attributes */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-base sm:text-lg font-bold text-purple-700">Physical Attributes</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField control={form.control} name="height" label="Height" type="text" placeholder={""} />
            <InputField control={form.control} name="weight" label="Weight (Optional)" type="text" placeholder={""} />
            <InputField control={form.control} name="bloodGroup" label="Blood Group (Optional)" type="text" placeholder={""} />
            <SelectField
              control={form.control}
              name="complexion"
              label="Complexion"
              options={[
                { value: "Fair", label: "Fair" },
                { value: "Wheatish", label: "Wheatish" },
                { value: "Dark", label: "Dark" },
              ]}
            />
            <SelectField
              control={form.control}
              name="physicalStatus"
              label="Physical Status"
              options={[
                { value: "Normal", label: "Normal" },
                { value: "Physically Challenged", label: "Physically Challenged" },
              ]}
            />
          </div>
        </fieldset>

        {/* Family and Preferences */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-base sm:text-lg font-bold text-purple-700">Family and Preferences</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              control={form.control}
              name="familyType"
              label="Family Type"
              options={[
                { value: "Nuclear", label: "Nuclear" },
                { value: "Joint", label: "Joint" },
                { value: "Extended", label: "Extended" },
              ]}
            />
            <SelectField
              control={form.control}
              name="familyStatus"
              label="Family Status"
              options={[
                { value: "Middle Class", label: "Middle Class" },
                { value: "Upper Middle Class", label: "Upper Middle Class" },
                { value: "Rich", label: "Rich" },
              ]}
            />
            <InputField control={form.control} name="fatherOccupation" label="Father's Occupation (Optional)" type="text" placeholder={""} />
            <InputField control={form.control} name="motherOccupation" label="Mother's Occupation (Optional)" type="text" placeholder={""} />
            <InputField control={form.control} name="siblings" label="Siblings (Optional)" type="text" placeholder={""} />
            <SelectField
              control={form.control}
              name="foodPreference"
              label="Food Preference"
              options={[
                { value: "Vegetarian", label: "Vegetarian" },
                { value: "Non-Vegetarian", label: "Non-Vegetarian" },
                { value: "Eggetarian", label: "Eggetarian" },
                { value: "Vegan", label: "Vegan" },
              ]}
            />
            <SelectField
              control={form.control}
              name="drinking"
              label="Drinking"
              options={[
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
                { value: "Occasionally", label: "Occasionally" },
              ]}
            />
            <SelectField
              control={form.control}
              name="smoking"
              label="Smoking"
              options={[
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
                { value: "Occasionally", label: "Occasionally" },
              ]}
            />
          </div>
        </fieldset>

        {/* Horoscope and Additional Information */}
        <fieldset className="border p-4 rounded-lg">
          <legend className="text-base sm:text-lg font-bold text-purple-700">Horoscope and Additional Information</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField control={form.control} name="horoscope" label="Horoscope (Optional)" type="text" placeholder={""} />
            <SelectField
              control={form.control}
              name="manglik"
              label="Manglik"
              options={[
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
                { value: "Doesn't Matter", label: "Doesn't Matter" },
              ]}
            />
            <InputField control={form.control} name="star" label="Star (Optional)" type="text" placeholder={""} />
            <InputField control={form.control} name="rashi" label="Rashi (Optional)" type="text" placeholder={""} />
            <InputField control={form.control} name="gothra" label="Gothra (Optional)" type="text" placeholder={""} />
            <InputField control={form.control} name="motherTongue" label="Mother Tongue" type="text" placeholder={""} />
            <InputField control={form.control} name="hobbies" label="Hobbies (Optional)" type="text" placeholder={""} />
            <InputField control={form.control} name="expectations" label="Expectations (Optional)" type="text" placeholder={""} />
          </div>
        </fieldset>

        {/* Submit Button */}
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
