// Import required modules and styles
"use client";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react"; // Import NextAuth.js hooks for user session management
import style from "./layout.module.css"; // Import CSS styles for the layout
import { useRouter } from "next/navigation"; // Note: "next/navigation" is replaced with "next/router" as it is not the correct import
import { useDispatch, useSelector } from "react-redux"; // Import hooks for Redux state management
import { getContentfulData } from "@/lib/redux"; // Import the action to fetch Contentful data from Redux slice

// Define the "page" component
function page() {
  // Get the router object from Next.js for navigation
  const router = useRouter();

  // Get the Redux dispatch function
  const dispatch = useDispatch();

  // State to manage accordion item descriptions visibility
  const [showFullDescription, setShowFullDescription] = useState<any>({});

  // State to manage the currently active accordion item
  const [activeIndex, setActiveIndex] = useState<any>(null);

  // Function to toggle accordion item descriptions visibility
  const toggleDescription = (index: number) => {
    // Check if the accordion item is already in the showFullDescription state
    if (showFullDescription.hasOwnProperty(index)) {
      setShowFullDescription((prev: any) => {
        return { ...prev, [index]: !prev[index] };
      });
    } else {
      // If the accordion item is not in the state, show its description
      setShowFullDescription((prev: any) => {
        return { ...prev, [index]: true };
      });
    }
  };

  // Function to handle accordion item clicks and set the active index
  const handleAccordionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Get the current user session data using the useSession hook
  const { data: session } = useSession();

  // Select the session data from the Redux store using useSelector hook
  const sessionData = useSelector((state: any) => state.auth.sessionData);

  // Select the Contentful data from the Redux store using useSelector hook
  const contentfulData = useSelector(
    (state: any) => state.dashboard.contenfulData
  );

  // Function to handle user sign-out
  const handleSignOut = async () => {
    await signOut(); // Call NextAuth.js signOut function to end the user session
    router.push("/"); // Navigate to the home page after sign-out
  };

  // Use useEffect hook to check for the session and fetch Contentful data
  useEffect(() => {
    if (!session) {
      // If there is no session, navigate to the home page
      router.push("/");
    }
    // Fetch Contentful data using the getContentfulData action from Redux slice
    dispatch(getContentfulData());
  }, []);

  // Render the dashboard page
  if (!sessionData.user) {
    // If session data is not available yet, show loading text
    return <div className={style.loadingText}>Loading...</div>;
  }

  // Return the layout of the dashboard
  return (
    <div className={style.main}>
      <div className={style.dashboardContainer}>
        {/* Render the LeftSideBar component with user information and logout button */}
        <LeftSideBar sessionData={sessionData} handleSignOut={handleSignOut} />
        <div className={style.rightSideBar}>
          <div className={style.rightSideBarData}>
            {/* Render the accordion items */}
            <div className="accordion">
              {contentfulData.map((item: any, index: number) => (
                <div key={index} className={style.accordionItem}>
                  <div className={style.card}>
                    <button
                      // Set the accordion item title and handle click event
                      className={`${style.accordionTitle} ${
                        activeIndex === index ? "active" : ""
                      }`}
                      onClick={() => handleAccordionClick(index)}
                    >
                      {item.fields.heading}
                    </button>
                    {activeIndex === index ? (
                      <>
                        <p className={style.cardDescriptionFullDescription}>
                          {item.fields.description}
                        </p>
                        <button
                          className={style.accordionButton}
                          onClick={() => {
                            handleAccordionClick(index);
                          }}
                        >
                          Show Less
                        </button>
                      </>
                    ) : (
                      <>
                        <p className={style.cardDescription}>
                          {item.fields.description}
                        </p>
                        <button
                          className={style.accordionButton}
                          onClick={() => {
                            handleAccordionClick(index);
                          }}
                        >
                          Read More
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the "page" component as the default export
export default page;

// Define the LeftSideBar component
const LeftSideBar = ({ sessionData, handleSignOut }: any) => (
  <div className={style.leftSideBar}>
    <div className={style.leftSideBarData}>
      {/* Display user image, name, and email */}
      <div className={style.leftSideImageContainer}>
        <img
          src={sessionData?.user?.image}
          className={style.leftSideImage}
          alt=""
        />
      </div>
      <h1>{sessionData?.user?.name}</h1>
      <p>{sessionData?.user?.email}</p>
    </div>
    {/* Button to handle user sign-out */}
    <button className={style.button} onClick={handleSignOut}>
      logout
    </button>
  </div>
);
