import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import FormPage from "./components/FormPage";
import CoachLogPage from "./components/CoachLog";
import "bootstrap/dist/css/bootstrap.min.css";
import AccessTokenProvider from "./contexts/accessTokenContext";
import app from "./firebase/firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";
import { ChakraProvider } from "@chakra-ui/react";

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
          <title>Project Log Form</title>
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
        <BrowserRouter>
          <AccessTokenProvider>
            <NavBar userStatus={isUserSignedIn} />
            <Routes>
              {/* <Route element={<Home/>} path="/"/> */}
              <Route element={<FormPage />} path="/" />
              <Route element={<CoachLogPage />} path="/coachlog" />
            </Routes>
          </AccessTokenProvider>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  );
}

export default App;
