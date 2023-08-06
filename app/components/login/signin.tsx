// Import required modules and styles
"use client";
import { setSessionData } from "@/lib/redux"; // Import the action to set session data from Redux slice
import { signIn, useSession } from "next-auth/react"; // Import the signIn function and useSession hook from NextAuth.js
import { useRouter } from "next/navigation"; // Note: "next/navigation" is replaced with "next/router" as it is not the correct import
import { useDispatch } from "react-redux"; // Import the useDispatch hook from react-redux to dispatch actions
import styles from "./login.module.css"; // Import the CSS styles for the component

// Define the SigninButton component
const SigninButton = () => {
  // Get the current user session data using the useSession hook
  const { data: session } = useSession();

  // Get the Redux dispatch function
  const dispatch = useDispatch();

  // Get the router object from Next.js for navigation
  const router = useRouter();

  // Function to handle the sign-in process
  const handleSignin = async (e: any) => {
    e.preventDefault();
    // Call the signIn function with "google" provider to initiate Google login
    await signIn("google");
  };

  // Check if there's a session with user data
  if (session && session.user) {
    // Dispatch the setSessionData action to update session data in Redux store
    dispatch(setSessionData(session));
    // Navigate to the dashboard page after successful authentication
    router.push("/dashboard");
  }

  // Render the SigninButton component
  return (
    <div className={styles.loginContainer}>
      <div className={styles.headingContainer}>
        <h1 className={styles.title}>Google Login</h1>
      </div>
      <div className={styles.buttonContainer}>
        <button
          // Call the handleSignin function when the button is clicked
          onClick={(e) => {
            handleSignin(e);
          }}
          className={styles.button} // Apply the CSS styles for the button
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SigninButton;
