import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Chat from "./Components/ChatComponent";
import AfterSignUp from "./Components/AfterSignUp";
import Login from "./Components/Login";
import Welcome from "./Components/Welcome";

const PageRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" Component={Signup} />
          <Route path="/" Component={Welcome} />
          <Route path="/login" Component={Login} />

          <Route path="/chat" Component={Chat} />
          <Route path="/register-in-space" Component={AfterSignUp} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default PageRoutes;
