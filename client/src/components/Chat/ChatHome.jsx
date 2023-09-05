import React from "react";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "./ChatHome.scss";
import Users from "./Users";
import Messages from "./Messages";
import { useSubscription } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { SetSubscriptionMessages } from "../../store/slice/ChatSlice";
import { NEW_MESSAGE } from "../../store/api/Subscription";
import { notification, Input, Popover } from "antd";
import { setSelectedUser } from "../../store/slice/ChatSlice";

const ChatHome = () => {
  const { allChatUsers } = useSelector((state) => state.chat);

  // const [search, setSearch] = useState("");
  // console.log(search, "search");
  const user = localStorage.getItem("user");
  const [api, contextHolder] = notification.useNotification();
  // const [filteredUsers, setFilteredUsers] = useState([]);
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

  // const handleSearch = (value) => {
  //   setSearch(value);
  // };
  // useEffect(() => {
  //   if (search.trim() === "") {
  //     setFilteredUsers([]); // Clear filtered users when search is empty
  //   } else {
  //     // Filter users whose names contain the search input (case-insensitive)
  //     const filtered = allChatUsers.filter((user) =>
  //       user.name.toLowerCase().includes(search.toLowerCase())
  //     );
  //     console.log("filtered Users", filtered);
  //     setFilteredUsers(filtered);
  //   }
  // }, [search, allChatUsers]);
  // console.log("filteredUsers state ", filteredUsers);
  const handlePopoverClick = () => {
    // Toggle the popover visibility
    setFilteredUsers([]); // Clear filtered users when the popover is clicked
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      {contextHolder}
      <div
        className="home-header"
        style={{
          backgroundColor: "green",
        }}
      >
        <div>
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
        </div>
      </div>

      <div className="home-row ">
        <div style={{ width: "30%" }}>
          <Users />
        </div>
        <div style={{ width: "70%" }}>
          <Messages />
        </div>
      </div>
    </>
  );
};

export default ChatHome;
