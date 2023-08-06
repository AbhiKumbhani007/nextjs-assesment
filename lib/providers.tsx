"use client";

/* Core */
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";

/* Instruments */
import { reduxStore } from "@/lib/redux";
import config from "dotenv";

config.config();
export const Providers = (props: React.PropsWithChildren) => {
  return (
    <SessionProvider>
      <Provider store={reduxStore}>{props.children}</Provider>
    </SessionProvider>
  );
};
