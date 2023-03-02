import { useOutletContext } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { query, collection, orderBy, getFirestore } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import LiveChat from "./components/LiveChat";
import Loading from "../../reusable-components/Loading";
import Error from "../../reusable-components/Error";

export default function LiveChatPage() {
  const { app, user } = useOutletContext();

  const handleSignOut = () => {
    signOut(getAuth(app));
  }

  const [categoriesListCollection, loading, error] = useCollection(query(collection(getFirestore(app), "categoriesList"), orderBy("timestamp")));
  const categoriesList = categoriesListCollection?.docs?.map((doc) => {
    return { id: doc.id, ...doc.data() }
  });

  return (
    <>
      <h1>👋 Hi, {user?.displayName}! 👋</h1>
      <button onClick={handleSignOut} className="mx-auto font-bold text-xs text-accent-light dark:text-accent-dark underline">Sign out</button>

      <div className="mt-10 h-[60vh] w-[90vw] min-h-[250px] max-h-[500px] min-w-[280px] sm:min-w-[500px] max-w-[1000px] rounded-l-xl rounded-r-md grid grid-cols-4 mx-auto bg-gradient-to-br from-secondary to-primary">
        {loading && <Loading wrapperClassNameToAdd="col-span-4 my-auto" />}
        {error && <Error error={error} wrapperClassName="col-span-4 my-auto" />}
        {!loading && !error && categoriesList.length === 0 && <Error error={{ message: "There are no categories, please contact the administrator!" }} wrapperClassName="col-span-4 my-auto" />}
        {!loading && !error && categoriesList.length > 0 && <LiveChat categoriesList={categoriesList} />}
      </div>
    </>
  );
}