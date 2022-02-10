// React
import { useEffect, useRef, useState } from "react";

// Firebase
import firebase from "firebase";
import { db, auth } from "../firebase";

// Components
import IconButton from "./IconButton";

// Heroicons
import { ArrowCircleUpIcon, XIcon } from "@heroicons/react/outline";

function ChatInput({ scroller, repliedMessage, setRepliedMessage }) {
  // Firebase
  const user = auth.currentUser;
  const messagesCollection = db.collection("messages");

  // States
  const [formValue, setFormValue] = useState("");

  // Refs
  const formInput = useRef();

  // Functions
  const sendMessage = async (e) => {
    e.preventDefault();

    if (formValue != "") {
      const { uid, photoURL } = user;

      db.collection("users").doc(user.uid).set(
        {
          uid: user.uid,
          username: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      await messagesCollection.add({
        username: user.displayName,
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid: uid,
        photoURL: photoURL,
        repliedMessage: repliedMessage,
        reactions: [],
      });

      setFormValue("");
      exitRepliedMessageViewer();
    }

    scroller.current.scrollIntoView({ behavior: "smooth" });
  };

  // Replied Message
  const repliedMessageViewer = useRef();
  useEffect(() => {
    if (repliedMessage) {
      repliedMessageViewer.current.classList.remove("h-0");
      repliedMessageViewer.current.classList.remove("p-0");

      repliedMessageViewer.current.classList.add("h-fit");
      repliedMessageViewer.current.classList.add("p-4");

      formInput.current.focus();
    }
  }, [repliedMessage]);

  const exitRepliedMessageViewer = () => {
    repliedMessageViewer.current.classList.add("h-0");
    repliedMessageViewer.current.classList.add("p-0");

    repliedMessageViewer.current.classList.remove("h-fit");
    repliedMessageViewer.current.classList.remove("p-4");

    setRepliedMessage("");
  };

  return (
    <div className="flex flex-col">
      {/* Replied Message Viewer */}
      <div
        ref={repliedMessageViewer}
        className="p-0 h-0 duration-200 ease-in-out w-full flex justify-between bg-neutral-50 dark:bg-neutral-800 overflow-hidden"
      >
        <div>
          <p className="text-xs">replying to</p>
          <p className="text-sm">{repliedMessage}</p>
        </div>
        <IconButton
          onClick={exitRepliedMessageViewer}
          Icon={XIcon}
          className="bg-[#007aff] dark:bg-[#ff2d55] text-white ml-4"
        />
      </div>
      <form
        onSubmit={sendMessage}
        className="w-full flex items-center p-4 border-t-2 border-neutral-50 dark:border-neutral-800"
      >
        <input
          type="text"
          ref={formInput}
          value={formValue}
          onChange={(e) => {
            setFormValue(e.target.value);
          }}
          maxLength="255"
          placeholder="Message"
          className="flex-1 bg-neutral-50 px-4 py-2 outline-none rounded-lg dark:bg-neutral-800"
        />
        <IconButton
          Icon={ArrowCircleUpIcon}
          className="bg-[#007aff] dark:bg-[#ff2d55] text-white ml-4"
        />
      </form>
    </div>
  );
}

export default ChatInput;
