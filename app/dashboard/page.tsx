"use client";

import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import style from "./layout.module.css";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getContentfulData } from "@/lib/redux";

function page() {
  const router = useRouter();

  const dispatch = useDispatch();

  const [showFullDescription, setShowFullDescription] = useState<any>({});

  const [activeIndex, setActiveIndex] = useState<any>(null);

  const toggleDescription = (index: number) => {
    if (showFullDescription.hasOwnProperty(index)) {
      setShowFullDescription((prev: any) => {
        return { ...prev, [index]: !prev[index] };
      });
    } else {
      setShowFullDescription((prev: any) => {
        return { ...prev, [index]: true };
      });
    }
  };

  const handleAccordionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const { data: session } = useSession();

  const sessionData = useSelector((state: any) => state.auth.sessionData);

  const contentfulData = useSelector(
    (state: any) => state.dashboard.contenfulData
  );

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
    dispatch(getContentfulData());
  }, []);

  useEffect(() => {
    console.log(contentfulData);
  }, [contentfulData]);

  if (!sessionData.user) {
    return <div className={style.loadingText}>Loading...</div>;
  }

  return (
    <div className={style.main}>
      <div className={style.dashboardContainer}>
        <LeftSideBar sessionData={sessionData} handleSignOut={handleSignOut} />
        <div className={style.rightSideBar}>
          <div className={style.rightSideBarData}>
            {/* {contentfulData?.map((item: any, index: number) => (
              <div className={style.contentfulCard} key={index}>
                <div
                  className={
                    showFullDescription[index]
                      ? style.accordionExpand
                      : style.accordion
                  }
                >
                  <div
                    className={style.accordionHeading}
                    onClick={() => toggleDescription(index)}
                  >
                    <div>{item.fields.heading}</div>
                    <div className={style.actionButton}>
                      {showFullDescription[index] ? "-" : "+"}
                    </div>
                  </div>
                  {showFullDescription[index] && (
                    <p className={style.cardDescriptionFullDescription}>
                      {item.fields.description}
                    </p>
                  )}
                </div>
              </div>
            ))} */}
            <div className="accordion">
              {contentfulData.map((item: any, index: number) => (
                <div key={index} className={style.accordionItem}>
                  <button
                    className={`${style.accordionTitle} ${
                      activeIndex === index ? "active" : ""
                    }`}
                    onClick={() => handleAccordionClick(index)}
                  >
                    {item.fields.heading}
                  </button>
                  {activeIndex === index && (
                    <div className={style.accordionContent}>
                      {item.fields.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;

const LeftSideBar = ({ sessionData, handleSignOut }: any) => (
  <div className={style.leftSideBar}>
    <div className={style.leftSideBarData}>
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
    <button className={style.button} onClick={handleSignOut}>
      logout
    </button>
  </div>
);
