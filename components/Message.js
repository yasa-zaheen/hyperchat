// Import
import Image from "next/image";

// Firebase
import { auth } from "../firebase";

function Message(props) {
  const { text, uid, photoURL, username, createdAt } = props.message;

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

  const showMessage = () => {
    if (uid == auth.currentUser.uid) {
      return (
        <div className="w-full flex flex-col items-end mb-8">
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
              <p className="h-fit flex-1 ml-2 bg-neutral-100 text-black p-4 rounded-2xl rounded-bl-none">
                {text}
              </p>
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
