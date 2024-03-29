import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apolloClient } from "../../graphql/apolloClient";
// import { gql } from "@apollo/client";
import {
  QUERY_ALL_CHAT_USERS,
  QUERY_ALL_MESSAGES_BETWEEN_TWO_USERS,
  MUTATION_SEND_MESSAGE,
} from "../api/Chat";

// ****************************actions********************************
export const fetchAllChatUsers = createAsyncThunk(
  "chat/fetchAllChatUsers",
  async () => {
    const response = await apolloClient.query({
      query: QUERY_ALL_CHAT_USERS,
    });
    console.log("Chat Users called");
    return response.data.AllChatUsers;
  }
);

export const fetchAllMessagesBetweenTwoUsers = createAsyncThunk(
  "chat/fetchAllMessagesBetweenTwoUsers",
  async (To) => {
    const response = await apolloClient.query({
      query: QUERY_ALL_MESSAGES_BETWEEN_TWO_USERS,
      variables: { To },
      fetchPolicy: "network-only",
    });
    console.log("Chat Message Api called");
    return response.data.MessagesBetweenTwoUsers;
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (createChatInput) => {
    const response = await apolloClient.mutate({
      mutation: MUTATION_SEND_MESSAGE,
      variables: { createChatInput },
    });
    console.log("Chat Message Api called");
    return response.data.sendMessage;
  }
);

//Intial State
const initialState = {
  chatUsers: [],
  otherUsers: [],
  chatMessages: [],
  allChatUsers: [],
  selectedUser: null,
  loading: false,
  error: null,
};

//Slice for Chat
const chatSlice = createSlice({
  name: "Chat",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    //Below code is for setting subscription messages in chats and initial state
    SetSubscriptionMessages: (state, action) => {
      const userCopy = [...state.chatUsers];

      //Below code is to find the index of user who sent the message
      const userIndex = userCopy.findIndex(
        (user) =>
          user.name === action.payload.To || user.name === action.payload.From
      );

      //Below code is to check if the user is already in chatUsers array or not
      if (userCopy[userIndex]) {
        userCopy[userIndex].latestMessage = action.payload;
      }
      //Below code is to check if the user is already in otherUsers array or not
      else {
        const otherUserIndex = state.otherUsers.findIndex(
          (user) =>
            user.name === action.payload.To || user.name === action.payload.From
        );

        state.otherUsers[otherUserIndex].latestMessage = action.payload;
        userCopy.push(state.otherUsers[otherUserIndex]);
        state.otherUsers.splice(otherUserIndex, 1);
      }

      state.chatUsers = userCopy;

      //Below code is to check if the user is selected or not
      if (
        state.selectedUser === action.payload.To ||
        state.selectedUser === action.payload.From
      ) {
        state.chatMessages = [...state.chatMessages, action.payload];
      }

      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllChatUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllChatUsers.fulfilled, (state, action) => {
        state.allChatUsers = [...action.payload];

        //Below code is for filtering users who have latest message
        state.chatUsers = action.payload.filter(
          (user) => user.latestMessage !== null
        );
        //Below code is for filtering users who have no latest message
        state.otherUsers = action.payload.filter(
          (user) => user.latestMessage === null
        );
        state.loading = false;
      })
      .addCase(fetchAllChatUsers.rejected, (state, action) => {
        console.log(action.error.message);
        state.error = action.error.message;
        state.loading = false;
      });

    builder
      .addCase(fetchAllMessagesBetweenTwoUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllMessagesBetweenTwoUsers.fulfilled, (state, action) => {
        state.chatMessages = [...action.payload];

        state.loading = false;
      })
      .addCase(fetchAllMessagesBetweenTwoUsers.rejected, (state, action) => {
        console.log(action.error.message);
        state.error = action.error.message;
        state.loading = false;
      });

    builder
      .addCase(sendMessage.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        console.log(action.error.message);
        state.error = action.error.message;
        state.loading = false;
      });
  },
});
export const { setSelectedUser } = chatSlice.actions;
export const { SetSubscriptionMessages } = chatSlice.actions;
export default chatSlice.reducer;
