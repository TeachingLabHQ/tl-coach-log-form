import { ChakraProvider } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CoachLog from "./components/CoachLog";
import NavBar from "./components/NavBar";
import AccessTokenProvider from "./contexts/accessTokenContext";
import app from "./firebase/firebase";
import { ConversationRecord } from "./components/ConversationRecord";

function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const authentication = getAuth(app);
  onAuthStateChanged(authentication, (user) => {
    if (user) {
      return setIsUserSignedIn(true);
    }
    return setIsUserSignedIn(false);
  });
  return (
    <ChakraProvider>
      <div className="App">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Coach Log Form</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <BrowserRouter>
          <AccessTokenProvider>
            <NavBar userStatus={isUserSignedIn} />
            <Routes>
              <Route element={<CoachLog />} path="/" />
              <Route
                element={<ConversationRecord />}
                path="/conversation-record"
              />
            </Routes>
          </AccessTokenProvider>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  );
}

export default App;
