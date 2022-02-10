import { db } from "../firebase";

const deleteMessage = (id) => {
  db.collection("messages").doc(id).delete();
};

export default deleteMessage;
