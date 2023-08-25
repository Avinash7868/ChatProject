import React from "react";
import { Row, Col, Button, Image, Nav } from "react-bootstrap";
import "./ChatHome.scss";
import { Link } from "react-router-dom";
import Users from "./Users";
import Messages from "./Messages";

const ChatHome = () => {
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
