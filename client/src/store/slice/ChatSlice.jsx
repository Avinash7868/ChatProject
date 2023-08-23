import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apolloClient } from "../../graphql/apolloClient";
import { gql } from "@apollo/client";

// Define the GraphQL query to fetch all the users
const QUERY_ALL_CHAT_USERS = gql`
  query AllChatUsers {
    AllChatUsers {
      name
      img
      latestMessage {
        content
        From
        To
        createdAt
      }
      createdAt
    }
  }
`;

// actions
export const fetchAllChatUsers = createAsyncThunk(
  "chat/fetchAllChatUsers",
  async () => {
    const response = await apolloClient.query({
      query: QUERY_ALL_CHAT_USERS,
    });
    console.log("api called");
    return response.data.AllChatUsers;
  }
);

//Intial State
const initialState = {
  chatUsers: [],
  loading: false,
  error: null,
};

//Slice for Chat
const chatSlice = createSlice({
  name: "Chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllChatUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllChatUsers.fulfilled, (state, action) => {
        state.chatUsers = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllChatUsers.rejected, (state, action) => {
        console.log(action.error.message);
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default chatSlice.reducer;
