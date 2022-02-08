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
  const { text, uid, photoURL, username, createdAt, id } = props.message;

  const dateTimeObject = createdAt?.toDate();

  const messageTime = `${dateTimeObject?.getDate()} ${new Intl.DateTimeFormat(
    "en-US",
    {
      month: "short",
    }
  ).format(
    dateTimeObject?.getMonth()
  )} ${dateTimeObject?.getFullYear()} at ${dateTimeObject?.getHours()}:${
    dateTimeObject?.getMinutes() < 10
      ? `0${dateTimeObject?.getMinutes()}`
      : dateTimeObject?.getMinutes()
  }`;

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

  const deleteMessage = () => {
    db.collection("messages").doc(id).delete();
  };

  const showMessage = () => {
    if (uid == auth.currentUser.uid) {
      return (
        <div className="w-full flex flex-col items-end mb-8 relative">
          <p className="mr-14 text-xs font-medium mb-2 opacity-50">
            {username}
          </p>
          <div className="flex w-full justify-end">
            <div className="w-fit flex flex-row-reverse items-center">
              <div className="overflow-hidden h-12 w-12 rounded-full relative">
                <Image src={photoURL} layout="fill" objectFit="cover" />
              </div>
              <p className="h-fit flex-1 mr-2 bg-[#007aff] text-white p-4 rounded-2xl rounded-br-none">
                {text}
              </p>
              {/* Action center */}
              <div className="relative">
                <div
                  ref={actionCenter}
                  className="duration-200 ease-in-out scale-0 bg-white right-2 absolute bottom-14 h-10 w-fit rounded-3xl shadow-xl"
                >
                  <IconButton
                    Icon={TrashIcon}
                    onClick={deleteMessage}
                    className="duration-200 ease-in-out h-10 w-10 p-3 text-[#ff3b30] hover:bg-[#ff3b302f] active:brightness-50"
                  />
                </div>
                <IconButton
                  Icon={DotsHorizontalIcon}
                  onClick={showActionCenter}
                  className="mr-2 bg-neutral-50 h-10 w-10 p-2 text-neutral-500"
                />
              </div>
            </div>
          </div>
          <p className="mr-14 text-xs mt-2 opacity-50">{messageTime}</p>
        </div>
      );
    } else {
      return (
        <div className="w-full flex flex-col items-start mb-8">
          <p className="ml-14 text-xs font-medium mb-2 opacity-50">
            {username}
          </p>
          <div className="flex w-full items-start">
            <div className="w-fit flex flex-row items-center">
              <div className="overflow-hidden h-12 w-12 rounded-full relative">
                <Image src={photoURL} layout="fill" objectFit="cover" />
              </div>
              <p className="h-fit ml-2 bg-neutral-50 text-black p-4 rounded-2xl rounded-bl-none">
                {text}
              </p>
              {/* Action center */}
            </div>
          </div>
          <p className="ml-14 text-xs mt-2 opacity-50">{messageTime}</p>
        </div>
      );
    }
  };

  return showMessage();
}

export default Message;
