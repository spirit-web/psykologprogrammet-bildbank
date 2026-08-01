import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/Home/HomePage";
import CoursePage from "./pages/Course/CoursePage";
import CourseImagesPage from "./pages/Course/CourseImagesPage";
import CourseSlidesPage from "./pages/Course/CourseSlidesPage";
import LecturePage from "./pages/Lecture/LecturePage";
import AdminPage from "./pages/Admin/AdminPage";
import FavoritesPage from "./pages/Favorites/FavoritesPage";
import HippocampusPage from "./pages/Hippocampus/HippocampusPage";

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
                path="/course/:id/bilder"
                element={<CourseImagesPage/>}
            />

            <Route
                path="/course/:id/slides"
                element={<CourseSlidesPage/>}
            />

            <Route
                path="/lecture/:id"
                element={<LecturePage/>}
            />

            <Route
                path="/favoriter"
                element={<FavoritesPage/>}
            />

            <Route
                path="/hippocampus"
                element={<HippocampusPage/>}
            />

            <Route
                path="/admin"
                element={<AdminPage/>}

            />

        </Routes>

    )

}

export default App;