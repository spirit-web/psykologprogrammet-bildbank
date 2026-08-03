import "./LectureSidebar.css";

import { Link } from "react-router-dom";

import useCourse from "../../hooks/useCourse";

function LectureSidebar({ courseId }) {

    const { course } = useCourse(courseId);

    return (

        <aside className="lecture-sidebar">

            <h2>
                📚 {course?.name || "Kursen"}
            </h2>

            <Link

                to={`/course/${courseId}/begrepp`}

                className="lecture-link"

            >

                🧠 Begrepp

            </Link>

            <Link

                to={`/course/${courseId}/bilder`}

                className="lecture-link"

            >

                🔧 Alla psykologverktyg

            </Link>

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
