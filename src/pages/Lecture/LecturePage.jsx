import SlideViewer from "../../components/SlideViewer/SlideViewer";

import LectureToolbar from "../../components/LectureToolbar/LectureToolbar";

import LectureSearch from "../../components/LectureSearch/LectureSearch";

import { useParams } from "react-router-dom";

import { demoLectures } from "../../data/demoLectures";

import ImageGallery from "../../components/ImageGallery/ImageGallery";

import LectureSidebar from "../../components/LectureSidebar/LectureSidebar";

function LecturePage(){

const { id } = useParams();

const lecture=

demoLectures.find(

lecture=>lecture.id===Number(id)

);

if(!lecture){

return <h2>Föreläsningen hittades inte.</h2>;

}

return(

<div style={{

maxWidth:"1200px",

margin:"auto",

padding:"50px"

}}>

<h1>

📚 {lecture.title}

</h1>

<p>

👨‍🏫 {lecture.teacher}

</p>

<p>

📅 {lecture.date}

</p>

<p>

🖼 {lecture.images} bilder

</p>

<LectureToolbar/>

<LectureSearch/>

<SlideViewer

image="https://picsum.photos/1200/700"

/>

<ImageGallery

lecture={lecture}

/>

</div>

)

}

export default LecturePage;