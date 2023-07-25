import { Route, Routes } from "react-router-dom";
import MainLayouts from "./Components/Layouts/MainLayouts";
import Home from "./Components/Pages/Home/Home";
import Login from "./Components/Pages/Login/Login";
import Account from "./Components/Pages/Account/Account";
import ListCategory from "./Components/Pages/Category/ListCategory";
import AddCategory from "./Components/Pages/Category/AddCategory";
import UpdateCategory from "./Components/Pages/Category/UpdateCategory";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayouts children={<Home />} />} />
        <Route path="/login" element={<MainLayouts children={<Login />} />} />
        <Route path="/account" element={<MainLayouts children={<Account />} />} />

        <Route path="/category" element={<MainLayouts children={<ListCategory />} />} />
        <Route path="/category/create" element={<MainLayouts children={<AddCategory />} />} />
        <Route path="/category/edit/:id" element={<MainLayouts children={<UpdateCategory />} />} />
      </Routes>
    </>
  );
}

export default App;
