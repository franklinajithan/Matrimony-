import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { auth } from "../services/firebase"; // Adjust the path to your Firebase config
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { Loader2 } from "lucide-react"; // For Loading Spinner
import InputField from "../components/elements/InputField";

// Zod schema for validation
const signupSchema = z.object({
  displayName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setSuccessMessage("");
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Update user profile with display name
      await updateProfile(user, {
        displayName: data.displayName,
      });

      console.log("User created:", user);
      setSuccessMessage("Account created successfully!");
    } catch (err: any) {
      form.setError("email", {
        type: "manual",
        message: err.message || "Failed to sign up.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gradient-to-r from-purple-600 to-violet-600">
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>

        
        <InputField control={form.control} name="displayName" label="Full Name" placeholder="Enter your full name" />

        {/* Email Field */}
        <InputField control={form.control} name="email" label="Email" type="email" placeholder="Enter your email" />

        {/* Password Field */}
        <InputField control={form.control} name="password" label="Password" type="password" placeholder="Enter your password" />

        {/* Submit Button */}
        <button type="submit" disabled={isLoading} className="btn-cyan">
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" /> &nbsp; Creating Account...
            </>
          ) : (
            "Sign Up"
          )}
        </button>

        {/* Success Message */}
        {successMessage && <p className="text-green-500 text-sm mt-4">{successMessage}</p>}

        {/* Error Messages */}
        {form.formState.errors.email && <p className="text-red-500 text-sm mt-4">{form.formState.errors.email.message}</p>}
      </form>
    </div>
  );
};

export default SignupPage;
