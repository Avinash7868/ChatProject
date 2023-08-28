import { gql } from "@apollo/client";
export const NEW_MESSAGE = gql`
  subscription newMessage($loggedInUser: String!) {
    NewMessage(loggedInUser: $loggedInUser) {
      _id
      content
      From
      To
      createdAt
    }
  }
`;
