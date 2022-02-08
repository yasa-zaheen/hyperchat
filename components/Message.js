// Import
import Image from "next/image";

// Firebase
import { auth, db } from "../firebase";

// Components
import IconButton from "../components/IconButton";

// Heroicons
import { DotsHorizontalIcon, TrashIcon } from "@heroicons/react/outline";
import { useRef } from "react";

function Message(props) {
  // Getting props
  const { text, uid, photoURL, username, createdAt, id } = props.message;

  // Formatting date

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

  const deleteMessage = () => {
    db.collection("messages").doc(id).delete();
  };

  const showMessage = () => {
    const sentMessage = uid == auth.currentUser.uid ? true : false;

    const mainContainerStyle = sentMessage
      ? "w-full flex flex-col items-end mb-8 relative"
      : "w-full flex flex-col items-start mb-8 relative";
    const usernameStyle = sentMessage
      ? "mr-12 text-xs font-medium mb-2 opacity-50"
      : "ml-12 text-xs font-medium mb-2 opacity-50";
    const rowStyle = sentMessage
      ? "w-fit flex flex-row-reverse items-center"
      : "w-fit flex items-center";
    const textStyle = sentMessage
      ? "h-fit flex-1 mr-2 bg-[#007aff] dark:bg-[#ff2d55] text-white px-4 py-2 rounded-full rounded-br-none"
      : "h-fit flex-1 ml-2 bg-neutral-100 dark:bg-neutral-800 text-white px-4 py-2 rounded-full rounded-bl-none";
    const actionCenterSyle = sentMessage ? "relative" : "hidden";
    const timeSyle = sentMessage
      ? "mr-14 text-xs mt-2 opacity-50"
      : "ml-14 text-xs mt-2 opacity-50";

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
          <div className={actionCenterSyle}>
            {/* Action center */}
            <div
              ref={actionCenter}
              className="duration-200 ease-in-out scale-0 bg-neutral-50 dark:bg-neutral-800 right-2 absolute bottom-14 h-10 w-fit rounded-3xl shadow-xl"
            >
              <IconButton
                Icon={TrashIcon}
                onClick={deleteMessage}
                className="duration-200 ease-in-out text-[#ff3b30] hover:bg-[#ff3b302f] active:brightness-50"
              />
            </div>
            {/* Action center Btn */}
            <IconButton
              Icon={DotsHorizontalIcon}
              onClick={showActionCenter}
              className="mr-2 bg-neutral-50 dark:bg-neutral-800 text-black dark:text-white"
            />
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
