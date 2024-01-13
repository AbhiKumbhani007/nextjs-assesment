import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk";
import { gql } from "@apollo/client";
import { createSlice } from "@reduxjs/toolkit";
import client from "../../../utils/apolloClient";

const initialState: any = {
  contentfulData: [],
  status: "false",
};

export const getContentfulData: any = createAppAsyncThunk(
  "auth/getData",
  async () => {
    const response = await client.query({
      query: gql`
        query GetEntries {
          entryCollection {
            items {
              sys {
                id
              }
              ... on CardPost {
                heading
                description
                thumbnail {
                  sys {
                    id
                  }
                  url
                }
              }
            }
          }
        }
      `,
    });
    return response.data.entryCollection.items;
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getContentfulData.fulfilled, (state, action) => {
      state.contentfulData = action.payload;
      state.status = "true";
    });
  },
});
