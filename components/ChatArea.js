// Components
import Message from "./Message";

// Firebase
import { db, auth } from "../firebase";
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

  const usersCollection = db.collection("users");
  const usersDocuments = usersCollection.where("typing", "==", true);
  const [usersSnapshot] = useCollectionData(usersDocuments);

  return (
    <div className="mt-4 rounded-xl flex flex-col-reverse flex-1 max-h-fit overflow-scroll overflow-x-hidden scrollbar-none">
      {usersSnapshot?.length > 0 ? (
        usersSnapshot.length == 1 ? (
          usersSnapshot[0].email != auth.currentUser.email ? (
            <div className="flex items-center animate-pulse">
              <div>
                <img
                  className="rounded-full h-5 w-5"
                  src={usersSnapshot[0].photoURL}
                  alt=""
                />
              </div>
              <p className="opacity-50 ml-2">is typing</p>
            </div>
          ) : null
        ) : (
          <div className=" flex items-center animate-pulse">
            <p className="opacity-50 ml-2">Several people are typing...</p>
          </div>
        )
      ) : null}

      <div ref={scroller}></div>

      {messagesSnapshot?.map((message) => (
        <Message
          key={message.id}
          message={message}
          setRepliedMessage={setRepliedMessage}
          messagesSnapshot={messagesSnapshot}
        />
      ))}
    </div>
  );
}

export default ChatArea;
