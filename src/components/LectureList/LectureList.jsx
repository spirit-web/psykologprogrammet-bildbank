import "./LectureList.css";

import LectureCard from "./LectureCard";

import { demoLectures } from "../../data/demoLectures";

function LectureList({course}){

return(

<>

<h2>

Föreläsningar

</h2>

<div className="lecture-list">

{

demoLectures

.filter(

lecture=>lecture.courseId===course.id

)

.map(

lecture=>

<LectureCard

key={lecture.id}

lecture={lecture}

/>

)

}

</div>

</>

)

}

export default LectureList;