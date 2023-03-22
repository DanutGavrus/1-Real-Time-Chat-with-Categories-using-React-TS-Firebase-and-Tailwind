import { useOutletContext } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { query, collection, orderBy, getFirestore, Timestamp } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import LiveChat from "./components/LiveChat";
import Loading from "../../reusable-components/Loading";
import Error from "../../reusable-components/Error";

export type CategoryType = {
  id: string,
  unicode: string,
  title: string,
  description: string,
  timestamp: Timestamp
};

export default function LiveChatPage() {
  const { app, user } = useOutletContext() as LiveChatContext;

  const handleSignOut = () => {
    signOut(getAuth(app));
  }

  const [categoriesListCollection, loading, error] = useCollection(
    query(collection(getFirestore(app), "categoriesList"), orderBy("timestamp"))
  );
  const categoriesList: CategoryType[] | null = categoriesListCollection?.docs?.map((doc) => {
    return { id: doc.id, ...doc.data() } as CategoryType
  }) ?? null;

  return (
    <>
      <h1>👋 Hi, {user?.displayName}! 👋</h1>
      <button onClick={handleSignOut} className="mx-auto font-bold text-xs text-accent underline">Sign out</button>

      <div className="mt-10 h-[60vh] w-[90vw] min-h-[250px] max-h-[500px] min-w-[280px] sm:min-w-[500px] max-w-[1000px] rounded-l-xl rounded-r-md grid grid-cols-4 mx-auto bg-gradient-to-br from-secondary to-primary">
        {loading && <Loading wrapperClassNameToAdd="col-span-4 my-auto" />}
        {error && <Error error={error} wrapperClassName="col-span-4 my-auto" />}
        {!loading && !error && (categoriesList === null || categoriesList?.length === 0) && <Error error={{ name: "", message: "There are no categories, please contact the administrator!" }} wrapperClassName="col-span-4 my-auto" />}
        {!loading && !error && categoriesList && categoriesList?.length > 0 && <LiveChat categoriesList={categoriesList} />}
      </div>
    </>
  );
}
