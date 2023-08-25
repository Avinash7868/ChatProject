import React from "react";
import { useState, useEffect, useRef } from "react";
import { Row, Col, Button, Image, Nav, Form } from "react-bootstrap";
import "./ChatHome.scss";
import Message from "./Message";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchAllMessagesBetweenTwoUsers } from "../../store/slice/ChatSlice";
import { sendMessage } from "../../store/slice/ChatSlice";

const Messages = () => {
  const { chatMessages } = useSelector((state) => state.chat);
  const { selectedUser } = useSelector((state) => state.chat);
  const [content, setContent] = useState("");
  console.log("Selected User:-", selectedUser);
  console.log(chatMessages);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === "" || !selectedUser) return;
    setContent("");
    dispatch(sendMessage({ content, To: selectedUser }));
  };

  //Below code is for fetching all messages between two users
  useEffect(() => {
    if (selectedUser) {
      dispatch(fetchAllMessagesBetweenTwoUsers(selectedUser));
    }
  }, [dispatch, selectedUser]);

  let messageMarkup;
  if (!chatMessages) {
    messageMarkup = <p className="info-text">Loading...</p>;
  } else if (selectedUser === null) {
    messageMarkup = (
      <p className="info-text">Open a chat to start a conversation</p>
    );
  } else if (chatMessages.length === 0) {
    messageMarkup = <p className="info-text">No messages yet</p>;
  } else if (chatMessages.length > 0) {
    {
      /* Below code is for calling messages and mapping it */
    }

    messageMarkup = chatMessages.map((message) => (
      <Message key={message._id} message={message} />
    ));
  }

  return (
    <>
      <Col xs={10} md={8}>
        <div className="messages-box d-felx  ">{messageMarkup}</div>
        <div className="px-3 py-2">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="d-flex">
              <Form.Control
                type="text"
                placeholder="Enter Message"
                className="rounded-pill p-4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />

              <Button type="submit" className=" ms-2">
                <i class="fa-solid fa-paper-plane fa-beat"></i>
              </Button>
            </Form.Group>
          </Form>
        </div>
      </Col>
    </>
  );
};

export default Messages;

{
  /* {selectedUser ? (
            <div className="d-flex flex-column-reverse">
              {chatMessages.length > 0 ? (
                chatMessages.map((message) => (
                  <p
                    key={message._id}
                    className={`my-1 d-flex flex-column ${
                      message.To === selectedUser && "align-self-end"
                    }`}
                  >
                    <span
                      className={`px-2 py-1 rounded-pill ${
                        message.From === selectedUser
                          ? "bg-primary  text-white"
                          : "border border-success"
                      }`}
                    >
                      {message.content}
                    </span>
                    <small>
                      {new Date(message.createdAt).toLocaleString()}
                    </small>
                  </p>
                ))
              ) : (
                <p>You are now connected!</p>
              )}
            </div>
          ) : (
            <p className="text-center">Open a chat to start a conversation</p>
          )  
          }           */
}
