import { CollectionReference, DocumentData } from "firebase/firestore";
import { RefObject, useEffect, useRef } from "react";
import { MessageType } from "../LiveChat";
import Message from "./Message";
import MessagesBar from "./MessagesBar";

type Props = {
  categoryId: string,
  messagesList: MessageType[] | null,
  messagesListRef: RefObject<HTMLDivElement>,
  messagesListDb: CollectionReference<DocumentData>
};

export default function MessagesList({ categoryId, messagesList, messagesListRef,
  messagesListDb }: Props) {

  const messagesListPrevLenRef = useRef({ prevLen: messagesList?.length ?? 0 });
  useEffect(() => {
    // Scroll all users to bottom only when someone adds a new message
    if (messagesListPrevLenRef?.current?.prevLen < (messagesList?.length ?? 0)) {
      messagesListRef?.current?.scrollTo(0, messagesListRef?.current?.scrollHeight);
    }
    messagesListPrevLenRef.current.prevLen = messagesList?.length ?? 0;
  }, [messagesList, messagesListRef]);

  useEffect(() => {
    messagesListRef?.current?.scrollTo(0, messagesListRef?.current?.scrollHeight);
  }, [categoryId, messagesListRef]);

  return (
    <>
      {(messagesList === null || messagesList?.length === 0) && <p className="my-auto font-bold text-center text-accent">There are no messages for this category yet. Be the first to leave a new one!</p>}
      {messagesList && messagesList.length > 0 &&
        <ul className="mb-auto">
          {messagesList.map((message) => {
            return <Message key={message.id} message={message} messagesListDb={messagesListDb} />
          })}
        </ul>
      }

      <MessagesBar categoryId={categoryId} messagesListDb={messagesListDb} />
    </>
  )
}
