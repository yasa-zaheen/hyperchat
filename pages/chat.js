// React
import { useRef, useState, useEffect } from "react";

// Next
import Image from "next/image";
import { useTheme } from "next-themes";

// Firebase
import firebase from "firebase";
import { db, auth } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

// Components / Pages
import Message from "../components/Message";
import IconButton from "../components/IconButton";

// Heroicons
import {
  ArrowCircleUpIcon,
  LogoutIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/outline";
import UserCard from "../components/UserCard";

function Chat() {
  const { systemTheme, theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "light") {
      return (
        <button
          onClick={() => {
            setTheme("dark");
          }}
          className="absolute left-16 md:left-4 bg-black text-white font-semibold text-sm p-2 rounded-full flex justify-center items-center"
        >
          <MoonIcon className="h-5 w-5" />
        </button>
      );
    } else {
      return (
        <button
          onClick={() => {
            setTheme("light");
          }}
          className="absolute left-16 md:left-4 bg-white text-black font-semibold text-sm p-2 rounded-full flex justify-center items-center"
        >
          <SunIcon className="h-5 w-5" />
        </button>
      );
    }
  };

  const [formValue, setFormValue] = useState("");

  const user = auth.currentUser;
  const usersCollection = db.collection("users");
  const usersDocuments = usersCollection.orderBy("lastSeen", "desc");
  const [usersSnapshot] = useCollectionData(usersDocuments);

  const messagesCollection = db.collection("messages");
  const messagesDocuments = messagesCollection
    .orderBy("createdAt", "desc")
    .limit(25);

  const [messagesSnapshot] = useCollectionData(messagesDocuments, {
    idField: "id",
  });

  const scroller = useRef();

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

  const activityBar = useRef();

  const showActivityBar = () => {
    if (activityBar.current.classList.contains("-translate-x-full")) {
      activityBar.current.classList.remove("-translate-x-full");
    } else {
      activityBar.current.classList.add("-translate-x-full");
    }
  };

  return (
    <div className="h-screen w-full relative flex sm:overflow-hidden">
      <div
        ref={activityBar}
        className="-translate-x-full duration-200 ease-in-out absolute bg-white dark:bg-black md:translate-x-0 md:relative z-50 mt-16 sm:m-0 w-full md:block md:w-1/3 p-4 overflow-y-scroll"
      >
        {usersSnapshot &&
          usersSnapshot.map((user) => <UserCard key={user.uid} user={user} />)}
      </div>
      <div className="h-screen w-full relative flex flex-col">
        <div className="h-fit w-full bg-white dark:bg-black z-50 flex justify-center items-center overflow-hidden p-4 relative border-b-2 border-neutral-50 dark:border-neutral-800">
          <button
            onClick={showActivityBar}
            className="md:hidden absolute left-4 bg-white text-black font-semibold text-sm p-2 rounded-full flex justify-center items-center"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
          {renderThemeChanger()}
          <p className="text-2xl font-semibold">hyperchat.</p>
          {/* Header */}
          <button
            onClick={signOut}
            className="absolute right-4 bg-[#007aff] dark:bg-[#ff2d55] text-white font-semibold text-sm py-2 px-4 rounded-lg flex justify-center items-center"
          >
            <LogoutIcon className="h-5 w-5 mr-2" />
            logout
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex flex-col-reverse flex-1 max-h-fit p-4 overflow-scroll overflow-x-hidden">
          <div ref={scroller}></div>
          {messagesSnapshot &&
            messagesSnapshot.map((message) => (
              <Message key={message.id} message={message} />
            ))}
        </div>
        {/* Input Area */}
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
            className="bg-[#007aff] dark:bg-[#ff2d55] text-white ml-4 h-10 w-10 p-2"
          />
        </form>
      </div>
    </div>
  );
}

export default Chat;
