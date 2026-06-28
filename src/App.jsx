import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home/HomePage";
import CoursePage from "./pages/Course/CoursePage";
import AdminPage from "./pages/Admin/AdminPage";
import LecturePage from "./pages/Lecture/LecturePage";

function App(){

    return(

        <Routes>

            <Route

                path="/"

                element={<HomePage/>}

            />

            <Route

                path="/course/:id"

                element={<CoursePage/>}

            />

            <Route

                path="/admin"

                element={<AdminPage/>}

            />

        </Routes>

    )

}

export default App;