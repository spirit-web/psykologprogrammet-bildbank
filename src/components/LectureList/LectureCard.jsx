import { Link } from "react-router-dom";

function LectureCard({ lecture }) {

    return(

        <Link

        to={`/lecture/${lecture.id}`}

        style={{textDecoration:"none"}}

        >

        <div

        className="lecture-card"

        style={{

        borderLeft:"8px solid #2D7FF9"

        }}

        >

        <h3>

        📚 {lecture.title}

        </h3>

        <p>

        👨‍🏫 {lecture.teacher}

        </p>

        <p>

        📅 {lecture.date}

        </p>

        <p>

        🖼️ {lecture.images} bilder

        </p>

        <button>

        Öppna föreläsning

        </button>

        </div>

        </Link>

        );

}

export default LectureCard;