import { auth } from "../services/firebase"; // Adjust path if necessary
import { signInWithEmailAndPassword } from "firebase/auth";

const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCredential.user);
    return userCredential.user; // Returns user object
  } catch (error: any) {
    console.error("Error during sign-in:", error.message);
    throw new Error(error.message); // Handle or display the error
  }
};

export default signIn;
