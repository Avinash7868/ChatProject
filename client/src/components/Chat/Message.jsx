import React from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import moment from "moment";
// import { OverlayTrigger, Tooltip } from "react-bootstrap";

const Message = ({ message, mykey }) => {
  //Below code is for checking whether the message is sent or received
  const { LoginUser } = useSelector((state) => state.user);
  const sent = message.From === LoginUser;
  const received = !sent;

  return (
    <div key={mykey}>
      <div
        className={classNames("d-flex my-2  ", {
          "justify-content-end": sent,
          "justify-content-start": received,
        })}
      >
        <div
          className={classNames("py-1 px-3 ", {
            "bg-primary": sent,
            "bg-adarsh2": received,
          })}
        >
          <p
            className={classNames({ "text-white message-content": sent })}
            key={message._id}
          >
            {message.content}
          </p>
          <small
            className={classNames("d-flex message-time ", {
              "text-white fw-light fs-7 justify-content-end ": sent,
              "text-black fw-light fs-7": received,
            })}
          >
            {moment(message.createdAt).format("hh:mm a")}
          </small>
        </div>
      </div>
    </div>
  );
};

export default Message;
