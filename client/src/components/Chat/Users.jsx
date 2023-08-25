import React from "react";
import { fetchAllChatUsers } from "../../store/slice/ChatSlice";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button, Image, Nav } from "react-bootstrap";
import { useState, useEffect } from "react";
import { setSelectedUser } from "../../store/slice/ChatSlice";
import classNames from "classnames";
import "./ChatHome.scss";
const Users = () => {
  const { selectedUser } = useSelector((state) => state.chat);
  const { chatUsers } = useSelector((state) => state.chat);
  console.log(chatUsers);

  const dispatch = useDispatch();

  //Below code is for fetching all users
  useEffect(() => {
    dispatch(fetchAllChatUsers());
  }, [dispatch]);

  //Below code is for selecting a user and displaying messages and user details
  let userMarkup;
  if (!chatUsers) {
    userMarkup = <p>Loading...</p>;
  } else if (chatUsers.length === 0) {
    userMarkup = <p>No users have joined yet</p>;
  } else if (chatUsers.length > 0) {
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
        <Image src={user.img || "image.jpg"} className="userProfileImage" />

        <div role="button" className="d-none d-md-block ml-2">
          <p className="text-greeen m-0 ms-2">{user.name}</p>
          <p className="font-monospace m-0 ms-2">
            {user.latestMessage
              ? user.latestMessage.content
              : "You are now connected!"}
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
