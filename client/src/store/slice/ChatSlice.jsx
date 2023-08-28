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

// Define the GraphQL query to fetch all the messages between two users
export const QUERY_ALL_MESSAGES_BETWEEN_TWO_USERS = gql`
  query MessagesBetweenTwoUsers($To: String!) {
    MessagesBetweenTwoUsers(To: $To) {
      _id
      content
      From
      To
      createdAt
    }
  }
`;

export const MUTATION_SEND_MESSAGE = gql`
  mutation sendMessage($createChatInput: CreateChatInput!) {
    sendMessage(createChatInput: $createChatInput) {
      content
      From
      To
      createdAt
    }
  }
`;

//Below is the subscription query to listen to new messages
// export const SUBSCRIPTION_NEW_MESSAGE = gql`
//   subscription newMessage($loggedInUser: String!) {
//     NewMessage(loggedInUser: $loggedInUser) {
//       _id
//       content
//       From
//       To
//       createdAt
//     }
//   }
// `;

// ******************************************actions********************************
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

// export const newMessageSubscription = createAsyncThunk(
//   "chat/newMessageSubscription",
//   async (loggedInUser) => {
//     try {
//       const response = apolloClient.subscribe({
//         query: SUBSCRIPTION_NEW_MESSAGE,
//         variables: { loggedInUser },
//       });
//       console.log("Chat Message Subscription called");
//       return response.data.NewMessage;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

//Intial State
const initialState = {
  chatUsers: [],
  chatMessages: [],
  selectedUser: null,
  loading: false,
  error: null,
  Sub: [],
};

//Slice for Chat
const chatSlice = createSlice({
  name: "Chat",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    SetSubscriptionMessages: (state, action) => {
      const userCopy = [...state.chatUsers];

      const userIndex = userCopy.findIndex(
        (user) =>
          user.name === action.payload.To || user.name === action.payload.From
      );
      userCopy[userIndex].latestMessage = action.payload;
      state.chatUsers = userCopy;
      // const userIndex2 = userCopy.findIndex(
      //   (user) => user.name === action.payload.To
      // );
      if (
        state.selectedUser === action.payload.To ||
        state.selectedUser === action.payload.From
      ) {
        state.chatMessages = [...state.chatMessages, action.payload];
      }
      state.Sub = action.payload;
      state.loading = false;
    },
  },
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
        // const userCopy = [...state.chatUsers];
        // const userIndex = userCopy.findIndex(
        //   (user) => user.name === action.payload.To
        // );
        // userCopy[userIndex].latestMessage = action.payload;
        // // state.chatMessages = [...state.chatMessages, action.payload];
        // state.chatUsers = userCopy;
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
