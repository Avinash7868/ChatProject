import React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import moment from "moment";
import { useRef, useEffect } from "react";

const Message = ({ message, mykey }) => {
  //Below code is for checking whether the message is sent or received
  const { LoginUser } = useSelector((state) => state.user);
  const sent = message.From === LoginUser;
  const received = !sent;
  const divRef = useRef(null);
  const scrollToBottom = () => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [message]);

  return (
    <div key={mykey} ref={divRef}>
      <div
        className={classNames("d-flex my-2  ", {
          "justify-content-end": sent,
          "justify-content-start": received,
        })}
      >
        <div
          style={{ flexWrap: "wrap" }}
          className={classNames("py-1 px-3 message-area  ", {
            "bg-primary": sent,
            "bg-adarsh2": received,
          })}
        >
          <p
            className={classNames({
              "text-white message-content ": sent,
            })}
            key={message._id}
            style={{ wordBreak: "break-word" }}
          >
            {message.content}
          </p>
          <small
            className={classNames("d-flex message-time", {
              "text-white fw-light fs-7 justify-content-end ": sent,
              "text-black fw-light fs-7": received,
            })}
          >
            {moment(message.createdAt).calendar(null, {
              sameDay: "hh:mm a",
              lastDay: "[Yesterday]",
              lastWeek: "[Last] dddd",
              sameElse: "DD/MM/YYYY",
            })}
          </small>
        </div>
      </div>
    </div>
  );
};

export default Message;
