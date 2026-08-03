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

        {

        lecture.cover &&

        <img

        src={lecture.cover}

        alt={lecture.title}

        style={{

        width:"100%",

        height:70,

        objectFit:"cover",

        borderRadius:8,

        marginBottom:8

        }}

        />

        }

        <h3>

        {lecture.featured && <span className="lecture-card-star">⭐</span>} {lecture.title}

        </h3>

        {

        lecture.teacher &&

        <p>👨‍🏫 {lecture.teacher}</p>

        }

        <button>

        Se bilder

        </button>

        {

        lecture.pdf_url &&

        <button

        onClick={event => {

        event.stopPropagation();

        window.open(lecture.pdf_url, "_blank", "noreferrer");

        }}

        style={{

        display:"inline-block",

        marginTop:8,

        fontSize:13,

        background:"none",

        border:"none",

        color:"#214c9d",

        fontWeight:600,

        cursor:"pointer",

        padding:0

        }}

        >

        📄 Öppna PDF

        </button>

        }

        </div>

        </Link>

    );

}

export default LectureCard;
