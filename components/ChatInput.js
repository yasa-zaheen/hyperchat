// React
import { useEffect, useRef, useState } from "react";

// Firebase
import firebase from "firebase";
import { db, auth, storage } from "../firebase";

// Components
import IconButton from "./IconButton";

// Heroicons
import {
  ArrowCircleUpIcon,
  XIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";

function ChatInput({ scroller, repliedMessage, setRepliedMessage }) {
  // Firebase
  const user = auth.currentUser;
  const messagesCollection = db.collection("messages");

  // States
  const [formValue, setFormValue] = useState("");
  const [file, setFile] = useState(null);
  const [uploadedImgSrc, setUploadedImgSrc] = useState(null);

  // Refs
  const formInput = useRef();
  const uploadedImg = useRef();
  const filePreviewerContainer = useRef();
  const fileProgressIndicator = useRef();

  // Functions
  const sendMessage = async (e) => {
    e.preventDefault();

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

    if (file) {
      const uploadTask = storage
        .ref(`${auth.currentUser.displayName}/${file.name}`)
        .put(file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          fileProgressIndicator.current.style.width = `${progress}%`;
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref(auth.currentUser.displayName)
            .child(file.name)
            .getDownloadURL()
            .then(async (url) => {
              await messagesCollection.add({
                username: user.displayName,
                text: url,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid: uid,
                photoURL: photoURL,
                repliedMessage: repliedMessage,
                reactions: [],
              });
            });

          exitFilePreviewer();
        }
      );
    } else if (formValue != "") {
      await messagesCollection.add({
        username: user.displayName,
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid: uid,
        photoURL: photoURL,
        repliedMessage: repliedMessage,
        reactions: [],
      });
    }

    setFormValue("");
    exitRepliedMessageViewer();
    scroller.current.scrollIntoView({ behavior: "smooth" });
  };

  const fileUploadHandler = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);

      const reader = new FileReader();
      reader.onload = (function () {
        return function (e) {
          setUploadedImgSrc(e.target.result);
        };
      })();
      reader.readAsDataURL(e.target.files[0]);

      filePreviewerContainer.current.classList.add("h-52");
      filePreviewerContainer.current.classList.add("p-4");
    }
  };

  const exitFilePreviewer = () => {
    filePreviewerContainer.current.classList.remove("h-52");
    filePreviewerContainer.current.classList.remove("p-4");
    setFile(null);

    uploadedImg.current.src = "";
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

      {/* Uploaded File Previewer */}
      <div
        ref={filePreviewerContainer}
        className="w-full overflow-hidden flex items-center justify-center bg-neutral-50 dark:bg-neutral-800 relative "
      >
        <img ref={uploadedImg} src={uploadedImgSrc} className="h-full" />
        <IconButton
          onClick={exitFilePreviewer}
          Icon={XIcon}
          className="bg-[#007aff] dark:bg-[#ff2d55] text-white absolute right-4"
        />
        <span
          ref={fileProgressIndicator}
          className="h-1 bg-[#007aff] dark:bg-[#ff2d55] absolute bottom-0 duration-200 ease-linear"
        ></span>
      </div>

      <form
        onSubmit={sendMessage}
        className="w-full flex items-center p-4 border-t-2 border-neutral-50 dark:border-neutral-800"
      >
        {/* File Upload Btn */}
        <input
          type="file"
          id="actual-btn"
          onChange={fileUploadHandler}
          hidden
        />
        <label
          htmlFor="actual-btn"
          className="cursor-pointer h-10 w-10 p-3 dark:bg-[#ff2d55] rounded-full active:brightness-75 active:scale-90 text-white mr-4"
        >
          <PlusCircleIcon />
        </label>

        {/* Text Input */}
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

        {/* Send button */}
        <IconButton
          Icon={ArrowCircleUpIcon}
          className="bg-[#007aff] dark:bg-[#ff2d55] text-white ml-4"
        />
      </form>
    </div>
  );
}

export default ChatInput;
