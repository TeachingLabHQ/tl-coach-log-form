import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import FormPage from "./components/FormPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import AccessTokenProvider from './contexts/accessTokenContext'


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <AccessTokenProvider>
      <NavBar/>
        <Routes>
          <Route element={<Home/>} path="/"/>
          <Route element={<FormPage/>} path="/form"/>
        </Routes>
        </AccessTokenProvider>
      </BrowserRouter>
     
     
    </div>
  );
}

export default App;
