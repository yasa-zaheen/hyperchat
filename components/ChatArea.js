// Components
import Message from "./Message";

// Firebase
import { db } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";

function ChatArea({ scroller, setRepliedMessage }) {
  // Firebase
  const messagesCollection = db.collection("messages");
  const messagesDocuments = messagesCollection
    .orderBy("createdAt", "desc")
    .limit(25);
  const [messagesSnapshot] = useCollectionData(messagesDocuments, {
    idField: "id",
  });

  return (
    <div className="flex flex-col-reverse flex-1 max-h-fit p-4 overflow-scroll overflow-x-hidden scrollbar-thin scrollbar-track-neutral-50 scrollbar-thumb-neutral-200 dark:scrollbar-track-neutral-800 dark:scrollbar-thumb-neutral-900">
      <div ref={scroller}></div>
      {messagesSnapshot?.map((message) => (
        <Message
          key={message.id}
          message={message}
          setRepliedMessage={setRepliedMessage}
        />
      ))}
    </div>
  );
}

export default ChatArea;
