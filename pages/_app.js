// React JS
import { useEffect } from "react";

// NEXT JS
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";

// Firebase
import firebase from "firebase";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

// Components / Pages
import Login from "./login";
import Chat from "./chat";
import Loading from "./Loading";

function MyApp({ Component, pageProps }) {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set(
        {
          uid: user.uid,
          username: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    }
  }, [user]);

  if (user)
    return (
      <ThemeProvider enableSystem={true} attribute="class">
        <Chat />
      </ThemeProvider>
    );

  if (loading)
    return (
      <ThemeProvider enableSystem={true} attribute="class">
        <Loading />
      </ThemeProvider>
    );

  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
