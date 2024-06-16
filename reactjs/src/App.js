import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import LoginPage from "./components/LoginPage/LoginPage";
import SignUp from "./components/SignUp/SignUp";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/register" element={<SignUp />}></Route>


        </Routes>
      </BrowserRouter >
    </>
  );
}


export default App;
