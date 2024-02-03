import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Chat from "./Components/Chat";
import AfterSignUp from "./Components/AfterSignUp";

const PageRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Signup} />
          <Route path="/chat" Component={Chat} />
          <Route path="/register-in-space" Component={AfterSignUp} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default PageRoutes;
