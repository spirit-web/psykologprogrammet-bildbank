import "./LectureSidebar.css";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { getCourseThemes } from "../../services/themes";

function LectureSidebar({ courseId }) {

    const [themes, setThemes] = useState([]);

    const location = useLocation();

    useEffect(() => {

        async function load() {

            const data = await getCourseThemes(courseId);

            setThemes(data);

        }

        if (courseId) {

            load();

        }

    }, [courseId, location.key]);

    useEffect(() => {

        function handleThemesChanged() {

            if (courseId) {

                getCourseThemes(courseId).then(setThemes);

            }

        }

        window.addEventListener("psykopedia-themes-changed", handleThemesChanged);

        return () => window.removeEventListener("psykopedia-themes-changed", handleThemesChanged);

    }, [courseId]);

    return (

        <aside className="lecture-sidebar">

            <h2>
                🧠 Teman i kursen
            </h2>

            {

                themes.length === 0 &&

                <p style={{ fontSize: 13, color: "#888" }}>

                    Inga taggade bilder i den här kursen än.

                </p>

            }

            {

                themes.map(theme => (

                    <Link

                        key={theme.id}

                        to={`/course/${courseId}/begrepp?tema=${theme.id}`}

                        className="lecture-link"

                    >

                        {theme.icon} {theme.name}

                    </Link>

                ))

            }

            <hr/>

            <Link
                to="/"
                className="lecture-link"
            >

                🏠 Kurser

            </Link>

            <Link
                to="/admin"
                className="lecture-link"
            >

                👤 Admin

            </Link>

        </aside>

    )

}

export default LectureSidebar;
