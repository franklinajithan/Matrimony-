import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { auth } from "../services/firebase"; // Firebase config path
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Loader2 } from "lucide-react"; // Loading spinner
import InputField from "../components/elements/InputField";

// Validation schema
const signupSchema = z.object({
  displayName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupPage: React.FC = () => {
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
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: data.displayName,
      });

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 px-4">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm bg-white p-6 md:p-8 rounded-lg shadow-lg"
        aria-labelledby="signup-form-title"
      >
        {/* Title */}
        <h2 id="signup-form-title" className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>

        {/* Full Name */}
        <div className="mb-4">
          <InputField
            control={form.control}
            name="displayName"
            label="Full Name"
            placeholder="Enter your full name"
            type="text"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <InputField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <InputField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition disabled:opacity-70 flex items-center justify-center`}
          aria-busy={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin mr-2" /> Creating Account...
            </>
          ) : (
            "Sign Up"
          )}
        </button>

        {/* Success Message */}
        {successMessage && (
          <p className="text-green-500 text-sm text-center mt-4">{successMessage}</p>
        )}

        {/* Error Message */}
        {form.formState.errors.email && (
          <p className="text-red-500 text-sm text-center mt-4">
            {form.formState.errors.email.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default SignupPage;
