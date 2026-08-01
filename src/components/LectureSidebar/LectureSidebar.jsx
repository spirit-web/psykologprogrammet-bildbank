import "./LectureSidebar.css";

import { Link } from "react-router-dom";

import { demoLectures } from "../../data/demoLectures";

function LectureSidebar() {

    return (

        <aside className="lecture-sidebar">

            <h2>

                📚 Föreläsningar

            </h2>

            {

                demoLectures.map(lecture=>(

                    <Link

                        key={lecture.id}

                        to={`/lecture/${lecture.id}`}

                        className="lecture-link"

                    >

                        {lecture.title}

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