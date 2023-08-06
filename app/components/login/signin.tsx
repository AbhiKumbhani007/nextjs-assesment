"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";
import { setSessionData } from "@/lib/redux";
import { useDispatch } from "react-redux";

const SigninButton = () => {
  const { data: session } = useSession();

  const dispatch = useDispatch();

  const router = useRouter();

  const handleSignin = async (e: any) => {
    e.preventDefault();
    await signIn("google");
  };

  if (session && session.user) {
    dispatch(setSessionData(session));
    router.push("/dashboard");
  }
  return (
    <div className={styles.loginContainer}>
      <div className={styles.headingContainer}>
        <h1 className={styles.title}>Login</h1>
      </div>
      <div className={styles.buttonContainer}>
        <button
          onClick={(e) => {
            handleSignin(e);
          }}
          className={styles.button}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SigninButton;
