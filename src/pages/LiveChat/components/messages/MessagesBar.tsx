import { useState, useRef, MutableRefObject } from "react";
import { useOutletContext } from "react-router-dom";
import { addDoc, CollectionReference, DocumentData, serverTimestamp } from "firebase/firestore";
import { MessageActions } from "./MessagesList";

type Props = {
  categoryId: string,
  messagesListDb: CollectionReference<DocumentData>,
  messagesListActionRef: MutableRefObject<{ action: MessageActions }>
};

export default function MessagesBar({ categoryId, messagesListDb, messagesListActionRef }: Props) {
  const { user } = useOutletContext() as LiveChatContext;

  const [messageContent, setMessageContent] = useState("");

  const messageInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (key: string) => {
    if (key === 'Enter' && messageContent.length > 0) {
      addDoc(messagesListDb, {
        categoryId: categoryId,
        userId: user?.uid,
        userIcon: user?.photoURL,
        userDisplayName: user?.displayName,
        userEMail: user?.email,
        content: messageContent,
        timestamp: serverTimestamp()
      });

      setMessageContent("");
      if (messageInputRef.current) {
        messageInputRef.current.value = "";
      }
      messagesListActionRef.current.action = MessageActions.Added;
    }
  }

  const clearMessageText = () => {
    setMessageContent("");
    if (messageInputRef.current) {
      messageInputRef.current.value = "";
    }
  }

  return (
    <div className="sticky bottom-0 grid grid-cols-12">
      <div className="col-span-10 md:col-span-11 relative">
        <input ref={messageInputRef} type="text" maxLength={500}
          onKeyDown={(e) => handleSendMessage(e.key)}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Send a message..." className="w-full h-10 pl-3 pr-5 rounded-bl-xl border border-transparent focus:outline-none focus:border-accent dark:bg-black" />
        {messageContent.length > 0 &&
          <button onClick={clearMessageText} className="absolute right-0 w-5 h-10 pr-2 text-center border border-transparent">✗</button>
        }
      </div>

      {messageContent.length === 0 &&
        <button className="col-span-2 md:col-span-1 h-10 bg-auxiliary rounded-tr-xl">{"⇐"}</button>
      }
      {messageContent.length > 0 &&
        <button onClick={() => handleSendMessage('Enter')} className="col-span-2 md:col-span-1 h-10 bg-auxiliary rounded-tr-xl">{"⬀"}</button>
      }
    </div>
  );
}
