// Import
import Image from "next/image";

// Firebase
import { auth } from "../firebase";

function Message(props) {
  const { text, uid, photoURL } = props.message;
  const messageStyle = uid == auth.currentUser.uid ? "sent" : "received";

  const showMessage = () => {
    if (uid == auth.currentUser.uid) {
      return (
        <div className="w-full flex justify-end mb-4">
          <div className="w-fit flex flex-row-reverse items-center">
            <div className="overflow-hidden h-12 w-12 rounded-full relative">
              <Image src={photoURL} layout="fill" objectFit="cover" />
            </div>
            <p className="mr-2 bg-[#007aff] text-white p-4 rounded-2xl rounded-br-none">
              {text}
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full flex justify-start mb-4">
          <div className="w-fit flex flex-row items-center">
            <div className="overflow-hidden h-12 w-12 rounded-full relative">
              <Image src={photoURL} layout="fill" objectFit="cover" />
            </div>
            <p className="ml-2 bg-neutral-100 text-black p-4 rounded-2xl rounded-bl-none">
              {text}
            </p>
          </div>
        </div>
      );
    }
  };

  return showMessage();
}

export default Message;
