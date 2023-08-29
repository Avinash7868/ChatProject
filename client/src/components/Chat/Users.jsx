import React from "react";
import { fetchAllChatUsers } from "../../store/slice/ChatSlice";
import { useSelector, useDispatch } from "react-redux";
import { Col, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import { setSelectedUser } from "../../store/slice/ChatSlice";
import classNames from "classnames";
import { Popover } from "antd";
import moment from "moment";

const Users = () => {
  const { selectedUser } = useSelector((state) => state.chat);
  const { chatUsers } = useSelector((state) => state.chat);
  const [content, setContent] = useState();

  console.log("chatUsers", chatUsers);
  const handleChatUser = (e) => {
    console.log("content", content);
  };
  const dispatch = useDispatch();

  //Below code is for fetching all users
  useEffect(() => {
    dispatch(fetchAllChatUsers());
    handleChatUser();
  }, [dispatch]);

  //Below code is for selecting a user and displaying messages and user details
  let userMarkup;
  if (!chatUsers) {
    userMarkup = <p>Loading...</p>;
  } else if (chatUsers.length === 0) {
    userMarkup = <p className="d-flex justify-content-around">Loading...</p>;
  } else if (chatUsers.length > 0) {
    const latestMessages = chatUsers.map((user) => user.latestMessage);
    console.log("latestMessages", latestMessages);
    //Below code is for displaying all users
    userMarkup = chatUsers.map((user) => (
      <div
        // role="button"
        className={classNames("user-div d-flex justify-content-centre p-3", {
          "bg-adarsh bg-hovver": selectedUser === user.name,
        })}
        key={user.name}
        onClick={() => dispatch(setSelectedUser(user.name))}
      >
        <Popover
          content={
            <div>
              <p>
                <Image
                  src={user.img || "image.jpg"}
                  className="userImagePopover"
                />
              </p>
              <p>Living</p>
            </div>
          }
          title={user.name}
          trigger="hover"
          placement="topLeft"
        >
          <Image src={user.img || "image.jpg"} className="userProfileImage" />
        </Popover>

        <div role="button" className="d-none d-md-block ml-2">
          <p className="text-greeen m-0 ms-2">{user.name}</p>
          <p className="font-monospace m-0 ms-2">
            {user.latestMessage
              ? user.latestMessage.content
              : "You are now connected!"}

            <small className="user-list-time">
              {" "}
              {user.latestMessage &&
                moment(user.latestMessage.createdAt).calendar(null, {
                  sameDay: "hh:mm a",
                  lastDay: "[Yesterday]",
                  lastWeek: "[Last] dddd",
                  sameElse: "DD/MM/YYYY",
                })}
            </small>
          </p>
        </div>
      </div>
    ));
  }
  return (
    <>
      {/* Below code is for showing user Details in column */}
      <Col xs={2} md={4} className="p-0 bg-noname ">
        <h1 className="text-center">Chats</h1>
        <ul className="list-group ">{userMarkup}</ul>
      </Col>
    </>
  );
};

export default Users;
