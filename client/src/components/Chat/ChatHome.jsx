import React from "react";
import { useEffect } from "react";
import { Row, Col, Button, Image, Nav } from "react-bootstrap";
import "./ChatHome.scss";
import { Link } from "react-router-dom";
import Users from "./Users";
import Messages from "./Messages";
import { useSubscription } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { SetSubscriptionMessages } from "../../store/slice/ChatSlice";
import { NEW_MESSAGE } from "../../store/api/Subscription";
import { notification } from "antd";

const ChatHome = () => {
  const user = localStorage.getItem("user");
  const [api, contextHolder] = notification.useNotification();
  console.log(user, "user");
  const { data: messageData, error: messageError } = useSubscription(
    NEW_MESSAGE,
    {
      variables: { loggedInUser: user },
    }
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (messageError) {
      console.log(messageError);
    }
    if (messageData) {
      console.log("Message From Subscription ", messageData);
      dispatch(SetSubscriptionMessages(messageData.NewMessage));
      if (messageData.NewMessage.From !== user) {
        api.open({
          icon: <i class="fa-sharp fa-regular fa-message fa-bounce"></i>,
          message: "Message From " + messageData.NewMessage.From,
          description: messageData.NewMessage.content,
          duration: 4,
        });
      }
    }
  }, [messageData, messageError]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      {contextHolder}
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
