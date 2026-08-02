import { Link } from "react-router-dom";

import QuickImageUpload from "../ImageGallery/QuickImageUpload";

function LectureCard({ lecture, onUploaded }) {

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

        {lecture.featured && "⭐ "}📚 {lecture.title}

        </h3>

        {

        lecture.teacher &&

        <p>👨‍🏫 {lecture.teacher}</p>

        }

        <button>

        Öppna föreläsning

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

        📄 Öppna originalmaterial

        </button>

        }

        <div

        onClick={event => event.preventDefault()}

        style={{marginTop:10}}

        >

        <QuickImageUpload

        lectureId={lecture.id}

        onUploaded={onUploaded}

        />

        </div>

        </div>

        </Link>

        );

}

export default LectureCard;