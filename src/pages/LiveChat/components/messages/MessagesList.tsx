import { CollectionReference, DocumentData } from "firebase/firestore";
import { RefObject, useEffect, useRef } from "react";
import { MessageType } from "../LiveChat";
import Message from "./Message";
import MessagesBar from "./MessagesBar";

export enum MessageActions {
  Added,
  Deleted
};
type Props = {
  categoryId: string,
  messagesList: MessageType[] | null,
  messagesListRef: RefObject<HTMLDivElement>,
  messagesListDb: CollectionReference<DocumentData>
};

export default function MessagesList({ categoryId, messagesList, messagesListRef,
  messagesListDb }: Props) {

  const messagesListActionRef = useRef({ action: MessageActions.Added });
  useEffect(() => {
    // For "Deleted" we do not want to automatically scroll to bottom
    if (messagesListActionRef?.current?.action === MessageActions.Added) {
      messagesListRef?.current?.scrollTo(0, messagesListRef?.current?.scrollHeight);
    }
  }, [messagesList, messagesListRef]);

  return (
    <>
      {(messagesList === null || messagesList?.length === 0) && <p className="my-auto font-bold text-center text-accent">There are no messages for this category yet. Be the first to leave a new one!</p>}
      {messagesList && messagesList.length > 0 &&
        <ul className="mb-auto">
          {messagesList.map((message) => {
            return <Message key={message.id} message={message} messagesListDb={messagesListDb} messagesListActionRef={messagesListActionRef} />
          })}
        </ul>
      }

      <MessagesBar categoryId={categoryId} messagesListDb={messagesListDb} messagesListActionRef={messagesListActionRef} />
    </>
  )
}
