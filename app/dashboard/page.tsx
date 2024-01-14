"use client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import style from "./layout.module.css";
import { Accordion, FirstAccordion } from "@/lib/interfaces";
import { ReduxState } from "@/lib/redux";
import Link from "next/link";

function page() {
  const router = useRouter();

  const { data: session } = useSession();

  const [activeIndex, setActiveIndex] = useState<any>(null);

  const [contentfulData, setContentfulData] = useState<any>([]);

  const handleAccordionClick = (index: number) =>
    setActiveIndex(activeIndex === index ? null : index);

  const sessionData = useSelector(
    (state: ReduxState) => state.auth.sessionData
  );

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  // useEffect(() => {
  //   if (!session) router.push("/");

  //   let data = {};

  //   callContentful(`query {
  //     accordionCollection{
  //       items{
  //         __typename
  //         sys{
  //           id
  //         }
  //       }
  //     }
  //   }
  // `).then((res: any) => {
  //     const id = Object.values(res.data)[0].items[0].sys.id;

  //     callContentful(`query{
  //       accordion(id: "${id}") {
  //         __typename
  //         heading
  //         sys {
  //           id
  //         }
  //         accordionItemsCollection {
  //           items {
  //             __typename
  //             sys {
  //               id
  //             }
  //           }
  //         }
  //       }
  //     }`).then((res: any) => {
  //       const d = Object.values(res.data)[0];
  //       data = d;

  //       const accordionId = Object.values(
  //         res.data
  //       )[0].accordionItemsCollection.items.map((accordionItem: any) => {
  //         return accordionItem.sys.id;
  //       });

  //       accordionId.map((id: string, index: number) => {
  //         callContentful(`query {
  //           accordionItem(id: "${id}") {
  //             __typename
  //             accordionItemHeading
  //             description {
  //               json
  //             }
  //             link{
  //               sys{
  //                 id
  //               }
  //             }
  //           }
  //         }`).then((res: any) => {
  //           const resData = Object.values(res.data)?.at(0);
  //           // console.log("resData: ", resData);

  //           data.accordionItemsCollection.items[index] = resData;

  //           const linkId = resData.link.sys.id;

  //           callContentful(`query{
  //             link(id: "${linkId}") {
  //               linkText
  //               href
  //             }
  //           }`).then((res: any) => {
  //             data.accordionItemsCollection.items[index].link = res.data.link;
  //             setContentfulData(data);
  //             console.log(data);
  //           });
  //         });
  //       });
  //     });
  //   });
  // }, []);

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
    initializeAccordionData();
  }, []);

  const initializeAccordionData = async () => {
    try {
      const accordionCollection = await fetchAccordionCollection();
      const accordionId = getAccordionId(accordionCollection);
      const accordion = await fetchAccordionById(accordionId);
      const populatedAccordion = await populateAccordionWithItems(accordion);
      setContentfulData(populatedAccordion);
    } catch (error) {
      console.error("Error fetching accordion data:", error);
    }
  };

  async function fetchAccordionCollection() {
    const query = `query {
      accordionCollection {
        items {
          __typename
          sys { id }
        }
      }
    }`;
    return callContentful(query);
  }

  function getAccordionId(accordionCollection: FirstAccordion) {
    return accordionCollection.data.accordionCollection.items[0].sys.id;
  }

  async function fetchAccordionById(accordionId: string) {
    const query = `query {
      accordion(id: "${accordionId}") {
        __typename
        heading
        sys { id }
        accordionItemsCollection {
          items {
            __typename
            sys { id }
          }
        }
      }
    }`;
    return callContentful(query);
  }

  async function populateAccordionWithItems(accordion: Accordion) {
    const items = accordion.data.accordion.accordionItemsCollection.items;
    const populatedItems = await Promise.all(
      items.map((item) => populateAccordionItem(item.sys.id))
    );
    accordion.data.accordion.accordionItemsCollection.items = populatedItems;
    return accordion.data.accordion;
  }

  async function populateAccordionItem(itemId: string) {
    const accordionItem = await fetchAccordionItemById(itemId);
    const linkId = accordionItem.data.accordionItem.link.sys.id;
    const linkData = await fetchAccordionItemLinkData(linkId);
    accordionItem.data.accordionItem.link = linkData.data.link;
    return accordionItem.data.accordionItem;
  }

  async function fetchAccordionItemById(itemId: string) {
    const query = `query {
      accordionItem(id: "${itemId}") {
        __typename
        accordionItemHeading
        description { json }
        link {
          sys { id }
        }
      }
    }`;
    return callContentful(query);
  }

  async function fetchAccordionItemLinkData(linkId: string) {
    const query = `query {
      link(id: "${linkId}") {
        linkText
        href
      }
    }`;
    return callContentful(query);
  }

  async function callContentful(query: string) {
    const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}`;

    const fetchOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CONTENTFUL_AUTH}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    };

    try {
      const response = await fetch(fetchUrl, fetchOptions);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      return await response.json();
    } catch (error) {
      console.error("Error in callContentful:", error);
      throw new Error("Could not fetch data from Contentful!");
    }
  }

  if (!sessionData.user) {
    return <div className={style.loadingText}>Loading...</div>;
  }

  return (
    <div className={style.main}>
      <div className={style.dashboardContainer}>
        <LeftSideBar sessionData={sessionData} handleSignOut={handleSignOut} />
        <div className={style.rightSideBar}>
          <div className={style.rightSideBarData}>
            {contentfulData ? (
              <>
                <h2>{contentfulData?.heading}</h2>
                {contentfulData.accordionItemsCollection?.items.map(
                  (item: any, index: number) => (
                    <div key={index} className={style.accordionItem}>
                      <div className={style.card}>
                        <div className={style.cardHeader}>
                          <div
                            className={`${style.accordionTitle} ${
                              activeIndex === index ? "active" : ""
                            }`}
                            onClick={() => handleAccordionClick(index)}
                          >
                            {item.accordionItemHeading}
                          </div>
                          <Link
                            className={style.accordionLink}
                            href={item?.link?.href || ""}
                            target="_blank"
                          >
                            {item?.link?.linkText}
                          </Link>
                        </div>
                        {activeIndex === index ? (
                          <>
                            <p className={style.cardDescriptionFullDescription}>
                              {documentToReactComponents(
                                item?.description?.json
                              )}
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
                              {documentToReactComponents(
                                item?.description?.json
                              )}
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
                  )
                )}
              </>
            ) : (
              <div className={style.loadingText}>Loading...</div>
            )}
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
