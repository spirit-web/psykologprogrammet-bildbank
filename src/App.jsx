import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home/HomePage";
import CoursePage from "./pages/Course/CoursePage";
import LecturePage from "./pages/Lecture/LecturePage";
import AdminPage from "./pages/Admin/AdminPage";

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
                path="/lecture/:id"
                element={<LecturePage/>}
            />

            <Route
                path="/admin"
                element={<AdminPage/>} 
            
            />

        </Routes>

    )

}

export default App;