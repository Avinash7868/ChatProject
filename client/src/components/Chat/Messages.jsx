import React from "react";
import { useState, useEffect, useMemo } from "react";
import { Col, Button, Form } from "react-bootstrap";
import Message from "./Message";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchAllMessagesBetweenTwoUsers } from "../../store/slice/ChatSlice";
import { sendMessage } from "../../store/slice/ChatSlice";
import { Empty } from "antd";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Popover } from "antd";
const Messages = () => {
  const { chatMessages } = useSelector((state) => state.chat);
  const { selectedUser } = useSelector((state) => state.chat);
  const [content, setContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Track emoji picker visibility

  const dispatch = useDispatch();
  console.log("Selected User:-", selectedUser);
  console.log(chatMessages);

  const handleEmojiSelect = (emoji) => {
    setContent(content + emoji.native);
  };

  // Handle message input field focus
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleToggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  // Append selected emoji to the message content
  const handleSelectEmoji = (emoji) => {
    setContent(content + emoji.native);
  };

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

  // Render messages based on chatMessages
  const messageMarkup = useMemo(() => {
    if (!chatMessages) {
      return <p className="info-text">Loading...</p>;
    } else if (selectedUser === null) {
      return <p className="info-text">Open a chat to start a conversation</p>;
    } else if (chatMessages.length === 0) {
      return <Empty description="No messages yet" className="no-message" />;
    } else if (chatMessages.length > 0) {
      return chatMessages.map((message) => (
        <Message key={message._id} mykey={message._id} message={message} />
      ));
    }
  }, [chatMessages, selectedUser]);

  return (
    <>
      <Col className="message-div">
        <div className="messages-box d-felx">{messageMarkup}</div>
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
              <Popover
                content={
                  <div>
                    {
                      <Picker
                        set="emojione"
                        data={data}
                        onEmojiSelect={handleEmojiSelect}
                        emojiSize={21}
                      />
                      // <Picker data={data} onEmojiSelect={memoizedHandleSelectEmoji} />
                    }
                  </div>
                }
                title="emoji"
                trigger="hover"
                placement="topLeft"
              >
                <Button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                  }}
                >
                  😄
                </Button>
              </Popover>

              <Button type="submit" className="ms-2">
                <i className="fa-solid fa-paper-plane fa-beat"></i>
              </Button>
            </Form.Group>
          </Form>
        </div>
      </Col>
    </>
  );
};

export default Messages;
