import { gql } from "@apollo/client";
// Define the GraphQL query to fetch all the users
export const QUERY_ALL_CHAT_USERS = gql`
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

// Define the GraphQL mutation to send a message
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
