import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import signIn from "../utils/auth";
import InputField from "../components/elements/InputField";


const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const user = await signIn(data.email, data.password);
      console.log("User signed in:", user);
      navigate("/dashboard"); 
    } catch (error: any) {
      form.setError("password", { type: "manual", message: "Invalid email or password." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-violet-600">
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Welcome to Matrimony !</h2>
      
 
        <InputField control={form.control} name="email" label="Email" type="email" placeholder="Enter your email" />
 
        <InputField control={form.control} name="password" label="Password" type="password" placeholder="Enter your password" />
     
        <button type="submit" disabled={isLoading} className="btn-cyan">
          {isLoading ? (
            <span className="flex items-center space-x-2">
              <Loader2 size={20} className="animate-spin" />
              <span>Loading...</span>
            </span>
          ) : (
            "Login"
          )}
        </button>

        <p className="text-sm text-gray-500 text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
