// React
import { useRef, useState, useEffect } from "react";

// Firebase
import firebase from "firebase";
import { db, auth } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

// Components / Pages
import Message from "../components/Message";
import IconButton from "../components/IconButton";

// Heroicons
import { ArrowCircleUpIcon, LogoutIcon } from "@heroicons/react/outline";

function Chat() {
  const [formValue, setFormValue] = useState("");

  const user = auth.currentUser;

  const messagesCollection = db.collection("messages");
  const messagesDocuments = messagesCollection.orderBy("createdAt");

  const [messagesSnapshot] = useCollectionData(messagesDocuments, {
    idField: "id",
  });

  const scroller = useRef();

  const sendMessage = async (e) => {
    e.preventDefault();

    if (formValue != "") {
      const { uid, photoURL } = user;

      await messagesCollection.add({
        username: user.displayName,
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid: uid,
        photoURL: photoURL,
      });

      setFormValue("");
      scroller.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const signOut = () => {
    auth
      .signOut()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    scroller.current.scrollIntoView({ behavior: "smooth" });
  }, [messagesSnapshot]);

  return (
    <div className="h-screen w-full relative flex flex-col">
      <div className="h-fit w-full bg-white z-50 flex justify-center items-center overflow-hidden p-4 absolute border-b-2 border-neutral-50">
        <p className="text-2xl font-semibold">hyperchat.</p>
        {/* Header */}
        <button
          onClick={signOut}
          className="absolute right-4 bg-[#007aff] text-white font-semibold text-sm py-2 px-4 rounded-lg flex justify-center items-center"
        >
          <LogoutIcon className="h-5 w-5 mr-2" />
          logout
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 max-h-fit p-4 overflow-scroll overflow-x-hidden">
        {messagesSnapshot &&
          messagesSnapshot.map((message) => (
            <Message key={message.id} message={message} />
          ))}
        <div ref={scroller}></div>
      </div>
      {/* Input Area */}
      <form
        onSubmit={sendMessage}
        className="w-full flex items-center p-4 border-t-2 border-neutral-50"
      >
        <input
          type="text"
          value={formValue}
          onChange={(e) => {
            setFormValue(e.target.value);
          }}
          placeholder="Message"
          className="flex-1 bg-neutral-50 px-4 py-2 outline-none rounded-lg"
        />
        <IconButton
          Icon={ArrowCircleUpIcon}
          className="bg-[#007aff] text-white ml-4 h-10 w-10 p-2"
        />
      </form>
    </div>
  );
}

export default Chat;
