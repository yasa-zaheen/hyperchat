// React
import { useRef, useState } from "react";

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
  HeartIcon,
} from "@heroicons/react/outline";

function Message({ message, setRepliedMessage }) {
  // Getting props
  const {
    text,
    uid,
    photoURL,
    username,
    createdAt,
    id,
    repliedMessage,
    reactions,
  } = message;

  // Action Center
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

  // Message Time
  const showMessageTime = () => {
    if (createdAt) {
      const dateObject = new Date();
      const currentTime = dateObject;
      const timeDelta = createdAt.toDate() - currentTime;
      const timeDeltaInSeconds = Math.round((timeDelta * -1) / 1000);
      const timeDeltaInMinutes = Math.round((timeDelta * -1) / 1000 / 60);
      const timeDeltaHours = Math.round((timeDelta * -1) / 1000 / 60 / 60);

      const message =
        timeDeltaInSeconds < 60
          ? `Sent ${timeDeltaInSeconds}s ago`
          : timeDeltaInMinutes < 60
          ? `Sent ${timeDeltaInMinutes}m ago`
          : timeDeltaHours < 60
          ? `Sent ${timeDeltaHours}h ago`
          : null;

      return message;
    } else {
      return "Delivering...";
    }
  };

  // Deciding which type of message to show
  const showMessage = () => {
    const sentMessage = uid == auth.currentUser.uid ? true : false;

    // Text Message Styles
    let reactionStyle = "";
    if (reactions.length == 1) {
      reactionStyle =
        "px-6 py-3 bg-gradient-to-r from-[#00b4d8] to-[#00b4d8] dark:from-[#973aa8] dark:to-[#822faf]";
    } else if (reactions.length == 2) {
      reactionStyle =
        "px-8 py-4 bg-gradient-to-r from-[#0096c7] to-[#48cae4] dark:from-[#ac46a1] dark:to-[#6d23b6]";
    } else if (reactions.length == 3) {
      reactionStyle =
        "px-10 py-5 bg-gradient-to-r from-[#90e0ef] to-[#0077b6] dark:from-[#c05299] dark:to-[#6411ad]";
    } else if (reactions.length == 4) {
      reactionStyle =
        "px-12 py-6 bg-gradient-to-r from-[#ade8f4] to-[#023e8a] dark:from-[#d55d92] dark:to-[#571089]";
    } else if (reactions.length >= 5) {
      reactionStyle =
        "px-20 py-10 bg-gradient-to-r from-[#caf0f8] to-[#03045e] dark:from-[#ea698b] dark:to-[#47126b]";
    }

    const mainContainerStyle = sentMessage
      ? "w-full flex flex-col items-end mb-8 relative cursor-pointer select-none"
      : "w-full flex flex-col items-start mb-8 relative cursor-pointer select-none";
    const usernameStyle = sentMessage
      ? repliedMessage == ""
        ? "mr-12 text-xs font-medium mb-2 opacity-50 -z-20"
        : "mr-12 translate-y-2 text-xs font-medium mb-2 opacity-50 -z-20"
      : repliedMessage == ""
      ? "ml-12 text-xs font-medium mb-2 opacity-50 -z-20"
      : "ml-12 translate-y-2 text-xs font-medium mb-2 opacity-50 -z-20";
    const rowStyle = sentMessage
      ? "w-fit flex flex-row-reverse items-center"
      : "w-fit flex items-center";
    const textContainerStyle = sentMessage
      ? "flex flex-col items-end justify-end relative"
      : "flex flex-col items-start justify-end relative";
    const textStyle = sentMessage
      ? `h-fit flex-1 mr-2 bg-[#007aff] dark:bg-[#ff2d55] text-white px-4 py-2 rounded-3xl rounded-br-none ${reactionStyle} duration-200 ease-in-out`
      : `h-fit flex-1 ml-2 bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white px-4 py-2 rounded-3xl rounded-bl-none ${reactionStyle} duration-200 ease-in-out`;
    const likeCounterStyle = sentMessage
      ? "bg-neutral-50 dark:bg-neutral-800 rounded-2xl px-2 py-1 text-xs absolute -bottom-2 flex flex-row-reverse items-center justify-center"
      : "bg-neutral-50 dark:bg-neutral-800 rounded-2xl px-2 py-1 text-xs absolute -bottom-2 flex flex-row items-center justify-center";
    const heartIconStyle = sentMessage ? "h-3 w-3 ml-1" : "h-3 w-3 mr-1";
    const actionCenterStyle = sentMessage
      ? "duration-200 ease-in-out scale-0 bg-neutral-50 dark:bg-neutral-800 right-2 absolute bottom-14 h-10 w-fit rounded-3xl shadow-xl"
      : "hidden";
    const actionCenterBtnStyle = sentMessage
      ? "mr-2 bg-neutral-50 dark:bg-neutral-800 text-black dark:text-white"
      : "ml-2 bg-neutral-50 dark:bg-neutral-800 text-black dark:text-white";
    const timeSyle = sentMessage
      ? "mr-14 text-xs mt-2 opacity-50 -z-20"
      : "ml-14 text-xs mt-2 opacity-50 -z-20";
    const repliedTextStyle = sentMessage
      ? "mr-12 translate-y-2 h-fit text-sm flex-1 bg-[#5856d6] text-white px-4 py-2 rounded-3xl -z-50"
      : "ml-12 translate-y-2 h-fit text-sm flex-1 bg-neutral-600 text-white px-4 py-2 rounded-3xl -z-50";

    const deleteMessage = () => {
      db.collection("messages").doc(id).delete();
    };

    const deliverReplyMessage = () => {
      setRepliedMessage(text);
    };

    const likeMessage = async () => {
      if (!reactions.includes(auth.currentUser.uid)) {
        await db
          .collection("messages")
          .doc(id)
          .update({
            reactions: reactions.concat([auth.currentUser.uid]),
          });
      } else {
        const reactionsRef = reactions.filter((value) => {
          if (value != auth.currentUser.uid) {
            return value;
          }
        });
        await db.collection("messages").doc(id).update({
          reactions: reactionsRef,
        });
      }
    };

    // Action center button
    const showActionCenterBtn = () => {
      if (sentMessage) {
        return (
          <div className="flex">
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
          </div>
        );
      }
    };

    // Replied Message
    const showRepliedMessage = () => {
      if (repliedMessage != "") {
        return (
          <div className={repliedTextStyle}>
            <p>{repliedMessage}</p>
          </div>
        );
      } else {
        return null;
      }
    };

    // Likes
    const showLikes = () => {
      if (reactions.length != 0) {
        return (
          <p className={likeCounterStyle}>
            <HeartIcon className={heartIconStyle} />
            {reactions.length}
          </p>
        );
      } else {
        return null;
      }
    };

    // Deciding which message to show
    return (
      // Main container
      <div onDoubleClick={likeMessage} className={mainContainerStyle}>
        {/* Username */}
        <p className={usernameStyle}>{username}</p>

        {/* Replied Message */}
        {showRepliedMessage()}

        {/* Row */}
        <div className={rowStyle}>
          {/* Image */}
          <div className="overflow-hidden h-10 w-10 rounded-full relative">
            <Image src={photoURL} layout="fill" objectFit="cover" />
          </div>

          <div className={textContainerStyle}>
            {/* Text */}
            <p className={textStyle}>{text}</p>
            {showLikes()}
            {/* Likes */}
          </div>

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
  };

  return showMessage();
}

export default Message;
