import { Navigate, Route, Routes } from "react-router-dom"
import Login from "../components/Login"
import Register from "../components/Register"
import Search from "../components/Search"
import UserUpdate from "../components/UserUpdate"
import UserAdmin from "../components/UserAdmin"
import Logs from "../components/Logs"
import Searcho from "../components/Searcho"
import EntityExplorer from "../components/EntityExplorer"

export const AppRoutes = () => {

    return <>
    <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/searcho" element={<Searcho/>} />
        <Route path="/update_user" element={<UserUpdate/>} />
        <Route path="/logs" element={<Logs/>} />
        <Route path="/users" element={<UserAdmin/>} />
        <Route path="/explore/:id" element={<EntityExplorer/>} />
        <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
    </>

}