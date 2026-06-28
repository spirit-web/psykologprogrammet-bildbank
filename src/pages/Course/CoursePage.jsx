import "./CoursePage.css";

import { useParams } from "react-router-dom";

import { demoCourses } from "../../data/demoCourses";

import CourseHeader from "../../components/CourseHeader/CourseHeader";
import Stats from "../../components/Stats/Stats";
import LectureList from "../../components/LectureList/LectureList";
import CategoryList from "../../components/CategoryList/CategoryList";
import CourseSections from "../../components/CourseSections/CourseSections";

function CoursePage() {

    const { id } = useParams();

    const course =
        demoCourses.find(c => c.id === Number(id));

    if (!course) {

        return <h2>Kursen hittades inte.</h2>;

    }

    return (

        <div className="course-page">

            <CourseHeader course={course} />

            <Stats course={course} />

            <CourseSections />

            <LectureList course={course} />

        </div>

    );

}

export default CoursePage;