// React
import { useRef } from "react";

// Next
import Image from "next/image";

// Firebase
import { auth, db } from "../firebase";

// Components
import IconButton from "../components/IconButton";

// Heroicons
import {
  DotsHorizontalIcon,
  ReplyIcon,
  TrashIcon,
} from "@heroicons/react/outline";

function Message({ message, setRepliedMessage }) {
  // Getting props
  const { text, uid, photoURL, username, createdAt, id, repliedMessage } =
    message;

  // Action center
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

  // Formatting date
  const showMessageTime = () => {
    if (createdAt) {
      const dateTimeObject = createdAt.toDate();
      return `${dateTimeObject.getDate()} / ${
        dateTimeObject.getMonth() + 1
      } / ${dateTimeObject.getFullYear()} at ${dateTimeObject.getHours()}:${
        dateTimeObject.getMinutes() < 10
          ? `0${dateTimeObject?.getMinutes()}`
          : dateTimeObject?.getMinutes()
      }`;
    } else {
      return "Delivering...";
    }
  };

  // Delete Message
  const deleteMessage = () => {
    db.collection("messages").doc(id).delete();
  };

  // Show Message
  const showMessage = () => {
    const sentMessage = uid == auth.currentUser.uid ? true : false;

    // Text Message Styles
    const mainContainerStyle = sentMessage
      ? "w-full flex flex-col items-end mb-8 relative"
      : "w-full flex flex-col items-start mb-8 relative";
    const usernameStyle = sentMessage
      ? "mr-12 text-xs font-medium mb-2 opacity-50 -z-20"
      : "ml-12 text-xs font-medium mb-2 opacity-50 -z-20";
    const rowStyle = sentMessage
      ? "w-fit flex flex-row-reverse items-center"
      : "w-fit flex items-center";
    const textStyle = sentMessage
      ? "h-fit flex-1 mr-2 bg-[#007aff] dark:bg-[#ff2d55] text-white px-4 py-2 rounded-3xl rounded-br-none"
      : "h-fit flex-1 ml-2 bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white px-4 py-2 rounded-3xl rounded-bl-none";
    const actionCenterStyle = sentMessage
      ? "duration-200 ease-in-out scale-0 bg-neutral-50 dark:bg-neutral-800 right-2 absolute bottom-14 h-10 w-fit rounded-3xl shadow-xl"
      : "hidden";
    const actionCenterBtnStyle = sentMessage
      ? "mr-2 bg-neutral-50 dark:bg-neutral-800 text-black dark:text-white"
      : "ml-2 bg-neutral-50 dark:bg-neutral-800 text-black dark:text-white";
    const timeSyle = sentMessage
      ? "mr-14 text-xs mt-2 opacity-50 -z-20"
      : "ml-14 text-xs mt-2 opacity-50 -z-20";

    // Replied Message Styles
    const repliedUsernameStyle = sentMessage
      ? "mr-12 translate-y-2 text-xs font-medium mb-2 opacity-50 -z-20"
      : "ml-12 translate-y-2 text-xs font-medium mb-2 opacity-50 -z-20";
    const repliedTextStyle = sentMessage
      ? "mr-12 translate-y-2 h-fit text-sm flex-1 bg-[#5856d6] text-white px-4 py-2 rounded-3xl -z-50"
      : "ml-12 translate-y-2 h-fit text-sm flex-1 bg-neutral-600 text-white px-4 py-2 rounded-3xl -z-50";

    // Action center button
    const showActionCenterBtn = () => {
      if (sentMessage) {
        return (
          <div>
            <IconButton
              Icon={DotsHorizontalIcon}
              onClick={showActionCenter}
              className={actionCenterBtnStyle}
            />
            <IconButton
              Icon={ReplyIcon}
              onClick={deliverReplyMessage}
              className={actionCenterBtnStyle}
            />
          </div>
        );
      } else if (!sentMessage) {
        return (
          <IconButton
            Icon={ReplyIcon}
            onClick={deliverReplyMessage}
            className={actionCenterBtnStyle}
          />
        );
      }
    };

    // Deliver Reply Message
    const deliverReplyMessage = () => {
      setRepliedMessage(text);
    };

    // Deciding which message to show
    if (repliedMessage != "") {
      return (
        // Main Container
        <div className={mainContainerStyle}>
          {/* Username */}
          <p className={repliedUsernameStyle}>{username}</p>

          {/* Replied Message */}
          <div className={repliedTextStyle}>
            <p>{repliedMessage}</p>
          </div>

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
                  onClick={deleteMessage}
                  className="duration-200 ease-in-out text-[#ff3b30] hover:bg-[#ff3b302f] active:brightness-50"
                />
              </div>
              {/* Action center Btn */}
              {showActionCenterBtn()}
            </div>
          </div>

          {/* Timestamp */}
          <p className={timeSyle}>{showMessageTime()}</p>
        </div>
      );
    } else {
      return (
        // Main container
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
                  onClick={deleteMessage}
                  className="duration-200 ease-in-out text-[#ff3b30] hover:bg-[#ff3b302f] active:brightness-50"
                />
              </div>
              {/* Action center Btn */}
              {showActionCenterBtn()}
            </div>
          </div>
          {/* Time */}
          <p className={timeSyle}>{showMessageTime()}</p>
        </div>
      );
    }
  };

  return showMessage();
}

export default Message;
