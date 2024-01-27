import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Chat from "./Components/Chat";

const PageRoutes = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Signup} />
          <Route path="/chat" Component={Chat} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default PageRoutes;
