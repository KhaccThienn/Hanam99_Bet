import { Route, Routes } from "react-router-dom";
import MainLayouts from "./Components/Layouts/MainLayouts";
import Home from "./Components/Pages/Home/Home";
import Login from "./Components/Pages/Login/Login";
import Account from "./Components/Pages/Account/Account";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayouts children={<Home />} />} />
        <Route path="/login" element={<MainLayouts children={<Login />} />} />
        <Route path="/account" element={<MainLayouts children={<Account />} />} />
      </Routes>
    </>
  );
}

export default App;
