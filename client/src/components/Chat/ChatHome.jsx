import React from "react";
import { useEffect, useState } from "react";
import { Row, Button, Dropdown } from "react-bootstrap";
import "../../assets/ChatHome.scss";
import { Link } from "react-router-dom";
import Users from "./Users";
import Messages from "./Messages";
import { useSubscription } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { SetSubscriptionMessages } from "../../store/slice/ChatSlice";
import { NEW_MESSAGE } from "../../store/api/Subscription";
import { notification } from "antd";
import { setSelectedUser } from "../../store/slice/ChatSlice";

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
          duration: 3,
          role: "status",
          style: {
            border: "2px solid green",
            color: "green",
          },
          onClick: () => {
            dispatch(setSelectedUser(messageData.NewMessage.From));
          },
        });
      }
    }
  }, [messageData, messageError]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      {contextHolder}
      <Row className="d-block-flex mb-2 bg-success m-0">
        <Dropdown className="home-drpodown">
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            className="bg-success"
          >
            <i className="fa-solid fa-user fa-beat"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <p className="dropdown-header">{user}</p>
            {/* <Dropdown.Item  >{user}</Dropdown.Item> */}
            {/* <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Help</Dropdown.Item> */}
            <Dropdown.Item
              href="#/action-3"
              className="dropdown-logout"
              onClick={handleLogout}
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Row>

      {/* <Row className="m-0 home-row"> */}
      <div className="home-row ">
        <div style={{ width: "30%" }}>
          <Users />
        </div>
        <div style={{ width: "70%" }}>
          <Messages />
        </div>
        {/* </Row> */}
      </div>
    </>
  );
};

export default ChatHome;
