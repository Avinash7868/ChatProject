import React from "react";
import { fetchAllChatUsers } from "../../store/slice/ChatSlice";
import { useSelector, useDispatch } from "react-redux";
import { Col, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { setSelectedUser } from "../../store/slice/ChatSlice";
import classNames from "classnames";
import { Popover } from "antd";
import moment from "moment";
import OtherUsers from "./OtherUsers";
import { notification, Input } from "antd";
// import { useDispatch, useSelector } from "react-redux";

const Users = () => {
  const { allChatUsers } = useSelector((state) => state.chat);
  const [search, setSearch] = useState("");
  const { selectedUser } = useSelector((state) => state.chat);
  const { chatUsers } = useSelector((state) => state.chat);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const dispatch = useDispatch();
  console.log("chatUsers", chatUsers);
  let message = "";
  //Below code is for fetching all users
  useEffect(() => {
    dispatch(fetchAllChatUsers());
  }, [dispatch]);
  const handleSearch = (value) => {
    setSearch(value);
  };
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredUsers([]); // Clear filtered users when search is empty
    } else {
      // Filter users whose names contain the search input (case-insensitive)
      const filtered = allChatUsers.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
      console.log("filtered Users", filtered);
      setFilteredUsers(filtered);
    }
  }, [search, allChatUsers]);
  console.log("filteredUsers state ", filteredUsers);
  const handlePopoverClick = () => {
    // Toggle the popover visibility
    setFilteredUsers([]); // Clear filtered users when the popover is clicked
  };

  //Below code is for selecting a user and displaying messages and user details
  let userMarkup;
  if (!chatUsers) {
    userMarkup = <p>Loading...</p>;
  } else if (chatUsers.length === 0) {
    userMarkup = <p className="d-flex justify-content-around">Loading...</p>;
  } else if (chatUsers.length > 0) {
    userMarkup = [...chatUsers]

      .sort((a, b) =>
        b.latestMessage.createdAt.localeCompare(a.latestMessage.createdAt)
      )
      .map(
        (user) => (
          (message =
            user.latestMessage.content?.length > 20
              ? user.latestMessage.content.slice(0, 10) + "..."
              : user.latestMessage.content),
          console.log(message, "userMarkup.latestMessage"),
          (
            <div
              // role="button"
              className={classNames(
                "user-div d-flex justify-content-centre p-3",
                {
                  "bg-selectedUser": selectedUser === user.name,
                }
              )}
              key={user.name}
              onClick={() => dispatch(setSelectedUser(user.name))}
            >
              <Popover
                content={
                  <div>
                    <p>
                      <Image
                        src={user.img || "gravtar.png"}
                        className="userImagePopover"
                        loading="lazy"
                      />
                    </p>
                    <p>Living</p>
                  </div>
                }
                title={user.name}
                trigger="hover"
                placement="topLeft"
              >
                <Image
                  src={user.img || "image.jpg"}
                  className="userProfileImage"
                />
              </Popover>

              <div role="button" className="d-none d-md-block ml-2">
                <p className="text-greeen m-0 ms-2">{user.name}</p>
                <p className="font-monospace m-0 ms-2">
                  {user.latestMessage ? message : "You are now connected!"}

                  <small className="user-list-latestmessage-time">
                    {" "}
                    {user.latestMessage &&
                      moment(user.latestMessage.createdAt).calendar(null, {
                        sameDay: "h:mm a",
                        lastDay: "[Yesterday]",
                        lastWeek: "[Last] dddd",
                        sameElse: "DD/MM/YYYY",
                      })}
                  </small>
                </p>
              </div>
            </div>
          )
        )
      );
  }

  return (
    <div className="users-div">
      {/* Below code is for showing user Details in column */}
      {chatUsers.length === 0 ? (
        <OtherUsers />
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              width: "100%",
            }}
          >
            <h3 className="chats-heading">Chats</h3>
            <Input
              placeholder="Search users"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                width: "60%",
                marginRight: "auto",
                marginTop: "auto",
                marginBottom: "auto",
              }}
              allowClear={true}
            />
            {filteredUsers.length > 0 && (
              <Popover
                content={
                  <div>
                    {filteredUsers.map((filteredUser) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            // justifyContent: "space-between",
                            padding: "5px 0",
                          }}
                          key={filteredUser.name}
                        >
                          <img
                            src={filteredUser.img || "gravtar.png"}
                            alt="User"
                            style={{
                              height: 50,
                              width: 50,
                              borderRadius: "50%",
                              objectFit: "cover",
                              marginRight: 10,
                            }}
                          />
                          <p
                            key={filteredUser.name}
                            role="button"
                            onClick={() => {
                              dispatch(setSelectedUser(filteredUser.name));
                              setFilteredUsers([]); // Clear filtered users when a user is clicked
                              setSearch("");
                            }}
                          >
                            {filteredUser.name}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                }
                title="All Users"
                trigger="click"
                open={filteredUsers.length > 0}
                placement="bottomRight"
                onClick={handlePopoverClick}
              ></Popover>
            )}
          </div>

          <ul className="list-group ">{userMarkup}</ul>
          <OtherUsers />
        </div>
      )}
    </div>
  );
};

export default Users;
