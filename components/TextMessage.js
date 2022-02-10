import {
  DotsHorizontalIcon,
  ReplyIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import React, { useRef } from "react";

import IconButton from "./IconButton";

// Utils
import deleteMessage from "../utils/deleteMessage";
import { textMessageStyles } from "../utils/messageUI";

function TextMessage({ message, sentMessage }) {
  const { username, photoURL, text, id, uid } = message;
  const {
    mainContainerStyle,
    usernameStyle,
    rowStyle,
    textStyle,
    actionCenterStyle,
  } = textMessageStyles(sentMessage);

  const actionCenter = useRef();

  const showActionCenter = () => {
    if (actionCenter.current.classList.contains("scale-0")) {
      actionCenter.current.classList.remove("scale-0");
      actionCenter.current.classList.add("scale-1");
    } else {
      actionCenter.current.classList.add("scale-0");
      actionCenter.current.classList.remove("scale-1");
    }
  };

  const showActionCenterBtn = () => {
    if (sentMessage) {
      return (
        <div className="flex">
          {showLikeBtn()}
          <IconButton
            Icon={ReplyIcon}
            onClick={deliverReplyMessage}
            className={actionCenterBtnStyle}
          />
          <IconButton
            Icon={DotsHorizontalIcon}
            onClick={showActionCenter}
            className={actionCenterBtnStyle}
          />
        </div>
      );
    } else if (!sentMessage) {
      return (
        <div className="flex">
          <IconButton
            Icon={ReplyIcon}
            onClick={deliverReplyMessage}
            className={actionCenterBtnStyle}
          />
          {showLikeBtn()}
        </div>
      );
    }
  };

  return (
    <div className={mainContainerStyle}>
      {/* Username */}
      <p className={usernameStyle}>{username}</p>
      {/* Row */}
      <div className={rowStyle}>
        {/* Image */}
        <div className="overflow-hidden h-10 w-10 rounded-full relative">
          <Image src={photoURL} layout="fill" objectFit="cover" />
        </div>

        {/* Text */}
        <p className={textStyle}>{text}</p>

        {/* Action center */}
        <div className="relative">
          {/* Action center */}
          <div ref={actionCenter} className={actionCenterStyle}>
            <IconButton
              Icon={TrashIcon}
              onClick={deleteMessage(id)}
              className="duration-200 ease-in-out text-[#ff3b30] hover:bg-[#ff3b302f] active:brightness-50"
            />
          </div>
          {/* Action center Btn */}
          {showActionCenterBtn()}
        </div>
      </div>
      {/* Time and likes */}
      <p className={timeSyle}>{showMessageTime()}</p>
    </div>
  );
}

export default TextMessage;
