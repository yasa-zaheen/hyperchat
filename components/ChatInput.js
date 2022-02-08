// React
import { useState } from "react";

// Firebase
import firebase from "firebase";
import { db, auth } from "../firebase";

// Components
import IconButton from "./IconButton";

// Heroicons
import { ArrowCircleUpIcon } from "@heroicons/react/outline";

function ChatInput({ scroller }) {
  // Firebase
  const user = auth.currentUser;
  const messagesCollection = db.collection("messages");

  // States
  const [formValue, setFormValue] = useState("");

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
      });

      setFormValue("");
    }

    scroller.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <form
      onSubmit={sendMessage}
      className="w-full flex items-center p-4 border-t-2 border-neutral-50 dark:border-neutral-800"
    >
      <input
        type="text"
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
  );
}

export default ChatInput;
