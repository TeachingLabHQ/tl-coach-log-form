import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import AccessTokenProvider from './contexts/accessTokenContext'


function App() {
  return (
    <div className="App">
      <AccessTokenProvider>
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route element={<Home/>} path="/"/>
        </Routes>
      </BrowserRouter>
      </AccessTokenProvider>
     
    </div>
  );
}

export default App;
