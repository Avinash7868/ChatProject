import React from "react";
// import "./ChatHome.css";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { gql } from "@apollo/client";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchAllChatUsers } from "../../store/slice/ChatSlice";
const QUERY_ALL_CHAT_USERS = gql`
  query AllChatUsers {
    AllChatUsers {
      name
      email
      createdAt
    }
  }
`;

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
  return (
    <Row className="justify-content-around bg-white">
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
  );
};

export default ChatHome;
