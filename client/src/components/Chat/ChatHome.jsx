import React from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchAllChatUsers } from "../../store/slice/ChatSlice";

const ChatHome = () => {
  const { chatUsers } = useSelector((state) => state.chat);
  console.log(chatUsers);

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchAllChatUsers());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  //list-group-item
  let userMarkup;
  if (!chatUsers) {
    userMarkup = <p>Loading...</p>;
  } else if (chatUsers.length === 0) {
    userMarkup = <p>No users have joined yet</p>;
  } else if (chatUsers.length > 0) {
    userMarkup = chatUsers.map((user) => (
      <div className="d-flex p-3" key={user.name}>
        <Image
          src={user.img || "image.jpg"}
          roundedCircle
          className="mr-2"
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
        <div>
          <p className="text-success">{user.name}</p>
          <p className="">
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
      <Row className="justify-content-around mb-2 bg-dark">
        <Link to="/login">
          <Button variant="link">Login</Button>
        </Link>
        <Link to="/">
          <Button variant="link">Register</Button>
        </Link>
        <Button variant="dark" onClick={handleLogout}>
          Logout
        </Button>
      </Row>
      <Row className="">
        <Col xs={4}>
          <h1 className="text-center">Chat Home</h1>
          <ul className="list-group">{userMarkup}</ul>
        </Col>
        <Col xs={8}>
          <h1 className="text-center">Chat</h1>
        </Col>
      </Row>
    </>
  );
};

export default ChatHome;
