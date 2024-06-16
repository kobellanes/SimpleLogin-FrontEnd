import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import LoginPage from "./components/LoginPage/LoginPage";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/HomePage/Home";
import NotFound from "./components/NotFound/NotFound";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/register" element={<SignUp />}></Route>
          <Route path="/home" element={<Home />}></Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter >
    </>
  );
}


export default App;
