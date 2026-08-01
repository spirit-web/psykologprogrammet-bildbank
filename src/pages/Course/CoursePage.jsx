import "./CoursePage.css";

import { useParams } from "react-router-dom";

import CourseHeader from "../../components/CourseHeader/CourseHeader";
import LectureList from "../../components/LectureList/LectureList";
import CourseSections from "../../components/CourseSections/CourseSections";
import BackButton from "../../components/BackButton/BackButton";

import useCourse from "../../hooks/useCourse";

function CoursePage(){

    const { id } = useParams();

    const{

        course,

        loading

    }=useCourse(id);

    if(loading){

        return <h2>Laddar kurs...</h2>;

    }

    if(!course){

        return <h2>Kursen hittades inte.</h2>;

    }

    return(

        <div

            style={{

                maxWidth:"1200px",

                margin:"auto",

                padding:"40px"

            }}

        >

            <BackButton/>

            <div className="course-page">

                <CourseHeader course={course}/>

                <CourseSections courseId={course.id}/>

                <div id="lectures-section">

                    <LectureList course={course}/>

                </div>

            </div>

        </div>

    );

}

export default CoursePage;