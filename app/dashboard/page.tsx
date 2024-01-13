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

  const { data: session } = useSession();

  const [activeIndex, setActiveIndex] = useState<any>(null);

  const handleAccordionClick = (index: number) =>
    setActiveIndex(activeIndex === index ? null : index);

  const sessionData = useSelector((state: any) => state.auth.sessionData);

  const contentfulData = useSelector(
    (state: any) => state.dashboard.contentfulData
  );

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  useEffect(() => {
    if (!session) router.push("/");

    dispatch(getContentfulData());
  }, []);

  if (!sessionData.user) {
    return <div className={style.loadingText}>Loading...</div>;
  }

  return (
    <div className={style.main}>
      <div className={style.dashboardContainer}>
        <LeftSideBar sessionData={sessionData} handleSignOut={handleSignOut} />
        <div className={style.rightSideBar}>
          <div className={style.rightSideBarData}>
            <div className="accordion">
              {contentfulData.map((item: any, index: number) => (
                <div key={index} className={style.accordionItem}>
                  <div className={style.card}>
                    <button
                      className={`${style.accordionTitle} ${
                        activeIndex === index ? "active" : ""
                      }`}
                      onClick={() => handleAccordionClick(index)}
                    >
                      {item.heading}
                    </button>
                    {activeIndex === index ? (
                      <>
                        <p className={style.cardDescriptionFullDescription}>
                          {item.description}
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
                          {item.description}
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
