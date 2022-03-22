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
  HeartIcon,
} from "@heroicons/react/outline";

function Message({ message, setRepliedMessage, messagesSnapshot }) {
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
    const messageType = text.includes("https://") ? "file" : "text";

    // For spotify
    if (messageType == "file") {
    }

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
    } else if (reactions.length == 5) {
      reactionStyle = "px-14 py-7 bg-gradient-to-r from-[#ffb700] to-[#ffaa00]";
    } else if (reactions.length == 6) {
      reactionStyle = "px-16 py-8 bg-gradient-to-r from-[#ffc300] to-[#ffa200]";
    } else if (reactions.length == 7) {
      reactionStyle =
        "px-20 py-10 bg-gradient-to-r from-[#ff9500] to-[#ffd000]";
    } else if (reactions.length == 8) {
      reactionStyle =
        "px-24 py-12 bg-gradient-to-r from-[#ff8800] to-[#ffdd00]";
    } else if (reactions.length == 9) {
      reactionStyle =
        "px-28 py-14 bg-gradient-to-r from-[#ff7b00] to-[#ffea00]";
    } else if (reactions.length == 10) {
      reactionStyle =
        "px-32 py-16 bg-gradient-to-r from-[#caf0f8] to-[#03045e] bg-[url('https://media.giphy.com/media/dBxDfKQKl7lOCv4DY5/giphy.gif')]";
    }

    let mainContainerStyle = sentMessage
      ? "group w-full flex flex-col items-end mb-8 relative cursor-pointer select-none"
      : "group w-full flex flex-col items-start mb-8 relative cursor-pointer select-none";
    let usernameStyle = sentMessage
      ? repliedMessage == ""
        ? "mr-12 text-xs font-medium mb-2 opacity-50 -z-20"
        : "mr-12 translate-y-2 text-xs font-medium mb-2 opacity-50 -z-20"
      : repliedMessage == ""
      ? "ml-12 text-xs font-medium mb-2 opacity-50 -z-20"
      : "ml-12 translate-y-2 text-xs font-medium mb-2 opacity-50 -z-20";
    let rowStyle = sentMessage
      ? "w-fit flex flex-row-reverse items-center"
      : "w-fit flex items-center";
    let textContainerStyle = sentMessage
      ? "flex flex-col items-end justify-end relative"
      : "flex flex-col items-start justify-end relative";
    let textStyle = sentMessage
      ? `h-fit flex-1 mr-2 bg-[#007aff] dark:bg-[#ff2d55] text-white px-4 py-2 rounded-3xl ${reactionStyle} active:scale-95 duration-200 ease-in-out`
      : `h-fit flex-1 ml-2 bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white px-4 py-2 rounded-3xl ${reactionStyle} active:scale-95 duration-200 ease-in-out`;
    let likeCounterStyle = sentMessage
      ? "bg-neutral-50 dark:bg-neutral-800 rounded-2xl px-2 py-1 text-xs absolute -bottom-2 flex flex-row-reverse items-center justify-center"
      : "bg-neutral-50 dark:bg-neutral-800 rounded-2xl px-2 py-1 text-xs absolute -bottom-2 flex flex-row items-center justify-center";
    let heartIconStyle = sentMessage ? "h-3 w-3 ml-1" : "h-3 w-3 mr-1";
    let actionCenterStyle = sentMessage
      ? "duration-200 ease-in-out scale-0 bg-neutral-50 dark:bg-neutral-800 right-2 absolute bottom-14 h-10 w-fit rounded-3xl shadow-xl"
      : "hidden";
    let actionCenterBtnStyle = sentMessage
      ? "mr-2 bg-neutral-50 dark:bg-neutral-800 text-black dark:text-white"
      : "ml-2 bg-neutral-50 dark:bg-neutral-800 text-black dark:text-white";
    let timeStyle = sentMessage
      ? "mr-8 text-xs mt-2 opacity-50 -z-20"
      : "ml-8 text-xs mt-2 opacity-50 -z-20";
    let repliedTextStyle = sentMessage
      ? "mr-8 translate-y-2 h-fit text-sm flex-1 bg-[#5856d6] text-white px-4 py-2 rounded-3xl -z-50"
      : "ml-8 translate-y-2 h-fit text-sm flex-1 bg-neutral-600 text-white px-4 py-2 rounded-3xl -z-50";
    let imageContainerStyle = "overflow-hidden h-5 w-5 rounded-full relative";
    let embedContainerStyle = sentMessage
      ? "mr-8 h-80 w-full rounded-3xl overflow-hidden flex items-center justify-center relative"
      : "ml-8 h-80 w-full rounded-3xl overflow-hidden flex items-center justify-center relative";

    if (messagesSnapshot) {
      const userSentMessageBefore =
        messagesSnapshot[messagesSnapshot.indexOf(message) + 1]?.uid == uid;
      const userSentMessageAfter =
        messagesSnapshot[messagesSnapshot.indexOf(message) - 1]?.uid == uid;

      if (userSentMessageBefore && userSentMessageAfter) {
        timeStyle = "hidden";
        textStyle = sentMessage
          ? `h-fit flex-1 mr-7 bg-[#007aff] dark:bg-[#ff2d55] text-white px-4 py-2 rounded-3xl rounded-br-none rounded-tr-none  ${reactionStyle} active:scale-95 duration-200 ease-in-out`
          : `h-fit flex-1 ml-7 bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white px-4 py-2 rounded-3xl rounded-bl-none rounded-tl-none ${reactionStyle} active:scale-95 duration-200 ease-in-out`;
        usernameStyle = "hidden";
        mainContainerStyle = sentMessage
          ? "group w-full flex flex-col items-end mb-1 relative cursor-pointer select-none"
          : "group w-full flex flex-col items-start mb-1 relative cursor-pointer select-none";
        imageContainerStyle = "hidden";
        embedContainerStyle = sentMessage
          ? "mr-7 rounded-3xl rounded-br-none rounded-tr-none overflow-hidden flex items-center justify-center relative"
          : "ml-7 rounded-3xl rounded-3xl rounded-bl-none rounded-tl-none flex items-center justify-center relative";
      } else if (userSentMessageAfter) {
        timeStyle = "hidden";
        textStyle = sentMessage
          ? `h-fit flex-1 mr-7 bg-[#007aff] dark:bg-[#ff2d55] text-white px-4 py-2 rounded-3xl rounded-br-none  ${reactionStyle} active:scale-95 duration-200 ease-in-out`
          : `h-fit flex-1 ml-7 bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white px-4 py-2 rounded-3xl rounded-bl-none ${reactionStyle} active:scale-95 duration-200 ease-in-out`;
        usernameStyle = "hidden";
        mainContainerStyle = sentMessage
          ? "group w-full flex flex-col items-end mb-1 relative cursor-pointer select-none"
          : "group w-full flex flex-col items-start mb-1 relative cursor-pointer select-none";
        imageContainerStyle = "hidden";
        embedContainerStyle = sentMessage
          ? "mr-7 rounded-3xl rounded-br-none overflow-hidden flex items-center justify-center relative"
          : "ml-7 rounded-3xl rounded-bl-none overflow-hidden flex items-center justify-center relative";
      } else if (userSentMessageBefore) {
        textStyle = sentMessage
          ? `h-fit flex-1 mr-2 bg-[#007aff] dark:bg-[#ff2d55] text-white px-4 py-2 rounded-3xl rounded-tr-none ${reactionStyle} active:scale-95 duration-200 ease-in-out`
          : `h-fit flex-1 ml-2 bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white px-4 py-2 rounded-3xl rounded-tl-none ${reactionStyle} active:scale-95 duration-200 ease-in-out`;
        embedContainerStyle = sentMessage
          ? "mr-2 rounded-3xl rounded-tr-none overflow-hidden flex items-center justify-center relative"
          : "ml-2 rounded-3xl rounded-bl-none rounded-tl-none flex items-center justify-center relative";
      }
    }

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

    // Embed
    const showEmbed = () => {
      // Spotify
      if (text.includes("open.spotify.com")) {
        let src = `https://open.spotify.com/embed/track/${
          text.split("?")[0].split("/")[4]
        }`;
        return (
          <div className={embedContainerStyle}>
            <iframe
              className="h-full w-full object-fill"
              src={src}
              width="300"
              height="380"
              frameborder="0"
              allowtransparency="true"
              allow="encrypted-media"
            ></iframe>
          </div>
        );
      }
      // Youtube
      else if (text.includes("youtu.be")) {
        let src = `https://www.youtube.com/embed/${text.split("/")[3]}`;

        return (
          <div className={embedContainerStyle}>
            <iframe
              width="560"
              height="315"
              src={src}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        );
      } else if (text.includes("youtube.com/watch?v")) {
        let src = `https://www.youtube.com/embed/${
          text.split(" ")[0].split("=")[1]
        }`;

        return (
          <div className={embedContainerStyle}>
            <iframe
              width="560"
              height="315"
              src={src}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        );
      }

      return (
        <div className={embedContainerStyle}>
          <iframe className="h-full w-full object-fill" src={text} />
        </div>
      );
    };

    // Deciding which message to show
    return (
      // Main container
      <div onDoubleClick={likeMessage} className={mainContainerStyle}>
        {/* Replied Message */}
        {showRepliedMessage()}

        {/* Row */}
        <div className={rowStyle}>
          {/* Image */}
          <div className={imageContainerStyle}>
            <Image src={photoURL} layout="fill" objectFit="cover" />
          </div>

          <div className={textContainerStyle}>
            {/* Text / File */}
            {messageType === "text" ? (
              <p className={textStyle}>{text}</p>
            ) : (
              showEmbed()
            )}
            {showLikes()}
            {/* Likes */}
          </div>

          {/* Action center */}
          <div className="relative opacity-0 group-hover:opacity-100">
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
        <p className={timeStyle}>
          {showMessageTime()} by {username}
        </p>
      </div>
    );
  };

  return showMessage();
}

export default Message;
