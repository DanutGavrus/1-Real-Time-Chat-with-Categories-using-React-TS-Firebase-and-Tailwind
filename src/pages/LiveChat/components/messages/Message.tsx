import { CollectionReference, deleteDoc, doc, DocumentData } from "firebase/firestore";
import { MutableRefObject } from "react";
import { useOutletContext } from "react-router-dom";
import { MessageType } from "../LiveChat";
import { MessageActions } from "./MessagesList";

type Props = {
  message: MessageType,
  messagesListDb: CollectionReference<DocumentData>,
  messagesListActionRef: MutableRefObject<{ action: MessageActions }>
};

export default function Message({ message, messagesListDb, messagesListActionRef }: Props) {
  const { user } = useOutletContext() as LiveChatContext;

  const handleDeleteMessage = () => {
    deleteDoc(doc(messagesListDb, message.id));
    messagesListActionRef.current.action = MessageActions.Deleted;
  }

  return (
    <li className="mb-1 mx-3">
      <p className={`block w-fit max-w-[80%] bg-gradient-to-br from-secondary to-primary px-3 py-1 rounded-2xl ${user?.uid === message.userId ? "ml-auto" : ''}`}>
        <img src={message.userIcon} alt="" className="w-4 h-4 mb-0.5 mr-1 inline-block rounded-3xl" />
        <a href={`mailto:${message.userEMail}`} target="_blank" rel="noreferrer" className="underline font-bold text-accent">{message.userDisplayName}</a>
        {`: ${message.content}`}
        {user?.uid === message.userId &&
          <button onClick={handleDeleteMessage} className="p-0 ml-1 text-accent text-sm font-bold">🗑</button>
        }
      </p>
    </li>
  );
}
