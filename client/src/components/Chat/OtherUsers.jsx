import React from "react";
// import { fetchAllChatUsers } from "../../store/slice/ChatSlice";
import { useSelector, useDispatch } from "react-redux";
import { Col, Image } from "react-bootstrap";
// import { useState, useEffect } from "react";
import { setSelectedUser } from "../../store/slice/ChatSlice";
import classNames from "classnames";
import { Popover } from "antd";
// import moment from "moment";
// import OtherUsers from "./OtherUsers";

const OtherUsers = () => {
  const { selectedUser } = useSelector((state) => state.chat);
  const { otherUsers } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  console.log("otherUsers", otherUsers);
  let otherUsersMarkup;
  if (!otherUsers) {
    otherUsersMarkup = <p>No users...</p>;
  } else if (otherUsers.length === 0) {
    otherUsersMarkup = (
      <p className="d-flex justify-content-around">Loading...</p>
    );
  } else if (otherUsers.length > 0) {
    //Below code is for displaying all users
    otherUsersMarkup = otherUsers.map((user) => (
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
          </p>
        </div>
      </div>
    ));
  }
  return (
    <>
      {otherUsers.length === 0 ? (
        <p></p>
      ) : (
        <>
          <h2 className="text-center">Other Users</h2>
          <ul className="list-group ">{otherUsersMarkup}</ul>
        </>
      )}
    </>
  );
};

export default OtherUsers;
