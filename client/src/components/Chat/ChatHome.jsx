import React from "react";
import { useEffect } from "react";
import { Row, Col, Button, Image, Nav } from "react-bootstrap";
import "./ChatHome.scss";
import { Link } from "react-router-dom";
import Users from "./Users";
import Messages from "./Messages";
import { useSubscription } from "@apollo/client";
import { gql } from "@apollo/client";

const NEW_MESSAGE = gql`
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

const ChatHome = () => {
  const user = localStorage.getItem("user");
  console.log(user, "user");
  const { data: messageData, error: messageError } = useSubscription(
    NEW_MESSAGE,
    {
      variables: { loggedInUser: user },
    }
  );

  useEffect(() => {
    if (messageError) {
      console.log(messageError);
    }
    if (messageData) {
      console.log("Message From Subscription ", messageData);
    }
  }, [messageData, messageError]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      <Row className=" d-block-flex mb-2 bg-success m-0">
        <Link>
          <Button variant="" onClick={handleLogout}>
            Logout
          </Button>
        </Link>
      </Row>

      <Row className="m-0">
        <Users />
        <Messages />
      </Row>
    </>
  );
};

export default ChatHome;
