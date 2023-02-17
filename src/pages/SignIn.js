import { GoogleAuthProvider, getAuth, signInWithRedirect } from "firebase/auth";
import { useOutletContext } from "react-router-dom";

export default function SignIn() {
  const context = useOutletContext();
  const app = context?.app;

  const handleSignIn = () => {
    signInWithRedirect(getAuth(app), new GoogleAuthProvider());
  }

  return (
    <p className="text-2xl md:text-3xl text-center">👋 Hi, please <button onClick={handleSignIn} className="font-bold text-accent underline">sign in</button> with Google to use this live-chat! 👋</p>
  );
}
