
import { MarvelPage } from "../heroes/pages/MarvelPage";
import { DcPage } from "../heroes/pages/DCPage";
import { LoginPage } from "../auth/pages/LoginPage";
import { Navbar } from "../ui";
import { Navigate, Route, Routes } from "react-router-dom";

export const AppRouter = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Navigate to='/marvel' />}></Route>
                <Route path="/marvel" element={<MarvelPage />}></Route>
                <Route path="/dc" element={<DcPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
            </Routes>
        </>
    )
}
