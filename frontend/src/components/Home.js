import React, { useEffect, useState, useContext } from "react";
import { AccessTokenContext } from "../contexts/accessTokenContext";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import "../App.css";
import Button from "react-bootstrap/Button";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase";

function Home() {
  const authentication = getAuth(app);
  const [info, setInfo] = useState([]);
  const [lessons, setLessons] = useState([]);
  const { accessToken, setAccessToken } = useContext(AccessTokenContext);
  let query =
    "{ boards (ids:2783211671) {name id  items {name column_values {title value text type} } } }";

  useEffect(() => {
    fetch("http://localhost:9000/demo/info?myParam=10")
      .then((res) => res.json())
      .then((res) => console.log(res))
      .then((text) => setInfo(text.result))
      .catch((err) => console.log(err));

    setAccessToken(
      "eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE2NTYwODI0MSwidWlkIjozMTI4ODQ0NCwiaWFkIjoiMjAyMi0wNi0xNFQyMDoyMTo1Ny4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6ODg4NDgxOSwicmduIjoidXNlMSJ9.BUyi3WsoBlpPvCBms9WUKfOufKFDNz6onxBm8h_jWGo"
    );
  }, []);

  const getAttendance = () => {
    axios
      .post("http://localhost:9000/demo/attendance", {
        apiKey: accessToken,
        query: query,
      })
      .then((res) => res.data.data.boards[0].items)
      .then((data) =>
        data[0].column_values.map((val, index) =>
          index != 0 && index != data[0].column_values.length - 1
            ? setLessons((lessons) => [...lessons, val.title])
            : null
        )
      )
      .catch((err) => console.log(err));
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {/* <span>Firebase Test:</span>
           {info && info.map((item)=><p>{item.test}</p>)}
           <span>Monday API data:</span>
           <button onClick={getAttendance}>fetch</button>
           <ListGroup className="ListGroup">
               {lessons && lessons.map((lesson)=>
                <ListGroup.Item action>{lesson}</ListGroup.Item>
               )}
           
            
           </ListGroup> */}
      <Button variant="outline-primary" onClick={signInWithGoogle}>
        Sign in as a TL employee
      </Button>{" "}
      <Button variant="outline-secondary">Sign in as a PL participant</Button>{" "}
    </div>
  );
}

export default Home;
