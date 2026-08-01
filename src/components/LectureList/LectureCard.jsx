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

        height:120,

        objectFit:"cover",

        borderRadius:10,

        marginBottom:12

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

        <p>

        🖼️ {lecture.images} bilder

        </p>

        <button>

        Öppna föreläsning

        </button>

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