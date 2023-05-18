
import { HeroesRoutes } from "../heroes";
import { LoginPage } from "../auth";
import { Route, Routes } from "react-router-dom";

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/*" element={<HeroesRoutes />}></Route>
            </Routes>
        </>
    )
}
