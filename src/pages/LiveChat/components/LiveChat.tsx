import { useOutletContext } from "react-router-dom";
import { LegacyRef, useEffect, useRef, useState } from "react";
import { collection, getFirestore, orderBy, query, Timestamp, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import CategoriesList from "./categories/CategoriesList";
import Loading from "../../../reusable-components/Loading"
import Error from "../../../reusable-components/Error";
import MessagesList from "./messages/MessagesList";
import { CategoryType } from "../LiveChatPage";

export type MessageType = {
  id: string,
  categoryId: string,
  userId: string,
  content: string,
  timestamp: Timestamp,
  userIcon: string,
  userDisplayName: string,
  userEMail: string
};
type Props = {
  categoriesList: CategoryType[]
};

export default function LiveChat({ categoriesList }: Props) {
  const { app } = useOutletContext() as LiveChatContext;

  const [categoryId, setCategoryId] = useState(categoriesList[0].id);
  const [chatHeader, setChatHeader] = useState(
    `${categoriesList[0].unicode} ${categoriesList[0].title}`
  );

  const messagesListDb = collection(getFirestore(app), "messagesList");
  const [messagesListCollection, loading, error] = useCollection(
    query(messagesListDb, where("categoryId", "==", categoryId), orderBy("timestamp"))
  );
  const messagesList: MessageType[] | null = messagesListCollection?.docs?.map((doc) => {
    return { id: doc.id, ...doc.data() } as MessageType
  }) ?? null;

  const categoriesBtnRef = useRef<HTMLButtonElement>(null);
  const categoriesListRef = useRef<HTMLDivElement>(null);
  const messagesListRef = useRef<HTMLDivElement>(null);

  const toggleShowCategories = () => {
    if (categoriesListRef?.current?.classList?.contains("hidden")) {
      categoriesListRef.current.classList.remove("hidden");
      categoriesListRef.current.classList.add("flex");
      messagesListRef?.current?.classList?.remove("flex");
      messagesListRef?.current?.classList?.add("hidden");
    } else {
      categoriesListRef?.current?.classList.remove("flex");
      categoriesListRef?.current?.classList.add("hidden");
      messagesListRef?.current?.classList?.remove("hidden");
      messagesListRef?.current?.classList?.add("flex");
    }
  }
  useEffect(() => {
    toggleShowCategories();
  }, []);

  return (
    <>
      <CategoriesList innerRef={categoriesListRef} categoriesList={categoriesList} setCategoryId={setCategoryId} setChatHeader={setChatHeader} toggleShowCategories={toggleShowCategories} />

      <div ref={messagesListRef as LegacyRef<HTMLDivElement>} className="relative hidden sm:flex flex-col col-span-4 sm:col-span-3 overflow-y-scroll scrollbar-fancy rounded-l-xl rounded-r-md bg-black bg-opacity-5">
        <div className="flex items-center sticky top-0 py-4 sm:py-6 backdrop-blur-sm">
          <button ref={categoriesBtnRef} onClick={toggleShowCategories} className="visible sm:hidden ml-5 text-3xl">≡</button>
          <h1 className="w-[83%] sm:w-[100%] mx-auto">{chatHeader}</h1>
        </div>

        {loading && <Loading wrapperClassNameToAdd="my-auto" />}
        {error && <Error error={error} wrapperClassName="my-auto" />}
        {!loading && !error && <MessagesList categoryId={categoryId} messagesList={messagesList} messagesListRef={messagesListRef} messagesListDb={messagesListDb} />}
      </div>
    </>
  );
}
